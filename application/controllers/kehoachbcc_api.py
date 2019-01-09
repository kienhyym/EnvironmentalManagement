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

 
apimanager.create_api(DuyTriVS,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='duytrivs')
#  
apimanager.create_api(Gioi_Dantoc_ThieuSo,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='gioi_dantoc_thieuso')
 
# apimanager.create_api(CapTinh,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='captinh') 
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

# apimanager.create_api(KeHoachBCCHuyen,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kehoach_bcc_huyen')
# 
# apimanager.create_api(KeHoachBCCThon,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kehoach_bcc_thon')
# 
# apimanager.create_api(KeHoachBCCTinh,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kehoach_bcc_tinh')
# 
# apimanager.create_api(KeHoachThucHien,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kehoachthuchien')


apimanager.create_api(VSToanXa,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='vstoanxa')

