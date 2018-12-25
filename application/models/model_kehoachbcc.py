import uuid

from application.database import db
from application.database.model import CommonModel
from sqlalchemy import (DECIMAL, Boolean, Column, Date, DateTime, Float,ForeignKey, Integer, String, Text,JSON, UniqueConstraint)
from sqlalchemy.dialects.postgresql import  UUID
from sqlalchemy.orm import *
from sqlalchemy.orm import backref, relationship
from sqlalchemy.orm.collections import attribute_mapped_collection


# Biểu mẫu số 1: Tiến độ lập kế hoạch và thực hiện Kế Hoạch Truyền Thông tiến độ lập kế hoạch và phê duyệt
class ItemXa(CommonModel):
    __tablename__ = 'itemxa'
    kehoachthuchien_id = db.Column(UUID(as_uuid=True), ForeignKey('kehoachthuchien.id'), nullable=True)
    hoatdong = db.Column(db.String)
    muctieu = db.Column(db.String)
    ketqua_datduoc = db.Column(db.String)
    tongsonguoi_thamgia = db.Column(db.Integer)
    songuoi_lanu = db.Column(db.Integer)
    songuoi_dantocthieuso = db.Column(db.Integer)
    nganh = db.Column(db.Integer)

    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = relationship('XaPhuong')

class ItemHuyen(CommonModel):
    __tablename__ = 'itemhuyen'
    kehoachthuchien_id = db.Column(UUID(as_uuid=True), ForeignKey('kehoachthuchien.id'), nullable=True)
    hoatdong = db.Column(db.String)
    muctieu = db.Column(db.String)
    ketqua_datduoc = db.Column(db.String)
    tongsonguoi_thamgia = db.Column(db.Integer)
    songuoi_lanu = db.Column(db.Integer)
    songuoi_dantocthieuso = db.Column(db.Integer)
    nganh = db.Column(db.Integer)

    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = relationship('XaPhuong')

class ItemThon(CommonModel):
    __tablename__ = 'itemthon'
    kehoachthuchien_id = db.Column(UUID(as_uuid=True), ForeignKey('kehoachthuchien.id'), nullable=True)
    hoatdong = db.Column(db.String)
    muctieu = db.Column(db.String)
    ketqua_datduoc = db.Column(db.String)
    tongsonguoi_thamgia = db.Column(db.Integer)
    songuoi_lanu = db.Column(db.Integer)
    songuoi_dantocthieuso = db.Column(db.Integer)
    nganh = db.Column(db.Integer)

    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = relationship('XaPhuong')
    thonxom_id = db.Column(UUID(as_uuid=True), ForeignKey('thonxom.id'), nullable=True)
    thonxom = relationship('ThonXom')
    
class ItemTinh(CommonModel):
    __tablename__ = 'itemtinh'
    kehoachthuchien_id = db.Column(UUID(as_uuid=True), ForeignKey('kehoachthuchien.id'), nullable=True)
    hoatdong = db.Column(db.String)
    muctieu = db.Column(db.String)
    ketqua_datduoc = db.Column(db.String)
    tongsonguoi_thamgia = db.Column(db.Integer)
    songuoi_lanu = db.Column(db.Integer)
    songuoi_dantocthieuso = db.Column(db.Integer)
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = relationship('XaPhuong')

class KeHoachThucHien(CommonModel):
    __tablename__ =  'kehoachthuchien'
    itemthon = relationship("ItemThon")
    itemxa = relationship("ItemXa")
    itemhuyen = relationship("ItemHuyen")
    itemtinh = relationship("ItemTinh")
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = relationship('XaPhuong') 

    xaydungduthao_bcc = db.Column(db.Integer)
    nganh = db.Column(db.Integer)
    vihema_chapthuan = db.Column(db.Integer)
    ngay_pheduyet = db.Column(db.DateTime())
    trangthai_tinhpheduyen = db.Column(db.Integer)
    tinhpheduyet_bcc = db.Column(db.String)
    sohoatdong_bcc = db.Column(db.String)

    

# Biểu mẫu số 2: Tiến độ thực hiện vệ sinh toàn xã của tỉnh
class VSToanXa(CommonModel):
    __tablename__ = 'vstoanxa'
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    nguoibaocao_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=True)
    nguoibaocao = db.relationship('User', viewonly=True)
    tinhtrang = db.Column(db.SmallInteger,nullable=True)
    
    nam_baocao = db.Column(db.SmallInteger(),nullable=False)
    ky_baocao = db.Column(db.SmallInteger(),nullable=False)

    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = relationship('XaPhuong')

    nhatieu = db.Column(db.Integer)
    diemruatay =  db.Column(db.Integer)
    truonghvs = db.Column(db.Integer)
    sohocsinh = db.Column(db.Integer)
    tramyte_hop_vesinh = db.Column(db.Integer)
    soho_giadinh = db.Column(db.Integer)
    danso = db.Column(db.Integer)
    ho_nula_chu = db.Column(db.Integer)
    dantoc_thieuso = db.Column(db.Integer)
   
