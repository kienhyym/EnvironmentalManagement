import asyncio
import aiohttp
import hashlib
import ujson
from datetime import datetime
from application.extensions import apimanager
from application.server import app
from application.database import db
from application.extensions import auth
from sqlalchemy import or_, and_
from sqlalchemy.orm import aliased, joinedload_all
from gatco.response import json, text, html
from gatco_restapi.helpers import to_dict

from application.models.model_kehoachbcc import *
from application.models import TinhTrangBaocaoEnum, TienDoKeHoachBCC, Nganh
from .helpers import *
from sqlalchemy import or_
from application.client import HTTPClient



@app.route('api/v1/thongkebcc', methods=['GET'])
async def ThongKeBCC(request):
    nambaocao = request.args.get("nambaocao", None)
    loaikybaocao = request.args.get("loaikybaocao", None)
    kybaocao = request.args.get("kybaocao", None)
    tinhthanh_id = request.args.get("tinhthanh_id", None)
    
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    if "loaikybaocao" is None or "kybaocao" is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Kỳ báo cáo không hợp lệ"}, status=520)
    if "nambaocao" is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    records = None
    if(currentuser.donvi.tuyendonvi_id ==1):
        if tinhthanh_id is None or tinhthanh_id == "undefined" or tinhthanh_id == "":
            return json({"error_code":"PARAMS_ERROR", "error_message":"Vui lòng chọn thông tin tỉnh thành!"}, status=520)

        records = db.session.query(TienDoKeHoachBCC).filter(and_(TienDoKeHoachBCC.tinhthanh_id == tinhthanh_id, \
                                                        TienDoKeHoachBCC.loaikybaocao == loaikybaocao, \
                                                        TienDoKeHoachBCC.kybaocao == kybaocao, \
                                                        TienDoKeHoachBCC.nambaocao == nambaocao),\
                                                        TienDoKeHoachBCC.tuyendonvi == 'tinh').first()
    elif(currentuser.donvi.tuyendonvi_id ==2):
        records = db.session.query(TienDoKeHoachBCC).filter(and_(TienDoKeHoachBCC.tinhthanh_id == currentuser.donvi.tinhthanh_id, \
                                                        TienDoKeHoachBCC.loaikybaocao == loaikybaocao, \
                                                        TienDoKeHoachBCC.kybaocao == kybaocao, \
                                                        TienDoKeHoachBCC.nambaocao == nambaocao),\
                                                        TienDoKeHoachBCC.tuyendonvi == 'tinh').first() 
    elif(currentuser.donvi.tuyendonvi_id ==3):
        records = db.session.query(TienDoKeHoachBCC).filter(and_(TienDoKeHoachBCC.quanhuyen_id == currentuser.donvi.quanhuyen_id, \
                                                        TienDoKeHoachBCC.loaikybaocao == loaikybaocao, \
                                                        TienDoKeHoachBCC.kybaocao == kybaocao, \
                                                        TienDoKeHoachBCC.nambaocao == nambaocao),\
                                                        TienDoKeHoachBCC.tuyendonvi == 'huyen').first()  
    elif(currentuser.donvi.tuyendonvi_id == 4):
        records = db.session.query(TienDoKeHoachBCC).filter(and_(TienDoKeHoachBCC.xaphuong_id == currentuser.donvi.xaphuong_id, \
                                                        TienDoKeHoachBCC.loaikybaocao == loaikybaocao, \
                                                        TienDoKeHoachBCC.kybaocao == kybaocao, \
                                                        TienDoKeHoachBCC.nambaocao == nambaocao),\
                                                        TienDoKeHoachBCC.tuyendonvi == 'xa').first()                                                                                                                                     
    if records is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Không tìm thấy báo cáo của các đơn vị, vui lòng kiểm tra lại"}, status=520)
    else:
        results = {}
        if records.tuyendonvi == "tinh":
            captinh = to_dict(records)
            baocao_children = get_baocao_bcc_tinhthanh(nambaocao, loaikybaocao, kybaocao, captinh['tinhthanh_id'])
            captinh["huyen"] = baocao_children 
            results = captinh
            
        elif records.tuyendonvi == 'huyen':
            caphuyen = to_dict(records)
            baocao_children = get_baocao_bcc_quanhuyen(nambaocao, loaikybaocao, kybaocao, caphuyen['quanhuyen_id'])
            caphuyen["xa"] = baocao_children
            results = caphuyen
            
        elif records.tuyendonvi == 'xa':
            capxa = to_dict(records)
            baocao_children = get_baocao_bcc_xaphuong(nambaocao, loaikybaocao, kybaocao, capxa['xaphuong_id'])
            capxa["thon"] = baocao_children   
            results = capxa
                
                
        return json(results)
    
