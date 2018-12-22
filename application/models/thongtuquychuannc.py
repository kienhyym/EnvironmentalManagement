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

# class BanCongBoQuyHop(CommonModel):
#     __tablename__ = 'bancongboquyhop'
#     id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
#     ngaybanhanh = db.Column(db.DateTime())
#     thongtu = db.Column(db.String)
#     so = db.Column(db.String)
#     tentochuc = db.Column(db.String)
#     diachi = db.Column(db.String)
#     sdt = db.Column(db.String)
#     fax = db.Column(db.String)
#     email = db.Column(db.String)
#     sanpham = db.Column(db.String)
#     phuhop = db.Column(db.String)
#     camket = db.Column(db.String)
#     ngataobaocao = db.Column(db.DateTime())
#     daidienkyten  = db.Column(db.String)

# ##MauSo 1 
# class BapCaoNuocSach(CommonModel):
#     __tablename__ = 'baocaonuocsach'
#     id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
#     thongtu = db.Column(db.String)
#     phamvi = db.Column(db.String)
#     ten = db.Column(db.String)
#     diachi = db.Column(db.String)
#     congxuat = db.Column(db.String)
#     tongsohgd = db.Column(db.String)
#     nguonnuoc = db.Column(db.String)
#     thoigiankiemtra = db.Column(db.DateTime())
#     thanhphan = db.Column(db.String)
#     hstheodoi = db.Column(db.String)
#     tansuatthuchien = db.Column(db.String)
#     tinhhinh = db.Column(db.String)
#     thuchienchedo = db.Column(db.String)
#     ketquabaocaonuoc = relationship(KetQuaBaoCaoNuoc)

# #Item View 1
# class KetQuaBaoCaoNuoc():
#     __tablename__ = 'ketquabaocaonuoc'
#     id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
#     baocaonuocsach = db.Column(UUID(as_uuid=True), ForeignKey('baocaonuocsach.id'), nullable=True) 
#     mamau = db.Column(db.Integer)
#     gioihanchophep = db.Column(db.Integer)
#     danhgia = db.Column(db.Integer)
#     cacthongso = db.Column(db.String)