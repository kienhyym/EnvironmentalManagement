import uuid
from application.database import db
from application.database.model import CommonModel
from sqlalchemy import (func, DECIMAL, Boolean, Column, Date, DateTime, Float,ForeignKey, Integer, String, Text,JSON, Index, UniqueConstraint)
from sqlalchemy.dialects.postgresql import  UUID,JSONB
from sqlalchemy.orm import *
from sqlalchemy.orm import backref, relationship


def default_uuid():
    return str(uuid.uuid4())

class DanhSachDonViThuocSUP(CommonModel):
    __tablename__ = 'danhsach_donvi_thuocSUP'
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=False, unique=True)
    xaphuong = relationship('XaPhuong')

class HoGiaDinh(CommonModel):
    __tablename__ = 'hogiadinh'
    maho = db.Column(db.String)
    tenchuho = db.Column(db.String)
    dantoc_id = db.Column(UUID(as_uuid=True), ForeignKey('dantoc.id'), nullable=True) 
    dantoc = relationship('DanToc')
    gioitinh = db.Column(db.SmallInteger)
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = relationship('XaPhuong')
    thonxom_id = db.Column(UUID(as_uuid=True), ForeignKey('thonxom.id'), nullable=True)
    thonxom = relationship('ThonXom', viewonly=True)

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
    kybaocao = db.Column(db.SmallInteger, nullable=False, default=1)
    loaikybaocao = db.Column(db.Integer, nullable=False)#thang=1,quy=2,6thang=3,nam=4
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
    tong_soho = db.Column(db.Integer, default=0)
    tong_chuholanu = db.Column(db.Integer, default=0)
    tong_sohongheo = db.Column(db.Integer, default=0)
    tong_sohodtts = db.Column(db.Integer, default=0)
    tong_danso = db.Column(db.Integer, default=0)
    tong_nam = db.Column(db.Integer, default=0)
    tong_nu = db.Column(db.Integer, default=0)
    
    tong_soho_conhatieu = db.Column(db.Integer, default=0)
    tong_khongnhatieu = db.Column(db.Integer, default=0)
    tong_hopvs = db.Column(db.Integer, default=0)#
    tong_khonghopvs = db.Column(db.Integer, default=0)#
    
    tong_soho_conhatieu_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_xaymoi = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_tuhoai = db.Column(db.Integer, default=0)
    tong_tuhoai_hvs = db.Column(db.Integer, default=0)
    tong_tuhoai_xaymoi = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_tuhoai_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_tuhoai_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_thamdoi = db.Column(db.Integer, default=0)
    tong_thamdoi_hvs = db.Column(db.Integer, default=0)
    tong_thamdoi_xaymoi = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_thamdoi_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_thamdoi_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_2ngan = db.Column(db.Integer, default=0)
    tong_2ngan_hvs = db.Column(db.Integer, default=0)
    tong_2ngan_xaymoi = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_2ngan_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_2ngan_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_ongthonghoi = db.Column(db.Integer, default=0)
    tong_ongthonghoi_hvs = db.Column(db.Integer, default=0)
    tong_ongthonghoi_xaymoi = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_vip_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_vip_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_loaikhac = db.Column(db.Integer, default=0)
    tong_loaikhac_hvs = db.Column(db.Integer, default=0)
    
    
    
    tong_caithien = db.Column(db.Integer, default=0)
    tong_caithien_hvs = db.Column(db.Integer, default=0)#
    tong_caithien_hongheo = db.Column(db.Integer, default=0)
    tong_caithien_hongheo_hvs = db.Column(db.Integer, default=0)#
    tong_soho_conhatieu_caithien_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_caithien_hvs_xuongcap = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_caithien_hongheo_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_caithien_hongheo_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_diemruatay = db.Column(db.Integer, default=0)
    
    
    

Index('vscapthon_uq_idx', VSCapThon.loaikybaocao, VSCapThon.kybaocao, VSCapThon.nambaocao, VSCapThon.donvi_id, VSCapThon.thonxom_id, unique=True)

    
    
