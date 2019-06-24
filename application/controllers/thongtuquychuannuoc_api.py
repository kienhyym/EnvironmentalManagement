import asyncio
import aiohttp
import hashlib
import ujson
import copy
from application.extensions import apimanager
from application.server import app
from application.database import db
from sqlalchemy.orm import aliased, joinedload_all
from gatco.response import json, text, html

from .helpers import *
from application.models.model_thongtuquychuannuoc import *
from application.models.model_danhmuc import TinhThanh, QuanHuyen
from application.models.model_user import DonVi
from sqlalchemy import or_, and_, desc, asc
from application.client import HTTPClient
from application.models.model_user import TinhTrangBaocaoEnum
from datetime import datetime, date
from gatco_restapi.helpers import to_dict



async def postprocess_donvicapnuoc(request=None, Model=None, result=None, **kw):
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

# async def prepost_put_donvicapnuoc(request=None, data=None, Model=None, **kw):
#     if "stt" in data:
#         del data['stt']
#     objects_danhmuc = ['dantoc','thonxom', 'quocgia', 'tinhthanh', 'quanhuyen']
#     for obj in objects_danhmuc:
#         if obj in data and "stt" in data[obj]:
#             del data[obj]['stt']

apimanager.create_api(DonViCapNuoc, max_results_per_page=1000000,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[],GET_MANY =[postprocess_donvicapnuoc]),
    collection_name='donvicapnuoc')

apimanager.create_api(MapVienChuyenNganhNuocVaTinh,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='map_vienchuyennganhnuoc_tinh')


async def pre_process_thongso_chatluong_nuoc(request=None, data=None, Model=None, **kw):
    if "batbuoc" in data and data['batbuoc'] is not None:
        if(data['batbuoc'] == 'false' or data['batbuoc'] == False):
            data['batbuoc'] = False
        else:
            data['batbuoc'] = True
    else:
        data['batbuoc'] = False

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

apimanager.create_api(DanhMucThongSoNuocSach,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func, pre_process_thongso_chatluong_nuoc], PUT_SINGLE=[auth_func, pre_process_thongso_chatluong_nuoc], DELETE_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[postprocess_add_stt]),
    collection_name='danhmuc_thongso_nuocsach')

apimanager.create_api(CaiDatThongSoNuocDiaPhuong,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[], GET_MANY =[]),
    collection_name='caidat_thongsonuoc_diaphuong')

async def prepost_KetQuaNgoaiKiemChatLuongNuocSach(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
#     record = db.session.query(KetQuaNgoaiKiemChatLuongNuocSach).filter(and_(KetQuaNgoaiKiemChatLuongNuocSach.donvicapnuoc_id == data["donvicapnuoc_id"],\
#                                                       KetQuaNgoaiKiemChatLuongNuocSach.donvi_id == currentuser.donvi_id, \
#                                                       KetQuaNgoaiKiemChatLuongNuocSach.ngaybaocao == data['ngaybaocao'], \
#                                                       KetQuaNgoaiKiemChatLuongNuocSach.nambaocao == data['nambaocao'])).first()
#     
#     if record is not None:
#         return json({"error_code":"PARAMS_ERROR", "error_message":"Báo cáo năm hiện tại đã được tạo, vui lòng kiểm tra lại"}, status=520)
    
      
    data['tinhtrang'] = TinhTrangBaocaoEnum.taomoi
    data['donvi_id'] = currentuser.donvi_id
    data['nguoibaocao_id'] = currentuser.id
    
    
apimanager.create_api(KetQuaNgoaiKiemChatLuongNuocSach,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany], POST=[auth_func, prepost_KetQuaNgoaiKiemChatLuongNuocSach], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='ketqua_ngoaikiem_chatluong_nuocsach')


    
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