def get_baocao_bcc_tinhthanh(nambaocao,loaikybaocao,kybaocao, tinhthanh_id):
    results = []
    records_huyen = db.session.query(TienDoKeHoachBCC).filter(and_(TienDoKeHoachBCC.tinhthanh_id == tinhthanh_id, \
                                                        TienDoKeHoachBCC.loaikybaocao == loaikybaocao, \
                                                        TienDoKeHoachBCC.kybaocao == kybaocao, \
                                                        TienDoKeHoachBCC.nambaocao == nambaocao),\
                                                        TienDoKeHoachBCC.tuyendonvi == 'huyen').all()
    if records_huyen is not None:
        for bc_huyen in records_huyen:
            bc_huyen = to_dict(bc_huyen)
            records_xaphuong = db.session.query(TienDoKeHoachBCC).filter(and_(TienDoKeHoachBCC.quanhuyen_id == bc_huyen['quanhuyen_id'], \
                                                        TienDoKeHoachBCC.loaikybaocao == loaikybaocao, \
                                                        TienDoKeHoachBCC.kybaocao == kybaocao, \
                                                        TienDoKeHoachBCC.nambaocao == nambaocao),\
                                                        TienDoKeHoachBCC.tuyendonvi == 'xa').all()
            if records_xaphuong is not None:
                for bc_xaphuong in records_xaphuong:
                    baocao_xaphuong = to_dict(bc_xaphuong)
                    records_thonxom = db.session.query(TienDoKeHoachBCC).filter(and_(TienDoKeHoachBCC.xaphuong_id == baocao_xaphuong['xaphuong_id'], \
                                                        TienDoKeHoachBCC.loaikybaocao == loaikybaocao, \
                                                        TienDoKeHoachBCC.kybaocao == kybaocao, \
                                                        TienDoKeHoachBCC.nambaocao == nambaocao),\
                                                        TienDoKeHoachBCC.tuyendonvi == 'thon').all()
                    if records_thonxom is not None:
                        for bc_thonxom in records_thonxom:
                            baocao_thonxom = to_dict(bc_thonxom)
                            baocao_xaphuong["thon"].append(baocao_thonxom)
                    else:
                        baocao_xaphuong["thon"]=[]
                    bc_huyen["xa"].append(baocao_xaphuong)
            else:
                bc_huyen["xa"] = []
            results.append(bc_huyen)
            
    return results

def get_baocao_bcc_quanhuyen(nambaocao,loaikybaocao,kybaocao, quanhuyen_id):
    results = []
    records_xaphuong = db.session.query(TienDoKeHoachBCC).filter(and_(TienDoKeHoachBCC.quanhuyen_id == quanhuyen_id, \
                                                TienDoKeHoachBCC.loaikybaocao == loaikybaocao, \
                                                TienDoKeHoachBCC.kybaocao == kybaocao, \
                                                TienDoKeHoachBCC.nambaocao == nambaocao),\
                                                TienDoKeHoachBCC.tuyendonvi == 'xa').all()
    if records_xaphuong is not None:
        for bc_xaphuong in records_xaphuong:
            baocao_xaphuong = to_dict(bc_xaphuong)
            records_thonxom = db.session.query(TienDoKeHoachBCC).filter(and_(TienDoKeHoachBCC.xaphuong_id == baocao_xaphuong['xaphuong_id'], \
                                                TienDoKeHoachBCC.loaikybaocao == loaikybaocao, \
                                                TienDoKeHoachBCC.kybaocao == kybaocao, \
                                                TienDoKeHoachBCC.nambaocao == nambaocao),\
                                                TienDoKeHoachBCC.tuyendonvi == 'thon').all()
            if records_thonxom is not None:
                for bc_thonxom in records_thonxom:
                    baocao_thonxom = to_dict(bc_thonxom)
                    baocao_xaphuong["thon"].append(baocao_thonxom)
            else:
                baocao_xaphuong["thon"]=[]
            results.append(baocao_xaphuong)
    else:
        results = []
            
    return results

def get_baocao_bcc_xaphuong(nambaocao,loaikybaocao,kybaocao, xaphuong_id):
    results = []
    records_thonxom = db.session.query(TienDoKeHoachBCC).filter(and_(TienDoKeHoachBCC.xaphuong_id == xaphuong_id, \
                                                TienDoKeHoachBCC.loaikybaocao == loaikybaocao, \
                                                TienDoKeHoachBCC.kybaocao == kybaocao, \
                                                TienDoKeHoachBCC.nambaocao == nambaocao),\
                                                TienDoKeHoachBCC.tuyendonvi == 'thon').all()
    if records_thonxom is not None:
        for bc_thonxom in records_thonxom:
            baocao_thonxom = to_dict(bc_thonxom)
            results.append(baocao_thonxom)
    else:
        results=[]
    return results


