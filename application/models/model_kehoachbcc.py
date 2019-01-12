import uuid
from datetime import datetime
from application.database import db
from application.database.model import CommonModel
from sqlalchemy import (DECIMAL, Boolean, Column, Date, DateTime, Float,ForeignKey, Integer, String, Text,JSON, UniqueConstraint)
from sqlalchemy.dialects.postgresql import  UUID, JSONB
from sqlalchemy.orm import *
from sqlalchemy.orm import backref, relationship
from sqlalchemy.orm.collections import attribute_mapped_collection

def default_uuid():
    return str(uuid.uuid4())

def default_datetime_now():
    return datetime.now()


# Biểu mẫu số 1: Tiến độ lập kế hoạch và thực hiện Kế Hoạch Truyền Thông tiến độ lập kế hoạch và phê duyệt
class TienDoKeHoachBCC(CommonModel):
    __tablename__ = 'tiendo_kehoach_bcc'
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    nguoibaocao_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=True)
    nguoibaocao = db.relationship('User', viewonly=True)
    tinhtrang = db.Column(db.SmallInteger,nullable=False)
    ngaybaocao = db.Column(db.DateTime(), default=default_datetime_now)
    nambaocao = db.Column(db.Integer, nullable=False)
    kybaocao = db.Column(db.SmallInteger, nullable=False)
    loaikybaocao = db.Column(db.Integer, nullable=False)
    
#     danhmucnganh_id = db.Column(UUID(as_uuid=True), ForeignKey('danhmucnganh.id'), nullable=True)
#     danhmucnganh = relationship('DanhMucNganh')
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = relationship('XaPhuong')
    thonxom_id = db.Column(UUID(as_uuid=True), ForeignKey('thonxom.id'), nullable=True)
    thonxom = relationship('ThonXom')
    
    tiendo_xaydung = db.Column(db.SmallInteger, nullable=False)
    tiendo_rasoat = db.Column(db.SmallInteger, nullable=False)
    tiendo_pheduyet = db.Column(db.SmallInteger, nullable=False)
    ngay_pheduyet = db.Column(db.DateTime())
    sohoatdong_cotloi_pheduyet = db.Column(db.Integer)
    sohoatdong_cotloi_hoanthanh = db.Column(db.Integer)
    nganh_id = db.Column(UUID(as_uuid=True), ForeignKey('danhmucnganh.id'), nullable=True)
    nganh = relationship('DanhMucNganh')
    
    giangvien = db.Column(db.Integer)# giang vien tai don vi
    giangvien_nu = db.Column(db.Integer)# giang vien tai don vi
    tongsogiangvien = db.Column(db.Integer)#tong so giang vien, bao gom cac don vi con
    tongsogiangvien_nu = db.Column(db.Integer)
    tongsonguoithamgia = db.Column(db.Integer)
    tongsonguoithamgia_nu = db.Column(db.Integer)
    tongsonguoithamgia_dtts = db.Column(db.Integer)
    
    danhsach_hoatdong = db.Column(JSONB())
    tuyendonvi = db.Column(db.String)#tinh/huyen/xa/thon


class DanhMucHoatDong(CommonModel):
    __tablename__ = 'danhmuchoatdong'
    mahoatdong = db.Column(db.String)
    tenhoatdong = db.Column(db.String)
    loai_hoatdong = db.Column(db.String) #tinh, huyen, xa, thon
#     loai_nganh = db.Column(db.String)#nganh y te, nganh gia
    nganh_id = db.Column(UUID(as_uuid=True), ForeignKey('danhmucnganh.id'), nullable=True)
    nganh = relationship('DanhMucNganh')
    muctieu = db.Column(db.String)    


class DanhMucNganh(CommonModel):
    __tablename__ = 'danhmucnganh'
    manganh = db.Column(db.String)
    tennganh = db.Column(db.String)


# 
# class KeHoachBCCHuyen(CommonModel):
#     __tablename__ = 'kehoach_bcc_huyen'
#     kehoachthuchien_id = db.Column(UUID(as_uuid=True), ForeignKey('kehoachthuchien.id'), nullable=True)
#     hoatdong = db.Column(db.String)
#     muctieu = db.Column(db.String)
#     ketqua_datduoc = db.Column(db.String)
#     tongsonguoi_thamgia = db.Column(db.Integer)
#     songuoi_lanu = db.Column(db.Integer)
#     songuoi_dantocthieuso = db.Column(db.Integer)
#     nganh = db.Column(db.Integer)
# 
#     tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
#     tinhthanh = relationship('TinhThanh')
#     quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
#     quanhuyen = relationship('QuanHuyen')
#     # xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
#     # xaphuong = relationship('XaPhuong')
# 
# class KeHoachBCCThon(CommonModel):
#     __tablename__ = 'kehoach_bcc_thon'
#     kehoachthuchien_id = db.Column(UUID(as_uuid=True), ForeignKey('kehoachthuchien.id'), nullable=True)
#     hoatdong = db.Column(db.String)
#     muctieu = db.Column(db.String)
#     ketqua_datduoc = db.Column(db.String)
#     tongsonguoi_thamgia = db.Column(db.Integer)
#     songuoi_lanu = db.Column(db.Integer)
#     songuoi_dtts = db.Column(db.Integer)
#     loainganh = db.Column(db.Integer)#1=yte, 2=giaoduc
# 
#     tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
#     tinhthanh = relationship('TinhThanh')
#     quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
#     quanhuyen = relationship('QuanHuyen')
#     xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
#     xaphuong = relationship('XaPhuong')
#     thonxom_id = db.Column(UUID(as_uuid=True), ForeignKey('thonxom.id'), nullable=True)
#     thonxom = relationship('ThonXom')
#     
# class KeHoachBCCTinh(CommonModel):
#     __tablename__ = 'kehoach_bcc_tinh'
#     kehoachthuchien_id = db.Column(UUID(as_uuid=True), ForeignKey('kehoachthuchien.id'), nullable=True)
#     hoatdong = db.Column(db.String)
#     muctieu = db.Column(db.String)
#     tiendo_thuchien = db.Column(db.String)
#     tongsonguoi_thamgia = db.Column(db.Integer)
#     songuoi_lanu = db.Column(db.Integer)
#     songuoi_dantocthieuso = db.Column(db.Integer)
#     ketqua_datduoc = db.Column(db.String)
#     tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
#     tinhthanh = relationship('TinhThanh')
# 
# class KeHoachThucHien(CommonModel):
#     __tablename__ =  'kehoachthuchien'
# #     itemthon = relationship("ItemThon")
# #     itemxa = relationship("ItemXa")
# #     itemhuyen = relationship("ItemHuyen")
# #     itemtinh = relationship("ItemTinh")
# 
#     tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
#     tinhthanh = relationship('TinhThanh')
# 
#     xaydungduthao_bcc = db.Column(db.Integer)
#     nganh = db.Column(db.Integer)
#     vihema_chapthuan = db.Column(db.Integer)
#     ngay_pheduyet = db.Column(db.DateTime())
#     trangthai_tinhpheduyen = db.Column(db.Integer)
#     #tinhpheduyet_bcc = db.Column(db.String)
#     sohoatdong_pheduyet = db.Column(db.Integer)
#     sohoatdong_bcc = db.Column(db.String)

    