# class NhaTieuThonHVS(CommonModel):
#     __tablename__ = 'nhatieuthonhvs'
#     vscapthon_id = db.Column(UUID(as_uuid=True), ForeignKey('vscapthon.id'), nullable=True) 
#     dantoc_id = db.Column(UUID(as_uuid=True), ForeignKey('dantoc.id'), nullable=True) 
#     dantoc = relationship('DanToc')
#     tendantoc = db.Column(db.String)
#     tenchuho = db.Column(db.String)
#     gioitinh = db.Column(db.SmallInteger)
#     hongheo = db.Column(db.SmallInteger)
#     tuhoai = db.Column(db.SmallInteger)
#     thamdoi = db.Column(db.SmallInteger)
#     haingan = db.Column(db.SmallInteger)
#     chimco_oth = db.Column(db.SmallInteger)
#     loaikhac = db.Column(db.SmallInteger)
#     khongconhatieu = db.Column(db.SmallInteger)
#     hopvesinh = db.Column(db.SmallInteger)
#     khonghopvesinh = db.Column(db.SmallInteger)
#     caithien = db.Column(db.SmallInteger)
#     diemruataycoxaphong = db.Column(db.SmallInteger)
    
    
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
    kybaocao = db.Column(db.SmallInteger, nullable=False)
    loaikybaocao = db.Column(db.Integer, nullable=False)
    
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = relationship('XaPhuong')
    tenxa = db.Column(db.String)
    thuocsuprsws = db.Column(db.SmallInteger)
    tong_sothon = db.Column(db.Integer)
    tong_soho = db.Column(db.Integer)
    tong_chuholanu = db.Column(db.Integer)
    tong_sohongheo = db.Column(db.Integer)
    tong_sohodtts = db.Column(db.Integer)
    tong_danso = db.Column(db.Integer)
    tong_nam = db.Column(db.Integer)
    tong_nu = db.Column(db.Integer)
    
    tong_soho_conhatieu = db.Column(db.Integer, default=0)
    tong_khongnhatieu = db.Column(db.Integer, default=0)
    tong_hopvs = db.Column(db.Integer, default=0)#
    tong_khonghopvs = db.Column(db.Integer, default=0)#
    
    tong_soho_conhatieu_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_xaymoi = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_tuhoai = db.Column(db.Integer, default=0)
    tong_tuhoai_hvs = db.Column(db.Integer, default=0)
    tong_tuhoai_xaymoi = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_tuhoai_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_tuhoai_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_thamdoi = db.Column(db.Integer, default=0)
    tong_thamdoi_hvs = db.Column(db.Integer, default=0)
    tong_thamdoi_xaymoi = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_thamdoi_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_thamdoi_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_2ngan = db.Column(db.Integer, default=0)
    tong_2ngan_hvs = db.Column(db.Integer, default=0)
    tong_2ngan_xaymoi = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_2ngan_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_2ngan_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_ongthonghoi = db.Column(db.Integer, default=0)
    tong_ongthonghoi_hvs = db.Column(db.Integer, default=0)
    tong_ongthonghoi_xaymoi = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_vip_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_vip_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_loaikhac = db.Column(db.Integer, default=0)
    tong_loaikhac_hvs = db.Column(db.Integer, default=0)
    
    
    
    tong_caithien = db.Column(db.Integer, default=0)
    tong_caithien_hvs = db.Column(db.Integer, default=0)#
    tong_caithien_hongheo = db.Column(db.Integer, default=0)
    tong_caithien_hongheo_hvs = db.Column(db.Integer, default=0)#
    tong_soho_conhatieu_caithien_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_caithien_hvs_xuongcap = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_caithien_hongheo_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_caithien_hongheo_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_diemruatay = db.Column(db.Integer, default=0)
    
    danhsachbaocao = db.Column(JSONB())
