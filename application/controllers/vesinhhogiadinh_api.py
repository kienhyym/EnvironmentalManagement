import asyncio
import aiohttp
import hashlib
import ujson
from application.extensions import apimanager
from application.server import app
from application.database import db
from sqlalchemy.orm import aliased, joinedload_all
from gatco.response import json, text, html

from .helpers import *
from application.models.model_vesinhhogiadinh import *
from sqlalchemy import or_, and_
from application.client import HTTPClient 
from gatco_restapi.helpers import to_dict
from application.models.model_user import TinhTrangBaocaoEnum

def congdonTongCong(Baocao, current_user, nambaocao=None):
    notdict = ['_created_at','_updated_at','_deleted','_deleted_at','_etag','id','donvi_id',\
               'nambaocao','kybaocao','mabaocao','nguoibaocao_id','thoigianbaocao','tinhtrang']
    
    curdonvi_id = current_user.donvi_id
    baocaos = db.session.query(Baocao, DonVi).\
            filter(Baocao.donvi_id == DonVi.id).\
            filter(or_(DonVi.captren_id == curdonvi_id, Baocao.donvi_id == curdonvi_id)).\
            filter(Baocao.nambaocao == nambaocao).all()
    
    resp = []
    for baocao, donvi in baocaos:
        print("baocathon=====",baocao)
        resp.append(to_dict(baocao))
#         for c in Baocao.__table__.c:
#             if c.name not in notdict:
#                 if (c.name not in resp) or (resp[c.name] is None):
#                     resp[c.name] = getattr(baocao, c.name)
#                 else:
#                     if (resp[c.name] is None):
#                         resp[c.name] = 0
#                     val = getattr(baocao, c.name)
#                     if (val is None or c.name == "datetime.datetime"):
#                         val = 0
#                     resp[c.name] = resp[c.name] +  val
    return resp

