import uuid

from application.database import db
from application.database.model import CommonModel
from PIL.JpegImagePlugin import COM
from sqlalchemy import (DECIMAL, Boolean, Column, Date, DateTime, Float,ForeignKey, Integer, String, Text,JSON, UniqueConstraint)
from sqlalchemy.dialects.postgresql import  UUID
from sqlalchemy.orm import *
# from sqlalchemy import *
from sqlalchemy.orm import backref, relationship
from sqlalchemy.orm.collections import attribute_mapped_collection

def default_uuid():
    return str(uuid.uuid4())

class BanCongBoQuyHop(CommonModel):
    __tablename__ = 'bancongboquyhop'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    ngaybanhanh = db.Column(db.DateTime())
    thongtu = db.Column(db.String)
    so = db.Column(db.String)
    tentochuc = db.Column(db.String)
    diachi = db.Column(db.String)
    sdt = db.Column(db.String)
    fax = db.Column(db.String)
    email = db.Column(db.String)
    sanpham = db.Column(db.String)
    phuhop = db.Column(db.String)
    camket = db.Column(db.String)
    ngataobaocao = db.Column(db.DateTime())
    daidienkyten  = db.Column(db.String)

##MauSo 1 
class BapCaoNuocSachOne(CommonModel):
    __tablename__ = 'baocaonuocsachOne'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    ketquabaocaonuocone = relationship('KetQuaBaoCaoNuocOne')
    thongtu = db.Column(db.String)
    phamvi = db.Column(db.String)
    ten = db.Column(db.String)
    diachi = db.Column(db.String)
    congxuat = db.Column(db.String)
    tongsohgd = db.Column(db.String)
    nguonnuoc = db.Column(db.String)
    thoigiankiemtra = db.Column(db.DateTime())
    thanhphan = db.Column(db.String)
    somauvavitri = db.Column(db.String)
    hstheodoi = db.Column(db.String)
    tansuatthuchien = db.Column(db.String)
    tinhhinh = db.Column(db.String)
    thuchienchedo = db.Column(db.String)
    nhanxet = db.Column(db.String)
    kiennghi = db.Column(db.String)
    ketluan = db.Column(db.String)
    kyten1 = db.Column(db.String)
    kyten = db.Column(db.String)
    ngaybaocao = db.Column(db.DateTime())

#Item View 1
class KetQuaBaoCaoNuocOne(CommonModel):
    __tablename__ = 'ketquabaocaonuocone'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    baocaonuocsachOne = db.Column(UUID(as_uuid=True), ForeignKey('baocaonuocsachOne.id'), nullable=True) 
    mamau = db.Column(db.Integer)
    gioihanchophep1 = db.Column(db.Integer)
    danhgia = db.Column(db.Integer)
    cacthongso = db.Column(db.String)
    gioihanchophep2 = db.Column(db.Integer)
    gioihanchophep3 = db.Column(db.Integer)
    gioihanchophep4 = db.Column(db.Integer)
    gioihanchophep5 = db.Column(db.Integer)
    gioihanchophep6 = db.Column(db.Integer)
    gioihanchophep7 = db.Column(db.Integer)
    gioihanchophep8 = db.Column(db.Integer)
    gioihanchophep9 = db.Column(db.Integer)
    gioihanchophep10 = db.Column(db.Integer)
    gioihanchophep11 = db.Column(db.Integer)
    gioihanchophep12 = db.Column(db.Integer)
    gioihanchophep13 = db.Column(db.Integer)
    gioihanchophep14 = db.Column(db.Integer)
    gioihanchophep15 = db.Column(db.Integer)

##mau 2
class BaoCaoKiemTraCLNuocSach(CommonModel):
    __tablename__ = 'baocaokiemtraclnuocsach'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    ngaybanhanh = db.Column(db.DateTime);
    so = db.Column(db.String)
    phamvi = db.Column(db.String)
    baocao6thang = db.Column(db.String)
    baocao1nam = db.Column(db.String)
    tongsotinh = db.Column(db.Integer)
    sotinhcobaocao = db.Column(db.Integer)
    tongdonvicapnuoc = db.Column(db.Integer)
    donvicapnuocdckt = db.Column(db.Integer)
    tonghgd = db.Column(db.Integer)
    chiemtile = db.Column(db.Integer)

    tentinh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tentinh = relationship('TinhThanh')
    baocaokiemtraclnuocsach = db.Column(db.Integer)
    tongsodonvicapnuoc = db.Column(db.Integer)
    tongsomau = db.Column(db.Integer)
    tongsomauchiemtile = db.Column(db.Integer)
    cacthongso = db.Column(db.Integer)
    coliform = db.Column(db.Integer)
    coliformchieunhiet = db.Column(db.Integer)
    arsenic = db.Column(db.Integer)
    clodu = db.Column(db.Integer)
    doduc = db.Column(db.Integer)
    mausac = db.Column(db.Integer)
    muivi = db.Column(db.Integer)
    ph = db.Column(db.Integer)

    doivoitrungtam = db.Column(db.String)
    doivoidonvi = db.Column(db.String)
    somaunuoclamxn = db.Column(db.Integer)
    somaudatchuan = db.Column(db.Integer)
    quychuan = db.Column(db.Integer)
    kodatchuan = db.Column(db.Integer)
    thongtindat = db.Column(db.String)
    nghiencuu = db.Column(db.String)
    denghi = db.Column(db.String)
    kyten = db.Column(db.String)
    thongsokdat = db.Column(db.String)
    tonghopchatluongnuoctinhneuco = relationship('TongHopChatLuongNuocTinhNeuCo')

##item 2 2
class TongHopChatLuongNuocTinhNeuCo(CommonModel):
    __tablename__ = 'tonghopchatluongnuoctinhneuco'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    baocaokiemtraclnuocsach = db.Column(UUID(as_uuid=True), ForeignKey('baocaokiemtraclnuocsach.id'), nullable=True) 
    tt = db.Column(db.Integer)
    tendonvi = db.Column(db.String)
    thoigiankiemtra = db.Column(db.DateTime())
    noidung = db.Column(db.String)
    ketluan = db.Column(db.String)
    bienphap = db.Column(db.String)
    ketqua = db.Column(db.String)
    ketqua2 = db.Column(db.String)

    
