
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
            return json({"error_code":"PARAMS_ERROR", "error_message":"Mã danh mục đã bị trùng, vui lòng chọn mã khác"}, status=520)

async def prepost_put_danhmuc(request=None, data=None, Model=None, **kw):
    if "stt" in data:
        del data['stt']
    objects_danhmuc = ['dantoc','thonxom', 'xaphuong', 'quocgia', 'tinhthanh', 'quanhuyen', 'nganh']
    for obj in objects_danhmuc:
        if obj in data and "stt" in data[obj]:
            del data[obj]['stt']


async def postprocess_add_stt(request=None, Model=None, result=None, **kw):
    if result is not None and "objects" in result:
        objects = to_dict(result["objects"])
        datas = []
        i =1
        page = request.args.get("page",None)
        results_per_page = request.args.get("results_per_page",None)
        if page is not None and results_per_page is not None and int(page) != 1:
            i = i + int(results_per_page)*int(page)
        for obj in objects:
            if obj is not None:
                obj_tmp = to_dict(obj)
                obj_tmp["stt"] = i
                i = i +1
                datas.append(obj_tmp)
        result = datas



apimanager.create_api(QuocGia, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[], POST=[auth_func, prepost_danhmuc], PUT_SINGLE=[auth_func, prepost_danhmuc]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[postprocess_add_stt]),
    collection_name='quocgia')



apimanager.create_api(TinhThanh, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[], POST=[auth_func, prepost_danhmuc, prepost_put_danhmuc], PUT_SINGLE=[auth_func, prepost_danhmuc, prepost_put_danhmuc]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[postprocess_add_stt]),
    collection_name='tinhthanh')



apimanager.create_api(QuanHuyen, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[], POST=[auth_func, prepost_danhmuc, prepost_put_danhmuc], PUT_SINGLE=[auth_func, prepost_danhmuc, prepost_put_danhmuc]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[postprocess_add_stt]),
    collection_name='quanhuyen')

async def entity_pregetmany_xaphuong(search_params=None, **kw):
    request = kw.get("request", None)
    currentUser = await current_user(request)
    if currentUser is not None:
        currdonvi = currentUser.donvi
        dsquanhuyenid = None
        if(currdonvi is not None):
            if currdonvi.tuyendonvi_id == 2:
                dsquanhuyenid = db.session.query(QuanHuyen.id).filter(QuanHuyen.tinhthanh_id == currdonvi.tinhthanh_id).all()
            elif currdonvi.tuyendonvi_id == 3 or currdonvi.tuyendonvi_id == 4:
                dsquanhuyenid = [currdonvi.quanhuyen_id]
        if dsquanhuyenid is not None and len(dsquanhuyenid) >0:
            search_params["filters"] = ("filters" in search_params) and {"$and":[search_params["filters"], {"quanhuyen_id":{"$in": dsquanhuyenid}}]} \
                                    or {"quanhuyen_id":{"$in": dsquanhuyenid}}
    print("search_params xaphuong====",search_params)

apimanager.create_api(XaPhuong, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[entity_pregetmany_xaphuong], POST=[auth_func, prepost_danhmuc, prepost_put_danhmuc], PUT_SINGLE=[auth_func, prepost_danhmuc, prepost_put_danhmuc]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[postprocess_add_stt]),
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
            search_params["filters"] = ("filters" in search_params) and {"$and":[search_params["filters"], {"xaphuong_id":{"$in": dsxaphuongid}}]} \
                                    or {"xaphuong_id":{"$in": dsxaphuongid}}
    print("search_params thon xom====",search_params)

apimanager.create_api(ThonXom, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[entity_pregetmany_thonxom], POST=[auth_func, prepost_danhmuc, prepost_put_danhmuc], PUT_SINGLE=[auth_func, prepost_danhmuc, prepost_put_danhmuc]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[postprocess_add_stt]),
    collection_name='thonxom')



apimanager.create_api(NgheNghiep,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func,prepost_danhmuc], PUT_SINGLE=[auth_func,prepost_danhmuc]),
    collection_name='nghenghiep')




apimanager.create_api(DanToc, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[], POST=[auth_func,prepost_danhmuc], PUT_SINGLE=[auth_func,prepost_danhmuc]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[postprocess_add_stt]),
    collection_name='dantoc')



apimanager.create_api(TrinhDoHocVan,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    collection_name='trinhdohocvan')


apimanager.create_api(Nganh, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[postprocess_add_stt]),
    collection_name='nganh')
