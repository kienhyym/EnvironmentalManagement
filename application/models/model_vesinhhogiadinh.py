import uuid
from application.database import db
from application.database.model import CommonModel
from sqlalchemy import (func, DECIMAL, Boolean, Column, Date, DateTime, Float,ForeignKey, Integer, String, Text,JSON, UniqueConstraint)
from sqlalchemy.dialects.postgresql import  UUID,JSONB
from sqlalchemy.orm import *
from sqlalchemy.orm import backref, relationship


def default_uuid():
    return str(uuid.uuid4())


# Biểu mẫu số 1: Cấp thôn
# Bang 1:
class VSCapThon(CommonModel):
    __tablename__ = 'vscapthon'
    
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    nguoibaocao_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=True)
    nguoibaocao = db.relationship('User', viewonly=True)
    tinhtrang = db.Column(db.SmallInteger,nullable=False)
    ngaybaocao = db.Column(db.DateTime())
    nambaocao = db.Column(db.Integer, nullable=False)
#     kybaocao = db.Column(db.SmallInteger, nullable=False)
#     loaikybaocao = db.Column(db.Integer, nullable=False)
#     tungay = db.Column(db.Date())
#     denngay = db.Column(db.Date())
    nhatieuthonhvs = db.Column(JSONB())
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = relationship('XaPhuong')
    thuocsuprsws = db.Column(db.SmallInteger)
    tenthon = db.Column(db.String)
    thonxom_id = db.Column(UUID(as_uuid=True), ForeignKey('thonxom.id'), nullable=True)
    thonxom = relationship('ThonXom', viewonly=True)
    tong_hotrongthon = db.Column(db.Integer)
    tong_chuholanu = db.Column(db.Integer)
    tong_sohongheo = db.Column(db.Integer)
    tong_sohodtts = db.Column(db.Integer)
    tong_danso = db.Column(db.Integer)
    tong_nam = db.Column(db.Integer)
    tong_nu = db.Column(db.Integer)
    #bo sung them tong cua cac truong can thong ke
    tong_tuhoai = db.Column(db.Integer)
    tong_thamdoi = db.Column(db.Integer)
    tong_2ngan = db.Column(db.Integer)
    tong_ongthonghoi = db.Column(db.Integer)
    tong_loaikhac = db.Column(db.Integer)
    tong_khongnhatieu = db.Column(db.Integer)
    tong_hopvs = db.Column(db.Integer)
    tong_khonghopvs = db.Column(db.Integer)
    tong_caithien = db.Column(db.Integer)
    tong_diemruatay = db.Column(db.Integer)

    
    
class NhaTieuThonHVS(CommonModel):
    __tablename__ = 'nhatieuthonhvs'
    vscapthon_id = db.Column(UUID(as_uuid=True), ForeignKey('vscapthon.id'), nullable=True) 
    dantoc_id = db.Column(UUID(as_uuid=True), ForeignKey('dantoc.id'), nullable=True) 
    dantoc = relationship('DanToc')
    tendantoc = db.Column(db.String)
    tenchuho = db.Column(db.String)
    gioitinh = db.Column(db.SmallInteger)
    hongheo = db.Column(db.SmallInteger)
    tuhoai = db.Column(db.SmallInteger)
    thamdoi = db.Column(db.SmallInteger)
    haingan = db.Column(db.SmallInteger)
    chimco_oth = db.Column(db.SmallInteger)
    loaikhac = db.Column(db.SmallInteger)
    khongconhatieu = db.Column(db.SmallInteger)
    hopvesinh = db.Column(db.SmallInteger)
    khonghopvesinh = db.Column(db.SmallInteger)
    caithien = db.Column(db.SmallInteger)
    diemruataycoxaphong = db.Column(db.SmallInteger)
    
    
#Biểu mẫu số 2: Cấp xã
class VSCapXa(CommonModel):
    __tablename__ = 'vscapxa'
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    nguoibaocao_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=True)
    nguoibaocao = db.relationship('User', viewonly=True)
    tinhtrang = db.Column(db.SmallInteger,nullable=False)
    ngaybaocao = db.Column(db.DateTime())
    nambaocao = db.Column(db.Integer, nullable=False)
    
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = relationship('XaPhuong')
    tong_sothon = db.Column(db.Integer)
    thuocsuprsws = db.Column(db.SmallInteger)
    tong_hotrongxa = db.Column(db.Integer)
    tong_chuholanu = db.Column(db.Integer)
    tong_sohongheo = db.Column(db.Integer)
    tong_sohodtts = db.Column(db.Integer)
    tong_danso = db.Column(db.Integer)
    tong_nam = db.Column(db.Integer)
    tong_nu = db.Column(db.Integer)
    tong_loaikhac = db.Column(db.Integer)
    __table_args__ = (UniqueConstraint('donvi_id', 'nambaocao', name='uq_CapXa_donvi_id_nambaocao'),)

#Biểu mẫu số 3: Cấp huyen
class VSCapHuyen(CommonModel):
    __tablename__ = 'vscaphuyen'
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    nguoibaocao_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=True)
    nguoibaocao = db.relationship('User', viewonly=True)
    tinhtrang = db.Column(db.SmallInteger,nullable=False)
    ngaybaocao = db.Column(db.DateTime())
    nambaocao = db.Column(db.Integer, nullable=False)
    
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    
    tong_soxa = db.Column(db.Integer)
    tong_sothon = db.Column(db.Integer)

    tong_ho = db.Column(db.Integer)
    tong_chuholanu = db.Column(db.Integer)
    tong_sohongheo = db.Column(db.Integer)
    tong_sohodtts = db.Column(db.Integer)
    tong_danso = db.Column(db.Integer)
    tong_nam = db.Column(db.Integer)
    tong_nu = db.Column(db.Integer)
    tong_loaikhac = db.Column(db.Integer)
    __table_args__ = (UniqueConstraint('donvi_id', 'nambaocao', name='uq_CapHuyen_donvi_id_nambaocao'),)


#Biểu mẫu số 4: Cấp tinh
class VSCapTinh(CommonModel):
    __tablename__ = 'vscaptinh'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    nguoibaocao_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=True)
    nguoibaocao = db.relationship('User', viewonly=True)
    tinhtrang = db.Column(db.SmallInteger,nullable=False)
    ngaybaocao = db.Column(db.DateTime())
    nambaocao = db.Column(db.Integer, nullable=False)
    
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    
    tong_sohuyen = db.Column(db.Integer)
    tong_soxa = db.Column(db.Integer)
    tong_sothon = db.Column(db.Integer)
    tong_hotrongthon = db.Column(db.Integer)
    tong_chuholanu = db.Column(db.Integer)
    tong_sohongheo = db.Column(db.Integer)
    tong_sohodtts = db.Column(db.Integer)
    tong_danso = db.Column(db.Integer)
    tong_nam = db.Column(db.Integer)
    tong_nu = db.Column(db.Integer)
    tong_loaikhac = db.Column(db.Integer)
    __table_args__ = (UniqueConstraint('donvi_id', 'nambaocao', name='uq_CapTinh_donvi_id_nambaocao'),)
    