async def preprocess_kehoachbcc(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)

    if request.method == "POST" or request.method == "PUT":
        if "nambaocao" not in data or data["nambaocao"] is None:
            return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
        
        if "kybaocao" not in data or data["kybaocao"] is None or "tuyendonvi" not in data or data["tuyendonvi"] is None or "loaikybaocao" not in data or data["loaikybaocao"] is None:
            return json({"error_code":"PARAMS_ERROR", "error_message":"Tham số không hợp lệ, vui lòng kiểm tra lại"}, status=520)
    
        record = db.session.query(TienDoKeHoachBCC).filter(and_(TienDoKeHoachBCC.donvi_id == currentuser.donvi_id,\
                                                                TienDoKeHoachBCC.loaikybaocao == data['loaikybaocao'], \
                                                                TienDoKeHoachBCC.kybaocao == data['kybaocao'], \
                                                                TienDoKeHoachBCC.nambaocao == data['nambaocao'],
                                                                TienDoKeHoachBCC.tuyendonvi == data['tuyendonvi'])).first()
                                                                
        if record is not None and request.method == "POST":
            return json({"error_code":"PARAMS_ERROR", "error_message":"Báo cáo năm của đơn vị hiện tại đã được tạo, vui lòng kiểm tra lại"}, status=520)
        
        if record is None and request.method == "PUT":
            return json({"error_code":"PARAMS_ERROR", "error_message":"Không tìm thấy báo cáo, vui lòng kiểm tra lại"}, status=520)
        elif record is not None and str(record.id) != data['id']:
            return json({"error_code":"PARAMS_ERROR", "error_message":"Báo cáo của năm đã tồn tại, vui lòng kiểm tra lại"}, status=520)
        
        
        baocao_donvicon = db.session.query(TienDoKeHoachBCC).filter(and_(TienDoKeHoachBCC.donvi_id == currentuser.donvi.captren_id,\
                                                            TienDoKeHoachBCC.loaikybaocao == data['loaikybaocao'], \
                                                            TienDoKeHoachBCC.kybaocao == data['kybaocao'], \
                                                            TienDoKeHoachBCC.nambaocao == data['nambaocao'],
                                                            TienDoKeHoachBCC.tuyendonvi == data['tuyendonvi'])).first()
        tongsogiangvien = 0
        tongsogiangvien_nu = 0
#         tongsonguoithamgia =0
#         tongsonguoithamgia_nu =0
#         tongsonguoithamgia_dtts =0
        if  baocao_donvicon is not None:
            for donvicon in baocao_donvicon:
                tongsogiangvien += donvicon.giangvien
                tongsogiangvien_nu += donvicon.giangvien_nu
        
        data['tongsogiangvien'] = tongsogiangvien + data["giangvien"]
        data['tongsogiangvien_nu'] = tongsogiangvien_nu + data["giangvien_nu"]
                                 
        
        data['tinhtrang'] = TinhTrangBaocaoEnum.taomoi
        data['donvi_id'] = currentuser.donvi_id
        data['nguoibaocao_id'] = currentuser.id


@app.route('/api/v1/danhmuchoatdongbcc')
async def getDanhmuchoatdong(request):
    loai_hoatdong = request.args.get("loai_hoatdong", None)
    danhmuclist = DanhMucHoatDong.query.filter(DanhMucHoatDong.loai_hoatdong == loai_hoatdong).all()
    return json(to_dict(danhmuclist),status=200)
   

async def prepost_put_danhmuchoatdong(request=None, data=None, Model=None, **kw):
    if "stt" in data:
        del data['stt']
    objects_danhmuc = ['dantoc','thonxom', 'xaphuong', 'quocgia', 'tinhthanh', 'quanhuyen', 'nganh']
    for obj in objects_danhmuc:
        if obj in data and "stt" in data[obj]:
            del data[obj]['stt']


async def postprocess_add_stt(request=None, Model=None, result=None, **kw):
    if result is not None and "objects" in result:
        objects = to_dict(result["objects"])
        datas = []
        i =1
        page = request.args.get("page",None)
        results_per_page = request.args.get("results_per_page",None)
        if page is not None and results_per_page is not None and int(page) != 1:
            i = i + int(results_per_page)*int(page)
        for obj in objects:
            if obj is not None:
                obj_tmp = to_dict(obj)
                obj_tmp["stt"] = i
                i = i +1
                datas.append(obj_tmp)
        result = datas

