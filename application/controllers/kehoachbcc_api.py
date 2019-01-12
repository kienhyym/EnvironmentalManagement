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
from application.models.model_user import TinhTrangBaocaoEnum
from .helpers import *
from sqlalchemy import or_
from application.client import HTTPClient


async def preprocess_cap_thon(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)

    if request.method == "POST":
        if "nambaocao" not in data or data["nambaocao"] is None:
            return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    
        record = db.session.query(TienDoKeHoachBCC).filter(and_(TienDoKeHoachBCC.donvi_id == currentuser.donvi_id,\
                                                                TienDoKeHoachBCC.nambaocao == data['nambaocao'],
                                                                TienDoKeHoachBCC.tuyendonvi == data['tuyendonvi'])).first()
    
        if record is not None:
            return json({"error_code":"PARAMS_ERROR", "error_message":"Báo cáo năm của đơn vị hiện tại đã được tạo, vui lòng kiểm tra lại"}, status=520)

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
        POST=[auth_func, preprocess_cap_thon],
        PUT_SINGLE=[auth_func, preprocess_cap_thon],
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
                                                        TienDoKeHoachBCC.nambaocao == nambaocao)).all()
    elif(currentuser.donvi.tuyendonvi_id ==2):
        records = db.session.query(TienDoKeHoachBCC).filter(and_(TienDoKeHoachBCC.tinhthanh_id == currentuser.donvi.tinhthanh_id, \
                                                        TienDoKeHoachBCC.loaikybaocao == loaikybaocao, \
                                                        TienDoKeHoachBCC.kybaocao == kybaocao, \
                                                        TienDoKeHoachBCC.nambaocao == nambaocao)).all() 
    elif(currentuser.donvi.tuyendonvi_id ==3):
        records = db.session.query(TienDoKeHoachBCC).filter(and_(TienDoKeHoachBCC.quanhuyen_id == currentuser.donvi.quanhuyen_id, \
                                                        TienDoKeHoachBCC.loaikybaocao == loaikybaocao, \
                                                        TienDoKeHoachBCC.kybaocao == kybaocao, \
                                                        TienDoKeHoachBCC.nambaocao == nambaocao)).all()  
    elif(currentuser.donvi.tuyendonvi_id == 4):
        records = db.session.query(TienDoKeHoachBCC).filter(and_(TienDoKeHoachBCC.xaphuong_id == currentuser.donvi.xaphuong_id, \
                                                        TienDoKeHoachBCC.loaikybaocao == loaikybaocao, \
                                                        TienDoKeHoachBCC.kybaocao == kybaocao, \
                                                        TienDoKeHoachBCC.nambaocao == nambaocao)).all()                                                                                                                                     
    if records is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Không tìm thấy báo cáo của các đơn vị, vui lòng kiểm tra lại"}, status=520)
    else:
        results ={}
        tongnguoi_duocdaotao_giaoduc = 0
        tongnguoi_thamgia_nu_giaoduc = 0
        tongnguoi_dantocthieuso_giaoduc = 0
        tong_giangvien_giaoduc = 0
        tong_giangvien_nu_giaoduc = 0
        tongnguoi_duocdaotao_yte = 0
        tongnguoi_thamgia_nu_yte = 0
        tongnguoi_dantocthieuso_yte = 0
        tong_giangvien_yte = 0
        tong_giangvien_nu_yte = 0
        tongnguoi_duocdaotao = 0
        tongnguoi_thamgia_nu = 0
        tongnguoi_dantocthieuso = 0
        tong_giangvien = 0
        tong_giangvien_nu = 0
        for baocao in records:
            tongnguoi_duocdaotao += baocao.tongsonguoithamgia
            tongnguoi_thamgia_nu += baocao.tongsonguoithamgia_nu
            tongnguoi_dantocthieuso += tongsonguoithamgia_dtts
            tong_giangvien += tongsogiangvien
            tong_giangvien_nu += tongsogiangvien_nu
            if baocao.nganh.manganh == "GD":
                tongnguoi_duocdaotao_giaoduc += baocao.tongsonguoithamgia
                tongnguoi_thamgia_nu_giaoduc += baocao.tongsonguoithamgia_nu
                tongnguoi_dantocthieuso_giaoduc += tongsonguoithamgia_dtts
                tong_giangvien_giaoduc += tongsogiangvien
                tong_giangvien_nu_giaoduc += tongsogiangvien_nu
            if baocao.nganh.manganh == "YTE":
                tongnguoi_duocdaotao_yte += baocao.tongsonguoithamgia
                tongnguoi_thamgia_nu_yte += baocao.tongsonguoithamgia_nu
                tongnguoi_dantocthieuso_yte += tongsonguoithamgia_dtts
                tong_giangvien_yte += tongsogiangvien
                tong_giangvien_nu_yte += tongsogiangvien_nu
        results['tongnguoi_duocdaotao_giaoduc'] = tongnguoi_duocdaotao_giaoduc
        results['tongnguoi_thamgia_nu_giaoduc'] = tongnguoi_thamgia_nu_giaoduc
        results['tongnguoi_dantocthieuso_giaoduc'] = tongnguoi_dantocthieuso_giaoduc
        results['tong_giangvien_giaoduc'] = tong_giangvien_giaoduc
        results['tong_giangvien_nu_giaoduc'] = tong_giangvien_nu_giaoduc
        
        results['tongnguoi_duocdaotao_yte'] = tongnguoi_duocdaotao_yte
        results['tongnguoi_thamgia_nu_yte'] = tongnguoi_thamgia_nu_yte
        results['tongnguoi_dantocthieuso_yte'] = tongnguoi_dantocthieuso_yte
        results['tong_giangvien_yte'] = tong_giangvien_yte
        results['tong_giangvien_nu_yte'] = tong_giangvien_nu_yte
        
        results['tongnguoi_duocdaotao'] = tongnguoi_duocdaotao
        results['tongnguoi_thamgia_nu'] = tongnguoi_thamgia_nu
        results['tongnguoi_dantocthieuso'] = tongnguoi_dantocthieuso
        results['tong_giangvien'] = tong_giangvien
        results['tong_giangvien_nu'] = tong_giangvien_nu   
        return json(results)
    



