import uuid

from application.database import db
from application.database.model import CommonModel

from sqlalchemy import (DECIMAL, Boolean, Column, Date, DateTime, Float,ForeignKey, Integer,SmallInteger, String, Text,JSON, UniqueConstraint)
from sqlalchemy.dialects.postgresql import  UUID, JSONB
from sqlalchemy.orm import *
from sqlalchemy.orm import backref, relationship
from sqlalchemy.orm.collections import attribute_mapped_collection

def default_uuid():
    return str(uuid.uuid4())

class MapVienChuyenNganhNuocVaTinh(CommonModel):
    __tablename__ = 'map_vienchuyennganhnuoc_tinh'
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=True)
    user = db.relationship('User', viewonly=True)
    danhsachtinhthanh = db.Column(JSONB)
    
    
class ThongSoBaoCaoChatLuongNuoc(CommonModel):
    __tablename__ = 'thongsobaocaochatluongnuoc'
    mathongso = db.Column(db.String)
    tenthongso = db.Column(db.String)
    gioihan_toida_txt = db.Column(db.String)
    gioihan_toida = db.Column(DECIMAL)
    gioihan_toithieu_txt = db.Column(db.String)
    gioihan_toithieu = db.Column(DECIMAL)
    batbuoc = db.Column(db.Boolean)
    baocaoapdung = db.Column(JSONB)

#Danh muc cac don vi cap nuoc
class DonViCapNuoc(CommonModel):
    __tablename__ = 'donvicapnuoc'
    ten = db.Column(db.String)
    ma = db.Column(db.String)
    diachi = db.Column(db.String)
    congsuat = db.Column(DECIMAL)
    tongso_hogiadinh = db.Column(db.Integer)
    tansuat_noikiem = db.Column(db.Integer)
    nguonnuoc_nguyenlieu = db.Column(db.SmallInteger)
    phuongphap_khutrung = db.Column(db.SmallInteger)
    
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = relationship('XaPhuong')

## Mau so 5TT - Bao cao so 1: Bao Cao Kết quả nội kiểm chất lượng nước sạch    
class KetQuaNoiKiemChatLuongNuocSach(CommonModel):
    __tablename__ = 'ketqua_noikiem_chatluong_nuocsach'
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    nguoibaocao_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=True)
    nguoibaocao = db.relationship('User', viewonly=True)
    tinhtrang = db.Column(db.SmallInteger,nullable=False)
    nambaocao = db.Column(db.Integer, nullable=False)
    ngaybaocao = db.Column(db.DateTime())
    donvicapnuoc_id = db.Column(UUID(as_uuid=True), db.ForeignKey('donvicapnuoc.id'), nullable=False)
    donvicapnuoc = db.relationship('DonViCapNuoc', viewonly=True)
    tendonvicapnuoc = db.Column(db.String)
    diachi_donvicapnuoc = db.Column(db.String)
    congsuat_thietke = db.Column(DECIMAL)
    tongso_hogiadinh = db.Column(db.Integer, default=0)
    nguonnuoc_nguyenlieu = db.Column(db.SmallInteger)
    tansuat_noikiem = db.Column(db.Integer)
    thoigiankiemtra = db.Column(db.DateTime())
    nguoikiemtra = db.Column(db.String)
    
    laphoso_theoquydinh = db.Column(db.SmallInteger, default=0)
    hoso_daydu_theoquydinh = db.Column(db.SmallInteger, default=0)
    tailieu_thieu = db.Column(db.String)
    somau_thunghiem_dungquydinh = db.Column(db.SmallInteger, default=0)
    thunghiem_daydu_thongso = db.Column(db.SmallInteger, default=0)
    tansuat_thuchien_noikiem_dungquydinh = db.Column(db.SmallInteger, default=0)
    thuchien_baocao_daydu = db.Column(db.SmallInteger, default=0)
    thuchien_congkhai_thongtin = db.Column(db.SmallInteger, default=0)
    thuchien_bienphap_khacphuc = db.Column(db.SmallInteger, default=0)
    
    somauvavitri = db.Column(db.Integer, default=0)
    danhsachvitrilaymau = db.Column(JSONB)
    
    ketquanoikiemchatluongnuoc = db.Column(JSONB)
    ketquanoikiem = db.Column(db.SmallInteger, default=0)
    nhanxet = db.Column(db.String)
    
    cothuchien_khacphuc = db.Column(db.SmallInteger, default=0)
    bienphap_khacphuc = db.Column(db.String)
    
    
    kiennghi = db.Column(db.String)
    ketluan = db.Column(db.String)
    