async def baocao_prepost_vscapthon(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    if "thonxom_id" not in data or data["thonxom_id"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn thôn xóm"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    
    record = db.session.query(VSCapThon).filter(and_(VSCapThon.donvi_id == currentuser.donvi_id,\
                                                      VSCapThon.thonxom_id == data['thonxom_id'], \
                                                      VSCapThon.loaikybaocao == data['loaikybaocao'], \
                                                      VSCapThon.kybaocao == data['kybaocao'], \
                                                      VSCapThon.nambaocao == data['nambaocao'])).first()
    if record is not None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Báo cáo của đơn vị hiện tại đã được tạo, vui lòng kiểm tra lại"}, status=520)
    
    data['tinhtrang'] = TinhTrangBaocaoEnum.taomoi
    data['donvi_id'] = currentuser.donvi_id
    data['nguoibaocao_id'] = currentuser.id
    
async def pre_put_vscapthon(request=None, instance_id=None, data=None, **kw):
    kybaocaotruoc = 1
    nambaocao_truoc = None
    if (data['kybaocao'] > 1):
        kybaocaotruoc = data['kybaocao'] - 1
        nambaocao_truoc = data['nambaocao']
    else:
        nambaocao_truoc = data['nambaocao'] - 1
        if (data['loaikybaocao'] == LoaiKyBaoCao.QUY):
            kybaocaotruoc = 4
        elif (data['loaikybaocao'] == LoaiKyBaoCao.THANG):
            kybaocaotruoc = 12
        elif (data['loaikybaocao'] == LoaiKyBaoCao.SAUTHANG):
            kybaocaotruoc = 2
            
    baocaokytruoc = db.session.query(VSCapThon).filter(and_(VSCapThon.donvi_id == currentuser.donvi_id,\
                                                      VSCapThon.thonxom_id == data['thonxom_id'], \
                                                      VSCapThon.loaikybaocao == data['loaikybaocao'], \
                                                      VSCapThon.kybaocao == kybaocaotruoc, \
                                                      VSCapThon.nambaocao == nambaocao_truoc)).first()    
    if baocaokytruoc is not None:
        data["tongho_conhatieu_truocbaocao"] = baocaokytruoc.tong_soho - baocaokytruoc.tong_khongnhatieu
        data["tongho_conhatieu_hvs_truocbaocao"] = baocaokytruoc.tong_hopvs
        data["tong_soho_conhatieu_tuhoai_truocbaocao"] = baocaokytruoc.tong_tuhoai
        data["tong_soho_conhatieu_thamdoi_truocbaocao"] = baocaokytruoc.tong_thamdoi
        data["tong_soho_conhatieu_2ngan_hvs_truocbaocao"] = baocaokytruoc.tong_2ngan
#         data["tong_soho_conhatieu_vip_hvs_truocbaocao"] = baocaokytruoc.tong_vip
        data["tong_soho_conhatieu_caithien_truocbaocao"] = baocaokytruoc.tong_caithien
        data["tong_hongheo_conhatieu_caithien_truocbaocao"] = baocaokytruoc.tong_hongheo_caithien
        
        nhatieuthon_kytruoc  = baocaokytruoc.nhatieuthonhvs
        nhatieuthon_kyhientai = data["nhatieuthonhvs"]
        tongho_conhatieu_hvs_xuongcap = 0
        tong_soho_conhatieu_tuhoai_truocbaocao = 0
        tong_soho_conhatieu_thamdoi_xuongcap = 0
        tong_soho_conhatieu_2ngan_hvs_xuongcap = 0
        tong_soho_conhatieu_caithien_xuongcap = 0
        tong_hongheo_conhatieu_caithien_xuongcap = 0
        for nt_truoc in nhatieuthon_kytruoc:
            for nt_sau in nhatieuthon_kyhientai:
                if nt_truoc["maho"] == nt_sau["maho"]:
                    if(nt_truoc["hopvesinh"] == 1 and nt_sau["hopvesinh"] == 0):
                        tongho_conhatieu_hvs_xuongcap = tongho_conhatieu_hvs_xuongcap +1
                    if(nt_truoc["tuhoai"] == 1 and nt_sau["tuhoai"] == 0):
                        tong_soho_conhatieu_tuhoai_xuongcap = tong_soho_conhatieu_tuhoai_xuongcap +1
                    if(nt_truoc["thamdoi"] == 1 and nt_sau["thamdoi"] == 0):
                        tong_soho_conhatieu_thamdoi_xuongcap = tong_soho_conhatieu_thamdoi_xuongcap +1
                    if(nt_truoc["haingan"] == 1 and nt_sau["haingan"] == 0):
                        tong_soho_conhatieu_2ngan_hvs_xuongcap = tong_soho_conhatieu_2ngan_hvs_xuongcap +1
                    if(nt_truoc["caithien"] == 1 and nt_sau["caithien"] == 0):
                        tong_soho_conhatieu_caithien_xuongcap = tong_soho_conhatieu_caithien_xuongcap +1
                        if(nt_truoc["hongheo"] == 1 and nt_sau["hongheo"] == 1):
                            tong_hongheo_conhatieu_caithien_xuongcap = tong_hongheo_conhatieu_caithien_xuongcap +1
                          
        data["tongho_conhatieu_hvs_xuongcap"] = tongho_conhatieu_hvs_xuongcap
        data["tong_soho_conhatieu_tuhoai_xuongcap"] = tong_soho_conhatieu_tuhoai_xuongcap
        data["tong_soho_conhatieu_thamdoi_xuongcap"] = tong_soho_conhatieu_thamdoi_xuongcap
        data["tong_soho_conhatieu_2ngan_hvs_xuongcap"] = tong_soho_conhatieu_2ngan_hvs_xuongcap
        data["tong_soho_conhatieu_caithien_xuongcap"] = tong_soho_conhatieu_caithien_xuongcap
        data["tong_hongheo_conhatieu_caithien_xuongcap"] = tong_hongheo_conhatieu_caithien_xuongcap
        
    data['tenthon'] = data['thonxom']['ten']
    
async def baocao_prepost_vscapxa(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    if "xaphuong_id" not in data or data["xaphuong_id"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn thôn xóm"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    
    record = db.session.query(VSCapXa).filter(and_(VSCapXa.donvi_id == currentuser.donvi_id, VSCapXa.nambaocao == data['nambaocao'])).first()
    if record is not None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Báo cáo năm của đơn vị hiện tại đã được tạo, vui lòng kiểm tra lại"}, status=520)
      
    data['tenxa'] = data['xaphuong']['ten']  
    data['tinhtrang'] = TinhTrangBaocaoEnum.taomoi
    data['donvi_id'] = currentuser.donvi_id
    data['nguoibaocao_id'] = currentuser.id
    
async def baocao_prepost_vscaphuyen(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    if "quanhuyen_id" not in data or data["quanhuyen_id"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn cấp huyện"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    
    record = db.session.query(VSCapHuyen).filter(and_(VSCapHuyen.donvi_id == currentuser.donvi_id, VSCapHuyen.nambaocao == data['nambaocao'])).first()
    if record is not None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Báo cáo năm hiện tại đã được tạo, vui lòng kiểm tra lại"}, status=520)
    data['tenhuyen'] = data['quanhuyen']['ten']
    data['tinhtrang'] = TinhTrangBaocaoEnum.taomoi
    data['donvi_id'] = currentuser.donvi_id
    data['nguoibaocao_id'] = currentuser.id
    
async def baocao_prepost_vscaptinh(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    if "tinhthanh_id" not in data or data["tinhthanh_id"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn cấp Tỉnh"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    
    record = db.session.query(VSCapTinh).filter(and_(VSCapTinh.donvi_id == currentuser.donvi_id, VSCapTinh.nambaocao == data['nambaocao'])).first()
    if record is not None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Báo cáo năm hiện tại đã được tạo, vui lòng kiểm tra lại"}, status=520)
    data['tentinh'] = data['tinhthanh']['ten']
    data['tinhtrang'] = TinhTrangBaocaoEnum.taomoi
    data['donvi_id'] = currentuser.donvi_id
    data['nguoibaocao_id'] = currentuser.id

async def reponse_capxa_get_single(request=None, Model=None, result=None, **kw):
    currentuser = await current_user(request)
    obj = to_dict(result)
    
#     list_baocao = congdonTongCong(VSCapThon,currentuser, obj['nambaocao'])
#     obj['danhsachbaocao'] = list_baocao
    list_baocao = []
    if (obj['tinhtrang'] == TinhTrangBaocaoEnum.taomoi):
        list_baocao = congdonTongCong(VSCapHuyen,currentuser, obj['nambaocao'])
        obj['danhsachbaocao'] = list_baocao
    result = obj
    
async def reponse_caphuyen_get_single(request=None, Model=None, result=None, **kw):
    currentuser = await current_user(request)
    obj = to_dict(result)
    
#     list_baocao = congdonTongCong(VSCapXa,currentuser, obj['nambaocao'])
#     obj['danhsachbaocao'] = list_baocao
    list_baocao = []
    if (obj['tinhtrang'] == TinhTrangBaocaoEnum.taomoi):
        list_baocao = congdonTongCong(VSCapHuyen,currentuser, obj['nambaocao'])
        obj['danhsachbaocao'] = list_baocao
    result = obj
    print(result)
    
async def reponse_captinh_get_single(request=None, Model=None, result=None, **kw):
    currentuser = await current_user(request)
    obj = to_dict(result)
    list_baocao = []
    if (obj['tinhtrang'] == TinhTrangBaocaoEnum.taomoi):
        list_baocao = congdonTongCong(VSCapHuyen,currentuser, obj['nambaocao'])
        obj['danhsachbaocao'] = list_baocao
    result = obj
    print(result)
    

apimanager.create_api(HoGiaDinh,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[]),
    collection_name='hogiadinh')

apimanager.create_api(VSCapThon,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func,entity_pregetmany], POST=[auth_func, baocao_prepost_vscapthon, pre_put_vscapthon], PUT_SINGLE=[auth_func, pre_put_vscapthon], DELETE_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[]),
    collection_name='vscapthon')

# apimanager.create_api(NhaTieuThonHVS,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='nhatieuthonhvs')

apimanager.create_api(VSCapXa,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany], POST=[auth_func, baocao_prepost_vscapxa], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    postprocess=dict(GET_SINGLE=[reponse_capxa_get_single], PUT_SINGLE=[], DELETE_SINGLE=[]),
    collection_name='vscapxa')


apimanager.create_api(VSCapHuyen,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany], POST=[auth_func, baocao_prepost_vscaphuyen], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    postprocess=dict(GET_SINGLE=[reponse_caphuyen_get_single], PUT_SINGLE=[], DELETE_SINGLE=[]),
    collection_name='vscaphuyen')


apimanager.create_api(VSCapTinh,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany], POST=[auth_func, baocao_prepost_vscaptinh], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    postprocess=dict(GET_SINGLE=[reponse_captinh_get_single], PUT_SINGLE=[], DELETE_SINGLE=[]),
    collection_name='vscaptinh')





