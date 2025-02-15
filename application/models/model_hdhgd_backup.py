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


##Mau 1:
class KiemTraTinhTrangVSS(CommonModel):
    __tablename__ = 'kiemtratinhtrangvss'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    
    tentinh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tentinh = relationship('TinhThanh')
    tenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    tenhuyen = relationship('QuanHuyen')
    tenxa_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    tenxa = relationship('XaPhuong')
    tenthon_id = db.Column(UUID(as_uuid=True), ForeignKey('thonxom.id'), nullable=True)
    tenthon = relationship('ThonXom')
    dantoc_id = db.Column(UUID(as_uuid=True), ForeignKey('dantoc.id'), nullable=True)
    dantoc = relationship('DanToc')
    gioitinh = db.Column(db.Integer)
    chuho = db.Column(db.String)
    hongheo = db.Column(db.Integer)
    
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    tieuchichinh = db.Column(db.String)
    tieuchichinhkdat = db.Column(db.String)
    babexuly = db.Column(db.String)
    baexulykdat = db.Column(db.String)
    lapbechuaphan = db.Column(db.String)
    lapbechuaphankdat = db.Column(db.String)
    matsannhan = db.Column(db.String)
    matsannhankdat = db.Column(db.String)
    besiconutnuoc = db.Column(db.String)
    besiconutnuockdat = db.Column(db.String)
    coongthonghoi = db.Column(db.String)
    coongthonghoikdat = db.Column(db.String)
    codunuocdoi = db.Column(db.String)
    codunuocdoikdat = db.Column(db.String)
    dungcuchuanuocdoi = db.Column(db.String)
    dungcuchuanuocdoikdat = db.Column(db.String)
    kcomuihoi = db.Column(db.String)
    kcomuihoikdat = db.Column(db.String)
    nuocxuli = db.Column(db.String)
    nuocxulikdat = db.Column(db.String)
    vsxungquanh = db.Column(db.String)
    vsxungquanhkdat = db.Column(db.String)

    cactieuchiphu = db.Column(db.String)
    cactieuchiphukdat = db.Column(db.String)
    matsannhatieu = db.Column(db.String)
    matsannhatieukdat = db.Column(db.String)
    giayvesinh = db.Column(db.String)
    giayvesinhkdat = db.Column(db.String)
    kcoruoi = db.Column(db.String)
    kcoruoikdat = db.Column(db.String)
    bexinuoc = db.Column(db.String)
    bexinuockdat = db.Column(db.String)
    dcchekin = db.Column(db.String)
    dcchekinkdat = db.Column(db.String)
    vesinhxungquanh = db.Column(db.String)
    vesinhxungquanhkdat = db.Column(db.String)

    hopvs = db.Column(db.String)
    kohopvs = db.Column(db.String)
    nhatieukodatbatieuchi = db.Column(db.String)

##Mau 2
class NhaTieuThamNuoc(CommonModel):
    __tablename__ = 'nhatieuthamnuoc'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    
    tentinh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tentinh = relationship('TinhThanh')
    tenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    tenhuyen = relationship('QuanHuyen')
    tenxa_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    tenxa = relationship('XaPhuong')
    tenthon_id = db.Column(UUID(as_uuid=True), ForeignKey('thonxom.id'), nullable=True)
    tenthon = relationship('ThonXom')
    dantoc_id = db.Column(UUID(as_uuid=True), ForeignKey('dantoc.id'), nullable=True)
    dantoc = relationship('DanToc')
    gioitinh = db.Column(db.Integer)
    chuho = db.Column(db.String)
    hongheo = db.Column(db.Integer)
    
    tieuchichinh = db.Column(db.String)
    tieuchichinhkdat = db.Column(db.String)
    babexuly = db.Column(db.String)
    baexulykdat = db.Column(db.String)
    lapbechuaphan = db.Column(db.String)
    lapbechuaphankdat = db.Column(db.String)
    matsannhan = db.Column(db.String)
    matsannhankdat = db.Column(db.String)
    besiconutnuoc = db.Column(db.String)
    besiconutnuockdat = db.Column(db.String)
    coongthonghoi = db.Column(db.String)
    coongthonghoikdat = db.Column(db.String)
    codunuocdoi = db.Column(db.String)
    codunuocdoikdat = db.Column(db.String)
    dungcuchuanuocdoi = db.Column(db.String)
    dungcuchuanuocdoikdat = db.Column(db.String)
    kcomuihoi = db.Column(db.String)
    kcomuihoikdat = db.Column(db.String)
    nuocxuli = db.Column(db.String)
    nuocxulikdat = db.Column(db.String)
    vsxungquanh = db.Column(db.String)
    vsxungquanhkdat = db.Column(db.String)
    
    cactieuchiphu = db.Column(db.String)
    cactieuchiphukdat = db.Column(db.String)
    matsannhatieu = db.Column(db.String)
    matsannhatieukdat = db.Column(db.String)
    giayvesinh = db.Column(db.String)
    giayvesinhkdat = db.Column(db.String)
    kcoruoi = db.Column(db.String)
    kcoruoikdat = db.Column(db.String)
    bexinuoc = db.Column(db.String)
    bexinuockdat = db.Column(db.String)
    dcchekin = db.Column(db.String)
    dcchekinkdat = db.Column(db.String)
    vesinhxungquanh = db.Column(db.String)
    vesinhxungquanhkdat = db.Column(db.String)

    hopvs = db.Column(db.String)
    kohopvs = db.Column(db.String)
    nhatieukodatbatieuchi = db.Column(db.String)


