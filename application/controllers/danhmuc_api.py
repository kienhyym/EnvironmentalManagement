
from application.extensions import apimanager
from gatco_restapi.helpers import to_dict
from application.server import app
from sqlalchemy import or_, and_
from gatco.response import json
from datetime import datetime
from .helpers import *



from application.models.model_danhmuc import QuocGia, TinhThanh, QuanHuyen, XaPhuong, ThonXom, TrinhDoHocVan, DanToc,\
    NgheNghiep, Nganh

async def prepost_danhmuc(request=None, data=None, Model=None, **kw):
    if "ma" in data and data['ma'] is not None and data['ma'] != "":
        check_existed = db.session.query(Model).filter(Model.ma == data['ma']).count()
        if check_existed >0:
            return json({"error_code":"PARAMS_ERROR", "error_message":"Mã danh mục đã bị trùng, vui lòng chọn mã khác"}, status=520);

apimanager.create_api(QuocGia,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[], POST=[auth_func,prepost_danhmuc], PUT_SINGLE=[auth_func, prepost_danhmuc]),
    collection_name='quocgia')



apimanager.create_api(TinhThanh,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[], POST=[auth_func,prepost_danhmuc], PUT_SINGLE=[auth_func,prepost_danhmuc]),
    collection_name='tinhthanh')



apimanager.create_api(QuanHuyen,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[], POST=[auth_func,prepost_danhmuc], PUT_SINGLE=[auth_func,prepost_danhmuc]),
    collection_name='quanhuyen')



apimanager.create_api(XaPhuong,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[], POST=[auth_func,prepost_danhmuc], PUT_SINGLE=[auth_func,prepost_danhmuc]),
    collection_name='xaphuong')



apimanager.create_api(ThonXom,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[], POST=[auth_func, prepost_danhmuc], PUT_SINGLE=[auth_func,prepost_danhmuc]),
    collection_name='thonxom')



apimanager.create_api(NgheNghiep,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func,prepost_danhmuc], PUT_SINGLE=[auth_func,prepost_danhmuc]),
    collection_name='nghenghiep')




apimanager.create_api(DanToc,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[], POST=[auth_func,prepost_danhmuc], PUT_SINGLE=[auth_func,prepost_danhmuc]),
    collection_name='dantoc')



apimanager.create_api(TrinhDoHocVan,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    collection_name='trinhdohocvan')


apimanager.create_api(Nganh,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    collection_name='nganh')
