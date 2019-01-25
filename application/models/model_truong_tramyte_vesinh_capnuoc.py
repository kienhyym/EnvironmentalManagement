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

   
# Biểu mẫu số 5: Thu thập thông tin về công trình cấp nước và vệ sinh trong trường học, trạm y tế
class Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc(CommonModel):
    __tablename__ = 'phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc'
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    nguoibaocao_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=True)
    nguoibaocao = db.relationship('User', viewonly=True)
    tinhtrang = db.Column(db.SmallInteger,nullable=False)
    ngaybaocao = db.Column(db.DateTime())
    nambaocao = db.Column(db.Integer, nullable=False)
    kybaocao = db.Column(db.SmallInteger, nullable=False)
    loaikybaocao = db.Column(db.Integer, nullable=False)
    
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = relationship('XaPhuong')

    ten_truong_tramyte = db.Column(db.String)
    ma_truong_tramyte = db.Column(db.String)
    loai_truong_tramyte = db.Column(db.Integer)
    loaidiem_truong = db.Column(db.Integer)#chinh,phu
#     buoihoc_moihocsinh = db.Column(db.Integer)
    truong_sobuoihoc = db.Column(db.Integer)
    truong_sohocsinh_moibuoi = db.Column(db.Integer)
    truong_sohocsinh_nam = db.Column(db.Integer)
    truong_sohocsinh_nu = db.Column(db.Integer)
    tennguoitraloi = db.Column(db.String)
    chucvu_nguoitraloi = db.Column(db.String)
    thongtinlienlac = db.Column(db.String)
    nguonnuocchinh = db.Column(db.Integer)
    nguonnuocchinh_loaikhac = db.Column(db.String)
    chatluongnuocuong = db.Column(db.Integer)
    sokhuvesinh_truong_tramyte = db.Column(db.Integer)
    sokhuvesinh_truong_hossinh_nam = db.Column(db.Integer)
    sokhuvesinh_truong_hocsinh_nu = db.Column(db.Integer)
    sokhuvesinh_truong_giaovien_nam = db.Column(db.Integer)
    sokhuvesinh_truong_giaovien_nu = db.Column(db.Integer)
    phieuchitiet = db.Column(JSONB)#Phieu_Chitiet_Vesinh_Capnuoc_Truong_TramYTe
    ghichu = db.Column(db.String)
    ketluan = db.Column(db.SmallInteger, default=0)
#     phieuchitiet = relationship('Phieu_Chitiet_Vesinh_Capnuoc_Truong_TramYTe')
#     nguonnccongtrinh_id = db.Column(UUID(as_uuid=True), ForeignKey('nguonnccongtrinh.id'), nullable=True)
#     capnctruongtram = relationship('CapNcTruongTram')
#     capnctruongtram_id = db.Column(UUID(as_uuid=True), ForeignKey('capnctruongtram.id'), nullable=True)


#Chi dung de genschema, luu bang cha o dang jsonb
# class Phieu_Chitiet_Vesinh_Capnuoc_Truong_TramYTe(CommonModel):
#     __tablename__ = 'phieu_chitiet_vesinh_capnuoc_truong_tramyte'
#     id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
#     ten_truong_tramyte = db.Column(db.String)
#     ma_truong_tramyte = db.Column(db.String)
#     ten_khu_khaosat = db.Column(db.String)#Khu cho hsnam, hoc sinh nu, giao vien nam/nu
#     quansat_khuvesinh = db.Column(db.Integer)
#     quansat_khuvesinh_loaikhac = db.Column(db.String)
#     soluong_chauxi = db.Column(db.Integer)
#     sannha_rannut = db.Column(db.Integer)
#     coloditieu_daynapkin = db.Column(db.Integer)
#     bechua_rannut = db.Column(db.Integer)
#     khoangcach_nguonnuoc_bechua = db.Column(db.Integer)
#     hoatdong_binhthuong = db.Column(db.Integer)
#     capnuocsach = db.Column(db.Integer)
#     congtrinh_ruatay = db.Column(db.Integer)
#     quansat_congtrinh_ruatay = db.Column(db.Integer)
#     mailop_nhavesinh = db.Column(db.Integer)
#     phan_dinhdong_nhavesinh = db.Column(db.Integer)
#     vesinh_sachse = db.Column(db.Integer)
#     sannha_vesinh_kho_sach = db.Column(db.Integer)
#     nangmui = db.Column(db.Integer)
#     nuocthai_chaydidau = db.Column(db.Integer)
#     nuocthai_chaydidau_ten = db.Column(db.String)
#     bexi_docao = db.Column(db.Integer)
#     ngaplut_khi_mualon = db.Column(db.Integer)
#     khu_ditieu = db.Column(db.Integer)
#     khu_ditieu_dientich = db.Column(db.Integer)
#     khu_ditieu_sochau = db.Column(db.Integer)
#     ghichu = db.Column(db.String)