##Mau 3
class NhaTieu2Ngan(CommonModel):
    __tablename__ = 'nhatieu2ngan'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    
    tentinh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tentinh = relationship('TinhThanh')
    tenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    tenhuyen = relationship('QuanHuyen')
    tenxa_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    tenxa = relationship('XaPhuong')
    tenthon_id = db.Column(UUID(as_uuid=True), ForeignKey('thonxom.id'), nullable=True)
    tenthon = relationship('ThonXom')
    dantoc_id = db.Column(UUID(as_uuid=True), ForeignKey('dantoc.id'), nullable=True)
    dantoc = relationship('DanToc')
    gioitinh = db.Column(db.Integer)
    chuho = db.Column(db.String)
    hongheo = db.Column(db.Integer)
    
    
    tieuchichinh = db.Column(db.String)
    tieuchichinhkdat = db.Column(db.String)
    babexuly = db.Column(db.String)
    baexulykdat = db.Column(db.String)
    lapbechuaphan = db.Column(db.String)
    lapbechuaphankdat = db.Column(db.String)
    matsannhan = db.Column(db.String)
    matsannhankdat = db.Column(db.String)
    besiconutnuoc = db.Column(db.String)
    besiconutnuockdat = db.Column(db.String)
    coongthonghoi = db.Column(db.String)
    coongthonghoikdat = db.Column(db.String)
    codunuocdoi = db.Column(db.String)
    codunuocdoikdat = db.Column(db.String)
    dungcuchuanuocdoi = db.Column(db.String)
    dungcuchuanuocdoikdat = db.Column(db.String)
    kcomuihoi = db.Column(db.String)
    kcomuihoikdat = db.Column(db.String)
    nuocxuli = db.Column(db.String)
    nuocxulikdat = db.Column(db.String)
    vsxungquanh = db.Column(db.String)
    vsxungquanhkdat = db.Column(db.String)

    cactieuchiphu = db.Column(db.String)
    cactieuchiphukdat = db.Column(db.String)
    matsannhatieu = db.Column(db.String)
    matsannhatieukdat = db.Column(db.String)
    giayvesinh = db.Column(db.String)
    giayvesinhkdat = db.Column(db.String)
    kcoruoi = db.Column(db.String)
    kcoruoikdat = db.Column(db.String)
    bexinuoc = db.Column(db.String)
    bexinuockdat = db.Column(db.String)
    dcchekin = db.Column(db.String)
    dcchekinkdat = db.Column(db.String)
    vesinhxungquanh = db.Column(db.String)
    vesinhxungquanhkdat = db.Column(db.String)
    ongthonghoi = db.Column(db.String)
    ongthonghoikdat = db.Column(db.String)
    nganmua = db.Column(db.String)
    nganmuakdat = db.Column(db.String)

    hopvs = db.Column(db.String)
    kohopvs = db.Column(db.String)
    nhatieukodatbatieuchi = db.Column(db.String)