async def preput_KetQuaNoiKiemChatLuongNuocSach(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    record = db.session.query(KetQuaNoiKiemChatLuongNuocSach).filter(and_(KetQuaNoiKiemChatLuongNuocSach.donvicapnuoc_id == data['donvicapnuoc_id'], \
                                                            KetQuaNoiKiemChatLuongNuocSach.ngaybaocao == data['ngaybaocao'], \
                                                            KetQuaNoiKiemChatLuongNuocSach.nambaocao == data['nambaocao'])).first()
    if (record is not None and str(record.id) != data['id']):
        return json({"error_code":"PARAMS_ERROR","error_message":"Ngày báo cáo bị trùng, vui lòng kiểm tra lại!"}, status=520)



async def prepost_tonghopketqua_chatluongnuoc(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    if ("loaikybaocao" not in data or data['loaikybaocao']  is None or "kybaocao" not in data or data["kybaocao"] is None or data['loaikybaocao'] != LoaiKyBaoCao.QUY):
        return json({"error_code":"PARAMS_ERROR", "error_message":"Kỳ báo cáo không hợp lệ"}, status=520)

    record = db.session.query(TongHopKetQuaKiemTraChatLuongNuocSach).filter(and_(TongHopKetQuaKiemTraChatLuongNuocSach.donvicapnuoc_id == data["donvicapnuoc_id"],\
                                                      TongHopKetQuaKiemTraChatLuongNuocSach.donvi_id == currentuser.donvi_id, \
                                                      TongHopKetQuaKiemTraChatLuongNuocSach.loaikybaocao == data['loaikybaocao'], \
                                                      TongHopKetQuaKiemTraChatLuongNuocSach.kybaocao == data['kybaocao'], \
                                                      TongHopKetQuaKiemTraChatLuongNuocSach.nambaocao == data['nambaocao'])).first()
    
    if record is not None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Kỳ báo cáo hiện tại đã được tạo, vui lòng kiểm tra lại"}, status=520)
      
    data['tinhtrang'] = TinhTrangBaocaoEnum.taomoi
    data['donvi_id'] = currentuser.donvi_id
    data['nguoibaocao_id'] = currentuser.id
    await process_baocao_tonghopketqua_chatluongnuoc(currentuser, data)
    
async def preput_tonghopketqua_chatluongnuoc(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    if ("loaikybaocao" not in data or data['loaikybaocao']  is None or "kybaocao" not in data or data["kybaocao"] is None or data['loaikybaocao'] != LoaiKyBaoCao.QUY):
        return json({"error_code":"PARAMS_ERROR", "error_message":"Kỳ báo cáo không hợp lệ"}, status=520)

    await process_baocao_tonghopketqua_chatluongnuoc(currentuser, data)
    
async def process_baocao_tonghopketqua_chatluongnuoc(currentuser=None, data=None):
    kybaocao = data['kybaocao']
    startDate = date(data['nambaocao'], 1,1)
    endDate = date(data['nambaocao'], 1,1)
    if(kybaocao == 1):
        startDate = date(data['nambaocao'], 1,1)
        endDate = date(data['nambaocao'], 3,31)
    elif(kybaocao == 2):
        startDate = date(data['nambaocao'], 4,1)
        endDate = date(data['nambaocao'], 6,30)
    elif(kybaocao == 3):
        startDate = date(data['nambaocao'], 7,1)
        endDate = date(data['nambaocao'], 9,30)
    elif(kybaocao == 4):
        startDate = date(data['nambaocao'], 10,1)
        endDate = date(data['nambaocao'], 12,31)
    await process_baocao_noikiem_tonghopketqua(startDate, endDate, data)
    await process_baocao_ngoaikiem_tonghopketqua(startDate, endDate, data)


async def process_baocao_noikiem_tonghopketqua(startDate=None, endDate=None, data=None):
    #start thong so noi kiem    
    tong_laphoso_theoquydinh_noikiem = 0
    tong_hoso_daydu_theoquydinh_noikiem = 0
    tong_somau_thunghiem_dungquydinh_noikiem = 0
    tong_thunghiem_daydu_thongso_noikiem = 0
    tong_tansuat_thuchien_noikiem_dungquydinh_noikiem = 0
    tong_thuchien_baocao_daydu_noikiem = 0
    tong_thuchien_congkhai_thongtin_noikiem = 0
    tong_thuchien_bienphap_khacphuc_dat_noikiem = 0
    tong_thuchien_bienphap_khacphuc_khongdat_noikiem = 0
    
    tong_maunuoc_thunghiem_noikiem = 0
    tong_mau_dat_quychuan_noikiem = 0
    tong_mau_khongdat_quychuan_noikiem = 0
    thongso_khongdat_noikiem = []
    
    baocao_noikiems = db.session.query(KetQuaNoiKiemChatLuongNuocSach).filter(and_(KetQuaNoiKiemChatLuongNuocSach.donvicapnuoc_id == data["donvicapnuoc_id"],\
#                                                       TongHopKetQuaKiemTraChatLuongNuocSach.donvi_id == currentuser.donvi_id, \
                                                      KetQuaNoiKiemChatLuongNuocSach.ngaybaocao >= startDate, \
                                                      KetQuaNoiKiemChatLuongNuocSach.ngaybaocao <= endDate, \
                                                      KetQuaNoiKiemChatLuongNuocSach.nambaocao == data['nambaocao'])).all()
    
    if baocao_noikiems is not None:
        for baocao in baocao_noikiems:
            if baocao is not None:
                if baocao.laphoso_theoquydinh == 1:
                    tong_laphoso_theoquydinh_noikiem += 1
                    
                if baocao.hoso_daydu_theoquydinh == 1:
                    tong_hoso_daydu_theoquydinh_noikiem += 1
                    
                if baocao.somau_thunghiem_dungquydinh == 1:
                    tong_somau_thunghiem_dungquydinh_noikiem += 1
                    
                if baocao.thunghiem_daydu_thongso == 1:
                    tong_thunghiem_daydu_thongso_noikiem += 1
                    
                if baocao.tansuat_thuchien_noikiem_dungquydinh == 1:
                    tong_tansuat_thuchien_noikiem_dungquydinh_noikiem += 1
                    
                if baocao.thuchien_baocao_daydu == 1:
                    tong_thuchien_baocao_daydu_noikiem += 1
                    
                if baocao.thuchien_congkhai_thongtin == 1:
                    tong_thuchien_congkhai_thongtin_noikiem += 1
                    
                if baocao.thuchien_bienphap_khacphuc == 1:
                    tong_thuchien_bienphap_khacphuc_dat_noikiem += 1
                else:
                    tong_thuchien_bienphap_khacphuc_khongdat_noikiem += 1
                
                
                tong_maunuoc_thunghiem_noikiem += baocao.somauvavitri
                if baocao.danhsachvitrilaymau is not None:
                    for vitrimau in baocao.danhsachvitrilaymau:
                        if( vitrimau is not None and vitrimau["danhgia"] is not None and vitrimau["danhgia"] ==1):
                            tong_mau_dat_quychuan_noikiem += 1
                        else:
                            tong_mau_khongdat_quychuan_noikiem +=1
                
                #danh sach ket qua cac thong so
                if baocao.ketquanoikiemchatluongnuoc is not None:
                    for thongso in baocao.ketquanoikiemchatluongnuoc:
                        if thongso is not None and "danhgia" in thongso and thongso["danhgia"] == 0:
                            obj_thongso = to_dict(thongso)
                            for mauthongso in obj_thongso["ketquakiemtra"]:
                                if mauthongso["danhgia"] == 0:
                                    item_thongso_khongdat_noikiem = copy.deepcopy(obj_thongso)
                                    item_thongso_khongdat_noikiem['mavitri'] = mauthongso["mavitri"]
                                    item_thongso_khongdat_noikiem['tenvitri'] = mauthongso["tenvitri"]
                                    item_thongso_khongdat_noikiem['ketqua'] = mauthongso["ketqua"]
                                    item_thongso_khongdat_noikiem['ngaykiemtra'] = mauthongso["ngaykiemtra"]
                                    item_thongso_khongdat_noikiem['danhgia'] = mauthongso["danhgia"]

                                    thongso_khongdat_noikiem.append(item_thongso_khongdat_noikiem)
    
    
    data["tong_laphoso_theoquydinh_noikiem"] = tong_laphoso_theoquydinh_noikiem
    data["tong_hoso_daydu_theoquydinh_noikiem"] = tong_hoso_daydu_theoquydinh_noikiem
    data["tong_somau_thunghiem_dungquydinh_noikiem"] = tong_somau_thunghiem_dungquydinh_noikiem
    data["tong_thunghiem_daydu_thongso_noikiem"] = tong_thunghiem_daydu_thongso_noikiem
    data["tong_tansuat_thuchien_noikiem_dungquydinh_noikiem"] = tong_tansuat_thuchien_noikiem_dungquydinh_noikiem
    data["tong_thuchien_baocao_daydu_noikiem"] = tong_thuchien_baocao_daydu_noikiem
    data["tong_thuchien_congkhai_thongtin_noikiem"] = tong_thuchien_congkhai_thongtin_noikiem
    data["tong_thuchien_bienphap_khacphuc_dat_noikiem"] = tong_thuchien_bienphap_khacphuc_dat_noikiem
    data["tong_thuchien_bienphap_khacphuc_khongdat_noikiem"] = tong_thuchien_bienphap_khacphuc_khongdat_noikiem
    
    data["tong_maunuoc_thunghiem_noikiem"] = tong_maunuoc_thunghiem_noikiem
    data["tong_mau_dat_quychuan_noikiem"] = tong_mau_dat_quychuan_noikiem
    data["tong_mau_khongdat_quychuan_noikiem"] = tong_mau_khongdat_quychuan_noikiem
    data["thongso_khongdat_noikiem"] = thongso_khongdat_noikiem
    #end thong so noi kiem

async def process_baocao_ngoaikiem_tonghopketqua(startDate=None, endDate=None, data=None):
    #start thong so ngoai kiem
    tong_solan_ngoaikiem = 0
    donvi_thuchien_ngoaikiem = []
    tong_laphoso_theoquydinh_ngoaikiem = 0
    tong_hoso_daydu_theoquydinh_ngoaikiem = 0
    tong_somau_thunghiem_dungquydinh_ngoaikiem = 0
    tong_thunghiem_daydu_thongso_ngoaikiem = 0
    tong_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem = 0
    tong_thuchien_baocao_daydu_ngoaikiem = 0
    tong_thuchien_congkhai_thongtin_ngoaikiem = 0
    tong_thuchien_bienphap_khacphuc_dat_ngoaikiem = 0
    tong_thuchien_bienphap_khacphuc_khongdat_ngoaikiem = 0
    
    tong_maunuoc_thunghiem_ngoaikiem = 0
    tong_mau_dat_quychuan_ngoaikiem = 0
    tong_mau_khongdat_quychuan_ngoaikiem = 0
    thongso_khongdat_ngoaikiem = []
    
    baocao_ngoaikiems = db.session.query(KetQuaNgoaiKiemChatLuongNuocSach).filter(and_(KetQuaNgoaiKiemChatLuongNuocSach.donvicapnuoc_id == data["donvicapnuoc_id"],\
                                                     KetQuaNgoaiKiemChatLuongNuocSach.ngaybaocao >= startDate, \
                                                     KetQuaNgoaiKiemChatLuongNuocSach.ngaybaocao <= endDate, \
                                                     KetQuaNgoaiKiemChatLuongNuocSach.nambaocao == data['nambaocao'])).all()
    
    if baocao_ngoaikiems is not None:
        tong_solan_ngoaikiem = len(baocao_ngoaikiems)
        for baocao in baocao_ngoaikiems:
            if baocao is not None:
                item_donvi_ngoaikiem = {}
                item_donvi_ngoaikiem["tendonvi"] = baocao.tendonvi_ngoaikiem
                item_donvi_ngoaikiem["noidung_ngoaikiem"] = baocao.noidung_ngoaikiem
                item_donvi_ngoaikiem["thunghiem_chatluong_nuoc"] = baocao.thunghiem_chatluong_nuoc
                item_donvi_ngoaikiem["loai_donvi_kiemtra"] = baocao.loai_donvi_kiemtra
                item_donvi_ngoaikiem["thanhphan_doankiemtra"] = baocao.thanhphan_doankiemtra
                item_donvi_ngoaikiem["ngaykiemtra"] = str(baocao.thoigiankiemtra)
                donvi_thuchien_ngoaikiem.append(ujson.loads(ujson.dumps(item_donvi_ngoaikiem)))
                
                if baocao.laphoso_theoquydinh == 1:
                    tong_laphoso_theoquydinh_ngoaikiem += 1
                    
                if baocao.hoso_daydu_theoquydinh == 1:
                    tong_hoso_daydu_theoquydinh_ngoaikiem += 1
                    
                if baocao.somau_thunghiem_dungquydinh == 1:
                    tong_somau_thunghiem_dungquydinh_ngoaikiem += 1
                    
                if baocao.thunghiem_daydu_thongso == 1:
                    tong_thunghiem_daydu_thongso_ngoaikiem += 1
                    
                if baocao.tansuat_thuchien_noikiem_dungquydinh == 1:
                    tong_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem += 1
                    
                if baocao.thuchien_baocao_daydu == 1:
                    tong_thuchien_baocao_daydu_ngoaikiem += 1
                    
                if baocao.thuchien_congkhai_thongtin == 1:
                    tong_thuchien_congkhai_thongtin_ngoaikiem += 1
                    
                if baocao.thuchien_bienphap_khacphuc == 1:
                    tong_thuchien_bienphap_khacphuc_dat_ngoaikiem += 1
                else:
                    tong_thuchien_bienphap_khacphuc_khongdat_ngoaikiem += 1
                
                tong_maunuoc_thunghiem_ngoaikiem += baocao.somauvavitri
                if baocao.danhsachvitrilaymau is not None:
                    for vitrimau in baocao.danhsachvitrilaymau:
                        if( vitrimau is not None and vitrimau["danhgia"] is not None and vitrimau["danhgia"] ==1):
                            tong_mau_dat_quychuan_ngoaikiem += 1
                        else:
                            tong_mau_khongdat_quychuan_ngoaikiem +=1
                
                #danh sach ket qua cac thong so
                if baocao.ketquangoaikiemchatluongnuoc is not None:
                    for thongso in baocao.ketquangoaikiemchatluongnuoc:
#                         if thongso is not None and "danhgia" in thongso and thongso["danhgia"] == 0:
                        obj_thongso = to_dict(thongso)
                        for mauthongso in obj_thongso["ketquakiemtra"]:
                            if "danhgia" in mauthongso and mauthongso["danhgia"] == 0:
                                item_thongso_khongdat = copy.deepcopy(obj_thongso)
                                item_thongso_khongdat['mavitri'] = mauthongso["mavitri"]
                                item_thongso_khongdat['tenvitri'] = mauthongso["tenvitri"]
                                item_thongso_khongdat['ketqua'] = mauthongso["ketqua"]
                                item_thongso_khongdat['ngaykiemtra'] = mauthongso["ngaykiemtra"]
                                item_thongso_khongdat['danhgia'] = mauthongso["danhgia"]
                                item_thongso_khongdat['tendonvingoaikiem'] = baocao.tendonvi_ngoaikiem
                                thongso_khongdat_ngoaikiem.append(item_thongso_khongdat)
    
    
    data["tong_laphoso_theoquydinh_ngoaikiem"] = tong_laphoso_theoquydinh_ngoaikiem
    data["tong_hoso_daydu_theoquydinh_ngoaikiem"] = tong_hoso_daydu_theoquydinh_ngoaikiem
    data["tong_somau_thunghiem_dungquydinh_ngoaikiem"] = tong_somau_thunghiem_dungquydinh_ngoaikiem
    data["tong_thunghiem_daydu_thongso_ngoaikiem"] = tong_thunghiem_daydu_thongso_ngoaikiem
    data["tong_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem"] = tong_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem
    data["tong_thuchien_baocao_daydu_ngoaikiem"] = tong_thuchien_baocao_daydu_ngoaikiem
    data["tong_thuchien_congkhai_thongtin_ngoaikiem"] = tong_thuchien_congkhai_thongtin_ngoaikiem
    data["tong_thuchien_bienphap_khacphuc_dat_ngoaikiem"] = tong_thuchien_bienphap_khacphuc_dat_ngoaikiem
    data["tong_thuchien_bienphap_khacphuc_khongdat_ngoaikiem"] = tong_thuchien_bienphap_khacphuc_khongdat_ngoaikiem
    
    data["tong_maunuoc_thunghiem_ngoaikiem"] = tong_maunuoc_thunghiem_ngoaikiem
    data["tong_mau_dat_quychuan_ngoaikiem"] = tong_mau_dat_quychuan_ngoaikiem
    data["tong_mau_khongdat_quychuan_ngoaikiem"] = tong_mau_khongdat_quychuan_ngoaikiem
    data["thongso_khongdat_ngoaikiem"] = thongso_khongdat_ngoaikiem  
    data["donvi_thuchien_ngoaikiem"] = donvi_thuchien_ngoaikiem  
    data["tong_solan_ngoaikiem"] = tong_solan_ngoaikiem
    


 
async def prepost_baocao_nuocsach_huyentinh(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    if ("loaikybaocao" not in data or data['loaikybaocao']  is None or "kybaocao" not in data or data["kybaocao"] is None):
        return json({"error_code":"PARAMS_ERROR", "error_message":"Kỳ báo cáo không hợp lệ"}, status=520)

    record = db.session.query(BaoCaoNuocSachHuyenTinh).filter(and_(BaoCaoNuocSachHuyenTinh.donvi_id == currentuser.donvi_id, \
                                                      BaoCaoNuocSachHuyenTinh.loaikybaocao == data['loaikybaocao'], \
                                                      BaoCaoNuocSachHuyenTinh.kybaocao == data['kybaocao'], \
                                                      BaoCaoNuocSachHuyenTinh.nambaocao == data['nambaocao'])).first()
    
    if record is not None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Kỳ báo cáo hiện tại đã được tạo, vui lòng kiểm tra lại"}, status=520)
      
    data['tinhtrang'] = TinhTrangBaocaoEnum.taomoi
    data['donvi_id'] = currentuser.donvi_id
    data['nguoibaocao_id'] = currentuser.id
    
    await process_baocao_nuocsach_huyentinh(currentuser, data)       
    
async def preput_baocao_nuocsach_huyentinh(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    if ("loaikybaocao" not in data or data['loaikybaocao']  is None or "kybaocao" not in data or data["kybaocao"] is None):
        return json({"error_code":"PARAMS_ERROR", "error_message":"Kỳ báo cáo không hợp lệ"}, status=520)

    await process_baocao_nuocsach_huyentinh(currentuser, data)               
                        
async def process_baocao_nuocsach_huyentinh(currentuser=None, data=None):
    
    kybaocao = data['kybaocao']
    loaikybaocao = data["loaikybaocao"]
    startDate = date(data['nambaocao'], 1,1)
    endDate = date(data['nambaocao'], 1,1)
    if (loaikybaocao is not None and loaikybaocao == LoaiKyBaoCao.QUY):
        if(kybaocao == 1):
            startDate = date(data['nambaocao'], 1,1)
            endDate = date(data['nambaocao'], 3,31)
        elif(kybaocao == 2):
            startDate = date(data['nambaocao'], 4,1)
            endDate = date(data['nambaocao'], 6,30)
        elif(kybaocao == 3):
            startDate = date(data['nambaocao'], 7,1)
            endDate = date(data['nambaocao'], 9,30)
        elif(kybaocao == 4):
            startDate = date(data['nambaocao'], 10,1)
            endDate = date(data['nambaocao'], 12,31)
    elif (loaikybaocao is not None and loaikybaocao == LoaiKyBaoCao.SAUTHANG and kybaocao == 1):
        startDate = date(data['nambaocao'], 1,1)
        endDate = date(data['nambaocao'], 6,30)
    elif (loaikybaocao is not None and loaikybaocao == LoaiKyBaoCao.NAM):
        startDate = date(data['nambaocao'], 1,1)
        endDate = date(data['nambaocao'], 12,31)

    
    danhmuc_donvicapnuoc = None
    baocao_ngoaikiems = None
    list_donvicapnuoc_id = []
    baocao_namtruoc = None
    if currentuser.donvi.tuyendonvi_id == 2:
        
        baocao_namtruoc = db.session.query(BaoCaoNuocSachHuyenTinh).\
            filter(and_(BaoCaoNuocSachHuyenTinh.tinhthanh_id == currentuser.donvi.tinhthanh_id, BaoCaoNuocSachHuyenTinh.nambaocao == (data['nambaocao'] - 1))).\
            order_by(desc(BaoCaoNuocSachHuyenTinh.updated_at)).first()
        
        data['tong_hogiadinh_diaban'] = currentuser.donvi.tinhthanh.tong_hgd if currentuser.donvi.tinhthanh.tong_hgd is not None else 0
        data["tinhthanh_id"] = currentuser.donvi.tinhthanh_id
        data["tinhthanh"] = currentuser.donvi.tinhthanh
        data["loaibaocao"] = 1
        danhsach_kybaocao = [1,2]
        if (loaikybaocao is not None and loaikybaocao == LoaiKyBaoCao.NAM):
            danhsach_kybaocao = [1,2,3,4]
        danhmuc_donvicapnuoc = db.session.query(DonViCapNuoc).\
            filter(and_(DonViCapNuoc.tinhthanh_id == currentuser.donvi.tinhthanh_id, DonViCapNuoc.trangthai ==1)).all()
            
        for donvicapnuoc in danhmuc_donvicapnuoc:
            if donvicapnuoc.id not in list_donvicapnuoc_id:
                list_donvicapnuoc_id.append(donvicapnuoc.id)


        
        baocao_ngoaikiems = db.session.query(KetQuaNgoaiKiemChatLuongNuocSach).filter(and_(KetQuaNgoaiKiemChatLuongNuocSach.donvicapnuoc_id.in_(list_donvicapnuoc_id), \
                 KetQuaNgoaiKiemChatLuongNuocSach.thoigiankiemtra >= startDate, \
                 KetQuaNgoaiKiemChatLuongNuocSach.thoigiankiemtra <= endDate, \
                 KetQuaNgoaiKiemChatLuongNuocSach.nambaocao == data['nambaocao'])).all()


    elif currentuser.donvi.tuyendonvi_id == 3:
        baocao_namtruoc = db.session.query(BaoCaoNuocSachHuyenTinh).\
            filter(and_(BaoCaoNuocSachHuyenTinh.quanhuyen_id == currentuser.donvi.quanhuyen_id, BaoCaoNuocSachHuyenTinh.nambaocao == (data['nambaocao'] - 1))).\
            order_by(desc(BaoCaoNuocSachHuyenTinh.updated_at)).first()
    
        data['tong_hogiadinh_diaban'] = currentuser.donvi.quanhuyen.tong_hgd if currentuser.donvi.quanhuyen.tong_hgd is not None else 0
        data["tinhthanh_id"] = currentuser.donvi.tinhthanh_id
        data["tinhthanh"] = currentuser.donvi.tinhthanh
        data["quanhuyen_id"] = currentuser.donvi.quanhuyen_id
        data["quanhuyen"] = currentuser.donvi.quanhuyen
        data["loaibaocao"] = 2
        danhmuc_donvicapnuoc = db.session.query(DonViCapNuoc).\
            filter(and_(DonViCapNuoc.tinhthanh_id == currentuser.donvi.tinhthanh_id, \
                DonViCapNuoc.quanhuyen_id == currentuser.donvi.quanhuyen_id, \
                DonViCapNuoc.trangthai == 1, \
                or_(and_(DonViCapNuoc.tongso_hogiadinh > 0, DonViCapNuoc.tongso_hogiadinh <500 ),and_(DonViCapNuoc.tongso_hogiadinh == 0,DonViCapNuoc.congsuat<1000)) \
                )).all()
        
        baocao_ngoaikiems = db.session.query(KetQuaNgoaiKiemChatLuongNuocSach).filter(and_(KetQuaNgoaiKiemChatLuongNuocSach.donvi_id == currentuser.donvi_id, \
                 KetQuaNgoaiKiemChatLuongNuocSach.loai_donvi_kiemtra == 2, \
                 KetQuaNgoaiKiemChatLuongNuocSach.thoigiankiemtra >= startDate, \
                 KetQuaNgoaiKiemChatLuongNuocSach.thoigiankiemtra <= endDate, \
                 KetQuaNgoaiKiemChatLuongNuocSach.nambaocao == data['nambaocao'])).all()
        
    #thong ke don vi cap nuoc
    tong_donvi_capnuoc = 0
    tong_hogiadinh_duoccungcapnuoc = 0
    tong_soluot_ngoaikiem = 0
    tong_donvi_capnuoc_thuchien_ngoaikiem = 0
    donvicapnuocid_ngoaikiem = []

    if baocao_ngoaikiems is not None and len(baocao_ngoaikiems) > 0:
        tong_soluot_ngoaikiem = len(baocao_ngoaikiems)
        for item_baocao_ngoaikiem in baocao_ngoaikiems:
            if item_baocao_ngoaikiem.donvicapnuoc_id not in donvicapnuocid_ngoaikiem:
                donvicapnuocid_ngoaikiem.append(item_baocao_ngoaikiem.donvicapnuoc_id)
    data["tong_soluot_ngoaikiem"] = tong_soluot_ngoaikiem
    data["tong_donvi_capnuoc_thuchien_ngoaikiem"] = len(donvicapnuocid_ngoaikiem)

    data["tong_donvi_capnuoc_ngam"] = 0
    data["tong_donvi_capnuoc_mat"] = 0
    data["tong_donvi_capnuoc_mat_ngam"] = 0
    data["tong_donvi_capnuoc_tren1000m3"] = 0
    data["tong_donvi_capnuoc_duoi1000m3"] = 0
    if danhmuc_donvicapnuoc is not None and len(danhmuc_donvicapnuoc)>0:
        tong_donvi_capnuoc = len(danhmuc_donvicapnuoc)
        for dv in danhmuc_donvicapnuoc:
            if dv is not None:
                tong_hogiadinh_duoccungcapnuoc += dv.tongso_hogiadinh
                if(dv.nguonnuoc_nguyenlieu == 1):
                    data["tong_donvi_capnuoc_mat_ngam"] +=1
                elif(dv.nguonnuoc_nguyenlieu == 2):
                    data["tong_donvi_capnuoc_ngam"] +=1
                elif(dv.nguonnuoc_nguyenlieu == 3):
                    data["tong_donvi_capnuoc_mat"] +=1
                    
                if(dv.congsuat>=1000):
                    data["tong_donvi_capnuoc_tren1000m3"] +=1
                else:
                    data["tong_donvi_capnuoc_duoi1000m3"] +=1
    data["tong_donvi_capnuoc"] = tong_donvi_capnuoc
    data["tong_hogiadinh_duoccungcapnuoc"] = tong_hogiadinh_duoccungcapnuoc
    
    if baocao_namtruoc is not None:
        tongkinhphi_namtruoc = int(baocao_namtruoc.tong_kinhphi_congtac_ngoaikiem) if baocao_namtruoc.tong_kinhphi_congtac_ngoaikiem is not None else 0
        tongkinhphi_namnay = int(data['tong_kinhphi_congtac_ngoaikiem']) if data['tong_kinhphi_congtac_ngoaikiem'] is not None else 0
        if (tongkinhphi_namtruoc == tongkinhphi_namnay):
            data['kinhphi_ngoaikiem_sovoinamtruoc'] = 0
        elif (tongkinhphi_namtruoc > tongkinhphi_namnay):
            data['kinhphi_ngoaikiem_sovoinamtruoc'] = 1
        else:
            data['kinhphi_ngoaikiem_sovoinamtruoc'] = 2
    
    await process_baocao_nuocsach_huyentinh_ketqua_ngoaikiem(baocao_ngoaikiems, data)
    # await process_baocao_nuocsach_huyentinh_ketqua_tonghop(baocao_tonghops, data)

    
async def process_baocao_nuocsach_huyentinh_ketqua_ngoaikiem(baocao_ngoaikiems=None, data=None):
    #thong ke bao cao ngoai kiem
    # tong_donvi_capnuoc_thuchien_ngoaikiem = 0

    # tongdat_laphoso_theoquydinh_ngoaikiem = 0
    tongdat_hoso_daydu_theoquydinh_ngoaikiem = 0
    tongdat_somau_thunghiem_dungquydinh_ngoaikiem = 0
    tongdat_thunghiem_daydu_thongso_ngoaikiem = 0
    tongdat_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem = 0
    tongdat_thuchien_baocao_daydu_ngoaikiem = 0
    tongdat_thuchien_congkhai_thongtin_ngoaikiem = 0
    tongdat_thuchien_bienphap_khacphuc_ngoaikiem = 0

    tong_maunuoc_thunghiem_noikiem = 0
    tong_mau_dat_quychuan_noikiem = 0
    
    tong_maunuoc_thunghiem_ngoaikiem_trungtam = 0
    tong_mau_dat_quychuan_ngoaikiem_trungtam = 0
    tong_mau_khongdat_quychuan_ngoaikiem_trungtam = 0
    thongso_khongdat_ngoaikiem_trungtam = []

    thongbao_thongtin_chatluongnuoc = 0
    congkhai_thongtin_coquan_ngoaikiem = 0
    thongbao_coquan_thamquyen = 0
    thongbao_donvi_chuquan = 0

    donvicapnuocid_ngoaikiem = []
    
    map_thongso_khongdat = {}
    
    if baocao_ngoaikiems is not None:
        # tong_donvi_capnuoc_thuchien_ngoaikiem = len(baocao_ngoaikiems)
        for baocao in baocao_ngoaikiems:
            baocao = copy.deepcopy(baocao)
            if baocao is not None:
                if baocao.donvicapnuoc_id not in donvicapnuocid_ngoaikiem:
                    donvicapnuocid_ngoaikiem.append(baocao.donvicapnuoc_id)
                # if baocao.laphoso_theoquydinh == 1:
                #     tongdat_laphoso_theoquydinh_ngoaikiem += 1
                    
                if baocao.hoso_daydu_theoquydinh == 1:
                    tongdat_hoso_daydu_theoquydinh_ngoaikiem += 1
                    
                if baocao.somau_thunghiem_dungquydinh == 1:
                    tongdat_somau_thunghiem_dungquydinh_ngoaikiem += 1
                    
                if baocao.thunghiem_daydu_thongso == 1:
                    tongdat_thunghiem_daydu_thongso_ngoaikiem += 1
                    
                if baocao.tansuat_thuchien_noikiem_dungquydinh == 1:
                    tongdat_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem += 1
                    
                if baocao.thuchien_baocao_daydu == 1:
                    tongdat_thuchien_baocao_daydu_ngoaikiem += 1
                    
                if baocao.thuchien_congkhai_thongtin == 1:
                    tongdat_thuchien_congkhai_thongtin_ngoaikiem += 1
                    
                if baocao.thuchien_bienphap_khacphuc == 1:
                    tongdat_thuchien_bienphap_khacphuc_ngoaikiem += 1


                if baocao.congbo_thongtin_chodonvicapnuoc == 1:
                    thongbao_thongtin_chatluongnuoc += 1

                if baocao.congkhai_thongtin == 1:
                    congkhai_thongtin_coquan_ngoaikiem += 1

                if baocao.thongbao_coquan_thamquyen == 1:
                    thongbao_coquan_thamquyen += 1

                if baocao.thongbao_donvi_chuquan == 1:
                    thongbao_donvi_chuquan += 1
                

                tong_maunuoc_thunghiem_noikiem += baocao.tongsomau_noikiem_thunghiem
                tong_mau_dat_quychuan_noikiem += baocao.tongsomau_noikiem_dat_quychuan

                tong_maunuoc_thunghiem_ngoaikiem_trungtam += baocao.somauvavitri
                
                if baocao.danhsachvitrilaymau is not None:
                    for vitrimau in baocao.danhsachvitrilaymau:
                        if( vitrimau is not None and vitrimau["danhgia"] is not None and vitrimau["danhgia"] ==1):
                            tong_mau_dat_quychuan_ngoaikiem_trungtam += 1
                        else:
                            tong_mau_khongdat_quychuan_ngoaikiem_trungtam +=1
                
                if baocao.ketquangoaikiemchatluongnuoc is not None and baocao.thunghiem_chatluong_nuoc == 1:
                    for thongso in baocao.ketquangoaikiemchatluongnuoc:
                        if thongso is not None and "danhgia" in thongso and thongso["danhgia"] == 0:
                            obj_thongso = to_dict(thongso)
                            item_map_thongso = {}
                            if obj_thongso['id'] in map_thongso_khongdat:
                                item_map_thongso = map_thongso_khongdat[obj_thongso['id']]
                            else:
                                map_thongso_khongdat[obj_thongso['id']] = {}
                                
                            if "tenthongso" not in item_map_thongso:
                                item_map_thongso["tenthongso"] = obj_thongso["tenthongso"]
                            if "id" not in item_map_thongso:
                                item_map_thongso["id"] = obj_thongso["id"]
                            if "mathongso" not in item_map_thongso:
                                item_map_thongso["mathongso"] = obj_thongso["mathongso"]
                            
                            
                            
                            if "ketquakiemtra" not in obj_thongso or obj_thongso["ketquakiemtra"] is None or len(obj_thongso["ketquakiemtra"])==0:
                                item_map_thongso['solan_khongdat'] = 1
                                item_map_thongso["danhsach_donvicapnuoc"] = [{"id":str(baocao.donvicapnuoc_id),"ten":baocao.tendonvicapnuoc,"solan":1}]
                            else: 
                    
                                for mauthongso in obj_thongso["ketquakiemtra"]:
                                    if "danhgia" in mauthongso and int(mauthongso["danhgia"]) == 0:
                                        item_thongso_khongdat = copy.deepcopy(obj_thongso)
                                        if "solan_khongdat" not in item_map_thongso:
                                            item_map_thongso["solan_khongdat"] = 1
                                        else:
                                            item_map_thongso["solan_khongdat"] += 1
                                        
                                        if "danhsach_donvicapnuoc" not in item_map_thongso:
                                            item_map_thongso["danhsach_donvicapnuoc"] = [{"id":str(baocao.donvicapnuoc_id),"ten":baocao.tendonvicapnuoc,"solan":1}]
                                        else:
                                            danhsachdonvi = item_map_thongso["danhsach_donvicapnuoc"]
                                            danhsachdonvi_new = []
                                            check_exist_donvicapnuoc = False
                                            for dv in danhsachdonvi:
                                                if(dv['id'] == str(baocao.donvicapnuoc_id)):
                                                    check_exist_donvicapnuoc = True
                                                    dv['solan'] +=1
                                                danhsachdonvi_new.append(dv)
                                                
                                            if check_exist_donvicapnuoc == False:
                                                danhsachdonvi_new.append({"id":str(baocao.donvicapnuoc_id),"ten":baocao.tendonvicapnuoc,"solan":1}) 
                                            item_map_thongso["danhsach_donvicapnuoc"] = danhsachdonvi_new
                                    
                            map_thongso_khongdat[obj_thongso['id']] = item_map_thongso       
                                    
#                 #danh sach ket qua cac thong so
#                 if baocao.ketquangoaikiemchatluongnuoc is not None and baocao.thunghiem_chatluong_nuoc == 1:
#                     for thongso in baocao.ketquangoaikiemchatluongnuoc:
#                         if thongso is not None and "danhgia" in thongso and thongso["danhgia"] == 0:
#                             obj_thongso = to_dict(thongso)
#                             for mauthongso in obj_thongso["ketquakiemtra"]:
#                                 if "danhgia" in mauthongso and mauthongso["danhgia"] == 0:
#                                     item_thongso_khongdat = copy.deepcopy(obj_thongso)
#                                     item_thongso_khongdat['donvicapnuoc_id'] = str(baocao.donvicapnuoc_id)
#                                     item_thongso_khongdat['tendonvicapnuoc'] = baocao.tendonvicapnuoc
#                                     item_thongso_khongdat['mavitri'] = mauthongso["mavitri"]
#                                     item_thongso_khongdat['tenvitri'] = mauthongso["tenvitri"]
#                                     item_thongso_khongdat['ketqua'] = mauthongso["ketqua"]
#                                     item_thongso_khongdat['ngaykiemtra'] = mauthongso["ngaykiemtra"]
#                                     item_thongso_khongdat['danhgia'] = mauthongso["danhgia"]
#                                     item_thongso_khongdat['tendonvingoaikiem'] = baocao.tendonvi_ngoaikiem
#                                     thongso_khongdat_ngoaikiem_trungtam.append(item_thongso_khongdat)

    for key, value in map_thongso_khongdat.items():
        value["tyle"] = 0 if tong_mau_khongdat_quychuan_ngoaikiem_trungtam == 0 else round((value['solan_khongdat']/tong_mau_khongdat_quychuan_ngoaikiem_trungtam)*100, 2)
        thongso_khongdat_ngoaikiem_trungtam.append(value)
    
    thongso_khongdat_ngoaikiem_trungtam.sort(key=lambda x: x['solan_khongdat'], reverse=True)
    
    data["tong_donvi_capnuoc_thuchien_ngoaikiem"] = len(donvicapnuocid_ngoaikiem)

    # data["tongdat_laphoso_theoquydinh_ngoaikiem"] = tongdat_laphoso_theoquydinh_ngoaikiem
    data["tongdat_hoso_daydu_theoquydinh_ngoaikiem"] = tongdat_hoso_daydu_theoquydinh_ngoaikiem
    data["tongdat_somau_thunghiem_dungquydinh_ngoaikiem"] = tongdat_somau_thunghiem_dungquydinh_ngoaikiem
    data["tongdat_thunghiem_daydu_thongso_ngoaikiem"] = tongdat_thunghiem_daydu_thongso_ngoaikiem
    data["tongdat_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem"] = tongdat_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem
    data["tongdat_thuchien_baocao_daydu_ngoaikiem"] = tongdat_thuchien_baocao_daydu_ngoaikiem
    data["tongdat_thuchien_congkhai_thongtin_ngoaikiem"] = tongdat_thuchien_congkhai_thongtin_ngoaikiem
    data["tongdat_thuchien_bienphap_khacphuc_ngoaikiem"] = tongdat_thuchien_bienphap_khacphuc_ngoaikiem

    data["thongbao_thongtin_chatluongnuoc"] = thongbao_thongtin_chatluongnuoc
    data["congkhai_thongtin_coquan_ngoaikiem"] = congkhai_thongtin_coquan_ngoaikiem
    data["thongbao_coquan_thamquyen"] = thongbao_coquan_thamquyen
    data["thongbao_donvi_chuquan"] = thongbao_donvi_chuquan

    data["tong_maunuoc_thunghiem_noikiem"] = tong_maunuoc_thunghiem_noikiem
    data["tong_mau_dat_quychuan_noikiem"] = tong_mau_dat_quychuan_noikiem
    
    data["tong_maunuoc_thunghiem_ngoaikiem_trungtam"] = tong_maunuoc_thunghiem_ngoaikiem_trungtam
    data["tong_mau_dat_quychuan_ngoaikiem_trungtam"] = tong_mau_dat_quychuan_ngoaikiem_trungtam
    data["tong_mau_khongdat_quychuan_ngoaikiem_trungtam"] = tong_mau_khongdat_quychuan_ngoaikiem_trungtam
    data["thongso_khongdat_ngoaikiem_trungtam"] = thongso_khongdat_ngoaikiem_trungtam  
    # data["tong_donvi_capnuoc_thuchien_ngoaikiem"] = tong_donvi_capnuoc_thuchien_ngoaikiem
  

async def process_baocao_nuocsach_huyentinh_ketqua_tonghop(baocao_tonghops=None, data=None):
    
    arr_donvicapnuoc = []
    hoso_quanly_noikiem = []
    tong_maunuoc_thunghiem_noikiem = 0
    tong_mau_dat_quychuan_noikiem = 0
    tong_mau_khongdat_quychuan_noikiem = 0
    thongso_khongdat_noikiem = []
    
    danhsach_donvi_ngoaikiem = []
    hoso_quanly_ngoaikiem_baocao = []
    tong_maunuoc_thunghiem_ngoaikiem_baocao = 0
    tong_mau_dat_quychuan_ngoaikiem_baocao = 0
    tong_mau_khongdat_quychuan_ngoaikiem_baocao = 0
    thongso_khongdat_ngoaikiem_baocao = []
    for bc in baocao_tonghops:
        baocao = copy.deepcopy(bc)
        
        if (data["loaikybaocao"] == LoaiKyBaoCao.QUY):
            if (baocao.kybaocao == data["kybaocao"]):
                item_hoso_quanly_noikiem ={}
                item_hoso_quanly_noikiem["tendonvicapnuoc"] = baocao.tendonvicapnuoc
                item_hoso_quanly_noikiem["donvicapnuoc_id"] = str(baocao.donvicapnuoc_id)
                item_hoso_quanly_noikiem["congsuat_thietke"] = float(baocao.congsuat_thietke)
                item_hoso_quanly_noikiem["tong_laphoso_theoquydinh_noikiem"] = baocao.tong_laphoso_theoquydinh_noikiem
                item_hoso_quanly_noikiem["tong_hoso_daydu_theoquydinh_noikiem"] = baocao.tong_hoso_daydu_theoquydinh_noikiem
                item_hoso_quanly_noikiem["tong_somau_thunghiem_dungquydinh_noikiem"] = baocao.tong_somau_thunghiem_dungquydinh_noikiem
                item_hoso_quanly_noikiem["tong_thunghiem_daydu_thongso_noikiem"] = baocao.tong_thunghiem_daydu_thongso_noikiem
                item_hoso_quanly_noikiem["tong_tansuat_thuchien_noikiem_dungquydinh_noikiem"] = baocao.tong_tansuat_thuchien_noikiem_dungquydinh_noikiem
                item_hoso_quanly_noikiem["tong_thuchien_baocao_daydu_noikiem"] = baocao.tong_thuchien_baocao_daydu_noikiem
                item_hoso_quanly_noikiem["tong_thuchien_congkhai_thongtin_noikiem"] = baocao.tong_thuchien_congkhai_thongtin_noikiem
                item_hoso_quanly_noikiem["tong_thuchien_bienphap_khacphuc_dat_noikiem"] = baocao.tong_thuchien_bienphap_khacphuc_dat_noikiem
                hoso_quanly_noikiem.append(item_hoso_quanly_noikiem)
                tong_maunuoc_thunghiem_noikiem += baocao.tong_maunuoc_thunghiem_noikiem
                tong_mau_dat_quychuan_noikiem += baocao.tong_mau_dat_quychuan_noikiem
                tong_mau_khongdat_quychuan_noikiem += baocao.tong_mau_khongdat_quychuan_noikiem

                if baocao.thongso_khongdat_noikiem is not None:
                    for thongso in baocao.thongso_khongdat_noikiem:
                        item_thongso_khongdat_noikiem = copy.deepcopy(thongso)
                        item_thongso_khongdat_noikiem["tendonvicapnuoc"] = baocao.tendonvicapnuoc
                        item_thongso_khongdat_noikiem["donvicapnuoc_id"] = str(baocao.donvicapnuoc_id)
                        thongso_khongdat_noikiem.append(item_thongso_khongdat_noikiem)
                
                if baocao.donvi_thuchien_ngoaikiem is not None:
                    for item in baocao.donvi_thuchien_ngoaikiem:
                        obj_donvi_ngoaikiem = copy.deepcopy(item)
                        obj_donvi_ngoaikiem["tendonvicapnuoc"] = baocao.tendonvicapnuoc
                        obj_donvi_ngoaikiem["donvicapnuoc_id"] = str(baocao.donvicapnuoc_id)
                        danhsach_donvi_ngoaikiem.append(obj_donvi_ngoaikiem)
                
                item_hoso_quanly_ngoaikiem ={}
                item_hoso_quanly_ngoaikiem["tendonvicapnuoc"] = baocao.tendonvicapnuoc
                item_hoso_quanly_ngoaikiem["donvicapnuoc_id"] = str(baocao.donvicapnuoc_id)
                item_hoso_quanly_ngoaikiem["congsuat_thietke"] = float(baocao.congsuat_thietke)
                item_hoso_quanly_ngoaikiem["tong_laphoso_theoquydinh_ngoaikiem"] = baocao.tong_laphoso_theoquydinh_ngoaikiem
                item_hoso_quanly_ngoaikiem["tong_hoso_daydu_theoquydinh_ngoaikiem"] = baocao.tong_hoso_daydu_theoquydinh_ngoaikiem
                item_hoso_quanly_ngoaikiem["tong_somau_thunghiem_dungquydinh_ngoaikiem"] = baocao.tong_somau_thunghiem_dungquydinh_ngoaikiem
                item_hoso_quanly_ngoaikiem["tong_thunghiem_daydu_thongso_ngoaikiem"] = baocao.tong_thunghiem_daydu_thongso_ngoaikiem
                item_hoso_quanly_ngoaikiem["tong_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem"] = baocao.tong_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem
                item_hoso_quanly_ngoaikiem["tong_thuchien_baocao_daydu_ngoaikiem"] = baocao.tong_thuchien_baocao_daydu_ngoaikiem
                item_hoso_quanly_ngoaikiem["tong_thuchien_congkhai_thongtin_ngoaikiem"] = baocao.tong_thuchien_congkhai_thongtin_ngoaikiem
                item_hoso_quanly_ngoaikiem["tong_thuchien_bienphap_khacphuc_dat_ngoaikiem"] = baocao.tong_thuchien_bienphap_khacphuc_dat_ngoaikiem
                hoso_quanly_ngoaikiem_baocao.append(item_hoso_quanly_ngoaikiem)
                
                tong_maunuoc_thunghiem_ngoaikiem_baocao += baocao.tong_maunuoc_thunghiem_ngoaikiem
                tong_mau_dat_quychuan_ngoaikiem_baocao += baocao.tong_mau_dat_quychuan_ngoaikiem
                tong_mau_khongdat_quychuan_ngoaikiem_baocao += baocao.tong_mau_khongdat_quychuan_ngoaikiem
                
                if baocao.thongso_khongdat_ngoaikiem is not None:
                    for item in baocao.thongso_khongdat_ngoaikiem:
                        obj_thongso_khongdat_ngoaikiem = copy.deepcopy(item)
                        obj_thongso_khongdat_ngoaikiem["tendonvicapnuoc"] = baocao.tendonvicapnuoc
                        obj_thongso_khongdat_ngoaikiem["donvicapnuoc_id"] = str(baocao.donvicapnuoc_id)
                        thongso_khongdat_ngoaikiem_baocao.append(obj_thongso_khongdat_ngoaikiem)
                
        elif (data["loaikybaocao"] == LoaiKyBaoCao.SAUTHANG or data["loaikybaocao"] == LoaiKyBaoCao.NAM):
            if baocao.donvicapnuoc_id not in arr_donvicapnuoc:
                item_hoso_quanly_noikiem ={}
                item_hoso_quanly_noikiem["tendonvicapnuoc"] = baocao.tendonvicapnuoc
                item_hoso_quanly_noikiem["donvicapnuoc_id"] = str(baocao.donvicapnuoc_id)
                item_hoso_quanly_noikiem["congsuat_thietke"] = float(baocao.congsuat_thietke)
                item_hoso_quanly_noikiem["tong_laphoso_theoquydinh_noikiem"] = 0
                item_hoso_quanly_noikiem["tong_hoso_daydu_theoquydinh_noikiem"] = 0
                item_hoso_quanly_noikiem["tong_somau_thunghiem_dungquydinh_noikiem"] = 0
                item_hoso_quanly_noikiem["tong_thunghiem_daydu_thongso_noikiem"] = 0
                item_hoso_quanly_noikiem["tong_tansuat_thuchien_noikiem_dungquydinh_noikiem"] = 0
                item_hoso_quanly_noikiem["tong_thuchien_baocao_daydu_noikiem"] = 0
                item_hoso_quanly_noikiem["tong_thuchien_congkhai_thongtin_noikiem"] = 0
                item_hoso_quanly_noikiem["tong_thuchien_bienphap_khacphuc_dat_noikiem"] = 0
                
                item_hoso_quanly_ngoaikiem ={}
                item_hoso_quanly_ngoaikiem["tendonvicapnuoc"] = baocao.tendonvicapnuoc
                item_hoso_quanly_ngoaikiem["donvicapnuoc_id"] = str(baocao.donvicapnuoc_id)
                item_hoso_quanly_ngoaikiem["congsuat_thietke"] = float(baocao.congsuat_thietke)
                item_hoso_quanly_ngoaikiem["tong_laphoso_theoquydinh_ngoaikiem"] = 0
                item_hoso_quanly_ngoaikiem["tong_hoso_daydu_theoquydinh_ngoaikiem"] = 0
                item_hoso_quanly_ngoaikiem["tong_somau_thunghiem_dungquydinh_ngoaikiem"] = 0
                item_hoso_quanly_ngoaikiem["tong_thunghiem_daydu_thongso_ngoaikiem"] = 0
                item_hoso_quanly_ngoaikiem["tong_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem"] = 0
                item_hoso_quanly_ngoaikiem["tong_thuchien_baocao_daydu_ngoaikiem"] = 0
                item_hoso_quanly_ngoaikiem["tong_thuchien_congkhai_thongtin_ngoaikiem"] = 0
                item_hoso_quanly_ngoaikiem["tong_thuchien_bienphap_khacphuc_dat_ngoaikiem"] = 0
                        
                
                for bc_quy in baocao_tonghops:
                    baocao_quy = copy.deepcopy(bc_quy)
                    if (baocao_quy.donvicapnuoc_id == baocao.donvicapnuoc_id):
                        if data["loaikybaocao"] == LoaiKyBaoCao.SAUTHANG and baocao_quy.kybaocao>2:
                            continue
                        item_hoso_quanly_noikiem["tong_laphoso_theoquydinh_noikiem"] += baocao_quy.tong_laphoso_theoquydinh_noikiem
                        item_hoso_quanly_noikiem["tong_hoso_daydu_theoquydinh_noikiem"] += baocao_quy.tong_hoso_daydu_theoquydinh_noikiem
                        item_hoso_quanly_noikiem["tong_somau_thunghiem_dungquydinh_noikiem"] += baocao_quy.tong_somau_thunghiem_dungquydinh_noikiem
                        item_hoso_quanly_noikiem["tong_thunghiem_daydu_thongso_noikiem"] += baocao_quy.tong_thunghiem_daydu_thongso_noikiem
                        item_hoso_quanly_noikiem["tong_tansuat_thuchien_noikiem_dungquydinh_noikiem"] += baocao_quy.tong_tansuat_thuchien_noikiem_dungquydinh_noikiem
                        item_hoso_quanly_noikiem["tong_thuchien_baocao_daydu_noikiem"] += baocao_quy.tong_thuchien_baocao_daydu_noikiem
                        item_hoso_quanly_noikiem["tong_thuchien_congkhai_thongtin_noikiem"] += baocao_quy.tong_thuchien_congkhai_thongtin_noikiem
                        item_hoso_quanly_noikiem["tong_thuchien_bienphap_khacphuc_dat_noikiem"] += baocao_quy.tong_thuchien_bienphap_khacphuc_dat_noikiem
                        
                        tong_maunuoc_thunghiem_noikiem += baocao_quy.tong_maunuoc_thunghiem_noikiem
                        tong_mau_dat_quychuan_noikiem += baocao_quy.tong_mau_dat_quychuan_noikiem
                        tong_mau_khongdat_quychuan_noikiem += baocao_quy.tong_mau_khongdat_quychuan_noikiem
                        
                        if baocao_quy.thongso_khongdat_noikiem is not None:
                            for thongso in baocao_quy.thongso_khongdat_noikiem:
                                item_thongso_khongdat_noikiem = copy.deepcopy(thongso)
                                item_thongso_khongdat_noikiem["tendonvicapnuoc"] = baocao.tendonvicapnuoc
                                item_thongso_khongdat_noikiem["donvicapnuoc_id"] = str(baocao.donvicapnuoc_id)
                                thongso_khongdat_noikiem.append(item_thongso_khongdat_noikiem)
                        
                        if baocao_quy.donvi_thuchien_ngoaikiem is not None:
                            for item in baocao_quy.donvi_thuchien_ngoaikiem:
                                obj_donvi_ngoaikiem = copy.deepcopy(item)
                                obj_donvi_ngoaikiem["tendonvicapnuoc"] = baocao.tendonvicapnuoc
                                obj_donvi_ngoaikiem["donvicapnuoc_id"] = str(baocao.donvicapnuoc_id)
                                danhsach_donvi_ngoaikiem.append(obj_donvi_ngoaikiem)
                        
                        item_hoso_quanly_ngoaikiem["tong_laphoso_theoquydinh_ngoaikiem"] += baocao_quy.tong_laphoso_theoquydinh_ngoaikiem
                        item_hoso_quanly_ngoaikiem["tong_hoso_daydu_theoquydinh_ngoaikiem"] += baocao_quy.tong_hoso_daydu_theoquydinh_ngoaikiem
                        item_hoso_quanly_ngoaikiem["tong_somau_thunghiem_dungquydinh_ngoaikiem"] += baocao_quy.tong_somau_thunghiem_dungquydinh_ngoaikiem
                        item_hoso_quanly_ngoaikiem["tong_thunghiem_daydu_thongso_ngoaikiem"] += baocao_quy.tong_thunghiem_daydu_thongso_ngoaikiem
                        item_hoso_quanly_ngoaikiem["tong_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem"] += baocao_quy.tong_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem
                        item_hoso_quanly_ngoaikiem["tong_thuchien_baocao_daydu_ngoaikiem"] += baocao_quy.tong_thuchien_baocao_daydu_ngoaikiem
                        item_hoso_quanly_ngoaikiem["tong_thuchien_congkhai_thongtin_ngoaikiem"] += baocao_quy.tong_thuchien_congkhai_thongtin_ngoaikiem
                        item_hoso_quanly_ngoaikiem["tong_thuchien_bienphap_khacphuc_dat_ngoaikiem"] += baocao_quy.tong_thuchien_bienphap_khacphuc_dat_ngoaikiem
                        
                        tong_maunuoc_thunghiem_ngoaikiem_baocao += baocao_quy.tong_maunuoc_thunghiem_ngoaikiem
                        tong_mau_dat_quychuan_ngoaikiem_baocao += baocao_quy.tong_mau_dat_quychuan_ngoaikiem
                        tong_mau_khongdat_quychuan_ngoaikiem_baocao += baocao_quy.tong_mau_khongdat_quychuan_ngoaikiem
                        if baocao_quy.thongso_khongdat_ngoaikiem is not None:
                            for item in baocao_quy.thongso_khongdat_ngoaikiem:
                                obj_thongso_khongdat_ngoaikiem = copy.deepcopy(item)
                                obj_thongso_khongdat_ngoaikiem["tendonvicapnuoc"] = baocao.tendonvicapnuoc
                                obj_thongso_khongdat_ngoaikiem["donvicapnuoc_id"] = str(baocao.donvicapnuoc_id)
                                thongso_khongdat_ngoaikiem_baocao.append(obj_thongso_khongdat_ngoaikiem)
                               
                hoso_quanly_noikiem.append(item_hoso_quanly_noikiem)
                hoso_quanly_ngoaikiem_baocao.append(item_hoso_quanly_ngoaikiem)
                
                
        if (baocao.donvicapnuoc_id not in arr_donvicapnuoc):
            arr_donvicapnuoc.append(baocao.donvicapnuoc_id)        
                
            
        
    data["hoso_quanly_noikiem"] = hoso_quanly_noikiem
    data["tong_maunuoc_thunghiem_noikiem"] = tong_maunuoc_thunghiem_noikiem
    data["tong_mau_dat_quychuan_noikiem"] = tong_mau_dat_quychuan_noikiem
    data["tong_mau_khongdat_quychuan_noikiem"] = tong_mau_khongdat_quychuan_noikiem
    data["thongso_khongdat_noikiem"] = thongso_khongdat_noikiem
    
    data["danhsach_donvi_ngoaikiem"] = danhsach_donvi_ngoaikiem
    data["hoso_quanly_ngoaikiem_baocao"] = hoso_quanly_ngoaikiem_baocao
    data["tong_maunuoc_thunghiem_ngoaikiem_baocao"] = tong_maunuoc_thunghiem_ngoaikiem_baocao
    data["tong_mau_dat_quychuan_ngoaikiem_baocao"] = tong_mau_dat_quychuan_ngoaikiem_baocao
    data["tong_mau_khongdat_quychuan_ngoaikiem_baocao"] = tong_mau_khongdat_quychuan_ngoaikiem_baocao
    data["thongso_khongdat_ngoaikiem_baocao"] = thongso_khongdat_ngoaikiem_baocao
    
    
        
async def prepost_baocao_vien_chuyennganh_nuocsach(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    if ("loaikybaocao" not in data or data['loaikybaocao']  is None or "kybaocao" not in data or data["kybaocao"] is None):
        return json({"error_code":"PARAMS_ERROR", "error_message":"Kỳ báo cáo không hợp lệ"}, status=520)

    record = db.session.query(BaoCaoVienChuyenNganhNuoc).filter(and_(BaoCaoVienChuyenNganhNuoc.donvi_id == currentuser.donvi_id, \
                                                      BaoCaoVienChuyenNganhNuoc.loaikybaocao == data['loaikybaocao'], \
                                                      BaoCaoVienChuyenNganhNuoc.kybaocao == data['kybaocao'], \
                                                      BaoCaoVienChuyenNganhNuoc.nambaocao == data['nambaocao'])).first()
    
    if record is not None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Kỳ báo cáo hiện tại đã được tạo, vui lòng kiểm tra lại"}, status=520)
      
    data['tinhtrang'] = TinhTrangBaocaoEnum.taomoi
    data['donvi_id'] = currentuser.donvi_id
    data['nguoibaocao_id'] = currentuser.id
    await process_baocao_vien_chuyennganh_nuocsach(currentuser, data)       
    
async def preput_baocao_vien_chuyennganh_nuocsach(request=None, data=None, Model=None, **kw):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
    if "nambaocao" not in data or data["nambaocao"] is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    if ("loaikybaocao" not in data or data['loaikybaocao']  is None or "kybaocao" not in data or data["kybaocao"] is None):
        return json({"error_code":"PARAMS_ERROR", "error_message":"Kỳ báo cáo không hợp lệ"}, status=520)

    await process_baocao_vien_chuyennganh_nuocsach(currentuser, data)

async def process_baocao_vien_chuyennganh_nuocsach(currentuser=None, data=None):
    
    tong_tinh_phutrach = 0
    tong_tinh_cobaocao = 0
    tong_donvi_capnuoc_phutrach = 0
    tong_hogiadinh_duoccungcapnuoc = 0
    tong_hogiadinh_diaban = 0
    ketqua_kiemtra_noikiem_tinh = []
    
    vien_info = db.session.query(MapVienChuyenNganhNuocVaTinh).filter(MapVienChuyenNganhNuocVaTinh.donvi_id == currentuser.donvi_id).first()
    if(vien_info is not None and vien_info.danhsachtinhthanh is not None):
        tong_tinh_phutrach = len(vien_info.danhsachtinhthanh)
        tinhthanh_ids =[]
        for item_tinh in vien_info.danhsachtinhthanh:
            tinhthanh_ids.append(item_tinh["id"])
        
        
        danhmuc_thongso = db.session.query(DanhMucThongSoNuocSach).all()
        
            
        danhsach_baocao_tinh = db.session.query(BaoCaoNuocSachHuyenTinh).filter(and_(BaoCaoNuocSachHuyenTinh.loaibaocao == 1, \
                              BaoCaoNuocSachHuyenTinh.tinhthanh_id.in_(tinhthanh_ids), \
                              BaoCaoNuocSachHuyenTinh.loaikybaocao == data['loaikybaocao'], \
                              BaoCaoNuocSachHuyenTinh.kybaocao == data['kybaocao'], \
                              BaoCaoNuocSachHuyenTinh.nambaocao == data['nambaocao'])).all()
        
        if (danhsach_baocao_tinh is not None):
            tong_tinh_cobaocao = len(danhsach_baocao_tinh)
            for bacao_tinh in danhsach_baocao_tinh:
                baocao = copy.deepcopy(bacao_tinh)
                tong_donvi_capnuoc_phutrach += baocao.tong_donvi_capnuoc
                tong_hogiadinh_duoccungcapnuoc += baocao.tong_hogiadinh_duoccungcapnuoc
                tong_hogiadinh_diaban += baocao.tong_hogiadinh_diaban
                bc_tinhthanh = {}
                bc_tinhthanh["tentinhthanh"] = bacao_tinh.tinhthanh.ten
                bc_tinhthanh["tinhthanh_id"] = str(baocao.tinhthanh_id)
                bc_tinhthanh["tong_donvi_capnuoc"] = baocao.tong_donvi_capnuoc
                bc_tinhthanh["tong_maunuoc_thunghiem_noikiem"] = baocao.tong_maunuoc_thunghiem_noikiem
                bc_tinhthanh["tong_mau_dat_quychuan_noikiem"] = baocao.tong_mau_dat_quychuan_noikiem
                bc_tinhthanh["tong_mau_khongdat_quychuan_noikiem"] = baocao.tong_mau_khongdat_quychuan_noikiem
                
                danhsach_thongso_noikiem_khongdat = []
                if danhmuc_thongso is not None:
                    for ts in danhmuc_thongso:
                        item_thongso = to_dict(ts)
                        item_thongso["solan_khongdat"] = 0
                        danhsach_thongso_noikiem_khongdat.append(item_thongso)
                item_thongso_noikiem_khongdat = []
                if baocao.thongso_khongdat_noikiem is not None:
                    for thongso_khongdat  in baocao.thongso_khongdat_noikiem:
                        for idx, val in enumerate(danhsach_thongso_noikiem_khongdat):
                            if(thongso_khongdat['id'] == danhsach_thongso_noikiem_khongdat[idx]['id']):
                                danhsach_thongso_noikiem_khongdat[idx]["solan_khongdat"] +=1
                                break;
                
                bc_tinhthanh["thongso_khongdat_noikiem"] = ujson.loads(ujson.dumps(danhsach_thongso_noikiem_khongdat))
                ketqua_kiemtra_noikiem_tinh.append(bc_tinhthanh)
                
                
    data["tong_tinh_phutrach"] = tong_tinh_phutrach
    data["tong_tinh_cobaocao"] = tong_tinh_cobaocao
    data["tong_donvi_capnuoc_phutrach"] = tong_donvi_capnuoc_phutrach
    data["tong_hogiadinh_duoccungcapnuoc"] = tong_hogiadinh_duoccungcapnuoc
    data["tong_hogiadinh_diaban"] = tong_hogiadinh_diaban
    data["ketqua_kiemtra_noikiem_tinh"] = ketqua_kiemtra_noikiem_tinh
    
    await process_baocao_vien_chuyennganh_ngoaikiem(currentuser, data)

async def process_baocao_vien_chuyennganh_ngoaikiem(currentuser=None, data=None):
    
    kybaocao = data['kybaocao']
    loaikybaocao = data["loaikybaocao"]
    startDate = date(data['nambaocao'], 1,1)
    endDate = date(data['nambaocao'], 1,1)
    if (loaikybaocao is not None and loaikybaocao == LoaiKyBaoCao.SAUTHANG):
        startDate = date(data['nambaocao'], 1,1)
        endDate = date(data['nambaocao'], 6,30)
    elif (loaikybaocao is not None and loaikybaocao == LoaiKyBaoCao.NAM):
        startDate = date(data['nambaocao'], 1,1)
        endDate = date(data['nambaocao'], 12,31)

    tong_maunuoc_thunghiem_ngoaikiem_vien = 0
    tong_mau_dat_quychuan_ngoaikiem_vien = 0
    tong_mau_khongdat_quychuan_ngoaikiem_vien = 0
    thongso_khongdat_ngoaikiem_vien = []
    
    
    baocao_ngoaikiems = db.session.query(KetQuaNgoaiKiemChatLuongNuocSach).filter(and_(KetQuaNgoaiKiemChatLuongNuocSach.donvi_id == currentuser.donvi_id, \
                 KetQuaNgoaiKiemChatLuongNuocSach.ngaybaocao >= startDate, \
                 KetQuaNgoaiKiemChatLuongNuocSach.ngaybaocao <= endDate, \
                 KetQuaNgoaiKiemChatLuongNuocSach.nambaocao == data['nambaocao'])).all()
                 
    if baocao_ngoaikiems is not None and len(baocao_ngoaikiems)>0:
        for bc in baocao_ngoaikiems:
            baocao = copy.deepcopy(bc)
            if baocao is not None:
                tong_maunuoc_thunghiem_ngoaikiem_vien += baocao.somauvavitri
                if baocao.danhsachvitrilaymau is not None:
                    for vitrimau in baocao.danhsachvitrilaymau:
                        if( vitrimau is not None and vitrimau["danhgia"] is not None and vitrimau["danhgia"] ==1):
                            tong_mau_dat_quychuan_ngoaikiem_vien += 1
                        else:
                            tong_mau_khongdat_quychuan_ngoaikiem_vien +=1
                
                #danh sach ket qua cac thong so
                if baocao.ketquangoaikiemchatluongnuoc is not None and baocao.thunghiem_chatluong_nuoc == 1:
                    for thongso in baocao.ketquangoaikiemchatluongnuoc:
                        if thongso is not None and "danhgia" in thongso and thongso["danhgia"] == 0:
                            obj_thongso = to_dict(thongso)
                            for mauthongso in obj_thongso["ketquakiemtra"]:
                                if "danhgia" in mauthongso and mauthongso["danhgia"] == 0:
                                    item_thongso_khongdat = copy.deepcopy(obj_thongso)
                                    item_thongso_khongdat['donvicapnuoc_id'] = str(baocao.donvicapnuoc_id)
                                    item_thongso_khongdat['tendonvicapnuoc'] = baocao.tendonvicapnuoc
                                    item_thongso_khongdat['mavitri'] = mauthongso["mavitri"]
                                    item_thongso_khongdat['tenvitri'] = mauthongso["tenvitri"]
                                    item_thongso_khongdat['ketqua'] = mauthongso["ketqua"]
                                    item_thongso_khongdat['ngaykiemtra'] = mauthongso["ngaykiemtra"]
                                    item_thongso_khongdat['danhgia'] = mauthongso["danhgia"]
                                    thongso_khongdat_ngoaikiem_vien.append(item_thongso_khongdat)
    
    data["tong_maunuoc_thunghiem_ngoaikiem_vien"] = tong_maunuoc_thunghiem_ngoaikiem_vien
    data["tong_mau_dat_quychuan_ngoaikiem_vien"] = tong_mau_dat_quychuan_ngoaikiem_vien
    data["tong_mau_khongdat_quychuan_ngoaikiem_vien"] = tong_mau_khongdat_quychuan_ngoaikiem_vien
    data["thongso_khongdat_ngoaikiem_vien"] = thongso_khongdat_ngoaikiem_vien
    
                        
apimanager.create_api(KetQuaNoiKiemChatLuongNuocSach,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany], POST=[auth_func, prepost_KetQuaNoiKiemChatLuongNuocSach], PUT_SINGLE=[auth_func, preput_KetQuaNoiKiemChatLuongNuocSach], DELETE_SINGLE=[auth_func]),
    collection_name='ketqua_noikiem_chatluong_nuocsach')


apimanager.create_api(TongHopKetQuaKiemTraChatLuongNuocSach,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany], POST=[auth_func, prepost_tonghopketqua_chatluongnuoc], PUT_SINGLE=[auth_func, preput_tonghopketqua_chatluongnuoc], DELETE_SINGLE=[auth_func]),
    collection_name='tonghop_ketqua_chatluong_nuocsach')

apimanager.create_api(BaoCaoNuocSachHuyenTinh,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany], POST=[auth_func,prepost_baocao_nuocsach_huyentinh], PUT_SINGLE=[auth_func, preput_baocao_nuocsach_huyentinh], DELETE_SINGLE=[auth_func]),
    postprocess=dict(POST=[], PUT_SINGLE=[], DELETE_SINGLE=[],GET_MANY =[]),
    collection_name='baocao_nuocsach_huyentinh')