#     __table_args__ = (UniqueConstraint('donvi_id', 'nambaocao', name='uq_CapXa_donvi_id_nambaocao'),)
Index('vscapxa_uq_idx', VSCapXa.loaikybaocao, VSCapXa.kybaocao, VSCapXa.nambaocao, VSCapXa.donvi_id, unique=True)

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
    kybaocao = db.Column(db.SmallInteger, nullable=False)
    loaikybaocao = db.Column(db.Integer, nullable=False)
    
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    tenhuyen = db.Column(db.String)
    tong_soxa = db.Column(db.Integer)
    tong_sothon = db.Column(db.Integer)
    tong_soho = db.Column(db.Integer)
    tong_chuholanu = db.Column(db.Integer)
    tong_sohongheo = db.Column(db.Integer)
    tong_sohodtts = db.Column(db.Integer)
    tong_danso = db.Column(db.Integer)
    tong_nam = db.Column(db.Integer)
    tong_nu = db.Column(db.Integer)
    
    tong_soho_conhatieu = db.Column(db.Integer, default=0)
    tong_khongnhatieu = db.Column(db.Integer, default=0)
    tong_hopvs = db.Column(db.Integer, default=0)#
    tong_khonghopvs = db.Column(db.Integer, default=0)#
    
    tong_soho_conhatieu_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_xaymoi = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_tuhoai = db.Column(db.Integer, default=0)
    tong_tuhoai_hvs = db.Column(db.Integer, default=0)
    tong_tuhoai_xaymoi = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_tuhoai_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_tuhoai_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_thamdoi = db.Column(db.Integer, default=0)
    tong_thamdoi_hvs = db.Column(db.Integer, default=0)
    tong_thamdoi_xaymoi = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_thamdoi_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_thamdoi_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_2ngan = db.Column(db.Integer, default=0)
    tong_2ngan_hvs = db.Column(db.Integer, default=0)
    tong_2ngan_xaymoi = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_2ngan_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_2ngan_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_ongthonghoi = db.Column(db.Integer, default=0)
    tong_ongthonghoi_hvs = db.Column(db.Integer, default=0)
    tong_ongthonghoi_xaymoi = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_vip_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_vip_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_loaikhac = db.Column(db.Integer, default=0)
    tong_loaikhac_hvs = db.Column(db.Integer, default=0)
    
    
    
    tong_caithien = db.Column(db.Integer, default=0)
    tong_caithien_hvs = db.Column(db.Integer, default=0)#
    tong_caithien_hongheo = db.Column(db.Integer, default=0)
    tong_caithien_hongheo_hvs = db.Column(db.Integer, default=0)#
    tong_soho_conhatieu_caithien_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_caithien_hvs_xuongcap = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_caithien_hongheo_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_caithien_hongheo_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_diemruatay = db.Column(db.Integer, default=0)
    
    danhsachbaocao = db.Column(JSONB())

#     __table_args__ = (UniqueConstraint('donvi_id', 'nambaocao', name='uq_CapHuyen_donvi_id_nambaocao'),)
Index('vscaphuyen_uq_idx', VSCapHuyen.loaikybaocao, VSCapHuyen.kybaocao, VSCapHuyen.nambaocao, VSCapHuyen.donvi_id, unique=True)


