import uuid

from application.database import db
from application.database.model import CommonModel

from sqlalchemy import (DECIMAL, Boolean, Column, Date, DateTime, Float,ForeignKey, Integer, String, Text,JSON, UniqueConstraint)
from sqlalchemy.dialects.postgresql import  UUID, JSONB
from sqlalchemy.orm import *
# from sqlalchemy import *
from sqlalchemy.orm import backref, relationship
from sqlalchemy.orm.collections import attribute_mapped_collection

def default_uuid():
    return str(uuid.uuid4())

# class BanCongBoQuyHop(CommonModel):
#     __tablename__ = 'bancongboquyhop'
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

##MauSo 1
class KetQuaNgoaiKiemChatLuongNuocSach(CommonModel):
    __tablename__ = 'ketqua_ngoaikiem_chatluong_nuocsach'
    ngaybaocao = db.Column(db.DateTime())
    tendonvi = db.Column(db.String)
    donvi_id = db.Column(UUID(as_uuid=True))
    diachi_donvi = db.Column(db.String)
    congxuat = db.Column(DECIMAL)
    tongso_hogiadinh = db.Column(db.Integer)
    nguonnuoc = db.Column(db.String)
    
    thoigiankiemtra = db.Column(db.DateTime())
    
    thanhphan_doankiemtra = db.Column(db.String)
    
    somauvavitri = db.Column(db.Integer)
    
    hosotheodoi = db.Column(db.String)
    tansuatthuchien_chedonoikiem = db.Column(db.String)
    tinhhinhchatluongnuoc = db.Column(db.String)
    thuchien_chedo = db.Column(db.String)
    nhanxet = db.Column(db.String)
    kiennghi = db.Column(db.String)
    ketluan = db.Column(db.String)
    
class ThongSoBaoCaoChatLuongNuoc(CommonModel):
    __tablename__ = 'thongsobaocaochatluongnuoc'
    mathongso = db.Column(db.String)
    tenthongso = db.Column(db.String)
    baocaoapdung = db.Column(JSONB)

class KetQuaNgoaiKiemChatLuongNuoc(CommonModel):
    __tablename__ = 'ketquangoaikiemchatluongnuoc'
    thongso_id = db.Column(UUID(as_uuid=True))
    tenthongso = db.Column(db.String)
    vitrimau = db.Column(db.Integer)
    tinhtrang = db.Column(db.Boolean) #dat - khong dat
    
    