##MauSo 1 ket qua ngoai kiem nuoc sach
class KetQuaNgoaiKiemChatLuongNuocSach(CommonModel):
    __tablename__ = 'ketqua_ngoaikiem_chatluong_nuocsach'
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    nguoibaocao_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=True)
    nguoibaocao = db.relationship('User', viewonly=True)
    tinhtrang = db.Column(db.SmallInteger,nullable=False)
    nambaocao = db.Column(db.Integer, nullable=False)
    ngaybaocao = db.Column(db.DateTime())
    
    donvicapnuoc_id = db.Column(UUID(as_uuid=True), db.ForeignKey('donvicapnuoc.id'), nullable=False)
    donvicapnuoc = db.relationship('DonViCapNuoc', viewonly=True)
    tendonvicapnuoc = db.Column(db.String)
    diachi_donvicapnuoc = db.Column(db.String)
    congsuat_thietke = db.Column(DECIMAL)
    tongso_hogiadinh = db.Column(db.Integer, default=0)
    nguonnuoc_nguyenlieu = db.Column(db.SmallInteger)
    tansuat_noikiem = db.Column(db.String)
    thoigiankiemtra = db.Column(db.DateTime())
    
    tendonvi_ngoaikiem = db.Column(db.String)
    noidung_ngoaikiem = db.Column(db.String)
    thunghiem_chatluong_nuoc = db.Column(db.SmallInteger, default=0)
    loai_donvi_kiemtra = db.Column(db.SmallInteger)
    thanhphan_doankiemtra = db.Column(db.String)
    
    laphoso_theoquydinh = db.Column(db.SmallInteger, default=0)
    hoso_daydu_theoquydinh = db.Column(db.SmallInteger, default=0)
    tailieu_thieu = db.Column(db.String)
    somau_thunghiem_dungquydinh = db.Column(db.SmallInteger, default=0)
    thunghiem_daydu_thongso = db.Column(db.SmallInteger, default=0)
    tansuat_thuchien_noikiem_dungquydinh = db.Column(db.SmallInteger, default=0)
    thuchien_baocao_daydu = db.Column(db.SmallInteger, default=0)
    thuchien_congkhai_thongtin = db.Column(db.SmallInteger, default=0)
    thuchien_bienphap_khacphuc = db.Column(db.SmallInteger, default=0)
    
    tongsomau_thunghiem = db.Column(db.Integer, default=0)
    tongsomau_dat_quychuan = db.Column(db.Integer, default=0)
    tongsomau_khongdat_quychuan = db.Column(db.Integer, default=0)
    
    tong_thongso_khongdat = db.Column(db.Integer, default=0)
    danhsachthongso_khongdat = db.Column(JSONB)
                                      
    somauvavitri = db.Column(db.Integer, default=0)
    danhsachvitrilaymau = db.Column(JSONB)
    
    ketquangoaikiemchatluongnuoc = db.Column(JSONB)
    ketquangoaikiem = db.Column(db.SmallInteger, default=0)
    nhanxet = db.Column(db.String)
    
    congbo_thongtin_chodonvicapnuoc = db.Column(db.SmallInteger, default=0)
    congkhai_thongtin = db.Column(db.SmallInteger, default=0)
    thongbao_coquan_thamquyen = db.Column(db.SmallInteger, default=0)
    thongbao_donvi_chuquan = db.Column(db.SmallInteger, default=0)
    
    kiennghi = db.Column(db.String)
    ketluan = db.Column(db.String)
    
    
    