#Biểu mẫu số 3: Tiến độ thực hiện duy trì vệ sinh toàn xã bền vững
class DuyTriVS(CommonModel):
    __tablename__ = 'duytrivs'

    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = relationship('XaPhuong')

    namdat_vesinh_thuongxuyen = db.Column(db.DateTime())
    truong_vesinh = db.Column(db.Integer)
    tram_yte = db.Column(db.Integer)
   
#Biểu mẫu số 4: Giới và Dân tộc thiểu số
class DTThieuSo(CommonModel):
    __tablename__ = 'dtthieuso'
    ngdaotao_yte = db.Column(db.Integer)
    nuthamgia_yte = db.Column(db.Integer)
    ptnuthamgia_yte = db.Column(db.Integer)
    dttsthamgia_yte = db.Column(db.Integer)
    ptdttsthamgia_yte = db.Column(db.Integer)

    ngdaotao_gd = db.Column(db.Integer)
    nuthamgia_gd = db.Column(db.Integer)
    ptnuthamgia_gd = db.Column(db.Integer)
    dttsthamgia_gd = db.Column(db.Integer)
    ptdttsthamgia_gd = db.Column(db.Integer)
   
    ngdaotao_tong = db.Column(db.Integer)
    nuthamgia_tong = db.Column(db.Integer)
    ptnuthamgia_tong = db.Column(db.Integer)
    dttsthamgia_tong = db.Column(db.Integer)
    ptdttsthamgia_tong = db.Column(db.Integer)
   
# Biểu mẫu số 5: Thu thập thông tin về công trình cấp nước và vệ sinh trong trường học, trạm y tế
class DTTruongHoc(CommonModel):
    __tablename__ = 'dttruonghoc'
    tentinh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tentinh = relationship('TinhThanh')
    tenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    tenhuyen = relationship('QuanHuyen')
    tenxa_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    tenxa = relationship('XaPhuong')
    tentrgtram = db.Column(db.String)
    matrgtram = db.Column(db.String)
#     maugiao = db.Column(db.Integer)
#     tieuhoc = db.Column(db.Integer)
#     trunghoccs = db.Column(db.Integer)
#     trunghocpt = db.Column(db.Integer)
#     trunghocdn = db.Column(db.Integer)
#     noitru = db.Column(db.Integer)
#     tramyte = db.Column(db.Integer)
    loaitrgtram = db.Column(db.Integer)
#     so = db.Column(db.Integer)
    sobuoihoc = db.Column(db.Integer)
    hsmoibuoi = db.Column(db.Integer)
    hsnam = db.Column(db.Integer)
    hsnu = db.Column(db.Integer)
#     trgchinh = db.Column(db.String)
    loaitrg = db.Column(db.Integer)
    ngtraloi = db.Column(db.String)
    vitrichuvu = db.Column(db.String)
    thongtinll = db.Column(db.String)
    nguonnccongtrinh = relationship('NguocNcCongTrinh')
    nguonnccongtrinh_id = db.Column(UUID(as_uuid=True), ForeignKey('nguonnccongtrinh.id'), nullable=True)
    capnctruongtram = relationship('CapNcTruongTram')
    capnctruongtram_id = db.Column(UUID(as_uuid=True), ForeignKey('capnctruongtram.id'), nullable=True)

class NguocNcCongTrinh(CommonModel):
    __tablename__ = 'nguonnccongtrinh'
    ncchinh = db.Column(db.Integer)
    nguonnckhac = db.Column(db.String)
    
    khuvstrg = db.Column(db.Integer)
    khuvsnam = db.Column(db.Integer)
    khuvsnu = db.Column(db.Integer)
    khuvsgvnam = db.Column(db.Integer)
    khuvsgvnu = db.Column(db.Integer)
    
   
class CapNcTruongTram(CommonModel):
    __tablename__ = 'capnctruongtram'
    matrgtram = db.Column(db.String)
    tentrgtram = db.Column(db.String)
    tenkhu = db.Column(db.String)
    qskhuvs = db.Column(db.Integer)
    khac = db.Column(db.String)
    chauxi = db.Column(db.Integer)
    sannhanut = db.Column(db.Integer)
    daykincua = db.Column(db.Integer)
    bechuanut = db.Column(db.Integer)
    kcbechua = db.Column(db.Integer)
    hoatdongbt = db.Column(db.Integer)
    nuocsach = db.Column(db.Integer)
    ctruatay = db.Column(db.Integer)
    qscongtrinh = db.Column(db.Integer)
    mailop = db.Column(db.Integer)
    dinhdong = db.Column(db.Integer)
    ctsachse = db.Column(db.Integer)
    sansach = db.Column(db.Integer)
    nangmui = db.Column(db.Integer)
    nuocthaichay = db.Column(db.Integer)
    bexicao = db.Column(db.Integer)
    ngaplut = db.Column(db.Integer)
    khuditieu = db.Column(db.Integer)
    tt_dientich = db.Column(db.Integer)
    tt_sochau = db.Column(db.Integer)
    decapquantrong = db.Column(db.String)