#Biểu mẫu số 4: Cấp tinh
class VSCapTinh(CommonModel):
    __tablename__ = 'vscaptinh'
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
    tentinh = db.Column(db.String)
    tong_sohuyen = db.Column(db.Integer)
    tong_soxa = db.Column(db.Integer)
    tong_sothon = db.Column(db.Integer)
    tong_soho = db.Column(db.Integer)
    tong_chuholanu = db.Column(db.Integer)
    tong_sohongheo = db.Column(db.Integer)
    tong_sohodtts = db.Column(db.Integer)
    tong_danso = db.Column(db.Integer)
    tong_nam = db.Column(db.Integer)
    tong_nu = db.Column(db.Integer)
    
    tong_soho_conhatieu = db.Column(db.Integer, default=0)
    tong_khongnhatieu = db.Column(db.Integer, default=0)
    tong_hopvs = db.Column(db.Integer, default=0)#
    tong_khonghopvs = db.Column(db.Integer, default=0)#
    
    tong_soho_conhatieu_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_xaymoi = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_tuhoai = db.Column(db.Integer, default=0)
    tong_tuhoai_hvs = db.Column(db.Integer, default=0)
    tong_tuhoai_xaymoi = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_tuhoai_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_tuhoai_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_thamdoi = db.Column(db.Integer, default=0)
    tong_thamdoi_hvs = db.Column(db.Integer, default=0)
    tong_thamdoi_xaymoi = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_thamdoi_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_thamdoi_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_2ngan = db.Column(db.Integer, default=0)
    tong_2ngan_hvs = db.Column(db.Integer, default=0)
    tong_2ngan_xaymoi = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_2ngan_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_2ngan_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_ongthonghoi = db.Column(db.Integer, default=0)
    tong_ongthonghoi_hvs = db.Column(db.Integer, default=0)
    tong_ongthonghoi_xaymoi = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_vip_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_vip_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_loaikhac = db.Column(db.Integer, default=0)
    tong_loaikhac_hvs = db.Column(db.Integer, default=0)
    
    
    
    tong_caithien = db.Column(db.Integer, default=0)
    tong_caithien_hvs = db.Column(db.Integer, default=0)#
    tong_caithien_hongheo = db.Column(db.Integer, default=0)
    tong_caithien_hongheo_hvs = db.Column(db.Integer, default=0)#
    tong_soho_conhatieu_caithien_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_caithien_hvs_xuongcap = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_caithien_hongheo_hvs_truocbaocao = db.Column(db.Integer, default=0)
    tong_soho_conhatieu_caithien_hongheo_hvs_xuongcap = db.Column(db.Integer, default=0)
    
    tong_diemruatay = db.Column(db.Integer, default=0)
    danhsachbaocao = db.Column(JSONB())
#     __table_args__ = (UniqueConstraint('donvi_id', 'nambaocao', name='uq_CapTinh_donvi_id_nambaocao'),)
Index('vscaptinh_uq_idx', VSCapTinh.loaikybaocao, VSCapTinh.kybaocao, VSCapTinh.nambaocao, VSCapTinh.donvi_id, unique=True)


# Biểu mẫu số 2: Tiến độ thực hiện vệ sinh toàn xã của tỉnh
class TienDoVeSinhToanXa(CommonModel):
    __tablename__ = 'tiendovesinhtoanxa'
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

    tyle_hogiadinh_nhatieucaithien = db.Column(db.DECIMAL)
    tyle_hogiadinh_diemruatay = db.Column(db.DECIMAL)
    tyle_truonghoc_conuocsach_nhatieuhvs = db.Column(db.DECIMAL)
    tonso_hocsinh = db.Column(db.Integer)
    tyle_tramyte_conuocsach_nhatieuhvs = db.Column(db.Integer)
    tongso_hogiadinh_xa = db.Column(db.Integer)
    tong_danso_xa = db.Column(db.Integer)
    tyle_giadinh_chulanu = db.Column(db.DECIMAL)
    tyle_hogiadinh_dtts = db.Column(db.DECIMAL)
    
Index('tiendovesinhtoanxa_uq_idx', TienDoVeSinhToanXa.loaikybaocao, TienDoVeSinhToanXa.kybaocao, TienDoVeSinhToanXa.nambaocao, TienDoVeSinhToanXa.donvi_id, unique=True)


    
   
#Biểu mẫu số 3: Tiến độ thực hiện duy trì vệ sinh toàn xã bền vững
class BaoCaoTienDoDuyTriVSTXBenVung(CommonModel):
    __tablename__ = 'baocao_tiendo_duytri_vstx_benvung'
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

    nam_datvesinh_toanxa = db.Column(db.Integer)
    nam_datvesinh_toanxa_benvung = db.Column(db.Integer)
    tyle_truong_duytri_vesinh = db.Column(db.DECIMAL)
    tyle_tramyte_duytri_vesinh = db.Column(db.DECIMAL)
    
    
class DuyetVeSinhToanXa(CommonModel):
    __tablename__ = 'duyet_vesinh_toanxa' 
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    nguoibaocao_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=True)
    nguoibaocao = db.relationship('User', viewonly=True)
    tinhtrang = db.Column(db.SmallInteger,nullable=False)
    
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = relationship('XaPhuong')

    nam_datvesinh_toanxa = db.Column(db.Integer)
    nam_datvesinh_toanxa_benvung = db.Column(db.Integer)