apimanager.create_api(DanhMucHoatDong,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func, prepost_put_danhmuchoatdong], PUT_SINGLE=[auth_func, prepost_put_danhmuchoatdong], DELETE_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[postprocess_add_stt]),
    collection_name='danhmuchoatdong')

 
apimanager.create_api(TienDoKeHoachBCC,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(
        GET_SINGLE=[auth_func],
        GET_MANY=[auth_func],
        POST=[auth_func, preprocess_kehoachbcc],
        PUT_SINGLE=[auth_func, preprocess_kehoachbcc],
        DELETE_SINGLE=[auth_func]),
    collection_name='tiendo_kehoach_bcc')

# apimanager.create_api(Gioi_Dantoc_ThieuSo,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='gioi_dantoc_thieuso')




@app.route('api/v1/gioi_dantocthieuso', methods=['GET'])
async def ThongKe_Gioi_DanTocThieuSo(request):
    nambaocao = request.args.get("nambaocao", None)
    loaikybaocao = request.args.get("loaikybaocao", None)
    kybaocao = request.args.get("kybaocao", None)
    tinhthanh_id = request.args.get("tinhthanh_id", None)
    
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    if "loaikybaocao" is None or "kybaocao" is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Kỳ báo cáo không hợp lệ"}, status=520)
    if "nambaocao" is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    records = None
    if(currentuser.donvi.tuyendonvi_id ==1):
        if tinhthanh_id is None or tinhthanh_id == "undefined" or tinhthanh_id == "":
            return json({"error_code":"PARAMS_ERROR", "error_message":"Vui lòng chọn thông tin tỉnh thành!"}, status=520)

        records = db.session.query(TienDoKeHoachBCC).filter(and_(TienDoKeHoachBCC.tinhthanh_id == tinhthanh_id, \
                                                        TienDoKeHoachBCC.loaikybaocao == loaikybaocao, \
                                                        TienDoKeHoachBCC.kybaocao == kybaocao, \
                                                        TienDoKeHoachBCC.nambaocao == nambaocao))
    elif(currentuser.donvi.tuyendonvi_id ==2):
        records = db.session.query(TienDoKeHoachBCC).filter(and_(TienDoKeHoachBCC.tinhthanh_id == currentuser.donvi.tinhthanh_id, \
                                                        TienDoKeHoachBCC.loaikybaocao == loaikybaocao, \
                                                        TienDoKeHoachBCC.kybaocao == kybaocao, \
                                                        TienDoKeHoachBCC.nambaocao == nambaocao))
    elif(currentuser.donvi.tuyendonvi_id ==3):
        records = db.session.query(TienDoKeHoachBCC).filter(and_(TienDoKeHoachBCC.quanhuyen_id == currentuser.donvi.quanhuyen_id, \
                                                        TienDoKeHoachBCC.loaikybaocao == loaikybaocao, \
                                                        TienDoKeHoachBCC.kybaocao == kybaocao, \
                                                        TienDoKeHoachBCC.nambaocao == nambaocao))  
    elif(currentuser.donvi.tuyendonvi_id == 4):
        records = db.session.query(TienDoKeHoachBCC).filter(and_(TienDoKeHoachBCC.xaphuong_id == currentuser.donvi.xaphuong_id, \
                                                        TienDoKeHoachBCC.loaikybaocao == loaikybaocao, \
                                                        TienDoKeHoachBCC.kybaocao == kybaocao, \
                                                        TienDoKeHoachBCC.nambaocao == nambaocao))                                                                                                                                     
    if records is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Không tìm thấy báo cáo của các đơn vị, vui lòng kiểm tra lại"}, status=520)
    else:
        ds_nganh = Nganh.query.filter().order_by(Nganh.thutu).all()
        if ds_nganh is None or len(ds_nganh) == 0:
            return json({
                "error_code": "NOT_FOUND",
                "error_message": "Chưa thiết lập danh mục ngành"
            }, status=520)
        
        result = {}
        result['danhsachnganh'] =[]
        
        tongnguoi_duocdaotao = 0
        tongnguoi_thamgia_nu = 0
        tongnguoi_dantocthieuso = 0
        tong_giangvien = 0
        tong_giangvien_nu = 0
        
        check_nganh = True
        for nganh in ds_nganh:
            nganh = to_dict(nganh)
            
            tongnguoi_duocdaotao_nganh = 0
            tongnguoi_thamgia_nu_nganh = 0
            tongnguoi_dantocthieuso_nganh = 0
#             tong_giangvien_nganh = 0
#             tong_giangvien_nu_nganh = 0
            
            data_in_nganh = {
                'manganh': nganh['manganh'],
                'tennganh': nganh['tennganh'],
#                 'data': {}
            }
