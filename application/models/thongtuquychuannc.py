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


# Mẫu số 03
class KQKiemTraNuocSach(CommonModel):
    __tablename__ = 'kqkiemtranuocsach'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    thongtuso = db.Column(db.String)
    ngaybanhanh = db.Column(db.DateTime())
    donvibcso =  db.Column(db.Integer)
    ngaybc = db.Column(db.DateTime())
    bcdinhky = db.Column(db.String)
    tongdv = db.Column(db.Integer)
    tonghgd = db.Column(db.Integer)
    tyle = db.Column(db.Integer)
    dvduocktra = db.Column(db.Integer)
    csngoaikiem = db.Column(db.Integer)
    kinhphi = db.Column(db.Integer)
    kinhphitrc = db.Column(db.String)
    thuchienbc = db.Column(db.String)
    hosotheodoi = relationship('HoSoTheoDoi',viewonly=True)
    mauxn = db.Column(db.Integer)
    maudatchuan = db.Column(db.Integer)
    tylemaudat = db.Column(db.Integer)
    maukdatchuan = db.Column(db.Integer)
    tylemaukdat = db.Column(db.Integer)
    tskhongdat = relationship('TSKhongDat',viewonly=True)
    dvngoaikiem = db.Column(db.Integer)
    tylenk = db.Column(db.Integer)
    lannk = db.Column(db.Integer)
    lietkedonvi = relationship('LietKeDonVi',viewonly=True)
    kqngoaikiem_id = db.Column(UUID(as_uuid=True), ForeignKey('kqngoaikiem.id'), nullable=True)
    kqngoaikiem = relationship('KQNgoaiKiem')
    nhanxet = db.Column(db.String)
    kyten = db.Column(db.String)
    
    
class HoSoTheoDoi(CommonModel):
    __tablename__ = 'hosotheodoi'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    kqkiemtranuocsach_id = db.Column(UUID(as_uuid=True), ForeignKey('kqkiemtranuocsach.id'),index=True, nullable=True)
    kqktchatluong_id = db.Column(UUID(as_uuid=True), ForeignKey('kqktchatluong.id'),index=True, nullable=True)
    tt = db.Column(db.Integer)
    tendonvi = db.Column(db.String)
    sohogd = db.Column(db.Integer)
    laphoso = db.Column(db.String)
    hsdaydu = db.Column(db.String)
    kdaydu = db.Column(db.String)
    slmau = db.Column(db.String)
    tsthuchien = db.Column(db.String)
    ttbaocao = db.Column(db.String)
    bpkhacphuc = db.Column(db.String)
    tong = db.Column(db.Integer)
    
class TSKhongDat(CommonModel):
    __tablename__ = 'tskhongdat'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    kqkiemtranuocsach_id = db.Column(UUID(as_uuid=True), ForeignKey('kqkiemtranuocsach.id'),index=True, nullable=True)
    kqktchatluong_id = db.Column(UUID(as_uuid=True), ForeignKey('kqktchatluong.id'),index=True, nullable=True)
    tencoso = db.Column(db.String)
    thongso1 = db.Column(db.String)
    thongso2 = db.Column(db.String)
    thongso3 = db.Column(db.String)
    thongso4 = db.Column(db.String)
    thongso4 = db.Column(db.String)
    tong = db.Column(db.Integer)
    
class LietKeDonVi(CommonModel):
    __tablename__ = 'lietkedonvi'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    kqkiemtranuocsach_id = db.Column(UUID(as_uuid=True), ForeignKey('kqkiemtranuocsach.id'),index=True, nullable=True)
    kqktchatluong_id = db.Column(UUID(as_uuid=True), ForeignKey('kqktchatluong.id'),index=True, nullable=True)
    tt = db.Column(db.Integer)
    tendv = db.Column(db.String)
    lanngoaikiem = db.Column(db.Integer)
    noidung = db.Column(db.String)
    thunghiemts = db.Column(db.String)
class KQNgoaiKiem(CommonModel):
    __tablename__ = 'kqngoaikiem'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    hosodat = db.Column(db.String)
    hosokdat = db.Column(db.String)
    thunghiemdat = db.Column(db.String)
    thunghiemkdat = db.Column(db.String)
    thuchiendat = db.Column(db.String)
    thuchienkdat = db.Column(db.String)
    bienphatdat = db.Column(db.String)
    bienphapkdat = db.Column(db.String)
    ketquadat = db.Column(db.String)
    ketquakdat = db.Column(db.String)
    congkhaidat = db.Column(db.String)
    congkhaikdat = db.Column(db.String)
    
