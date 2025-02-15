from sqlalchemy import (
    Column, String, Integer, DateTime, Date, Boolean, DECIMAL, Text, ForeignKey, UniqueConstraint
)
from sqlalchemy.orm import *
from sqlalchemy.dialects.postgresql import UUID
from application.database import db
from application.database.model import CommonModel
import uuid

def default_uuid():
    return str(uuid.uuid4())
    
    
class QuocGia(CommonModel):
    __tablename__ = 'quocgia'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(String(255), unique=True)
    ten = db.Column(String(255))

class TinhThanh(CommonModel):
    __tablename__ = 'tinhthanh'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(String(255), unique=True)
    ten = db.Column(String(255))
    tongdan_nam = db.Column(Integer)
    tongdan_nu = db.Column(Integer)
    tong_hgd = db.Column(Integer)
    tongdan_dtts = db.Column(Integer)#dan toc thieu so
    quocgia_id = db.Column(UUID(as_uuid=True), ForeignKey('quocgia.id'), nullable=True)
    quocgia = relationship('QuocGia')
    quanhuyen = db.relationship("QuanHuyen", order_by="QuanHuyen.id", cascade="all, delete-orphan")

class QuanHuyen(CommonModel):
    __tablename__ = 'quanhuyen'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(String(255), unique=True)
    ten = db.Column(String(255))
    tongdan_nam = db.Column(Integer)
    tongdan_nu = db.Column(Integer)
    tong_hgd = db.Column(Integer)
    tongdan_dtts = db.Column(Integer)#dan toc thieu so
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    xaphuong = db.relationship("XaPhuong", order_by="XaPhuong.id", cascade="all, delete-orphan")
    
class XaPhuong(CommonModel):
    __tablename__ = 'xaphuong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(String(255), unique=True)
    ten = db.Column(String(255))
    tongdan_nam = db.Column(Integer)
    tongdan_nu = db.Column(Integer)
    tong_hgd = db.Column(Integer)
    tongdan_dtts = db.Column(Integer)#dan toc thieu so
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')  
    thonxom = db.relationship("ThonXom", order_by="ThonXom.id", cascade="all, delete-orphan")
    
class ThonXom(CommonModel):
    __tablename__ = 'thonxom'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(String(255), unique=True)
    ten = db.Column(String(255))
    tongdan_nam = db.Column(Integer)
    tongdan_nu = db.Column(Integer)
    tong_hgd = db.Column(Integer)
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = relationship('XaPhuong') 
    
class DanToc(CommonModel):
    __tablename__ = 'dantoc'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(String(255), unique=True)
    ten = db.Column(String(255))
    
 
class TrinhDoHocVan(CommonModel):
    __tablename__ = 'trinhdohocvan'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(String(255), unique=True)
    ten = db.Column(String(255))

class NgheNghiep(CommonModel):
    __tablename__ = 'nghenghiep'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(String(255), unique=True)
    ten = db.Column(String(255))
    mota = db.Column(String(255))
    
class Nganh(CommonModel):
    __tablename__ = 'nganh'
    manganh = db.Column(db.String)
    tennganh = db.Column(db.String)
    mota = db.Column(db.Text)
    thutu = db.Column(db.Integer, default=0)


    