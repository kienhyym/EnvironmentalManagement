import asyncio
import aiohttp
import hashlib
import ujson
from application.extensions import apimanager
from application.server import app
from application.database import db
from application.extensions import auth
from sqlalchemy.orm import aliased, joinedload_all
from gatco.response import json, text, html
from gatco_restapi.helpers import to_dict

from application.models.model_truong_tramyte_vesinh_capnuoc import *
from .helpers import *
from sqlalchemy import or_, and_
from application.client import HTTPClient

async def baocao_prepost_truong_tramyte(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    if "xaphuong_id" not in data or data["xaphuong_id"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn thông tin Xã/Phường"}, status=520)
    if "ma_truong_tramyte" not in data or data["ma_truong_tramyte"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa nhập thông tin mã Trường/Trạm y tế"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    record = db.session.query(Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc).filter(and_(Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc.donvi_id == currentuser.donvi_id,\
                                                      Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc.xaphuong_id == data['xaphuong_id'], \
                                                      Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc.ma_truong_tramyte == data['ma_truong_tramyte'], \
                                                      Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc.loaikybaocao == data['loaikybaocao'], \
                                                      Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc.kybaocao == data['kybaocao'], \
                                                      Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc.nambaocao == data['nambaocao'])).first()
    
    if record is not None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Kỳ báo cáo hiện tại đã được tạo, vui lòng kiểm tra lại"}, status=520)
    data['tinhtrang'] = TinhTrangBaocaoEnum.taomoi
    data['donvi_id'] = currentuser.donvi_id
    data['nguoibaocao_id'] = currentuser.id
    data['ngaybaocao'] = str(datetime.now())

apimanager.create_api(Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func,entity_pregetmany], POST=[auth_func, baocao_prepost_truong_tramyte], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc')
