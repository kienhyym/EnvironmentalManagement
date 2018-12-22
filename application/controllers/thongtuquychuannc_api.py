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
from application.models.thongtuquychuannc import *
from sqlalchemy import or_
from application.client import HTTPClient 

apimanager.create_api(BanCongBoQuyHop,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='bancongboquyhop')

   
apimanager.create_api(BapCaoNuocSachOne,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='baocaonuocsachOne')

   
apimanager.create_api(KetQuaBaoCaoNuocOne,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='ketquabaocaonuocone')

apimanager.create_api(BaoCaoKiemTraCLNuocSach,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='baocaokiemtraclnuocsach')

   
apimanager.create_api(TongHopChatLuongNuocTinhNeuCo,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='tonghopchatluongnuoctinhneuco')