#             hoatdongbccs = records.filter(TienDoKeHoachBCC.nganh_id == nganh['id'])
#             hoatdongbccs = hoatdongbccs.all()
            hoatdongbccs = records.all()
            for _ in hoatdongbccs:
                baocao = to_dict(_)
                if check_nganh == True:
                    tong_giangvien += int(baocao["giangvien"]) if "giangvien" in baocao and baocao["giangvien"] is not None else 0
                    tong_giangvien_nu += int(baocao["giangvien_nu"]) if "giangvien_nu" in baocao and baocao["giangvien_nu"] is not None else 0
                            
                if 'danhsach_hoatdong' in baocao and isinstance(baocao['danhsach_hoatdong'], list):
#                     tong_giangvien_nganh += int(baocao["giangvien"]) if "giangvien" in baocao and baocao["giangvien"] is not None else 0
#                     tong_giangvien_nu_nganh += int(baocao["giangvien_nu"]) if "giangvien_nu" in baocao and baocao["giangvien_nu"] is not None else 0
                    for hoatdong in baocao['danhsach_hoatdong']:
                        if hoatdong['nganh_id'] == nganh['id']:
                            
                            tongnguoi_duocdaotao_nganh += int(hoatdong['songuoithamgia']) if 'songuoithamgia' in hoatdong and hoatdong['songuoithamgia'] is not None else 0
                            tongnguoi_thamgia_nu_nganh += int(hoatdong['songuoithamgia_nu']) if 'songuoithamgia_nu' in hoatdong and hoatdong['songuoithamgia_nu'] is not None else 0
                            tongnguoi_dantocthieuso_nganh += int(hoatdong['songuoithamgia_dtts']) if 'songuoithamgia_dtts' in hoatdong and hoatdong['songuoithamgia_dtts'] is not None else 0
#             thongke = {}
            check_nganh = False    
            data_in_nganh["tongnguoi_duocdaotao"] = int(tongnguoi_duocdaotao_nganh)
            data_in_nganh["tongnguoi_thamgia_nu"] = int(tongnguoi_thamgia_nu_nganh)
            data_in_nganh["tongnguoi_dantocthieuso"] = int(tongnguoi_dantocthieuso_nganh)
#             data_in_nganh["tong_giangvien"] = int(tong_giangvien_nganh)
#             data_in_nganh["tong_giangvien_nu"] = int(tong_giangvien_nu_nganh)
#             data_in_nganh["data"] = thongke
            tongnguoi_duocdaotao += tongnguoi_duocdaotao_nganh
            tongnguoi_thamgia_nu += tongnguoi_thamgia_nu_nganh
            tongnguoi_dantocthieuso += tongnguoi_dantocthieuso_nganh
            
            result["danhsachnganh"].append(data_in_nganh)
        
        result["tongnguoi_duocdaotao"] = tongnguoi_duocdaotao
        result["tongnguoi_thamgia_nu"] = tongnguoi_thamgia_nu
        result["tongnguoi_dantocthieuso"] = tongnguoi_dantocthieuso
        result["tong_giangvien"] = tong_giangvien
        result["tong_giangvien_nu"] = tong_giangvien_nu
            
        return json(result)
    


@app.route("api/v1/hoatdongbcc/baocao", methods=['GET'])
async def baocao_theo_cap(request):
    
    nambaocao = request.args.get('nambaocao', None)
    kydanhgia = request.args.get('kydanhgia', None)
    loaikybaocao = request.args.get('loaikybaocao', None)
    tinhthanh = request.args.get('tinhthanh', None)
    quanhuyen = request.args.get('quanhuyen', None)
    xaphuong = request.args.get('xaphuong', None)
    thonxom = request.args.get('thonxom', None)
    
    if nambaocao is None:
        return json({
            "error_code": "PARAM_ERROR",
            "error_message": "Vui lòng nhập năm báo cáo"
        }, status=520)
    if tinhthanh is None:
        return json({
            "error_code": "PARAM_ERROR",
            "error_message": "Vui lòng chọn thông tin tỉnh thành"
        }, status=520)
        
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    # TÌM KIẾM TẤT CẢ NGÀNH
    ds_nganh = Nganh.query.filter().order_by(Nganh.thutu).all()
    
    if ds_nganh is None or len(ds_nganh) == 0:
        return json({
            "error_code": "NOT_FOUND",
            "error_message": "Chưa thiết lập danh mục ngành"
        }, status=520)
        
    # OBJECT DATA OF REPORT
    
    tongsonguoithamgia = 0
    tongsonguoithamgia_nu = 0
    tongsonguoithamgia_dtts = 0
    baocao_data = TienDoKeHoachBCC.query.filter(and_(TienDoKeHoachBCC.nambaocao == nambaocao,\
                                                          TienDoKeHoachBCC.kybaocao == kydanhgia,\
                                                          TienDoKeHoachBCC.loaikybaocao == loaikybaocao))
    tuyendonvi = currentuser.donvi.tuyendonvi_id
    if tinhthanh is not None:
        baocao_data = baocao_data.filter(TienDoKeHoachBCC.tinhthanh_id == tinhthanh)
        tuyendonvi = 2
    
    if quanhuyen is not None:
        baocao_data = baocao_data.filter(TienDoKeHoachBCC.quanhuyen_id == quanhuyen)
        tuyendonvi = 3
        
    if xaphuong is not None:
        baocao_data = baocao_data.filter(TienDoKeHoachBCC.xaphuong_id == xaphuong)
        tuyendonvi = 4
       
    result_baocao = None    
    if tuyendonvi == 2:
        result_baocao = baocao_data.filter(TienDoKeHoachBCC.tuyendonvi == "tinh").first()
    elif tuyendonvi == 3:
        result_baocao = baocao_data.filter(TienDoKeHoachBCC.tuyendonvi == "huyen").first()
    elif tuyendonvi == 4:
        result_baocao = baocao_data.filter(TienDoKeHoachBCC.tuyendonvi == "xa").first()
