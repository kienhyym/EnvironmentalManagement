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

from application.models.model_kehoachbcc import *
from .helpers import *
from sqlalchemy import or_
from application.client import HTTPClient



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
apimanager.create_api(DTThieuSo,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='dtthieuso')
 
# apimanager.create_api(CapTinh,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='captinh') 
apimanager.create_api(TienDoKeHoachBCC,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
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