apimanager.create_api(BaoCaoVienChuyenNganhNuoc,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany], POST=[auth_func, prepost_baocao_vien_chuyennganh_nuocsach], PUT_SINGLE=[auth_func, preput_baocao_vien_chuyennganh_nuocsach], DELETE_SINGLE=[auth_func]),
    collection_name='baocao_vienchuyennganh_nuoc')



@app.route('/api/v1/timkiembaocao_nuoc', methods=['GET'])
async def TimKiemBaoCaoNuoc(request):
    nambaocao = request.args.get("nambaocao", None)
    loaikybaocao = request.args.get("loaikybaocao", None)
    kybaocao = request.args.get("kybaocao", None)
    tinhthanh_id = request.args.get("tinhthanh_id", None)
    quanhuyen_id = request.args.get("quanhuyen_id", None)
    donvicapnuoc_id = request.args.get("donvicapnuoc_id", None)
    viennuocsach_id = request.args.get("viennuocsach_id", None)
    
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    if "loaikybaocao" is None or "kybaocao" is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Kỳ báo cáo không hợp lệ"}, status=520)
    if "nambaocao" is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    record = None
    tuyendonvi = None
    response = None
    if(donvicapnuoc_id is not None and donvicapnuoc_id != ""):
        record = db.session.query(TongHopKetQuaKiemTraChatLuongNuocSach).filter(and_(TongHopKetQuaKiemTraChatLuongNuocSach.donvicapnuoc_id == donvicapnuoc_id,\
                                                      TongHopKetQuaKiemTraChatLuongNuocSach.loaikybaocao == loaikybaocao, \
                                                      TongHopKetQuaKiemTraChatLuongNuocSach.kybaocao == kybaocao, \
                                                      TongHopKetQuaKiemTraChatLuongNuocSach.nambaocao == nambaocao)).first()
        if (record is not None):
            response = to_dict(record)
            response["donvicapnuoc"] = to_dict(record.donvicapnuoc)                                            
        tuyendonvi = "donvicapnuoc"                                              
    elif(viennuocsach_id is not None and viennuocsach_id != ""):
        record = db.session.query(BaoCaoVienChuyenNganhNuoc).filter(and_(BaoCaoVienChuyenNganhNuoc.donvi_id == viennuocsach_id, \
                                                      BaoCaoVienChuyenNganhNuoc.loaikybaocao == loaikybaocao, \
                                                      BaoCaoVienChuyenNganhNuoc.kybaocao == kybaocao, \
                                                      BaoCaoVienChuyenNganhNuoc.nambaocao == nambaocao)).first()
        if (record is not None):
            response = to_dict(record)                                         
        tuyendonvi = "viennuocsach"
    else:
        if currentuser.donvi.tuyendonvi_id == 3:
            if(quanhuyen_id is None or quanhuyen_id == ""):
                quanhuyen_id = currentuser.donvi.quanhuyen_id
            record = db.session.query(BaoCaoNuocSachHuyenTinh).filter(and_(BaoCaoNuocSachHuyenTinh.quanhuyen_id == quanhuyen_id, \
                                                        BaoCaoNuocSachHuyenTinh.loaibaocao == 2, \
                                                        BaoCaoNuocSachHuyenTinh.loaikybaocao == loaikybaocao, \
                                                        BaoCaoNuocSachHuyenTinh.kybaocao == kybaocao, \
                                                        BaoCaoNuocSachHuyenTinh.nambaocao == nambaocao)).first()
            if (record is not None):
                response = to_dict(record)
            tuyendonvi = "quanhuyen"     
        elif currentuser.donvi.tuyendonvi_id == 2:
            if(tinhthanh_id is None or tinhthanh_id == ""):
                tinhthanh_id = currentuser.donvi.tinhthanh_id                                       
            record = db.session.query(BaoCaoNuocSachHuyenTinh).filter(and_(BaoCaoNuocSachHuyenTinh.tinhthanh_id == tinhthanh_id, \
                                                        BaoCaoNuocSachHuyenTinh.loaibaocao == 1, \
                                                        BaoCaoNuocSachHuyenTinh.loaikybaocao == loaikybaocao, \
                                                        BaoCaoNuocSachHuyenTinh.kybaocao == kybaocao, \
                                                        BaoCaoNuocSachHuyenTinh.nambaocao == nambaocao)).first()
            if (record is not None):
                response = to_dict(record)
            tuyendonvi = "tinhthanh"                                            
    if record is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Không tìm thấy báo cáo của đơn vị, vui lòng kiểm tra lại"}, status=520)
    else:    
        return json({"data":response, "tuyendonvi":tuyendonvi})
    
    