##Bao cao so 3 -(theo mau 6 trong thong tu 41)
class TongHopKetQuaKiemTraChatLuongNuocSach(CommonModel):
    __tablename__ = 'tonghop_ketqua_chatluong_nuocsach'
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    nguoibaocao_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=True)
    nguoibaocao = db.relationship('User', viewonly=True)
    tinhtrang = db.Column(db.SmallInteger,nullable=False)
    ngaybaocao = db.Column(db.DateTime())
    nambaocao = db.Column(db.Integer, nullable=False)
    kybaocao = db.Column(db.SmallInteger, nullable=False, default=1)
    loaikybaocao = db.Column(db.Integer, nullable=False)#thang=1,quy=2,6thang=3,nam=4
    
    donvicapnuoc_id = db.Column(UUID(as_uuid=True), db.ForeignKey('donvicapnuoc.id'), nullable=False)
    donvicapnuoc = db.relationship('DonViCapNuoc', viewonly=True)
    tendonvicapnuoc = db.Column(db.String)
    diachi_donvicapnuoc = db.Column(db.String)
    congsuat_thietke = db.Column(DECIMAL)
    tongso_hogiadinh = db.Column(db.Integer)
    nguonnuoc_nguyenlieu = db.Column(db.SmallInteger)
    tansuat_noikiem = db.Column(db.Integer)
    
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = relationship('XaPhuong')
    
    #lay so lieu tu bao cao 1B cong don len
    tong_laphoso_theoquydinh_noikiem = db.Column(db.Integer, default=0)
    tong_hoso_daydu_theoquydinh_noikiem = db.Column(db.Integer, default=0)
    tong_somau_thunghiem_dungquydinh_noikiem = db.Column(db.Integer, default=0)
    tong_thunghiem_daydu_thongso_noikiem = db.Column(db.Integer, default=0)
    tong_tansuat_thuchien_noikiem_dungquydinh_noikiem = db.Column(db.Integer, default=0)
    tong_thuchien_baocao_daydu_noikiem = db.Column(db.Integer, default=0)
    tong_thuchien_congkhai_thongtin_noikiem = db.Column(db.Integer, default=0)
    tong_thuchien_bienphap_khacphuc_dat_noikiem = db.Column(db.Integer, default=0)
    tong_thuchien_bienphap_khacphuc_khongdat_noikiem = db.Column(db.Integer, default=0)
    
    tong_maunuoc_thunghiem_noikiem = db.Column(db.Integer, default=0)
    tong_mau_dat_quychuan_noikiem = db.Column(db.Integer, default=0)
    tong_mau_khongdat_quychuan_noikiem = db.Column(db.Integer, default=0)
    thongso_khongdat_noikiem = db.Column(JSONB)
    
    #lay tu form ngoai kiem
    tong_solan_ngoaikiem = db.Column(db.Integer, default=0)
    donvi_thuchien_ngoaikiem = db.Column(JSONB)
    #lay so lieu tu bao cao 2B cong don len
    tong_laphoso_theoquydinh_ngoaikiem = db.Column(db.Integer, default=0)
    tong_hoso_daydu_theoquydinh_ngoaikiem = db.Column(db.Integer, default=0)
    tong_somau_thunghiem_dungquydinh_ngoaikiem = db.Column(db.Integer, default=0)
    tong_thunghiem_daydu_thongso_ngoaikiem = db.Column(db.Integer, default=0)
    tong_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem = db.Column(db.Integer, default=0)
    tong_thuchien_baocao_daydu_ngoaikiem = db.Column(db.Integer, default=0)
    tong_thuchien_congkhai_thongtin_ngoaikiem = db.Column(db.Integer, default=0)
    tong_thuchien_bienphap_khacphuc_dat_ngoaikiem = db.Column(db.Integer, default=0)
    tong_thuchien_bienphap_khacphuc_khongdat_ngoaikiem = db.Column(db.Integer, default=0)
    
    tong_maunuoc_thunghiem_ngoaikiem = db.Column(db.Integer, default=0)
    tong_mau_dat_quychuan_ngoaikiem = db.Column(db.Integer, default=0)
    tong_mau_khongdat_quychuan_ngoaikiem = db.Column(db.Integer, default=0)
    thongso_khongdat_ngoaikiem = db.Column(JSONB)
    
    ketluan_dexuat = db.Column(db.String)
    