##Mau 4
class NhaTieuChim(CommonModel):
    __tablename__ = 'nhatieuchim'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    
    tentinh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tentinh = relationship('TinhThanh')
    tenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    tenhuyen = relationship('QuanHuyen')
    tenxa_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    tenxa = relationship('XaPhuong')
    tenthon_id = db.Column(UUID(as_uuid=True), ForeignKey('thonxom.id'), nullable=True)
    tenthon = relationship('ThonXom')
    dantoc_id = db.Column(UUID(as_uuid=True), ForeignKey('dantoc.id'), nullable=True)
    dantoc = relationship('DanToc')
    gioitinh = db.Column(db.Integer)
    chuho = db.Column(db.String)
    hongheo = db.Column(db.Integer)
    
    
    tieuchichinh = db.Column(db.String)
    tieuchichinhkdat = db.Column(db.String)
    babexuly = db.Column(db.String)
    baexulykdat = db.Column(db.String)
    lapbechuaphan = db.Column(db.String)
    lapbechuaphankdat = db.Column(db.String)
    matsannhan = db.Column(db.String)
    matsannhankdat = db.Column(db.String)
    besiconutnuoc = db.Column(db.String)
    besiconutnuockdat = db.Column(db.String)
    coongthonghoi = db.Column(db.String)
    coongthonghoikdat = db.Column(db.String)
    codunuocdoi = db.Column(db.String)
    codunuocdoikdat = db.Column(db.String)
    dungcuchuanuocdoi = db.Column(db.String)
    dungcuchuanuocdoikdat = db.Column(db.String)
    kcomuihoi = db.Column(db.String)
    kcomuihoikdat = db.Column(db.String)
    nuocxuli = db.Column(db.String)
    nuocxulikdat = db.Column(db.String)
    vsxungquanh = db.Column(db.String)
    vsxungquanhkdat = db.Column(db.String)
    chekinnangmua = db.Column(db.String)
    chekinnangmuakdat = db.Column(db.String)

    cactieuchiphu = db.Column(db.String)
    cactieuchiphukdat = db.Column(db.String)
    matsannhatieu = db.Column(db.String)
    matsannhatieukdat = db.Column(db.String)
    giayvesinh = db.Column(db.String)
    giayvesinhkdat = db.Column(db.String)
    kcoruoi = db.Column(db.String)
    kcoruoikdat = db.Column(db.String)
    bexinuoc = db.Column(db.String)
    bexinuockdat = db.Column(db.String)
    dcchekin = db.Column(db.String)
    dcchekinkdat = db.Column(db.String)
    vesinhxungquanh = db.Column(db.String)
    vesinhxungquanhkdat = db.Column(db.String)

    hopvs = db.Column(db.String)
    kohopvs = db.Column(db.String)
    nhatieukodatbatieuchi = db.Column(db.String)

##Mau 5
class ChoTruongHocTramYTE(CommonModel):
    __tablename__ = 'chotruonghoctramyte'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    ctmot = db.Column(db.String)
    cthai = db.Column(db.String)
    ctba = db.Column(db.String)
    ctbon = db.Column(db.String)
    ctnam = db.Column(db.String)
    ctsau = db.Column(db.String)
    ctbay = db.Column(db.String)
    cttam = db.Column(db.String)
    ctchin = db.Column(db.String)
    ctmuoi = db.Column(db.String)
    ctmuoimot = db.Column(db.String)
    ctmuoihai = db.Column(db.String)
    ctmoiba = db.Column(db.String)
    ctmotbon = db.Column(db.String)
    ctmotnam = db.Column(db.String)
    ctmotsau = db.Column(db.String)
    ctmotbay = db.Column(db.String)

    
class HoatDongBCCTinh(CommonModel):
    __tablename__ = 'hoatdongbcctinh'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    hop_hoi_nghi = db.Column(db.String)
    taphuan = db.Column(db.String)
    cachoatdong = db.Column(db.String)
    thanhlap_cuahang = db.Column(db.String)
    taphuantruyen_thong = db.Column(db.String)
    
class HoatDongBCCHuyen(CommonModel):
    __tablename__ = 'hoatdongbcchuyen'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    hoptrienkhai = db.Column(db.String)
    vschocanbo = db.Column(db.String)
    daotaotunhan = db.Column(db.String)
    
class HoatDongBCCXaThon(CommonModel):
    __tablename__ = 'hoatdongbccxathon'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    hopcapxa = db.Column(db.String)
    camketdat = db.Column(db.String)
    vesinh_thuongxuyen = db.Column(db.String)
    truyenthong_thon = db.Column(db.String)
    
class HoatDongBCCTruongHoc(CommonModel):
    __tablename__ = 'hoatdongbcctruonghoc'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    bancamket = db.Column(db.String)


    