#     if thonxom is not None:
#         baocao_data = baocao_data.filter(TienDoKeHoachBCC.thonxom_id == thonxom)
    
    if result_baocao is None:
        return json({
            "error_code": "NOT_FOUND",
            "error_message": "Không tìm thấy báo cáo của đơn vị"
        }, status=520)
    result = to_dict(result_baocao)
    result['danhsachnganh'] =[]
    for nganh in ds_nganh:
        nganh = to_dict(nganh)
        
        data_in_nganh = {
            'manganh': nganh['manganh'],
            'tennganh': nganh['tennganh'],
            'tuyendonvis': []
        }
#         hoatdongbccs = baocao_data.filter(TienDoKeHoachBCC.nganh_id == nganh['id'])

        
        hoatdongbccs = baocao_data.all()

        tinh = {
            'tuyen': 'Hoat động cấp tỉnh',
            "hoatdong":[]
        }
        huyen = {
            'tuyen': 'Hoạt động cấp huyện',
            "hoatdong":[]
        }
        xa = {
            'tuyen': 'Hoạt động cấp xã',
            "hoatdong":[]
        }
        thon = {
            'tuyen': 'Hoạt động cấp thôn',
            "hoatdong":[]
        }
        other = {
            'tuyen': 'Hoạt động khác',
            "hoatdong":[]
        }
        if hoatdongbccs is not None and isinstance(hoatdongbccs, list):
            for _ in hoatdongbccs:
                _ = to_dict(_)
                if _['tuyendonvi'] == 'tinh':
                    if 'danhsach_hoatdong' in _ and isinstance(_['danhsach_hoatdong'], list):
                        for hoatdong in _['danhsach_hoatdong']:
                            if hoatdong['nganh_id'] == nganh['id']:
                                tongsonguoithamgia += int(hoatdong['songuoithamgia']) if 'songuoithamgia' in hoatdong and hoatdong['songuoithamgia'] is not None else 0
                                tongsonguoithamgia_nu += int(hoatdong['songuoithamgia_nu']) if 'songuoithamgia_nu' in hoatdong and hoatdong['songuoithamgia_nu'] is not None else 0
                                tongsonguoithamgia_dtts += int(hoatdong['songuoithamgia_dtts']) if 'songuoithamgia_dtts' in hoatdong and hoatdong['songuoithamgia_dtts'] is not None else 0
                                flag = True
                                for i in range(len(tinh['hoatdong'])):
                                    hd = tinh['hoatdong'][i]
                                    if hoatdong['id'] == hd['id']:
                                        flag == False
                                        hoatdong['songuoithamgia'] += int(hd['songuoithamgia']) if 'songuoithamgia' in hd and hd['songuoithamgia'] is not None else 0
                                        hoatdong['songuoithamgia_nu'] += int(hd['songuoithamgia_nu']) if 'songuoithamgia_nu' in hd and hd['songuoithamgia_nu'] is not None else 0
                                        hoatdong['songuoithamgia_dtts'] += int(hd['songuoithamgia_dtts']) if 'songuoithamgia_dtts' in hd and hd['songuoithamgia_dtts'] is not None else 0
                                        tinh['hoatdong'][i] = hoatdong
                                if flag == True:
                                    tinh['hoatdong'].append(hoatdong)
                    
                elif _['tuyendonvi'] == 'huyen':
                    if 'danhsach_hoatdong' in _ and isinstance(_['danhsach_hoatdong'], list):
                        for hoatdong in _['danhsach_hoatdong']:
                            if hoatdong['nganh_id'] == nganh['id']:
                                tongsonguoithamgia += int(hoatdong['songuoithamgia']) if 'songuoithamgia' in hoatdong and hoatdong['songuoithamgia'] is not None else 0
                                tongsonguoithamgia_nu += int(hoatdong['songuoithamgia_nu']) if 'songuoithamgia_nu' in hoatdong and hoatdong['songuoithamgia_nu'] is not None else 0
                                tongsonguoithamgia_dtts += int(hoatdong['songuoithamgia_dtts']) if 'songuoithamgia_dtts' in hoatdong and hoatdong['songuoithamgia_dtts'] is not None else 0
                                
                                flag = True
                                for i in range(len(huyen['hoatdong'])):
                                    hd = huyen['hoatdong'][i]
                                    if hoatdong['id'] == hd['id']:
                                        flag == False
                                        hoatdong['songuoithamgia'] += int(hd['songuoithamgia']) if 'songuoithamgia' in hd and hd['songuoithamgia'] is not None else 0
                                        hoatdong['songuoithamgia_nu'] += int(hd['songuoithamgia_nu']) if 'songuoithamgia_nu' in hd and hd['songuoithamgia_nu'] is not None else 0
                                        hoatdong['songuoithamgia_dtts'] += int(hd['songuoithamgia_dtts']) if 'songuoithamgia_dtts' in hd and hd['songuoithamgia_dtts'] is not None else 0
                                        huyen['hoatdong'][i] = hoatdong
                                        
                                if flag == True:
                                    huyen['hoatdong'].append(hoatdong)
                        
                elif _['tuyendonvi'] == 'xa':
                    if 'danhsach_hoatdong' in _ and isinstance(_['danhsach_hoatdong'], list):
                        for hoatdong in _['danhsach_hoatdong']:
                            if hoatdong['nganh_id'] == nganh['id']:
                                tongsonguoithamgia += int(hoatdong['songuoithamgia']) if 'songuoithamgia' in hoatdong and hoatdong['songuoithamgia'] is not None else 0
                                tongsonguoithamgia_nu += int(hoatdong['songuoithamgia_nu']) if 'songuoithamgia_nu' in hoatdong and hoatdong['songuoithamgia_nu'] is not None else 0
                                tongsonguoithamgia_dtts += int(hoatdong['songuoithamgia_dtts']) if 'songuoithamgia_dtts' in hoatdong and hoatdong['songuoithamgia_dtts'] is not None else 0
                                
                                flag = True
                                for i in range(len(xa['hoatdong'])):
                                    hd = xa['hoatdong'][i]
                                    if hoatdong['id'] == hd['id']:
                                        flag == False
                                        hoatdong['songuoithamgia'] += int(hd['songuoithamgia']) if 'songuoithamgia' in hd and hd['songuoithamgia'] is not None else 0
                                        hoatdong['songuoithamgia_nu'] += int(hd['songuoithamgia_nu']) if 'songuoithamgia_nu' in hd and hd['songuoithamgia_nu'] is not None else 0
                                        hoatdong['songuoithamgia_dtts'] += int(hd['songuoithamgia_dtts']) if 'songuoithamgia_dtts' in hd and hd['songuoithamgia_dtts'] is not None else 0
                                        xa['hoatdong'][i] = hoatdong
                                        
                                if flag == True:
                                    xa['hoatdong'].append(hoatdong)
                    
                    
                else:
                    if 'tuyen' not in other or other['tuyen'] is None:
                        other['tuyen'] = 'Khác'
                    
                    if 'danhsach_hoatdong' in _ and isinstance(_['danhsach_hoatdong'], list):
                        for hoatdong in _['danhsach_hoatdong']:
                            if hoatdong['nganh_id'] == nganh['id']:
                                flag = True
                                for i in range(len(other['hoatdong'])):
                                    hd = other['hoatdong'][i]
                                    print("other.hoatdong===",hd)
                                    if hd is not None and "id" in hd and hoatdong['id'] == hd['id']:
                                        flag == False
                                        hoatdong['songuoithamgia'] += int(hd['songuoithamgia']) if 'songuoithamgia' in hd and hd['songuoithamgia'] is not None else 0
                                        hoatdong['songuoithamgia_nu'] += int(hd['songuoithamgia_nu']) if 'songuoithamgia_nu' in hd and hd['songuoithamgia_nu'] is not None else 0
                                        hoatdong['songuoithamgia_dtts'] += int(hd['songuoithamgia_dtts']) if 'songuoithamgia_dtts' in hd and hd['songuoithamgia_dtts'] is not None else 0
                                        other['hoatdong'][i] = hoatdong
                                if flag == True:
                                    other['hoatdong'].append({
                                        'songuoithamgia': int(hoatdong['songuoithamgia']) if 'songuoithamgia' in hoatdong and hoatdong['songuoithamgia'] is not None else 0,
                                        'songuoithamgia_nu': int(hoatdong['songuoithamgia_nu']) if 'songuoithamgia_nu' in hoatdong and hoatdong['songuoithamgia_nu'] is not None else 0,
                                        'songuoithamgia_dtts': int(hoatdong['songuoithamgia_dtts']) if 'songuoithamgia_dtts' in hoatdong and hoatdong['songuoithamgia_dtts'] is not None else 0
                                    })
        
        
        if(tuyendonvi == 2):
            thon['hoatdong'] = await congdon_baocao_bcc(baocao_data, thon["hoatdong"], "thon")
            xa['hoatdong'] = await congdon_baocao_bcc(baocao_data, xa["hoatdong"], "xa")
            huyen['hoatdong'] = await congdon_baocao_bcc(baocao_data, huyen["hoatdong"], "huyen")

            data_in_nganh['tuyendonvis'] = [tinh, huyen, xa, thon]
        elif tuyendonvi ==3:
            xa['hoatdong'] = await congdon_baocao_bcc(baocao_data, xa["hoatdong"], "xa")
            thon['hoatdong'] = await congdon_baocao_bcc(baocao_data, thon["hoatdong"], "thon")

            data_in_nganh['tuyendonvis'] = [huyen, xa, thon]
        elif tuyendonvi ==4:
            thon['hoatdong'] = await congdon_baocao_bcc(nambaocao, loaikybaocao, kydanhgia, result["xaphuong_id"], thon["hoatdong"], "thon")

            data_in_nganh['tuyendonvis'] = [xa, thon]
            
        result['tongsonguoithamgia'] = tongsonguoithamgia
        result['tongsonguoithamgia_nu'] = tongsonguoithamgia_nu
        result['tongsonguoithamgia_dtts'] = tongsonguoithamgia_dtts
        
        result['danhsachnganh'].append(data_in_nganh)


    return json(result)

