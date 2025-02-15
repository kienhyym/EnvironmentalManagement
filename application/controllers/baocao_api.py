# import asyncio
# import aiohttp
# import hashlib
# import ujson
# from application.extensions import apimanager
# from application.server import app
# from application.database import db
# from sqlalchemy.orm import aliased, joinedload_all
# from gatco.response import json, text, html
# 
# from .helpers import *
# from application.models.model_baocao import *
# from sqlalchemy import or_
# from application.client import HTTPClient 
# 
# from application.controllers.preprocess_baocao import post_capthon, pre_post_capxa,baocao_prepost_thon,\
# reponse_capxa_single,baocao_preput_thon,reponse_caphuyen_single,pre_post_huyen
# 
# 
#    
# apimanager.create_api(KhaiThacNuocNgam,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='khaithacnuocngam')
# 
# apimanager.create_api(KhaiThacNuocSong,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='khaithacnuocsong')
# 
# 
# apimanager.create_api(KhaiThacNuocTuHoChua,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='khaithacnuoctuhochua')
# 
# 
# apimanager.create_api(PhieuNoiKiemChatLuong,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='phieunoikiemchatluong')
# 
# ######
# 
# apimanager.create_api(KQPhieuNoiKiemChatLuong,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kqphieunoikiemtrachatluong')
# 
# 
# apimanager.create_api(PhieuNgoaiKiemChatLuong,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='phieungoaikiemchatluong')
# 
# apimanager.create_api(KiemTraNguonNuocHoGiaDinh,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kiemtranguonnuochogiadinh')
# 
# 
# apimanager.create_api(NguonNuocTuChay,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='nguonnuoctuchay')
# 
# ######
# 
# apimanager.create_api(KTNuocHoGiaDinh,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='ktnuochogiadinh')
# 
# 
# apimanager.create_api(NguonNuocTuChay,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='NguonNuocTuChay')
# 
# 
# apimanager.create_api(NguonNuocGiengDao,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='nguonnuocgiengdao')
# 
# 
# apimanager.create_api(NguonNuocGiengKhoanTren25m,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='nguonnuocgiengkhoantren25m')
# 
# ######
# 
# apimanager.create_api(NguonNuocGiengKhoanDuoi25m,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='nguonnuocgiengkhoanduoi25m')
# 
# 
# apimanager.create_api(HeThongThuHungNuocMua,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='hethongthuhungnuocmua')
# 
# 
# apimanager.create_api(LuuTruNuocBECHUMVAI,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='luutrunuocbechumvai')
# 
# 
# apimanager.create_api(KiemTraVSChatLuongNuocThanhPham,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kiemtrachatluongnuocthanhpham')
# 
# 
# ######
# 
# apimanager.create_api(TongHopKQNuocSinhHoatTren1000m,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='tonghopkqnuocsinhhoattren1000m')
# 
# 
# # apimanager.create_api(NhanLucThamGiaKiemTra,
# #     methods=['GET', 'POST', 'DELETE', 'PUT'],
# #     url_prefix='/api/v1',
# #     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
# #     collection_name='nhanlucthamgiakiemtra')
# 
# 
# apimanager.create_api(KQChatLuongNuocAnUong,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kqchatluongnuocanuong')
# 
# 
# apimanager.create_api(CoSoCapNuocDuoi1000m,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='cosocapnuocduoi1000m')
# 
# 
# ######
# 
# apimanager.create_api(CoSoCapNuocDuoi1000mKoDat,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='cosocapnuocduoi1000mkodat')
# 
# apimanager.create_api(KQNgoaiKiemNuocSinhHoat,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kqngoaikiemnuocsinhhoat')
# 
# apimanager.create_api(KQKT1000mNuocHoGiaDinh,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kqkt1000mnuochogiadinh')
# 
# 
# apimanager.create_api(KQKT1000mNuocHoGiaDinhKoDat,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kqkt1000mnuochogiadinhkodat')
# 
# 
# apimanager.create_api(KQKTChatLuongNuocSinhHoatCapHuyen,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kqktchatluongnuocsinhhoatcaphuyen')
# 
# apimanager.create_api(KQVSCoSoCungCapNuocHoGdCapHuyen,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kqvscosocungcapnuochogdcaphuyen')
# 
# 
# 
# apimanager.create_api(KQVSCSCungCapNuocGdKoDatCapHuyen,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kqvscscungcapnuocgdkdatcaphuyen')
# 
# apimanager.create_api(KQKTVeSinhNuocSinhHoatCapXa,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kqktvesinhnuocsinhhoatcapxa')
# 
# apimanager.create_api(KQVSCoSoCungCapNuocHoGdCapXa,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kqvscosocungcapnuochogdcapxa')
# 
# apimanager.create_api(KQVSCSCungCapNuocGdKoDatCapXa,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kqvscscungcapnuocgdkdatcapxa')
# 
# apimanager.create_api(BCThuThapDuLieu,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='bcthuthapdulieu')
# 
# apimanager.create_api(TongHopThuThap,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='tonghopthuthap')
# 
# 
# apimanager.create_api(BanGiaoDuLieuDaThuThap,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='bangiaodulieudathuthap')
# 
# apimanager.create_api(BanGiaoThuThap,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='bangiaothuthap')
# 
# apimanager.create_api(PhanLoaiVaDanhGiaDuLieu,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='phanloaivadanhgiadulieu')
# 
# apimanager.create_api(DanhGiaBanGiaoThuThap,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='danhgiabangiaothuthap')
# 
# apimanager.create_api(BCXayDungDuLieuDacTa,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='bcxaydungdulieudacta')
# 
# apimanager.create_api(NhanLucSuaChua,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='nhanlucsuachua')
# 
# apimanager.create_api(KetQuaSuaChua,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='ketquasuachua')
# 
# apimanager.create_api(KetQuaSuaChuaDuLieu,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='ketquasuachuadulieu')
# 
# apimanager.create_api(BCKetQuaSuaChua,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='bcketquasuachua')
# 
# apimanager.create_api(BCKetQuaKiemTra,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='bcketquakiemtra')
# 
# apimanager.create_api(KQNhanLucThamGiaKT,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kqnhanlucthamgiakt')
# 
# apimanager.create_api(KQNhanLucThamGiaKTDacTa,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='kqnhanlucthamgiaktdacta')
# 
# apimanager.create_api(BienBanBanGiaoSanPham,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='bienbanbangiaosanpham')
# 
# apimanager.create_api(CungNhauBanGiaoSanPham,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='cungnhaubangiaosanpham')
# 
# ##############################################
# apimanager.create_api(NhaTieuTuHoai,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='nhatieutuhoai')
# 
# apimanager.create_api(NhaTieuThamDoiNuoc,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='nhatieuthamdoinuoc')
# 
# apimanager.create_api(DungChoNhaTieu2Ngan,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='dungchonhatieu2ngan')
# 
# apimanager.create_api(NhaTieuThongHoi,
#     methods=['GET', 'POST', 'DELETE', 'PUT'],
#     url_prefix='/api/v1',
#     preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func], DELETE_SINGLE=[auth_func]),
#     collection_name='nhatieuthonghoi')
# 
# #BM
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 