Index('tonghop_ketqua_chatluong_nuocsach_uq_idx',TongHopKetQuaKiemTraChatLuongNuocSach.donvicapnuoc_id, TongHopKetQuaKiemTraChatLuongNuocSach.loaikybaocao, TongHopKetQuaKiemTraChatLuongNuocSach.kybaocao, TongHopKetQuaKiemTraChatLuongNuocSach.nambaocao, TongHopKetQuaKiemTraChatLuongNuocSach.donvi_id, unique=True)
    
    
##Bao cao so 4,5 -(theo mau 4,5 trong thong tu 41)
class BaoCaoNuocSachHuyenTinh(CommonModel):
    __tablename__ = 'baocao_nuocsach_huyentinh'
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    nguoibaocao_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=True)
    nguoibaocao = db.relationship('User', viewonly=True)
    tinhtrang = db.Column(db.SmallInteger,nullable=False)
    ngaybaocao = db.Column(db.DateTime())
    nambaocao = db.Column(db.Integer, nullable=False)
    kybaocao = db.Column(db.SmallInteger, nullable=False, default=1)
    loaikybaocao = db.Column(db.Integer, nullable=False)#thang=1,quy=2,6thang=3,nam=4
    
    loaibaocao = db.Column(db.SmallInteger, nullable=False, default=1)#captinh=1, caphuyen=2
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    
    tong_donvi_capnuoc = db.Column(db.Integer, default=0)
    tong_hogiadinh_duoccungcapnuoc = db.Column(db.Integer, default=0)
    tong_hogiadinh_diaban = db.Column(db.Integer, default=0)
    
    tong_donvi_capnuoc_thuchien_ngoaikiem = db.Column(db.Integer, default=0)
    tong_kinhphi_congtac_ngoaikiem = db.Column(db.Integer, default=0)
    kinhphi_ngoaikiem_sovoinamtruoc = db.Column(db.SmallInteger)
    
    #lay so lieu tu bao cao 2B cua donvi cong don len
    tongdat_laphoso_theoquydinh_ngoaikiem = db.Column(db.Integer, default=0)
    tongdat_hoso_daydu_theoquydinh_ngoaikiem = db.Column(db.Integer, default=0)
    tongdat_somau_thunghiem_dungquydinh_ngoaikiem = db.Column(db.Integer, default=0)
    tongdat_thunghiem_daydu_thongso_ngoaikiem = db.Column(db.Integer, default=0)
    tongdat_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem = db.Column(db.Integer, default=0)
    tongdat_thuchien_baocao_daydu_ngoaikiem = db.Column(db.Integer, default=0)
    tongdat_thuchien_congkhai_thongtin_ngoaikiem = db.Column(db.Integer, default=0)
    tongdat_thuchien_bienphap_khacphuc_ngoaikiem = db.Column(db.Integer, default=0)
    
    tong_maunuoc_thunghiem_ngoaikiem_trungtam = db.Column(db.Integer, default=0)
    tong_mau_dat_quychuan_ngoaikiem_trungtam = db.Column(db.Integer, default=0)
    tong_mau_khongdat_quychuan_ngoaikiem_trungtam = db.Column(db.Integer, default=0)
    thongso_khongdat_ngoaikiem_trungtam = db.Column(JSONB)
    
    hoso_quanly_noikiem = db.Column(JSONB)
    tong_maunuoc_thunghiem_noikiem = db.Column(db.Integer, default=0)
    tong_mau_dat_quychuan_noikiem = db.Column(db.Integer, default=0)
    tong_mau_khongdat_quychuan_noikiem = db.Column(db.Integer, default=0)
    thongso_khongdat_noikiem = db.Column(JSONB)
    
    danhsach_donvi_ngoaikiem = db.Column(JSONB)
    hoso_quanly_ngoaikiem_baocao = db.Column(JSONB)
    tong_maunuoc_thunghiem_ngoaikiem_baocao = db.Column(db.Integer, default=0)
    tong_mau_dat_quychuan_ngoaikiem_baocao = db.Column(db.Integer, default=0)
    tong_mau_khongdat_quychuan_ngoaikiem_baocao = db.Column(db.Integer, default=0)
    thongso_khongdat_ngoaikiem_baocao = db.Column(JSONB)
    
    nhanxet = db.Column(db.String)
    dexuat = db.Column(db.String)
    
Index('baocao_nuocsach_huyentinh',BaoCaoNuocSachHuyenTinh.loaibaocao, BaoCaoNuocSachHuyenTinh.loaikybaocao, BaoCaoNuocSachHuyenTinh.kybaocao, BaoCaoNuocSachHuyenTinh.nambaocao, BaoCaoNuocSachHuyenTinh.donvi_id, unique=True)