async def congdon_baocao_bcc(baocao_data, danhsachhoatdong, tuyendonvi):
    baocao_hoatdong = baocao_data.filter(TienDoKeHoachBCC.tuyendonvi == tuyendonvi).all()
                    
#     if (tuyendonvi == "thon"):
#         baocao_hoatdong = baocao_hoatdong.filter(TienDoKeHoachBCC.xaphuong_id == parent_id).all()       
#     elif (tuyendonvi == "xa"):
#         baocao_hoatdong = baocao_hoatdong.filter(TienDoKeHoachBCC.quanhuyen_id == parent_id).all()       
#     elif (tuyendonvi == "huyen"):
#         baocao_hoatdong = baocao_hoatdong.filter(TienDoKeHoachBCC.tinhthanh_id == parent_id).all()       
    
    
    ds_nganh = Nganh.query.filter().order_by(Nganh.thutu).all()
    if ds_nganh is not None:
        for nganh in ds_nganh:
            nganh = to_dict(nganh)
            if baocao_hoatdong is not None:
                for bc in baocao_hoatdong:
                    bc = to_dict(bc)
                    if 'danhsach_hoatdong' in bc and isinstance(bc['danhsach_hoatdong'], list):
                        for hoatdong in bc['danhsach_hoatdong']:
                            if hoatdong['nganh_id'] == nganh['id']:
                                flag = True
                                for i in range(len(danhsachhoatdong)):
                                    hd = danhsachhoatdong[i]
                                    if hoatdong['id'] == hd['id']:
                                        flag == False
                                        hoatdong['songuoithamgia'] += int(hd['songuoithamgia']) if 'songuoithamgia' in hd and hd['songuoithamgia'] is not None else 0
                                        hoatdong['songuoithamgia_nu'] += int(hd['songuoithamgia_nu']) if 'songuoithamgia_nu' in hd and hd['songuoithamgia_nu'] is not None else 0
                                        hoatdong['songuoithamgia_dtts'] += int(hd['songuoithamgia_dtts']) if 'songuoithamgia_dtts' in hd and hd['songuoithamgia_dtts'] is not None else 0
                                        danhsachhoatdong[i] = hoatdong
                                        break
                                        
                                if flag == True:
                                    danhsachhoatdong.append(hoatdong)
    
    return danhsachhoatdong
    
    
    