# 
# class KQNgoaiKiemChatLuong(CommonModel):
#     __tablename__ = 'kqngoaikiemchatluong'
#     id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
#     baocaonuocsachOne_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaonuocsachOne.id'),index=True, nullable=True)
#     coliform_ten = db.Column(db.Integer)
#     coli_ten = db.Column(db.Integer)
#     doduc_ten = db.Column(db.Integer)
#     aresen_ten = db.Column(db.Integer)
#     clodu_ten = db.Column(db.Integer)
#     mausac_ten = db.Column(db.Integer)
#     muivi_ten = db.Column(db.Integer)
#     ph_ten = db.Column(db.Integer)
#     vitrilaymau = db.Column(db.String)
#     # coliform_vitri = db.Column(db.Integer)
#     # coli_vitri = db.Column(db.Integer)
#     # doduc_vitri = db.Column(db.Integer)
#     # aresen_vitri = db.Column(db.Integer)
#     # clodu_vitri = db.Column(db.Integer)
#     # mausac_vitri = db.Column(db.Integer)
#     # muivi_vitri = db.Column(db.Integer)
#     # ph_vitri = db.Column(db.Integer)
# 
#     ##
#     coliform_dat = db.Column(db.Integer ,default=0)
#     coli_dat = db.Column(db.Integer, default=0)
#     doduc_dat = db.Column(db.Integer, default=0)
#     aresen_dat = db.Column(db.Integer, default=0)
#     clodu_dat = db.Column(db.Integer, default=0)
#     mausac_dat = db.Column(db.Integer, default=0)
#     muivi_dat = db.Column(db.Integer, default=0)
#     ph_dat = db.Column(db.Integer, default=0)
#     tong_dat = db.Column(db.String)
# 
# 
# 
# class BaoCaoKiemTraCLNuocSach(CommonModel):
#     __tablename__ = 'baocaokiemtraclnuocsach'
#     id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
#     ngaybanhanh = db.Column(db.DateTime);
#     so = db.Column(db.String)
#     phamvi = db.Column(db.String)
#     baocao6thang = db.Column(db.String)
#     baocao1nam = db.Column(db.String)
#     tongsotinh = db.Column(db.Integer)
#     sotinhcobaocao = db.Column(db.Integer)
#     tongdonvicapnuoc = db.Column(db.Integer)
#     donvicapnuocdckt = db.Column(db.Integer)
#     tonghgd = db.Column(db.Integer)
#     chiemtile = db.Column(db.Integer)
# 
#     tentinh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
#     tentinh = relationship('TinhThanh')
#     baocaokiemtraclnuocsach = db.Column(db.Integer)
#     tongsodonvicapnuoc = db.Column(db.Integer)
#     tongsomau = db.Column(db.Integer)
#     tongsomauchiemtile = db.Column(db.Integer)
#     cacthongso = db.Column(db.Integer)
#     coliform = db.Column(db.Integer)
#     coliformchieunhiet = db.Column(db.Integer)
#     arsenic = db.Column(db.Integer)
#     clodu = db.Column(db.Integer)
#     doduc = db.Column(db.Integer)
#     mausac = db.Column(db.Integer)
#     muivi = db.Column(db.Integer)
#     ph = db.Column(db.Integer)
# 
#     doivoitrungtam = db.Column(db.String)
#     doivoidonvi = db.Column(db.String)
#     somaunuoclamxn = db.Column(db.Integer)
#     somaudatchuan = db.Column(db.Integer)
#     quychuan = db.Column(db.Integer)
#     kodatchuan = db.Column(db.Integer)
#     thongtindat = db.Column(db.String)
#     nghiencuu = db.Column(db.String)
#     denghi = db.Column(db.String)
#     kyten = db.Column(db.String)
#     thongsokdat = db.Column(db.String)
#     tonghopchatluongnuoctinhneuco = relationship('TongHopChatLuongNuocTinhNeuCo')
# 
# ##item 2 2
# class TongHopChatLuongNuocTinhNeuCo(CommonModel):
#     __tablename__ = 'tonghopchatluongnuoctinhneuco'
#     id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
#     baocaokiemtraclnuocsach = db.Column(UUID(as_uuid=True), ForeignKey('baocaokiemtraclnuocsach.id'), nullable=True)
#     tt = db.Column(db.Integer)
#     tendonvi = db.Column(db.String)
#     thoigiankiemtra = db.Column(db.DateTime())
#     noidung = db.Column(db.String)
#     ketluan = db.Column(db.String)
#     bienphap = db.Column(db.String)
#     ketqua = db.Column(db.String)
#     ketqua2 = db.Column(db.String)
# 
# 
# # Mẫu số 03
# class KQKiemTraNuocSach(CommonModel):
#     __tablename__ = 'kqkiemtranuocsach'
#     id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
#     thongtuso = db.Column(db.String)
#     ngaybanhanh = db.Column(db.DateTime())
#     donvibcso =  db.Column(db.Integer)
#     ngaybc = db.Column(db.DateTime())
#     bc6thang = db.Column(db.String)
#     bc12thang = db.Column(db.String)
#     bcdinhky = db.Column(db.String)
#     tongdv = db.Column(db.Integer)
#     tonghgd = db.Column(db.Integer)
#     tyle = db.Column(db.Integer)
#     dvduocktra = db.Column(db.Integer)
#     csngoaikiem = db.Column(db.Integer)
#     kinhphi = db.Column(db.Integer)
#     tang = db.Column(db.String)
#     giam = db.Column(db.String)
#     bang = db.Column(db.String)
#     dungquydinh = db.Column(db.String)
#     kodungquydinh = db.Column(db.String)
#     hosotheodoi = relationship('HoSoTheoDoi')
#     mauxn = db.Column(db.Integer)
#     maudatchuan = db.Column(db.Integer)
#     tylemaudat = db.Column(db.Integer)
#     maukdatchuan = db.Column(db.Integer)
#     tylemaukdat = db.Column(db.Integer)
#     tskhongdat = relationship('TSKhongDat')
#     dvngoaikiem = db.Column(db.Integer)
#     tylenk = db.Column(db.Integer)
#     lannk = db.Column(db.Integer)
#     lietkedonvi = relationship('LietKeDonVi')
#     kqngoaikiem_id = db.Column(UUID(as_uuid=True), ForeignKey('kqngoaikiem.id'), nullable=True)
#     kqngoaikiem = relationship('KQNgoaiKiem')
#     nhanxet = db.Column(db.String)
#     kyten = db.Column(db.String)
#     thongso1 = db.Column(db.String)
#     thongso2 = db.Column(db.String)
#     thongso3 = db.Column(db.String)
#     thongso4 = db.Column(db.String)
# 
# 
# class HoSoTheoDoi(CommonModel):
#     __tablename__ = 'hosotheodoi'
#     id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
#     kqkiemtranuocsach_id = db.Column(UUID(as_uuid=True), ForeignKey('kqkiemtranuocsach.id'), nullable=True)
#     kqktchatluong_id = db.Column(UUID(as_uuid=True), ForeignKey('kqktchatluong.id'), nullable=True)
#     thkqnoikiemnuocsach_id = db.Column(UUID(as_uuid=True), ForeignKey('thkqnoikiemnuocsach.id'), nullable=True)
#     tt = db.Column(db.Integer)
#     tendonvi = db.Column(db.String)
#     sohogd = db.Column(db.Integer)
#     laphoso = db.Column(db.Integer)
#     hsdaydu = db.Column(db.Integer)
#     kdaydu = db.Column(db.Integer)
#     slmau = db.Column(db.Integer)
#     tsthuchien = db.Column(db.Integer)
#     ttbaocao = db.Column(db.Integer)
#     bpkhacphuc = db.Column(db.Integer)
#     tong = db.Column(db.Integer)
# 
# 
# class TSKhongDat(CommonModel):
#     __tablename__ = 'tskhongdat'
#     id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
#     kqkiemtranuocsach_id = db.Column(UUID(as_uuid=True), ForeignKey('kqkiemtranuocsach.id'), nullable=True)
#     kqktchatluong_id = db.Column(UUID(as_uuid=True), ForeignKey('kqktchatluong.id'), nullable=True)
#     thkqnoikiemnuocsach_id = db.Column(UUID(as_uuid=True), ForeignKey('thkqnoikiemnuocsach.id'), nullable=True)
#     tencoso = db.Column(db.String)
#     thongso1 = db.Column(db.String)
#     thongso2 = db.Column(db.String)
#     thongso3 = db.Column(db.String)
#     thongso4 = db.Column(db.String)
#     tong = db.Column(db.Integer)
# 
# class LietKeDonVi(CommonModel):
#     __tablename__ = 'lietkedonvi'
#     id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
#     kqkiemtranuocsach_id = db.Column(UUID(as_uuid=True), ForeignKey('kqkiemtranuocsach.id'), nullable=True)
#     kqktchatluong_id = db.Column(UUID(as_uuid=True), ForeignKey('kqktchatluong.id'), nullable=True)
#     thkqnoikiemnuocsach_id = db.Column(UUID(as_uuid=True), ForeignKey('thkqnoikiemnuocsach.id'), nullable=True)
#     tt = db.Column(db.Integer)
#     tendv = db.Column(db.String)
#     lanngoaikiem = db.Column(db.Integer)
#     noidung = db.Column(db.String)
#     thunghiemts = db.Column(db.String)
# 
# class KQNgoaiKiem(CommonModel):
#     __tablename__ = 'kqngoaikiem'
#     id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
#     hosodat = db.Column(db.String)
#     hosokdat = db.Column(db.String)
#     thunghiemdat = db.Column(db.String)
#     thunghiemkdat = db.Column(db.String)
#     thuchiendat = db.Column(db.String)
#     thuchienkdat = db.Column(db.String)
#     bienphatdat = db.Column(db.String)
#     bienphapkdat = db.Column(db.String)
#     ketquadat = db.Column(db.String)
#     ketquakdat = db.Column(db.String)
#     congkhaidat = db.Column(db.String)
#     congkhaikdat = db.Column(db.String)
# 
# #Mẫu số 04
# class KQKTChatLuong(CommonModel):
#     __tablename__ = 'kqktchatluong'
#     id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
#     thongtuso = db.Column(db.String)
#     ngaybanhanh = db.Column(db.DateTime())
#     donvibcso =  db.Column(db.Integer)
#     ngaybc = db.Column(db.DateTime())
#     bcdinhky = db.Column(db.String)
#     baocaoquy = db.Column(db.String)
#     bc6thang = db.Column(db.String)
#     bc1nam = db.Column(db.String)
#     tongdv = db.Column(db.Integer)
#     tonghgd = db.Column(db.Integer)
#     tyle = db.Column(db.Integer)
#     dvduocktra = db.Column(db.Integer)
#     csngoaikiem = db.Column(db.Integer)
#     kinhphi = db.Column(db.Integer)
#     tang = db.Column(db.String)
#     giam = db.Column(db.String)
#     bang = db.Column(db.String)
#     dungqd = db.Column(db.String)
#     kdungqd = db.Column(db.String)
#     hosotheodoi = relationship('HoSoTheoDoi')
#     nhanxet = db.Column(db.String)
#     mauthunghiem = db.Column(db.Integer)
#     maudatchuan = db.Column(db.Integer)
#     tyledatchuan = db.Column(db.Integer)
#     maukdatchuan = db.Column(db.Integer)
#     tylekdatchuan = db.Column(db.Integer)
#     tskhongdat = relationship('TSKhongDat')
#     dvngoaikiem = db.Column(db.Integer)
#     tyle = db.Column(db.Integer)
#     solandv = db.Column(db.Integer)
#     lietkedonvi = relationship('LietKeDonVi')
#     kqngoaikiem_id = db.Column(UUID(as_uuid=True), ForeignKey('kqngoaikiem.id'), nullable=True)
#     kqngoaikiem = relationship('KQNgoaiKiem')
#     nhanxet = db.Column(db.String)
#     kyten = db.Column(db.String)
#     thongso1 = db.Column(db.String)
#     thongso2 = db.Column(db.String)
#     thongso3 = db.Column(db.String)
#     thongso4 = db.Column(db.String)
# # Mẫu số 06
# 
# class THKQNoiKiemNuocSach(CommonModel):
#     __tablename__ = 'thkqnoikiemnuocsach'
#     id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
#     thongtuso = db.Column(db.String)
#     ngaybanhanh = db.Column(db.DateTime())
#     quy = db.Column(db.Integer)
#     dvcapnuoc = db.Column(db.String)
#     diachi = db.Column(db.String)
#     congsuat = db.Column(db.Integer)
#     tonghgd = db.Column(db.Integer)
#     ncnglieu = db.Column(db.String)
#     hosotheodoi = relationship('HoSoTheoDoi')
#     nhanxet = db.Column(db.String)
#     mauthunghiem = db.Column(db.Integer)
#     maudatchuan = db.Column(db.Integer)
#     tyledatchuan = db.Column(db.Integer)
#     maukdatchuan = db.Column(db.Integer)
#     tylekdatchuan = db.Column(db.Integer)
#     chitieukdat = db.Column(db.String)
#     lietkedonvi = relationship('LietKeDonVi')
#     kqngoaikiem_id = db.Column(UUID(as_uuid=True), ForeignKey('kqngoaikiem.id'), nullable=True)
#     kqngoaikiem = relationship('KQNgoaiKiem')
#     dexuat = db.Column(db.String)
#     ketluan = db.Column(db.String)
#     thutruong = db.Column(db.String)
# 
# 
# # Mẫu số 05
# class KQNoiKiemNuocSach(CommonModel):
#     __tablename__ = 'kqnoikiemnuocsach'
#     id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
#     thongtuso = db.Column(db.String)
#     ngaybanhanh = db.Column(db.DateTime())
#     tendv = db.Column(db.String)
#     diachi = db.Column(db.String)
#     congsuat = db.Column(db.Integer)
#     tonghgd = db.Column(db.Integer)
#     ncnguyenlieu = db.Column(db.String)
#     tgkiemtra = db.Column(db.DateTime())
#     ngkiemtra = db.Column(db.String)
#     somauvavitri = db.Column(db.String)
#     hosotheodoi = db.Column(db.String)
#     tnchatluongnc = relationship('TNChatLuongNc')
#     ghichuketqua = db.Column(db.String)
#     bienphap = db.Column(db.String)
#     ketluan = db.Column(db.String)
#     ngayky = db.Column(db.DateTime())
#     kyten = db.Column(db.String)
#     
# class TNChatLuongNc(CommonModel):
#     __tablename__ = 'tnchatluongnc'
#     id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
#     kqnoikiemnuocsach_id = db.Column(UUID(as_uuid=True), ForeignKey('kqnoikiemnuocsach.id'), nullable=True)
#     tt = db.Column(db.Integer)
#     msmau1 = db.Column(db.String)
#     msmau2 = db.Column(db.String)
#     msmau3 = db.Column(db.String)
#     
#     coliform1 = db.Column(db.Integer)
#     ecoli1 = db.Column(db.Integer)
#     arsenic1 = db.Column(db.Integer)
#     clo1 = db.Column(db.Integer)
#     doduc1 = db.Column(db.Integer)
#     masac1 = db.Column(db.String)
#     muivi1 = db.Column(db.String)
#     ph1 = db.Column(db.Integer)
#     
#     coliform2 = db.Column(db.Integer)
#     ecoli2 = db.Column(db.Integer)
#     arsenic2 = db.Column(db.Integer)
#     clo2 = db.Column(db.Integer)
#     doduc2 = db.Column(db.Integer)
#     masac2 = db.Column(db.String)
#     muivi2 = db.Column(db.String)
#     ph2 = db.Column(db.Integer)
#     
#     coliform3 = db.Column(db.Integer)
#     ecoli3 = db.Column(db.Integer)
#     arsenic3 = db.Column(db.Integer)
#     clo3 = db.Column(db.Integer)
#     doduc3 = db.Column(db.Integer)
#     masac3 = db.Column(db.String)
#     muivi3 = db.Column(db.String)
#     ph3 = db.Column(db.Integer)
#     
#     coliform_dg = db.Column(db.Integer)
#     ecoli_dg = db.Column(db.Integer)
#     arsenic_dg = db.Column(db.Integer)
#     clo_dg = db.Column(db.Integer)
#     doduc_dg = db.Column(db.Integer)
#     masac_dg = db.Column(db.String)
#     muivi_dg = db.Column(db.String)
#     ph_dg = db.Column(db.Integer)