@app.route('/api/v1/timkiemdonvi_chualambaocao', methods=['GET'])
async def TimKiemDonVi_ChuaLam_BaoCaoNuoc(request):
    nambaocao = request.args.get("nambaocao", None)
    loaikybaocao = request.args.get("loaikybaocao", None)
    kybaocao = request.args.get("kybaocao", None)
    tinhthanh_id = request.args.get("tinhthanh_id", None)
    quanhuyen_id = request.args.get("quanhuyen_id", None)
    
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    if "loaikybaocao" is None or "kybaocao" is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Kỳ báo cáo không hợp lệ"}, status=520)
    if "nambaocao" is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)
    tuyendonvi = "address"
    response = []
    donvicapnuocs = None
    if(quanhuyen_id is not None and quanhuyen_id!=""  and quanhuyen_id !="undefined"):
        donvicapnuocs = db.session.query(DonViCapNuoc).\
        filter(DonViCapNuoc.quanhuyen_id == quanhuyen_id).\
        filter(DonViCapNuoc.congsuat <1000).\
        filter(DonViCapNuoc.trangthai == 1).\
        order_by(desc(DonViCapNuoc.congsuat)).all()
    elif(tinhthanh_id is not None and tinhthanh_id!=""  and tinhthanh_id !="undefined"):
        donvicapnuocs = db.session.query(DonViCapNuoc).\
        filter(DonViCapNuoc.tinhthanh_id == tinhthanh_id).\
        filter(DonViCapNuoc.trangthai == 1).\
        order_by(desc(DonViCapNuoc.congsuat)).all()
    elif (currentuser.donvi.tuyendonvi_id == 3):
        donvicapnuocs = db.session.query(DonViCapNuoc).\
        filter(DonViCapNuoc.quanhuyen_id == currentuser.donvi.quanhuyen_id).\
        filter(DonViCapNuoc.congsuat <1000 ).\
        filter(DonViCapNuoc.trangthai == 1).\
        order_by(desc(DonViCapNuoc.congsuat)).all()
    elif (currentuser.donvi.tuyendonvi_id == 2):
        donvicapnuocs = db.session.query(DonViCapNuoc).\
        filter(DonViCapNuoc.tinhthanh_id == currentuser.donvi.tinhthanh_id).\
        filter(DonViCapNuoc.trangthai == 1).\
        order_by(desc(DonViCapNuoc.congsuat)).all()
    
    if donvicapnuocs is None:
        if (currentuser.donvi.tuyendonvi_id == 1):
            danhsach_vien = db.session.query(DonVi).filter(DonVi.tuyendonvi_id ==10).order_by(asc(DonVi.ten)).all()
            if danhsach_vien is not None and len(danhsach_vien):
                for vien in danhsach_vien:
                    check_vien = db.session.query(BaoCaoVienChuyenNganhNuoc).filter(and_(BaoCaoVienChuyenNganhNuoc.donvi_id == vien.id, \
                                                              BaoCaoVienChuyenNganhNuoc.loaikybaocao == loaikybaocao, \
                                                              BaoCaoVienChuyenNganhNuoc.kybaocao == kybaocao, \
                                                              BaoCaoVienChuyenNganhNuoc.nambaocao == nambaocao)).count()
                    if (check_vien is not None or check_vien<=0):
                        objdata = to_dict(vien)
                        objdata["type"] ="viennuocsach"
                        response.append(objdata)                                      
            tuyendonvi = "viennuocsach"
            danhsach_tinhthanh = db.session.query(TinhThanh).all()
            if danhsach_tinhthanh is  not None and len(danhsach_tinhthanh)>0:
                for tinh in danhsach_tinhthanh:
                    
                    bc_tinh = db.session.query(BaoCaoNuocSachHuyenTinh).filter(and_(BaoCaoNuocSachHuyenTinh.tinhthanh_id == tinh.id, \
                          BaoCaoNuocSachHuyenTinh.loaibaocao == 2, \
                          BaoCaoNuocSachHuyenTinh.loaikybaocao == loaikybaocao, \
                          BaoCaoNuocSachHuyenTinh.kybaocao == kybaocao, \
                          BaoCaoNuocSachHuyenTinh.nambaocao == nambaocao)).count()
                    if bc_tinh is None or bc_tinh <=0:
                        objdata = to_dict(tinh)
                        objdata["type"] ="tinhthanh"
                        response.append(objdata)
        elif (currentuser.donvi.tuyendonvi_id == 10):
            vien_info = db.session.query(MapVienChuyenNganhNuocVaTinh).filter(MapVienChuyenNganhNuocVaTinh.donvi_id == currentuser.donvi.id).all()
            if vien_info is not None and vien_info.danhsachtinhthanh is not None:
                for tinh in vien_info.danhsachtinhthanh:
                    bc_tinh = db.session.query(BaoCaoNuocSachHuyenTinh).filter(and_(BaoCaoNuocSachHuyenTinh.tinhthanh_id == tinh.id, \
                          BaoCaoNuocSachHuyenTinh.loaibaocao == 2, \
                          BaoCaoNuocSachHuyenTinh.loaikybaocao == loaikybaocao, \
                          BaoCaoNuocSachHuyenTinh.kybaocao == kybaocao, \
                          BaoCaoNuocSachHuyenTinh.nambaocao == nambaocao)).count()
                    if bc_tinh is None or bc_tinh <=0:
                        objdata = to_dict(tinh)
                        objdata["type"] ="tinhthanh"
                        response.append(objdata)
            tuyendonvi = "tinhthanh"
    else:
        for donvi in donvicapnuocs:
            bc_donvi = db.session.query(TongHopKetQuaKiemTraChatLuongNuocSach).filter(and_(TongHopKetQuaKiemTraChatLuongNuocSach.donvicapnuoc_id == donvi.id,\
                                                      TongHopKetQuaKiemTraChatLuongNuocSach.loaikybaocao == loaikybaocao, \
                                                      TongHopKetQuaKiemTraChatLuongNuocSach.kybaocao == kybaocao, \
                                                      TongHopKetQuaKiemTraChatLuongNuocSach.nambaocao == nambaocao)).count()
            if bc_donvi is None or bc_donvi <=0:
                objdata = to_dict(donvi)
                objdata["tinhthanh"] = to_dict(donvi.tinhthanh) if donvi.tinhthanh is not None else None
                objdata["quanhuyen"] = to_dict(donvi.quanhuyen) if donvi.quanhuyen is not None else None
                objdata["type"] ="donvicapnuoc"
                response.append(objdata)
        tuyendonvi = "donvicapnuoc"
                      
    if response is None or len(response) == 0:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Không tìm thấy đơn vị chưa báo cáo"}, status=520)
    else:    
        
        return json(ujson.loads(ujson.dumps({"data":response,"type":tuyendonvi})))
    
    

