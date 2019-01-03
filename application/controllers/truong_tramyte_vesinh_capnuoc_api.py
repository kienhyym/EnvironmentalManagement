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
from sqlalchemy import or_
from application.client import HTTPClient

apimanager.create_api(Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc')
