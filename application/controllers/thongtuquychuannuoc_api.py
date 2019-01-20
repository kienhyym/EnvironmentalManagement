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
from sqlalchemy import or_, and_
from application.client import HTTPClient
from application.models.model_user import TinhTrangBaocaoEnum
from datetime import datetime, date
from gatco_restapi.helpers import to_dict



apimanager.create_api(DonViCapNuoc,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='donvicapnuoc')

apimanager.create_api(MapVienChuyenNganhNuocVaTinh,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='map_vienchuyennganhnuoc_tinh')

apimanager.create_api(ThongSoBaoCaoChatLuongNuoc,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='thongsobaocaochatluongnuoc')

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
                        if( vitrimau is not None and vitrimau["ketqua"] is not None and vitrimau["ketqua"] ==1):
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
                        if( vitrimau is not None and vitrimau["ketqua"] is not None and vitrimau["ketqua"] ==1):
                            tong_mau_dat_quychuan_ngoaikiem += 1
                        else:
                            tong_mau_khongdat_quychuan_ngoaikiem +=1
                
                #danh sach ket qua cac thong so
                if baocao.ketquangoaikiemchatluongnuoc is not None:
                    for thongso in baocao.ketquangoaikiemchatluongnuoc:
                        if thongso is not None and "danhgia" in thongso and thongso["danhgia"] == 0:
                            obj_thongso = to_dict(thongso)
                            for mauthongso in obj_thongso["ketquakiemtra"]:
                                if "danhgia" in mauthongso and mauthongso["danhgia"] == 0:
                                    item_thongso_khongdat = copy.deepcopy(obj_thongso)
                                    item_thongso_khongdat['mavitri'] = mauthongso["mavitri"]
                                    item_thongso_khongdat['tenvitri'] = mauthongso["tenvitri"]
                                    item_thongso_khongdat['ketqua'] = mauthongso["ketqua"]
                                    item_thongso_khongdat['ngaykiemtra'] = mauthongso["ngaykiemtra"]
                                    item_thongso_khongdat['danhgia'] = mauthongso["danhgia"]
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
    
            
                        
                        
                        
apimanager.create_api(KetQuaNoiKiemChatLuongNuocSach,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany], POST=[auth_func, prepost_KetQuaNoiKiemChatLuongNuocSach], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='ketqua_noikiem_chatluong_nuocsach')


apimanager.create_api(TongHopKetQuaKiemTraChatLuongNuocSach,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany], POST=[auth_func, prepost_tonghopketqua_chatluongnuoc], PUT_SINGLE=[auth_func, preput_tonghopketqua_chatluongnuoc], DELETE_SINGLE=[auth_func]),
    collection_name='tonghop_ketqua_chatluong_nuocsach')

apimanager.create_api(BaoCaoNuocSachHuyenTinh,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='baocao_nuocsach_huyentinh')

apimanager.create_api(BaoCaoVienChuyenNganhNuoc,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, entity_pregetmany], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
    collection_name='baocao_vienchuyennganh_nuoc')



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