@app.route('api/v1/thongkenuocsach_duoi1000m3', methods=['GET'])
async def ThongKe_NuocSach_Duoi100m3(request):
    return await process_thongke_nuocsach_trunguong(request, "duoi1000m3")

async def process_thongke_nuocsach_trunguong(request, check_congsuat):
    nambaocao = request.args.get("nambaocao", None)
    loaikybaocao = request.args.get("loaikybaocao", None)
    kybaocao = request.args.get("kybaocao", None)

    startDate = date(int(nambaocao), 1,1)
    endDate = date(int(nambaocao), 1,1)
    if (loaikybaocao is not None and int(loaikybaocao) == LoaiKyBaoCao.QUY):
        if(int(kybaocao) == 1):
            startDate = date(int(nambaocao), 1,1)
            endDate = date(int(nambaocao), 3,31)
        elif(int(kybaocao) == 2):
            startDate = date(int(nambaocao), 4,1)
            endDate = date(int(nambaocao), 6,30)
        elif(int(kybaocao) == 3):
            startDate = date(int(nambaocao), 7,1)
            endDate = date(int(nambaocao), 9,30)
        elif(int(kybaocao) == 4):
            startDate = date(int(nambaocao), 10,1)
            endDate = date(int(nambaocao), 12,31)
    elif (loaikybaocao is not None and int(loaikybaocao) == LoaiKyBaoCao.SAUTHANG and int(kybaocao) == 1):
        startDate = date(int(nambaocao), 1,1)
        endDate = date(int(nambaocao), 6,30)
    elif (loaikybaocao is not None and int(loaikybaocao) == LoaiKyBaoCao.NAM):
        startDate = date(int(nambaocao), 1,1)
        endDate = date(int(nambaocao), 12,31)

    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    if "loaikybaocao" is None or "kybaocao" is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Kỳ báo cáo không hợp lệ"}, status=520)
    if "nambaocao" is None:
        return json({"error_code":"PARAMS_ERROR", "error_message":"Chưa chọn năm báo cáo"}, status=520)

    donvicapnuoc_id = []
    data_result_tinhthanh = {}
    baocao_all = []

    if(currentuser.donvi.tuyendonvi_id == 1):
        danhmuc_donvicapnuoc = None
        if check_congsuat == "duoi1000m3":
            danhmuc_donvicapnuoc = db.session.query(DonViCapNuoc).\
                filter(DonViCapNuoc.trangthai == 1).\
                filter(DonViCapNuoc.congsuat < 1000).all()
        elif check_congsuat == "tren1000m3":
            danhmuc_donvicapnuoc = db.session.query(DonViCapNuoc).\
                filter(DonViCapNuoc.trangthai == 1).\
                filter(DonViCapNuoc.congsuat > 1000).all()
        if danhmuc_donvicapnuoc is None:
            return json({"error_code":"PARAMS_ERROR", "error_message":"Không tìm thấy báo cáo của các đơn vị, vui lòng kiểm tra lại"}, status=520)
        else:
            for item_donvicapnuoc in danhmuc_donvicapnuoc:

                tinhthanh_id = str(item_donvicapnuoc.tinhthanh_id)
                # print("item_donvicapnuoc", item_donvicapnuoc)
                if tinhthanh_id not in data_result_tinhthanh:
                    data_result_tinhthanh[tinhthanh_id] = {}

                if "tong_donvicapnuoc" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh[tinhthanh_id]["tong_donvicapnuoc"] = 0
                data_result_tinhthanh[tinhthanh_id]["tong_donvicapnuoc"] += 1
                
                if "tentinhhthanh" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh[tinhthanh_id]["tentinhthanh"] = ""
                data_result_tinhthanh[tinhthanh_id]["tentinhthanh"] = item_donvicapnuoc.tinhthanh.ten
                
                if "tong_donvicapnuoc_kiemtra" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["tong_donvicapnuoc_kiemtra"] = 0
                    
                if "tong_mauthunghiem_ngoaikiem" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["tong_mauthunghiem_ngoaikiem"] = 0
                    
                if "tong_maudat_qc_ngoaikiem" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["tong_maudat_qc_ngoaikiem"] = 0
                    
                if "tyle_mauthunghiem_ngoaikiem" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["tyle_mauthunghiem_ngoaikiem"] = 0
                    
                if "tong_thongso_khongdat" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["tong_thongso_khongdat"] = []
                    
                if "tong_mauthunghiem_noikiem" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["tong_mauthunghiem_noikiem"] = 0
                    
                if "tong_maudat_qc_noikiem" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["tong_maudat_qc_noikiem"] = 0
                    
                if "tyle_mauthunghiem_noikiem" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["tyle_mauthunghiem_noikiem"] = 0
                    
                if "tongdat_hoso_daydu_theoquydinh" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["tongdat_hoso_daydu_theoquydinh"] = 0
                    
                if "hoso_daydu_theoquydinh" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["hoso_daydu_theoquydinh"] = 0
                    
                if "tyle_hoso_daydu_theoquydinh" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["tyle_hoso_daydu_theoquydinh"] = 0
                    
                if "tongdat_somau_thunghiem_dungquydinh" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["tongdat_somau_thunghiem_dungquydinh"] = 0
                    
                if "somau_thunghiem_dungquydinh" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["somau_thunghiem_dungquydinh"] = 0
                    
                if "tyle_somau_thunghiem_dungquydinh" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["tyle_somau_thunghiem_dungquydinh"] = 0
                    
                if "tongdat_thunghiem_daydu_thongso" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["tongdat_thunghiem_daydu_thongso"] = 0
                
                if "thunghiem_daydu_thongso" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["thunghiem_daydu_thongso"] = 0
                    
                if "tyle_thunghiem_daydu_thongso" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["tyle_thunghiem_daydu_thongso"] = 0
                    
                if "tongdat_tansuat_thuchien_noikiem_dungquydinh" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["tongdat_tansuat_thuchien_noikiem_dungquydinh"] = 0
                    
                if "tansuat_thuchien_noikiem_dungquydinh" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["tansuat_thuchien_noikiem_dungquydinh"] = 0
                    
                if "tyle_tansuat_thuchien_noikiem_dungquydinh" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["tyle_tansuat_thuchien_noikiem_dungquydinh"] = 0
                    
                if "tongdat_thuchien_baocao_daydu" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["tongdat_thuchien_baocao_daydu"] = 0
                    
                if "thuchien_baocao_daydu" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["thuchien_baocao_daydu"] = 0
                    
                if "tyle_thuchien_baocao_daydu" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["tyle_thuchien_baocao_daydu"] = 0
                    
                if "tongdat_thuchien_congkhai_thongtin" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["tongdat_thuchien_congkhai_thongtin"] = 0
                    
                if "thuchien_congkhai_thongtin" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["thuchien_congkhai_thongtin"] = 0
                    
                if "tyle_thuchien_congkhai_thongtin" not in data_result_tinhthanh[tinhthanh_id]:
                    data_result_tinhthanh["tyle_thuchien_congkhai_thongtin"] = 0
                        
                donvicapnuoc_id.append(item_donvicapnuoc.id)

            
        # print("startDate", startDate, "endDate", endDate)

        baocao_ngoaikiems = db.session.query(KetQuaNgoaiKiemChatLuongNuocSach).filter(and_(
                                        KetQuaNgoaiKiemChatLuongNuocSach.donvicapnuoc_id.in_(donvicapnuoc_id), \
                                        KetQuaNgoaiKiemChatLuongNuocSach.thoigiankiemtra >= startDate, \
                                        KetQuaNgoaiKiemChatLuongNuocSach.thoigiankiemtra <= endDate, \
                                        KetQuaNgoaiKiemChatLuongNuocSach.nambaocao == int(nambaocao))).all()

        # print("baocao_ngoaikiems", baocao_ngoaikiems)

        if not baocao_ngoaikiems:
            return json({"error_code":"PARAMS_ERROR", "error_message":"Không tìm thấy báo cáo của các đơn vị, vui lòng kiểm tra lại"}, status=520)
        else:
            for item in baocao_ngoaikiems:
                baocao_tinhthanh_id = str(item.donvicapnuoc.tinhthanh_id)
                donvicapnuoc = to_dict(item.donvicapnuoc)
                item_baocao = to_dict(copy.deepcopy(item))
                item_baocao["donvicapnuoc"] = donvicapnuoc

                if baocao_tinhthanh_id not in data_result_tinhthanh:
                    data_result_tinhthanh[baocao_tinhthanh_id] = {}
                baocao_tinhthanh = to_dict(data_result_tinhthanh[baocao_tinhthanh_id])
                
                
                if "tong_donvicapnuoc_kiemtra" not in baocao_tinhthanh:
                    baocao_tinhthanh["tong_donvicapnuoc_kiemtra"] = 0

                baocao_tinhthanh["tong_donvicapnuoc_kiemtra"] = baocao_tinhthanh["tong_donvicapnuoc_kiemtra"] + 1

                baocao_tinhthanh["tyle_donvicapnuoc"] = 0 if baocao_tinhthanh["tong_donvicapnuoc"] == 0 else round((baocao_tinhthanh["tong_donvicapnuoc_kiemtra"]/baocao_tinhthanh["tong_donvicapnuoc"])*100, 2)

                if "tong_mauthunghiem_ngoaikiem" not in baocao_tinhthanh:
                    baocao_tinhthanh["tong_mauthunghiem_ngoaikiem"] = 0
                baocao_tinhthanh["tong_mauthunghiem_ngoaikiem"] += item_baocao["somauvavitri"]

                if "tong_maudat_qc_ngoaikiem" not in baocao_tinhthanh:
                    baocao_tinhthanh["tong_maudat_qc_ngoaikiem"] = 0
                if item_baocao["danhsachvitrilaymau"] is not None:
                    for vitrimau in item_baocao["danhsachvitrilaymau"]:
                        if(vitrimau is not None and vitrimau["danhgia"] is not None and vitrimau["danhgia"] == 1):
                            baocao_tinhthanh["tong_maudat_qc_ngoaikiem"] += 1

                baocao_tinhthanh["tyle_mauthunghiem_ngoaikiem"] = 0 if baocao_tinhthanh["tong_mauthunghiem_ngoaikiem"] == 0 else round((baocao_tinhthanh["tong_maudat_qc_ngoaikiem"]/baocao_tinhthanh["tong_mauthunghiem_ngoaikiem"])*100, 2)

                if "tong_thongso_khongdat" not in baocao_tinhthanh:
                    baocao_tinhthanh["tong_thongso_khongdat"] = []
                
                if item_baocao["ketquangoaikiemchatluongnuoc"] is not None:
                    for thongso in item_baocao["ketquangoaikiemchatluongnuoc"]:
                        if thongso is not None and thongso["danhgia"] is not None and thongso["danhgia"] == 0:
                            flag = True
                            danhsach_thongso_khongdat = baocao_tinhthanh["tong_thongso_khongdat"]
                            danhsach_khongdat_new = []
                            for ts_khongdat in danhsach_thongso_khongdat:
                                if ts_khongdat['id'] == thongso['id']:
                                    ts_khongdat['number'] = ts_khongdat['number'] +1
                                    flag = False
                                danhsach_khongdat_new.append(ts_khongdat)

                            baocao_tinhthanh["tong_thongso_khongdat"] = danhsach_khongdat_new
                            if flag == True:
                                obj_thongso = {}
                                obj_thongso["id"] = thongso["id"]
                                obj_thongso["tenthongso"] = thongso["tenthongso"]
                                obj_thongso["number"] = 1
                                baocao_tinhthanh["tong_thongso_khongdat"].append(obj_thongso)
                            
                if "tong_mauthunghiem_noikiem" not in baocao_tinhthanh:
                    baocao_tinhthanh["tong_mauthunghiem_noikiem"] = 0
                baocao_tinhthanh["tong_mauthunghiem_noikiem"] += item_baocao["tongsomau_noikiem_thunghiem"]

                if "tong_maudat_qc_noikiem" not in baocao_tinhthanh:
                    baocao_tinhthanh["tong_maudat_qc_noikiem"] = 0
                baocao_tinhthanh["tong_maudat_qc_noikiem"] += item_baocao["tongsomau_noikiem_dat_quychuan"]

                baocao_tinhthanh["tyle_mauthunghiem_noikiem"] = 0 if baocao_tinhthanh["tong_mauthunghiem_noikiem"] == 0 else round((baocao_tinhthanh["tong_maudat_qc_noikiem"]/baocao_tinhthanh["tong_mauthunghiem_noikiem"])*100, 2)

                if "tongdat_hoso_daydu_theoquydinh" not in baocao_tinhthanh:
                    baocao_tinhthanh["tongdat_hoso_daydu_theoquydinh"] = 0
                if item_baocao["hoso_daydu_theoquydinh"] == 1:
                    baocao_tinhthanh["tongdat_hoso_daydu_theoquydinh"] += 1

                baocao_tinhthanh["tyle_hoso_daydu_theoquydinh"] = 0 if baocao_tinhthanh["tong_donvicapnuoc_kiemtra"] == 0 else round((baocao_tinhthanh["tongdat_hoso_daydu_theoquydinh"]/baocao_tinhthanh["tong_donvicapnuoc_kiemtra"])*100, 2)

                if "tongdat_somau_thunghiem_dungquydinh" not in baocao_tinhthanh:
                    baocao_tinhthanh["tongdat_somau_thunghiem_dungquydinh"] = 0
                if item_baocao["somau_thunghiem_dungquydinh"] == 1:
                    baocao_tinhthanh["tongdat_somau_thunghiem_dungquydinh"] += 1

                baocao_tinhthanh["tyle_somau_thunghiem_dungquydinh"] = 0 if baocao_tinhthanh["tong_donvicapnuoc_kiemtra"] == 0 else round((baocao_tinhthanh["tongdat_somau_thunghiem_dungquydinh"]/baocao_tinhthanh["tong_donvicapnuoc_kiemtra"])*100, 2)

                if "tongdat_thunghiem_daydu_thongso" not in baocao_tinhthanh:
                    baocao_tinhthanh["tongdat_thunghiem_daydu_thongso"] = 0
                if item_baocao["thunghiem_daydu_thongso"] == 1:
                    baocao_tinhthanh["tongdat_thunghiem_daydu_thongso"] += 1

                baocao_tinhthanh["tyle_thunghiem_daydu_thongso"] = 0 if baocao_tinhthanh["tong_donvicapnuoc_kiemtra"] == 0 else round((baocao_tinhthanh["tongdat_thunghiem_daydu_thongso"]/baocao_tinhthanh["tong_donvicapnuoc_kiemtra"])*100, 2)

                if "tongdat_tansuat_thuchien_noikiem_dungquydinh" not in baocao_tinhthanh:
                    baocao_tinhthanh["tongdat_tansuat_thuchien_noikiem_dungquydinh"] = 0
                if item_baocao["tansuat_thuchien_noikiem_dungquydinh"] == 1:
                    baocao_tinhthanh["tongdat_tansuat_thuchien_noikiem_dungquydinh"] += 1

                baocao_tinhthanh["tyle_tansuat_thuchien_noikiem_dungquydinh"] = 0 if baocao_tinhthanh["tong_donvicapnuoc_kiemtra"] == 0 else round((baocao_tinhthanh["tongdat_tansuat_thuchien_noikiem_dungquydinh"]/baocao_tinhthanh["tong_donvicapnuoc_kiemtra"])*100, 2)

                if "tongdat_thuchien_baocao_daydu" not in baocao_tinhthanh:
                    baocao_tinhthanh["tongdat_thuchien_baocao_daydu"] = 0
                if item_baocao["thuchien_baocao_daydu"] == 1:
                    baocao_tinhthanh["tongdat_thuchien_baocao_daydu"] += 1

                baocao_tinhthanh["tyle_thuchien_baocao_daydu"] = 0 if baocao_tinhthanh["tong_donvicapnuoc_kiemtra"] == 0 else round((baocao_tinhthanh["tongdat_thuchien_baocao_daydu"]/baocao_tinhthanh["tong_donvicapnuoc_kiemtra"])*100, 2)

                if "tongdat_thuchien_congkhai_thongtin" not in baocao_tinhthanh:
                    baocao_tinhthanh["tongdat_thuchien_congkhai_thongtin"] = 0
                if item_baocao["thuchien_congkhai_thongtin"] == 1:
                    baocao_tinhthanh["tongdat_thuchien_congkhai_thongtin"] += 1

                baocao_tinhthanh["tyle_thuchien_congkhai_thongtin"] = 0 if baocao_tinhthanh["tong_donvicapnuoc_kiemtra"] == 0 else round((baocao_tinhthanh["tongdat_thuchien_congkhai_thongtin"]/baocao_tinhthanh["tong_donvicapnuoc_kiemtra"])*100, 2)

                data_result_tinhthanh[baocao_tinhthanh_id] =  baocao_tinhthanh

        for key, value in data_result_tinhthanh.items():
            baocao_all.append(value)
            
        if (len(baocao_all) > 0):
            tong_63tinh = {}
            tong_63tinh_donvicapnuoc = 0
            tong_63tinh_donvicapnuoc_kiemtra = 0
            tong_63tinh_tyle_donvicapnuoc = 0
            tong_63tinh_mauthunghiem_ngoaikiem = 0
            tong_63tinh_maudat_qc_ngoaikiem = 0
            tong_63tinh_tyle_mauthunghiem_ngoaikiem = 0
            tong_63tinh_mauthunghiem_noikiem = 0
            tong_63tinh_maudat_qc_noikiem = 0
            tong_63tinh_tyle_mauthunghiem_noikiem = 0
            tong_63tinh_hoso_daydu_theoquydinh = 0
            tong_63tinh_tyle_hoso_daydu_theoquydinh = 0
            tong_63tinh_somau_thunghiem_dungquydinh = 0
            tong_63tinh_tyle_somau_thunghiem_dungquydinh = 0
            tong_63tinh_tansuat_thuchien_noikiem_dungquydinh = 0
            tong_63tinh_thunghiem_daydu_thongso = 0
            tong_63tinh_tyle_thunghiem_daydu_thongso = 0
            tong_63tinh_tyle_tansuat_thuchien_noikiem_dungquydinh = 0
            tong_63tinh_thuchien_baocao_daydu = 0
            tong_63tinh_tyle_thuchien_baocao_daydu = 0
            tong_63tinh_thuchien_congkhai_thongtin = 0
            tong_63tinh_tyle_thuchien_congkhai_thongtin = 0

            for baocao_tinh in baocao_all:
                tong_63tinh["tentinhthanh"] = "Cả nước"
                tong_63tinh_donvicapnuoc += int(baocao_tinh["tong_donvicapnuoc"]) if "tong_donvicapnuoc" in  baocao_tinh else 0
                tong_63tinh["tong_donvicapnuoc"] = tong_63tinh_donvicapnuoc

                tong_63tinh_donvicapnuoc_kiemtra += baocao_tinh["tong_donvicapnuoc_kiemtra"] if "tong_donvicapnuoc_kiemtra" in  baocao_tinh else 0
                tong_63tinh["tong_donvicapnuoc_kiemtra"] = tong_63tinh_donvicapnuoc_kiemtra

                tong_63tinh_tyle_donvicapnuoc += baocao_tinh["tyle_donvicapnuoc"] if "tyle_donvicapnuoc" in  baocao_tinh and baocao_tinh['tyle_donvicapnuoc'] is not None else 0
                tong_63tinh["tyle_donvicapnuoc"] = round((tong_63tinh_tyle_donvicapnuoc/len(baocao_all)), 2)

                tong_63tinh_mauthunghiem_ngoaikiem += baocao_tinh["tong_mauthunghiem_ngoaikiem"] if "tong_mauthunghiem_ngoaikiem" in  baocao_tinh and baocao_tinh['tong_mauthunghiem_ngoaikiem'] is not None else 0
                tong_63tinh["tong_mauthunghiem_ngoaikiem"] = tong_63tinh_mauthunghiem_ngoaikiem

                tong_63tinh_maudat_qc_ngoaikiem += baocao_tinh["tong_maudat_qc_ngoaikiem"] if "tong_maudat_qc_ngoaikiem" in  baocao_tinh and baocao_tinh['tong_maudat_qc_ngoaikiem'] is not None else 0
                tong_63tinh["tong_maudat_qc_ngoaikiem"] = tong_63tinh_maudat_qc_ngoaikiem

                tong_63tinh_tyle_mauthunghiem_ngoaikiem += baocao_tinh["tyle_mauthunghiem_ngoaikiem"] if "tyle_mauthunghiem_ngoaikiem" in  baocao_tinh and baocao_tinh['tyle_mauthunghiem_ngoaikiem'] is not None else 0
                tong_63tinh["tyle_mauthunghiem_ngoaikiem"] = round((tong_63tinh_tyle_mauthunghiem_ngoaikiem/len(baocao_all)), 2)

                tong_63tinh_mauthunghiem_noikiem += baocao_tinh["tong_mauthunghiem_noikiem"] if "tong_mauthunghiem_noikiem" in  baocao_tinh and baocao_tinh['tong_mauthunghiem_noikiem'] is not None else 0
                tong_63tinh["tong_mauthunghiem_noikiem"] = tong_63tinh_mauthunghiem_noikiem

                tong_63tinh_maudat_qc_noikiem += baocao_tinh["tong_maudat_qc_noikiem"] if "tong_maudat_qc_noikiem" in  baocao_tinh and baocao_tinh['tong_maudat_qc_noikiem'] is not None else 0
                tong_63tinh["tong_maudat_qc_noikiem"] = tong_63tinh_maudat_qc_noikiem

                tong_63tinh_tyle_mauthunghiem_noikiem += baocao_tinh["tyle_mauthunghiem_noikiem"] if "tyle_mauthunghiem_noikiem" in  baocao_tinh and baocao_tinh['tyle_mauthunghiem_noikiem'] is not None else 0
                tong_63tinh["tyle_mauthunghiem_noikiem"] = round((tong_63tinh_tyle_mauthunghiem_noikiem/len(baocao_all)), 2)

                tong_63tinh_hoso_daydu_theoquydinh += baocao_tinh["tongdat_hoso_daydu_theoquydinh"] if "tongdat_hoso_daydu_theoquydinh" in  baocao_tinh and baocao_tinh['tongdat_hoso_daydu_theoquydinh'] is not None else 0
                tong_63tinh["tongdat_hoso_daydu_theoquydinh"] = tong_63tinh_hoso_daydu_theoquydinh

                tong_63tinh_tyle_hoso_daydu_theoquydinh += baocao_tinh["tyle_hoso_daydu_theoquydinh"] if "tyle_hoso_daydu_theoquydinh" in  baocao_tinh and baocao_tinh['tyle_hoso_daydu_theoquydinh'] is not None else 0
                tong_63tinh["tyle_hoso_daydu_theoquydinh"] = round((tong_63tinh_tyle_hoso_daydu_theoquydinh/len(baocao_all)), 2)

                tong_63tinh_somau_thunghiem_dungquydinh += baocao_tinh["tongdat_somau_thunghiem_dungquydinh"] if "tongdat_somau_thunghiem_dungquydinh" in  baocao_tinh and baocao_tinh['tongdat_somau_thunghiem_dungquydinh'] is not None else 0
                tong_63tinh["tongdat_somau_thunghiem_dungquydinh"] = tong_63tinh_somau_thunghiem_dungquydinh

                tong_63tinh_tyle_somau_thunghiem_dungquydinh += baocao_tinh["tyle_somau_thunghiem_dungquydinh"] if "tyle_somau_thunghiem_dungquydinh" in  baocao_tinh and baocao_tinh['tyle_somau_thunghiem_dungquydinh'] is not None else 0
                tong_63tinh["tyle_somau_thunghiem_dungquydinh"] = round((tong_63tinh_tyle_somau_thunghiem_dungquydinh/len(baocao_all)), 2)

                tong_63tinh_thunghiem_daydu_thongso += baocao_tinh["tongdat_thunghiem_daydu_thongso"] if "tongdat_thunghiem_daydu_thongso" in  baocao_tinh and baocao_tinh['tongdat_thunghiem_daydu_thongso'] is not None else 0
                tong_63tinh["tongdat_thunghiem_daydu_thongso"] = tong_63tinh_thunghiem_daydu_thongso

                tong_63tinh_tyle_thunghiem_daydu_thongso += baocao_tinh["tyle_thunghiem_daydu_thongso"] if "tyle_thunghiem_daydu_thongso" in  baocao_tinh and baocao_tinh['tyle_thunghiem_daydu_thongso'] is not None else 0
                tong_63tinh["tyle_thunghiem_daydu_thongso"] = round((tong_63tinh_tyle_thunghiem_daydu_thongso/len(baocao_all)), 2)

                tong_63tinh_tansuat_thuchien_noikiem_dungquydinh += baocao_tinh["tongdat_tansuat_thuchien_noikiem_dungquydinh"] if "tongdat_tansuat_thuchien_noikiem_dungquydinh" in  baocao_tinh and baocao_tinh['tongdat_tansuat_thuchien_noikiem_dungquydinh'] is not None else 0
                tong_63tinh["tongdat_tansuat_thuchien_noikiem_dungquydinh"] = tong_63tinh_tansuat_thuchien_noikiem_dungquydinh

                tong_63tinh_tyle_tansuat_thuchien_noikiem_dungquydinh += baocao_tinh["tyle_tansuat_thuchien_noikiem_dungquydinh"] if "tyle_tansuat_thuchien_noikiem_dungquydinh" in  baocao_tinh and baocao_tinh['tyle_tansuat_thuchien_noikiem_dungquydinh'] is not None else 0
                tong_63tinh["tyle_tansuat_thuchien_noikiem_dungquydinh"] = round((tong_63tinh_tyle_tansuat_thuchien_noikiem_dungquydinh/len(baocao_all)), 2)

                tong_63tinh_thuchien_baocao_daydu += baocao_tinh["tongdat_thuchien_baocao_daydu"] if "tongdat_thuchien_baocao_daydu" in  baocao_tinh and baocao_tinh['tongdat_thuchien_baocao_daydu'] is not None else 0
                tong_63tinh["tongdat_thuchien_baocao_daydu"] = tong_63tinh_thuchien_baocao_daydu

                tong_63tinh_tyle_thuchien_baocao_daydu += baocao_tinh["tyle_thuchien_baocao_daydu"] if "tyle_thuchien_baocao_daydu" in  baocao_tinh and baocao_tinh['tyle_thuchien_baocao_daydu'] is not None else 0
                tong_63tinh["tyle_thuchien_baocao_daydu"] = round((tong_63tinh_tyle_thuchien_baocao_daydu/len(baocao_all)), 2)

                tong_63tinh_thuchien_congkhai_thongtin += baocao_tinh["tongdat_thuchien_congkhai_thongtin"] if "tongdat_thuchien_congkhai_thongtin" in  baocao_tinh and baocao_tinh['tongdat_thuchien_congkhai_thongtin'] is not None else 0
                tong_63tinh["tongdat_thuchien_congkhai_thongtin"] = tong_63tinh_thuchien_congkhai_thongtin

                tong_63tinh_tyle_thuchien_congkhai_thongtin += baocao_tinh["tyle_thuchien_congkhai_thongtin"] if "tyle_thuchien_congkhai_thongtin" in  baocao_tinh and baocao_tinh['tyle_thuchien_congkhai_thongtin'] is not None else 0
                tong_63tinh["tyle_thuchien_congkhai_thongtin"] = round((tong_63tinh_tyle_thuchien_congkhai_thongtin/len(baocao_all)), 2)

            baocao_all.append(tong_63tinh)

        return json(baocao_all)    
    
    return json({"error_code":"PARAMS_ERROR", "error_message":"Bạn không có quyền xem thông tin thống kê này"}, status=520)