#Biểu mẫu số 4: Giới và Dân tộc thiểu số
class Gioi_Dantoc_ThieuSo(CommonModel):
    __tablename__ = 'gioi_dantoc_thieuso'
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    nguoibaocao_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=True)
    nguoibaocao = db.relationship('User', viewonly=True)
    tinhtrang = db.Column(db.SmallInteger,nullable=False)
    ngaybaocao = db.Column(db.DateTime())
    nambaocao = db.Column(db.Integer, nullable=False)
    kybaocao = db.Column(db.SmallInteger, nullable=False)
    loaikybaocao = db.Column(db.Integer, nullable=False)
    
    tongso_duocdaotao_yte = db.Column(db.Integer)
    tongso_nguoithamgia_nu_yte = db.Column(db.Integer)
    tyle_nguoithamgia_nu_yte = db.Column(db.DECIMAL)
    tongso_nguoithamgia_dtts_yte = db.Column(db.Integer)
    tyle_nguoithamgia_dtts_yte = db.Column(db.DECIMAL)
    tongso_giangvien_nu_yte = db.Column(db.DECIMAL)
    
    tongso_duocdaotao_giaoduc = db.Column(db.Integer)
    tongso_nguoithamgia_nu_giaoduc = db.Column(db.Integer)
    tyle_nguoithamgia_nu_giaoduc = db.Column(db.DECIMAL)
    tongso_nguoithamgia_dtts_giaoduc = db.Column(db.Integer)
    tyle_nguoithamgia_dtts_giaoduc = db.Column(db.DECIMAL)
    tongso_giangvien_nu_giaoduc = db.Column(db.DECIMAL)
   






#     sobuoihoc = db.Column(db.Integer)
#     hsmoibuoi = db.Column(db.Integer)
#     hsnam = db.Column(db.Integer)
#     hsnu = db.Column(db.Integer)
# #     trgchinh = db.Column(db.String)
#     loaitrg = db.Column(db.Integer)
#     ngtraloi = db.Column(db.String)
#     vitrichuvu = db.Column(db.String)
#     thongtinll = db.Column(db.String)
#     nguonnccongtrinh = relationship('NguocNcCongTrinh')
#     nguonnccongtrinh_id = db.Column(UUID(as_uuid=True), ForeignKey('nguonnccongtrinh.id'), nullable=True)
#     capnctruongtram = relationship('CapNcTruongTram')
#     capnctruongtram_id = db.Column(UUID(as_uuid=True), ForeignKey('capnctruongtram.id'), nullable=True)


# class NguonNuocCuaTruongHoc(CommonModel):
#     __tablename__ = 'nguonNnuoccuatruonghoc'
    
    
   
# class CapNcTruongTram(CommonModel):
#     __tablename__ = 'capnctruongtram'
#     matrgtram = db.Column(db.String)
#     tentrgtram = db.Column(db.String)
#     tenkhu = db.Column(db.String)
#     qskhuvs = db.Column(db.Integer)
#     khac = db.Column(db.String)
#     chauxi = db.Column(db.Integer)
#     sannhanut = db.Column(db.Integer)
#     daykincua = db.Column(db.Integer)
#     bechuanut = db.Column(db.Integer)
#     kcbechua = db.Column(db.Integer)
#     hoatdongbt = db.Column(db.Integer)
#     nuocsach = db.Column(db.Integer)
#     ctruatay = db.Column(db.Integer)
#     qscongtrinh = db.Column(db.Integer)
#     mailop = db.Column(db.Integer)
#     dinhdong = db.Column(db.Integer)
#     ctsachse = db.Column(db.Integer)
#     sansach = db.Column(db.Integer)
#     nangmui = db.Column(db.Integer)
#     nuocthaichay = db.Column(db.Integer)
#     bexicao = db.Column(db.Integer)
#     ngaplut = db.Column(db.Integer)
#     khuditieu = db.Column(db.Integer)
#     tt_dientich = db.Column(db.Integer)
#     tt_sochau = db.Column(db.Integer)
#     decapquantrong = db.Column(db.String)