#Mẫu số 04
class KQKTChatLuong(CommonModel):
    __tablename__ = 'kqktchatluong'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    thongtuso = db.Column(db.String)
    ngaybanhanh = db.Column(db.DateTime())
    donvibcso =  db.Column(db.Integer)
    bcdinhky = db.Column(db.String)
    tongdv = db.Column(db.Integer)
    tonghgd = db.Column(db.Integer)
    tyle = db.Column(db.Integer)
    dvduocktra = db.Column(db.Integer)
    csngoaikiem = db.Column(db.Integer)
    kinhphi = db.Column(db.Integer)
    kinhphicu = db.Column(db.String)
    thuchienbc = db.Column(db.String)
    hosotheodoi = relationship('HoSoTheoDoi',viewonly=True)
    nhanxet = db.Column(db.String)
    mauthunghiem = db.Column(db.Integer)
    maudatchuan = db.Column(db.Integer)
    tyledatchuan = db.Column(db.Integer)
    maukdatchuan = db.Column(db.Integer)
    tylekdatchuan = db.Column(db.Integer)
    tskhongdat = relationship('TSKhongDat',viewonly=True)
    dvngoaikiem = db.Column(db.Integer)
    tyle = db.Column(db.Integer)
    solandv = db.Column(db.Integer)
    lietkedonvi = relationship('LietKeDonVi',viewonly=True)
    kqngoaikiem_id = db.Column(UUID(as_uuid=True), ForeignKey('kqngoaikiem.id'), nullable=True)
    kqngoaikiem = relationship('KQNgoaiKiem')
    nhanxet = db.Column(db.String)
    kyten = db.Column(db.String)
      
# Mẫu số 06

class THKQNoiKiemNuocSach(CommonModel):
    __tablename__ = 'thkqnoikiemnuocsach'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    thongtuso = db.Column(db.String)
    ngaybanhanh = db.Column(db.DateTime())
    quy = db.Column(db.Integer)
    dvcapnuoc = db.Column(db.String)
    diachi = db.Column(db.String)
    congsuat = db.Column(db.Integer)
    tonghgd = db.Column(db.Integer)
    ncnglieu = db.Column(db.String)
    
    laphoso = db.Column(db.String)
    hsdaydu = db.Column(db.String)
    kdaydu = db.Column(db.String)
    slmau = db.Column(db.String)
    tsthuchien = db.Column(db.String)
    ttbaocao = db.Column(db.String)
    bpkhacphuc = db.Column(db.String)
    
    nhanxet = db.Column(db.String)
    mauthunghiem = db.Column(db.Integer)
    maudatchuan = db.Column(db.Integer)
    tyledatchuan = db.Column(db.Integer)
    maukdatchuan = db.Column(db.Integer)
    tylekdatchuan = db.Column(db.Integer)
    chitieukdat = db.Column(db.String)
    lietkedonvi = relationship('LietKeDonVi',viewonly=True)
    kqngoaikiem_id = db.Column(UUID(as_uuid=True), ForeignKey('kqngoaikiem.id'), nullable=True)
    kqngoaikiem = relationship('KQNgoaiKiem')
    dexuat = db.Column(db.String)
    ketluan = db.Column(db.String)
    thutruong = db.Column(db.String)
    
# Mẫu số 05
class KQNoiKiemNuocSach(CommonModel):
    __tablename__ = 'kqnoikiemnuocsach'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    thongtuso = db.Column(db.String)
    ngaybanhanh = db.Column(db.DateTime())
    tendv = db.Column(db.String)
    diachi = db.Column(db.String)
    congsuat = db.Column(db.Integer)
    tonghgd = db.Column(db.Integer)
    ncnguyenlieu = db.Column(db.String)
    tgkiemtra = db.Column(db.DateTime())
    ngkiemtra = db.Column(db.String)
    somauvavitri = db.Column(db.String)
    hosotheodoi = db.Column(db.String)
# bang
    ghichuketqua = db.Column(db.String)
    bienphap = db.Column(db.String)
    ketluan = db.Column(db.String)
    ngayky = db.Column(db.DateTime())
    kyten = db.Column(db.String)

    
    

    
