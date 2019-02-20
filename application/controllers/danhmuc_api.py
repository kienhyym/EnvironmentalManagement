
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

async def entity_pregetmany_xaphuong(search_params=None, **kw):
    request = kw.get("request", None)
    currentUser = await current_user(request)
    if currentUser is not None:
        currdonvi = currentUser.donvi
        query_ids = None
        if(currdonvi is not None):
            if currdonvi.tuyendonvi_id == 2:
                query_ids = db.session.query(QuanHuyen.id).filter(QuanHuyen.tinhthanh_id == currdonvi.tinhthanh_id).all()
            elif currdonvi.tuyendonvi_id == 3:
                query_ids = [currdonvi.quanhuyen_id]
        print("dsquanhuyenid====",query_ids)
        if query_ids is not None and len(query_ids) >0:
            quyenhuyenids = []
            for qh in query_ids:
                quyenhuyenids.append(str(qh))
            search_params["filters"] = ("filters" in search_params) and {"$and":[search_params["filters"], {"quanhuyen_id":{"$in": quyenhuyenids}}]} \
                                    or {"quanhuyen_id":{"$in": quyenhuyenids}}
    print("search_params xaphuong====",search_params)

apimanager.create_api(XaPhuong,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[entity_pregetmany_xaphuong], POST=[auth_func,prepost_danhmuc], PUT_SINGLE=[auth_func,prepost_danhmuc]),
    collection_name='xaphuong')


async def entity_pregetmany_thonxom(search_params=None, **kw):
    request = kw.get("request", None)
    currentUser = await current_user(request)
    if currentUser is not None:
        currdonvi = currentUser.donvi
        dsxaphuongid = None
        if(currdonvi is not None):
            if currdonvi.tuyendonvi_id == 2:
                dshuyenid = db.session.query(QuanHuyen.id).filter(QuanHuyen.tinhthanh_id == currdonvi.tinhthanh_id).all()
                if dshuyenid is not None and len(dshuyenid)>0:
                    dsxaphuongid = db.session.query(XaPhuong.id).filter(XaPhuong.quanhuyen_id.in_(dshuyenid)).all()
            elif currdonvi.tuyendonvi_id == 3:
                dsxaphuongid = db.session.query(XaPhuong.id).filter(XaPhuong.quanhuyen_id == currdonvi.quanhuyen_id).all()
            elif currdonvi.tuyendonvi_id == 4:
                dsxaphuongid = [currdonvi.xaphuong_id]
        print("dsxaphuongid====",dsxaphuongid)
        if dsxaphuongid is not None and len(dsxaphuongid) >0:
            xaphuongids = []
            for xp in dsxaphuongid:
                xaphuongids.append(str(xp))
            search_params["filters"] = ("filters" in search_params) and {"$and":[search_params["filters"], {"xaphuong_id":{"$in": dsxaphuongid}}]} \
                                    or {"xaphuong_id":{"$in": dsxaphuongid}}
    print("search_params thon xom====",search_params)

apimanager.create_api(ThonXom,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[entity_pregetmany_thonxom], POST=[auth_func, prepost_danhmuc], PUT_SINGLE=[auth_func,prepost_danhmuc]),
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
