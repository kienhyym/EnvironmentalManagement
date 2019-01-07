import uuid

from application.database import db
from application.database.model import CommonModel

from sqlalchemy import (DECIMAL, Boolean, Column, Date, DateTime, Float,ForeignKey, Integer, String, Text,JSON, UniqueConstraint)
from sqlalchemy.dialects.postgresql import  UUID, JSONB
from sqlalchemy.orm import *
from sqlalchemy.orm import backref, relationship
from sqlalchemy.orm.collections import attribute_mapped_collection

def default_uuid():
    return str(uuid.uuid4())

class DonViCapNuoc(CommonModel):
    __tablename__ = 'donvicapnuoc'
    ten = db.Column(db.String)
    ma = db.Column(db.String)
    diachi = db.Column(db.String)
    congsuat = db.Column(DECIMAL)
    tongso_hogiadinh = db.Column(db.Integer)
    nguonnuoc = db.Column(db.String)
    
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = relationship('XaPhuong')

##MauSo 1
class KetQuaNgoaiKiemChatLuongNuocSach(CommonModel):
    __tablename__ = 'ketqua_ngoaikiem_chatluong_nuocsach'
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    nguoibaocao_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=True)
    nguoibaocao = db.relationship('User', viewonly=True)
    tinhtrang = db.Column(db.SmallInteger,nullable=False)
#     ngaybaocao = db.Column(db.DateTime())
#     nambaocao = db.Column(db.Integer, nullable=False)
    
    ngaybaocao = db.Column(db.DateTime())
    donvicapnuoc_id = db.Column(UUID(as_uuid=True), db.ForeignKey('donvicapnuoc.id'), nullable=False)
    donvicapnuoc = db.relationship('DonViCapNuoc', viewonly=True)
    tendonvicapnuoc = db.Column(db.String)
    madonvicapnuoc = db.Column(UUID(as_uuid=True))
    diachi_donvicapnuoc = db.Column(db.String)
    congxuat = db.Column(DECIMAL)
    tongso_hogiadinh = db.Column(db.Integer)
    nguonnuoc = db.Column(db.String)
    
    thoigiankiemtra = db.Column(db.DateTime())
    
    thanhphan_doankiemtra = db.Column(db.String)
    
    somauvavitri = db.Column(db.Integer)
    
    hosotheodoi = db.Column(db.String)
    tansuatthuchien_chedonoikiem = db.Column(db.String)
    tinhhinhchatluongnuoc = db.Column(db.String)
    thuchien_chedo = db.Column(db.String)
    nhanxet = db.Column(db.String)
    kiennghi = db.Column(db.String)
    ketluan = db.Column(db.String)
    ketquangoaikiemchatluongnuoc = db.Column(JSONB)
    
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

    


##Mau so 2
class KetQuaKiemTraChatLuongNuocSach(CommonModel):
    __tablename__ = 'ketquakiemtrachatluongnuocsach'
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    nguoibaocao_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=True)
    nguoibaocao = db.relationship('User', viewonly=True)
    tinhtrang = db.Column(db.SmallInteger,nullable=False)
    
    ngaybanhanh = db.Column(db.DateTime())
    ngaybaocao = db.Column(db.DateTime())
    loaibaocao = db.Column(db.Boolean) # 6 thang - 1 nam
    tongsotinh_trenkhuvuc = db.Column(db.Integer)
    sotinh_baocao = db.Column(db.Integer)
    tongsotinh_khuvuc_phutrach = db.Column(db.Integer)
    tongdonvi_duockiemtra = db.Column(db.Integer)
    chiemtyle = db.Column(DECIMAL)
    trungtam_benhtinh = db.Column(db.String)
    doivoi_cacdonvi_capnuoc = db.Column(db.String)
    tongso_maunuoc_lamxn = db.Column(db.Integer)
    tongso_maudatquychuan = db.Column(db.Integer)
    tyle_mauquychuan = db .Column(db.Integer)
    tongso_maukhongdat_quychuan = db.Column(db.Integer)
    cacthongso_khongdat = db.Column(db.String)
    nghiencuu_ketluan = db.Column(db.String)
    ketluan_dexuat = db.Column(db.String)


class KetQuaThuNghiemNuoc(CommonModel):
    __tablename__ = 'ketquathunghiemnuoc' 
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    thongso_id = db.Column(UUID(as_uuid=True))
    tenthongso = db.Column(db.String)

    tongso_donvicapnuoc = db.Column(db.Integer)
    tongso_maunuoc_thinghiem = db.Column(db.Integer)
    tongso_maunuoc_quychuan = db.Column(db.Integer)
    tongso_maunuoc_khongquychuan = db.Column(db.Integer)

class TongKetQuaKiemTraChatLuongNuoc(CommonModel):
    __tablename__ = 'tongketquakiemtrachatluongnuoc'
    tendonvicapnuoc = db.Column(db.String)
    madonvicapnuoc = db.Column(UUID(as_uuid=True))
    thoigiankiemtra = db.Column(db.DateTime())
    noidungkiemtra = db.Column(db.String)
    ketqua_thunghiem_ngoaikiem = db.Column(db.String)
    ketluan = db.Column(db.String)
    bienphap_khacphuc = db.Column(db.String)
    ketqua_khacphuc = db.Column(db.String)


##Mau 3
class TongHopKetQuaKiemTraNuoc(CommonModel):
    __tablename__ = 'tonghopketquakiemtranuoc'
    ngaybanhanh = db.Column(db.DateTime())
    ngaybaocao = db.Column(db.DateTime())
    loaibaocao = db.Column(db.Boolean) #6thang - 1 nam
    tong_donvicapnuoc = db.Column(db.Integer)
    tong_hogiadinh_duoccap = db.Column(db.Integer)
    chiemtyle = db.Column(DECIMAL)
    tong_donvicapnuoc_kybaocao = db.Column(db.Integer)
    
    socoso_thuchien_ngoaikiem = db.Column(db.Integer)
    sokinhphi_duoccungcap = db.Column(DECIMAL)
    kinhphi_sovoi_namtruoc = db.Column(DECIMAL)
    thuchien_baocao = db.Column(db.Boolean)


class KetQuaNoiKiemCacDonVi(CommonModel):
    __tablename__ = 'ketquanoikiemcacdonvi'
    tendonvicapnuoc = db.Column(db.String)
    madonvicapnuoc = db.Column(UUID(as_uuid=True))

    soho_giadinh_duoccapnuoc = db.Column(db.Integer)
    laphoso = db.Column(db.Boolean)
    hoso_daydu = db.Column(db.Boolean)
    thieu_tailieu = db.Column(db.String)
    soluongmau_cacthongso = db.Column(db.Boolean)
    tanxuat_thuchien = db.Column(db.Boolean)
    chedo_thongtin = db.Column(db.Boolean)
    cacbienphap = db.Column(db.Boolean)

class KetQuaThuNghiemNuocNoiKiem(CommonModel):
    __tablename__ = 'ketquaThunghiemnuocnoikiem'
    tongso_mau_lamxn = db.Column(db.Integer)
    tongsomau_datquychuan = db.Column(db.Integer)
    tyle_quychuan = db.Column(db.Integer)
    tongsomau_khongdat = db.Column(db.Integer)
    tylemau_khongdat = db.Column(db.Integer)    