##Bao cao so 6 -(theo mau 2 trong thong tu 41)
class BaoCaoVienChuyenNganhNuoc(CommonModel):
    __tablename__ = 'baocao_vienchuyennganh_nuoc'
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    nguoibaocao_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=True)
    nguoibaocao = db.relationship('User', viewonly=True)
    tinhtrang = db.Column(db.SmallInteger,nullable=False)
    ngaybaocao = db.Column(db.DateTime())
    nambaocao = db.Column(db.Integer, nullable=False)
    kybaocao = db.Column(db.SmallInteger, nullable=False, default=1)
    loaikybaocao = db.Column(db.Integer, nullable=False)#thang=1,quy=2,6thang=3,nam=4
    
    tong_tinh_phutrach = db.Column(db.Integer, default=0)
    tong_tinh_cobaocao = db.Column(db.Integer, default=0)
    tong_donvi_capnuoc_phutrach = db.Column(db.Integer, default=0)
    tong_hogiadinh_duoccungcapnuoc = db.Column(db.Integer, default=0)
    tong_hogiadinh_diaban = db.Column(db.Integer, default=0)
    
    tong_maunuoc_thunghiem_ngoaikiem_vien = db.Column(db.Integer, default=0)
    tong_mau_dat_quychuan_ngoaikiem_vien = db.Column(db.Integer, default=0)
    tong_mau_khongdat_quychuan_ngoaikiem_vien = db.Column(db.Integer, default=0)
    thongso_khongdat_ngoaikiem_vien = db.Column(JSONB)

    ketqua_kiemtra_noikiem_tinh = db.Column(JSONB)
    
    cacdexuat_kythuat = db.Column(db.String)
    nghiencuu_chatluong_nuocsach = db.Column(db.String)
    ketluan = db.Column(db.String)
    dexuat = db.Column(db.String)















# class KetQuaThuNghiemNuoc(CommonModel):
#     __tablename__ = 'ketquathunghiemnuoc' 
#     tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
#     tinhthanh = relationship('TinhThanh')
#     thongso_id = db.Column(UUID(as_uuid=True))
#     tenthongso = db.Column(db.String)
# 
#     tongso_donvicapnuoc = db.Column(db.Integer)
#     tongso_maunuoc_thinghiem = db.Column(db.Integer)
#     tongso_maunuoc_quychuan = db.Column(db.Integer)
#     tongso_maunuoc_khongquychuan = db.Column(db.Integer)
# 
# class TongKetQuaKiemTraChatLuongNuoc(CommonModel):
#     __tablename__ = 'tongketquakiemtrachatluongnuoc'
#     tendonvicapnuoc = db.Column(db.String)
#     madonvicapnuoc = db.Column(UUID(as_uuid=True))
#     thoigiankiemtra = db.Column(db.DateTime())
#     noidungkiemtra = db.Column(db.String)
#     ketqua_thunghiem_ngoaikiem = db.Column(db.String)
#     ketluan = db.Column(db.String)
#     bienphap_khacphuc = db.Column(db.String)
#     ketqua_khacphuc = db.Column(db.String)
# 
# 
# ##Mau 3
# class TongHopKetQuaKiemTraNuoc(CommonModel):
#     __tablename__ = 'tonghopketquakiemtranuoc'
#     ngaybanhanh = db.Column(db.DateTime())
#     ngaybaocao = db.Column(db.DateTime())
#     loaibaocao = db.Column(db.Boolean) #6thang - 1 nam
#     tong_donvicapnuoc = db.Column(db.Integer)
#     tong_hogiadinh_duoccap = db.Column(db.Integer)
#     chiemtyle = db.Column(DECIMAL)
#     tong_donvicapnuoc_kybaocao = db.Column(db.Integer)
#     
#     socoso_thuchien_ngoaikiem = db.Column(db.Integer)
#     sokinhphi_duoccungcap = db.Column(DECIMAL)
#     kinhphi_sovoi_namtruoc = db.Column(DECIMAL)
#     thuchien_baocao = db.Column(db.Boolean)
# 
# 
# class KetQuaNoiKiemCacDonVi(CommonModel):
#     __tablename__ = 'ketquanoikiemcacdonvi'
#     tendonvicapnuoc = db.Column(db.String)
#     madonvicapnuoc = db.Column(UUID(as_uuid=True))
# 
#     soho_giadinh_duoccapnuoc = db.Column(db.Integer)
#     laphoso = db.Column(db.Boolean)
#     hoso_daydu = db.Column(db.Boolean)
#     thieu_tailieu = db.Column(db.String)
#     soluongmau_cacthongso = db.Column(db.Boolean)
#     tanxuat_thuchien = db.Column(db.Boolean)
#     chedo_thongtin = db.Column(db.Boolean)
#     cacbienphap = db.Column(db.Boolean)
# 
# class KetQuaThuNghiemNuocNoiKiem(CommonModel):
#     __tablename__ = 'ketquaThunghiemnuocnoikiem'
#     tongso_mau_lamxn = db.Column(db.Integer)
#     tongsomau_datquychuan = db.Column(db.Integer)
#     tyle_quychuan = db.Column(db.Integer)
#     tongsomau_khongdat = db.Column(db.Integer)
#     tylemau_khongdat = db.Column(db.Integer)    





