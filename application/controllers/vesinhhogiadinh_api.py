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
from application.models.model_user import TinhTrangBaocaoEnum

def congdongTongCong(Baocao, current_user, nambaocao=None):
    notdict = ['_created_at','_updated_at','_deleted','_deleted_at','_etag','id','donvi_id',\
               'nambaocao','kybaocao','mabaocao','nguoibaocao_id','thoigianbaocao','tinhtrang']
    
    curdonvi_id = current_user.donvi_id
    baocaos = db.session.query(Baocao, DonVi).\
            filter(Baocao.donvi_id == DonVi.id).\
            filter(DonVi.captren_id == curdonvi_id).\
            filter(Baocao.nambaocao == nambaocao).all()
    
    resp = {}
    for baocao, donvi in baocaos:
        # print(donvi.id)
        for c in Baocao.__table__.c:
            if c.name not in notdict:
                if (c.name not in resp) or (resp[c.name] is None):
                    resp[c.name] = getattr(baocao, c.name)
                else:
                    if (resp[c.name] is None):
                        resp[c.name] = 0
                    val = getattr(baocao, c.name)
                    if (val is None):
                        val = 0
                    resp[c.name] = resp[c.name] +  val
    return resp

async def baocao_prepost_vscapthon(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    if "thonxom_id" not in data or data["thonxom_id"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn thôn xóm"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    
    record = db.session.query(VSCapThon).filter(and_(VSCapThon.donvi_id == currentuser.donvi_id, VSCapThon.nambaocao == data['nambaocao'])).first()
    if record is not None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Báo cáo năm của đơn vị hiện tại đã được tạo, vui lòng kiểm tra lại"}, status=520)
        
    data['tenthon'] = data['thonxom']['ten']
    data['tinhtrang'] = TinhTrangBaocaoEnum.taomoi
    data['donvi_id'] = currentuser.donvi_id
    data['nguoibaocao_id'] = currentuser.id
    
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
    data['tinhtrang'] = TinhTrangBaocaoEnum.taomoi
    data['donvi_id'] = currentuser.donvi_id
    data['nguoibaocao_id'] = currentuser.id

async def reponse_capxa_single(request=None, Model=None, result=None, **kw):
    currentuser = await current_user(request)
    obj = to_dict(result)
    
    list_baocao = congdongTongCong(VSCapThon,currentuser, obj['nambaocao'])
    obj['danhsachbaocao'] = list_baocao
    result = obj
    print(result)
    

apimanager.create_api(VSCapThon,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func,entity_pregetmany], POST=[auth_func, baocao_prepost_vscapthon], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
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
    postprocess=dict(GET_SINGLE=[reponse_capxa_single], PUT_SINGLE=[], DELETE_SINGLE=[]),
    collection_name='vscapxa')


apimanager.create_api(VSCapHuyen,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany], POST=[auth_func, baocao_prepost_vscaphuyen], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    postprocess=dict(GET_SINGLE=[], PUT_SINGLE=[], DELETE_SINGLE=[]),
    collection_name='vscaphuyen')


apimanager.create_api(VSCapTinh,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany], POST=[auth_func, baocao_prepost_vscaptinh], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    postprocess=dict(GET_SINGLE=[], PUT_SINGLE=[], DELETE_SINGLE=[]),
    collection_name='vscaptinh')





