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
   

apimanager.create_api(DanhMucHoatDong,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
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
    tuyendonvi = 2#cap tinh
    if tinhthanh is not None:
        baocao_data = baocao_data.filter(TienDoKeHoachBCC.tinhthanh_id == tinhthanh)
        tuyendonvi = 2
    
    if quanhuyen is not None:
        baocao_data = baocao_data.filter(TienDoKeHoachBCC.quanhuyen_id == quanhuyen)
        tuyendonvi = 3
        
    if xaphuong is not None:
        baocao_data = baocao_data.filter(TienDoKeHoachBCC.xaphuong_id == xaphuong)
        tuyendonvi = 4
#     if thonxom is not None:
#         baocao_data = baocao_data.filter(TienDoKeHoachBCC.thonxom_id == thonxom)
    
    result_baocao = baocao_data.first()
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
            'tuyen': 'Hoat động cấp tỉnh'
        }
        huyen = {
            'tuyen': 'Hoạt động cấp huyện'
        }
        xa = {
            'tuyen': 'Hoạt động cấp xã'
        }
        thon = {
            'tuyen': 'Hoạt động cấp thôn'
        }
        other = {}
        if hoatdongbccs is not None and isinstance(hoatdongbccs, list):
            for _ in hoatdongbccs:
                _ = to_dict(_)
                if _['tuyendonvi'] == 'tinh':
                    if 'hoatdong' not in tinh or tinh['hoatdong'] is None:
                        tinh['hoatdong'] = []
                    
                    if 'danhsach_hoatdong' in _ and isinstance(_['danhsach_hoatdong'], list):
                        for hoatdong in _['danhsach_hoatdong']:
                            if hoatdong['nganh_id'] == nganh['id']:
                                tongsonguoithamgia += int(hoatdong['songuoithamgia']) if 'songuoithamgia' in hoatdong and hoatdong['songuoithamgia'] is not None else 0
                                tongsonguoithamgia_nu += int(hoatdong['songuoithamgia_nu']) if 'songuoithamgia_nu' in hoatdong and hoatdong['songuoithamgia_nu'] is not None else 0
                                tongsonguoithamgia_dtts += int(hoatdong['songuoithamgia_dtts']) if 'songuoithamgia_dtts' in hoatdong and hoatdong['songuoithamgia_dtts'] is not None else 0
                                flag = True
                                for hoatdongtinh in tinh['hoatdong']:
                                    if hoatdong['id'] == hoatdongtinh['id']:
                                        flag == False
                                        hoatdongtinh['songuoithamgia'] += int(hoatdong['songuoithamgia']) if 'songuoithamgia' in hoatdong and hoatdong['songuoithamgia'] is not None else 0
                                        hoatdongtinh['songuoithamgia_nu'] += int(hoatdong['songuoithamgia_nu']) if 'songuoithamgia_nu' in hoatdong and hoatdong['songuoithamgia_nu'] is not None else 0
                                        hoatdongtinh['songuoithamgia_dtts'] += int(hoatdong['songuoithamgia_dtts']) if 'songuoithamgia_dtts' in hoatdong and hoatdong['songuoithamgia_dtts'] is not None else 0
                            
                                if flag == True:
                                    tinh['hoatdong'].append(hoatdong)
                    
                elif _['tuyendonvi'] == 'huyen':
                    if 'hoatdong' not in huyen or huyen['hoatdong'] is None:
                        huyen['hoatdong'] = []
                    
                    if 'danhsach_hoatdong' in _ and isinstance(_['danhsach_hoatdong'], list):
                        for hoatdong in _['danhsach_hoatdong']:
                            if hoatdong['nganh_id'] == nganh['id']:
                                tongsonguoithamgia += int(hoatdong['songuoithamgia']) if 'songuoithamgia' in hoatdong and hoatdong['songuoithamgia'] is not None else 0
                                tongsonguoithamgia_nu += int(hoatdong['songuoithamgia_nu']) if 'songuoithamgia_nu' in hoatdong and hoatdong['songuoithamgia_nu'] is not None else 0
                                tongsonguoithamgia_dtts += int(hoatdong['songuoithamgia_dtts']) if 'songuoithamgia_dtts' in hoatdong and hoatdong['songuoithamgia_dtts'] is not None else 0
                                
                                flag = True
                                for hoatdongtinh in huyen['hoatdong']:
                                    if hoatdong['id'] == hoatdongtinh['id']:
                                        flag == False
                                        hoatdongtinh['songuoithamgia'] += int(hoatdong['songuoithamgia']) if 'songuoithamgia' in hoatdong and hoatdong['songuoithamgia'] is not None else 0
                                        hoatdongtinh['songuoithamgia_nu'] += int(hoatdong['songuoithamgia_nu']) if 'songuoithamgia_nu' in hoatdong and hoatdong['songuoithamgia_nu'] is not None else 0
                                        hoatdongtinh['songuoithamgia_dtts'] += int(hoatdong['songuoithamgia_dtts']) if 'songuoithamgia_dtts' in hoatdong and hoatdong['songuoithamgia_dtts'] is not None else 0
                            
                                if flag == True:
                                    huyen['hoatdong'].append(hoatdong)
                        
                elif _['tuyendonvi'] == 'xa':
                    if 'hoatdong' not in xa or xa['hoatdong'] is None:
                        xa['hoatdong'] = []
                    
                    if 'danhsach_hoatdong' in _ and isinstance(_['danhsach_hoatdong'], list):
                        for hoatdong in _['danhsach_hoatdong']:
                            if hoatdong['nganh_id'] == nganh['id']:
                                tongsonguoithamgia += int(hoatdong['songuoithamgia']) if 'songuoithamgia' in hoatdong and hoatdong['songuoithamgia'] is not None else 0
                                tongsonguoithamgia_nu += int(hoatdong['songuoithamgia_nu']) if 'songuoithamgia_nu' in hoatdong and hoatdong['songuoithamgia_nu'] is not None else 0
                                tongsonguoithamgia_dtts += int(hoatdong['songuoithamgia_dtts']) if 'songuoithamgia_dtts' in hoatdong and hoatdong['songuoithamgia_dtts'] is not None else 0
                                
                                flag = True
                                for hoatdongtinh in xa['hoatdong']:
                                    if hoatdong['id'] == hoatdongtinh['id']:
                                        flag == False
                                        hoatdongtinh['songuoithamgia'] += int(hoatdong['songuoithamgia']) if 'songuoithamgia' in hoatdong and hoatdong['songuoithamgia'] is not None else 0
                                        hoatdongtinh['songuoithamgia_nu'] += int(hoatdong['songuoithamgia_nu']) if 'songuoithamgia_nu' in hoatdong and hoatdong['songuoithamgia_nu'] is not None else 0
                                        hoatdongtinh['songuoithamgia_dtts'] += int(hoatdong['songuoithamgia_dtts']) if 'songuoithamgia_dtts' in hoatdong and hoatdong['songuoithamgia_dtts'] is not None else 0
                            
                                if flag == True:
                                    xa['hoatdong'].append(hoatdong)
                    
                elif _['tuyendonvi'] == 'thon':
                    if 'hoatdong' not in thon or thon['hoatdong'] is None:
                        thon['hoatdong'] = []

                    if 'danhsach_hoatdong' in _ and isinstance(_['danhsach_hoatdong'], list):
                        for hoatdong in _['danhsach_hoatdong']:
                            if hoatdong['nganh_id'] == nganh['id']:
                                tongsonguoithamgia += int(hoatdong['songuoithamgia']) if 'songuoithamgia' in hoatdong and hoatdong['songuoithamgia'] is not None else 0
                                tongsonguoithamgia_nu += int(hoatdong['songuoithamgia_nu']) if 'songuoithamgia_nu' in hoatdong and hoatdong['songuoithamgia_nu'] is not None else 0
                                tongsonguoithamgia_dtts += int(hoatdong['songuoithamgia_dtts']) if 'songuoithamgia_dtts' in hoatdong and hoatdong['songuoithamgia_dtts'] is not None else 0
                                
                                flag = True
                                for hoatdongtinh in thon['hoatdong']:
                                    if hoatdong['id'] == hoatdongtinh['id']:
                                        flag == False
                                        hoatdongtinh['songuoithamgia'] += int(hoatdong['songuoithamgia']) if 'songuoithamgia' in hoatdong and hoatdong['songuoithamgia'] is not None else 0
                                        hoatdongtinh['songuoithamgia_nu'] += int(hoatdong['songuoithamgia_nu']) if 'songuoithamgia_nu' in hoatdong and hoatdong['songuoithamgia_nu'] is not None else 0
                                        hoatdongtinh['songuoithamgia_dtts'] += int(hoatdong['songuoithamgia_dtts']) if 'songuoithamgia_dtts' in hoatdong and hoatdong['songuoithamgia_dtts'] is not None else 0
                            
                                if flag == True:
                                    thon['hoatdong'].append(hoatdong)
                else:
                    if 'tuyen' not in other or other['tuyen'] is None:
                        other['tuyen'] = 'Khác'
                    
                    if 'hoatdong' not in other or other['hoatdong'] is None:
                        other['hoatdong'] = []
                    
                    if 'danhsach_hoatdong' in _ and isinstance(_['danhsach_hoatdong'], list):
                        for hoatdong in _['danhsach_hoatdong']:
                            if hoatdong['nganh_id'] == nganh['id']:
                                flag = True
                                for hoatdongtinh in other['hoatdong']:
                                    if hoatdong['id'] == hoatdongtinh['id']:
                                        flag == False
                                        hoatdongtinh['songuoithamgia'] += int(hoatdong['songuoithamgia']) if 'songuoithamgia' in hoatdong and hoatdong['songuoithamgia'] is not None else 0
                                        hoatdongtinh['songuoithamgia_nu'] += int(hoatdong['songuoithamgia_nu']) if 'songuoithamgia_nu' in hoatdong and hoatdong['songuoithamgia_nu'] is not None else 0
                                        hoatdongtinh['songuoithamgia_dtts'] += int(hoatdong['songuoithamgia_dtts']) if 'songuoithamgia_dtts' in hoatdong and hoatdong['songuoithamgia_dtts'] is not None else 0
                            
                                if flag == True:
                                    other['hoatdong'].append({
                                        'songuoithamgia': int(hoatdong['songuoithamgia']) if 'songuoithamgia' in hoatdong and hoatdong['songuoithamgia'] is not None else 0,
                                        'songuoithamgia_nu': int(hoatdong['songuoithamgia_nu']) if 'songuoithamgia_nu' in hoatdong and hoatdong['songuoithamgia_nu'] is not None else 0,
                                        'songuoithamgia_dtts': int(hoatdong['songuoithamgia_dtts']) if 'songuoithamgia_dtts' in hoatdong and hoatdong['songuoithamgia_dtts'] is not None else 0
                                    })
        
        if(tuyendonvi == 2):
            data_in_nganh['tuyendonvis'] = [tinh, huyen, xa, thon]
        elif tuyendonvi ==3:
            data_in_nganh['tuyendonvis'] = [huyen, xa, thon]
        elif tuyendonvi ==4:
            data_in_nganh['tuyendonvis'] = [xa, thon]
            
        result['tongsonguoithamgia'] = tongsonguoithamgia
        result['tongsonguoithamgia_nu'] = tongsonguoithamgia_nu
        result['tongsonguoithamgia_dtts'] = tongsonguoithamgia_dtts
        
        result['danhsachnganh'].append(data_in_nganh)


    return json(result)
    
    
    
    