@app.route('api/v1/thongkenuocsach_tren1000m3', methods=['GET'])
async def ThongKe_NuocSach_Tren100m3(request):
    return await process_thongke_nuocsach_trunguong(request, "tren1000m3")

    
    
@app.route('/api/v1/caidatthongso/update', methods=['POST'])
async def caidatthongso(request):
    danhsachthongso = request.json.get("danhsachthongso", None)
    if danhsachthongso is None:
        return json({"error_code":"PARAMS_ERROR","error_message":"Tham số không hợp lệ!"}, status=520)
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
    
    if currentuser.donvi.tuyendonvi_id !=2:
        return json({"error_code":"PERMISSION_DENY","error_message":"Chức năng chỉ dành cho đơn vị cấp Tỉnh"}, status=520)

    thongso_tinhthanh = db.session.query(CaiDatThongSoNuocDiaPhuong).filter(CaiDatThongSoNuocDiaPhuong.tinhthanh_id == str(currentuser.donvi.tinhthanh_id)).first()
    if (thongso_tinhthanh is not None):
        thongso_tinhthanh.danhsachthongso = danhsachthongso
        db.session.commit()
        return json({"error_message":"OK"})
    else:
        return json({"error_code":"NOT_FOUND","error_message":"Không tìm thấy dữ liệu"}, status=520)
 
@app.route('/api/v1/caidatthongsonuoc', methods=['GET'])
async def getListThongSoNuoc(request):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
    

    thongso_tinhthanh = db.session.query(CaiDatThongSoNuocDiaPhuong).filter(CaiDatThongSoNuocDiaPhuong.tinhthanh_id == str(currentuser.donvi.tinhthanh_id)).first()
    if (thongso_tinhthanh is not None):
        return json({"objects":thongso_tinhthanh.danhsachthongso})
    else:
        return json({"error_code":"NOT_FOUND","error_message":"Không tìm thấy dữ liệu"}, status=520)
 




            

            