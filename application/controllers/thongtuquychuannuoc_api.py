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
from application.models.model_thongtuquychuannuoc import *
from sqlalchemy import or_, and_
from application.client import HTTPClient
from application.models.model_user import TinhTrangBaocaoEnum


apimanager.create_api(DonViCapNuoc,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='donvicapnuoc')

async def prepost_KetQuaNgoaiKiemChatLuongNuocSach(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    record = db.session.query(KetQuaNgoaiKiemChatLuongNuocSach).filter(and_(KetQuaNgoaiKiemChatLuongNuocSach.donvicapnuoc_id == data["donvicapnuoc_id"],\
                                                      KetQuaNgoaiKiemChatLuongNuocSach.donvi_id == currentuser.donvi_id, \
                                                      KetQuaNgoaiKiemChatLuongNuocSach.ngaybaocao == data['ngaybaocao'], \
                                                      KetQuaNgoaiKiemChatLuongNuocSach.nambaocao == data['nambaocao'])).first()
    
    if record is not None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Báo cáo năm hiện tại đã được tạo, vui lòng kiểm tra lại"}, status=520)
    
      
    data['tinhtrang'] = TinhTrangBaocaoEnum.taomoi
    data['donvi_id'] = currentuser.donvi_id
    data['nguoibaocao_id'] = currentuser.id
    
async def prepost_KetQuaNoiKiemChatLuongNuocSach(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    record = db.session.query(KetQuaNoiKiemChatLuongNuocSach).filter(and_(KetQuaNoiKiemChatLuongNuocSach.donvicapnuoc_id == data["donvicapnuoc_id"],\
                                                      KetQuaNoiKiemChatLuongNuocSach.donvi_id == currentuser.donvi_id, \
                                                      KetQuaNoiKiemChatLuongNuocSach.ngaybaocao == data['ngaybaocao'], \
                                                      KetQuaNoiKiemChatLuongNuocSach.nambaocao == data['nambaocao'])).first()
    
    if record is not None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Báo cáo năm hiện tại đã được tạo, vui lòng kiểm tra lại"}, status=520)
    
      
    data['tinhtrang'] = TinhTrangBaocaoEnum.taomoi
    data['donvi_id'] = currentuser.donvi_id
    data['nguoibaocao_id'] = currentuser.id


apimanager.create_api(ThongSoBaoCaoChatLuongNuoc,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='thongsobaocaochatluongnuoc')

apimanager.create_api(KetQuaNgoaiKiemChatLuongNuocSach,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany], POST=[auth_func, prepost_KetQuaNgoaiKiemChatLuongNuocSach], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='ketqua_ngoaikiem_chatluong_nuocsach')

apimanager.create_api(KetQuaNoiKiemChatLuongNuocSach,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany], POST=[auth_func, prepost_KetQuaNoiKiemChatLuongNuocSach], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='ketqua_noikiem_chatluong_nuocsach')

# apimanager.create_api(KQNgoaiKiemChatLuong,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kqngoaikiemchatluong')
# 
# apimanager.create_api(BaoCaoKiemTraCLNuocSach,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='baocaokiemtraclnuocsach')
# 
# 
# apimanager.create_api(TongHopChatLuongNuocTinhNeuCo,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='tonghopchatluongnuoctinhneuco')
# 
# apimanager.create_api(KQKiemTraNuocSach,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kqkiemtranuocsach')
# 
# apimanager.create_api(HoSoTheoDoi,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='hosotheodoi')
# 
# apimanager.create_api(TSKhongDat,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='tskhongdat')
# 
# apimanager.create_api(LietKeDonVi,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='lietkedonvi')
# 
# apimanager.create_api(KQNgoaiKiem,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kqngoaikiem')
# 
# apimanager.create_api(KQKTChatLuong,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kqktchatluong')
# 
# apimanager.create_api(KQNoiKiemNuocSach,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kqnoikiemnuocsach')
#  
# apimanager.create_api(TNChatLuongNc,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='tnchatluongnc')
# 
# apimanager.create_api(THKQNoiKiemNuocSach,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='thkqnoikiemnuocsach')
