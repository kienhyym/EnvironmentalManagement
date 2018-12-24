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

class KhaiThacNuocNgam(CommonModel):
    __tablename__ = 'khaithacnuocngam'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanhthongtu = db.Column(db.DateTime())
    tenphieu = db.Column(db.String)
    loaiphieu = db.Column(db.String)
    phamvi = db.Column(db.String)
    tuongraobaove = db.Column(db.Integer)  # (Có: 1 điểm; không: 0 điểm)
    congtrinhxaydung = db.Column(db.Integer)
    duongongkenhmuong = db.Column(db.Integer)
    canhtacnongnghiep = db.Column(db.Integer)
    bairacthai = db.Column(db.Integer)
    vatnuoi = db.Column(db.Integer)
    phandongvat = db.Column(db.Integer)
    nhatieu = db.Column(db.Integer)


class KhaiThacNuocSong(CommonModel):
    __tablename__ = 'khaithacnuocsong'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanhthongtu = db.Column(db.DateTime())
    tenphieu = db.Column(db.String)
    loaiphieu = db.Column(db.String)
    phamvi = db.Column(db.String)
    bienbao = db.Column(db.Integer)
    chanrac = db.Column(db.Integer)
    congtrinhxaydung = db.Column(db.Integer)
    duongongkenhmuong = db.Column(db.Integer)
    bendoneodau = db.Column(db.Integer)
    nguoisinhhoat = db.Column(db.Integer)
    khaithactainguyen = db.Column(db.Integer)
    nuoitrongthuysan = db.Column(db.Integer)
    vatnuoi = db.Column(db.Integer)


class KhaiThacNuocTuHoChua(CommonModel):
    __tablename__ = 'khaithacnuoctuhochua'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanhthongtu = db.Column(db.DateTime())
    tenphieu = db.Column(db.String)
    loaiphieu = db.Column(db.String)
    phamvi = db.Column(db.String)
    bienbao = db.Column(db.Integer)
    chanrac = db.Column(db.Integer)
    congtrinhxaydung = db.Column(db.Integer)
    duongongkenhmuong = db.Column(db.Integer)
    thuyenbeneodau = db.Column(db.Integer)
    nguoisinhhoat = db.Column(db.Integer)
    nuoitrong = db.Column(db.Integer)
    canhtacnongnghiep = db.Column(db.Integer)
    vatnuoi = db.Column(db.Integer)
    racthai = db.Column(db.Integer)



#Mau 4.4.
class PhieuNoiKiemChatLuong(CommonModel):
    __tablename__ = 'phieunoikiemchatluong'
    id = db.Column(UUID(as_uuid=True),primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanhthongtu = db.Column(db.DateTime())
    tencoso = db.Column(db.String)
    tenphieu = db.Column(db.String)
    loaiphieu = db.Column(db.String)
    thoigiankiemtra = db.Column(db.DateTime())
    nguoikiemtra = db.Column(db.String)
    thongtinmau = db.Column(db.String)
    nguyco_nuocngam = db.Column(db.String)
    danhgia_nuocngam = db.Column(db.String)
    nguyco_nuocsong = db.Column(db.String)
    danhgia_nuocsong = db.Column(db.String)
    nguyco_nuochochua = db.Column(db.String)
    danhgia_nuochochua = db.Column(db.String)
    vsngoaicanhcoso = db.Column(db.String)
    vssxbeho = db.Column(db.String)
    vssxtrambomtho = db.Column(db.String)
    vssxkhusatmangan = db.Column(db.String)
    vssxbekeotulang = db.Column(db.String)
    vssxbeloc = db.Column(db.String)
    hethongkhutrung = db.Column(db.String)
    khohoachat = db.Column(db.String)
    thietbiphongho = db.Column(db.String)
    bechua = db.Column(db.String)
    bienphapkhacphuc = db.Column(db.String)
    ketluan = db.Column(db.String)
    ngaykiemtra = db.Column(db.DateTime())
    nguoikiemtrakyten = db.Column(db.String)
#     kqphieunoikiemtrachatluong_id = db.Column(UUID(as_uuid=True), ForeignKey('kqphieunoikiemtrachatluong.id'), nullable=True)
    kqphieunoikiemtrachatluong = relationship('KQPhieuNoiKiemChatLuong',viewonly=True)


#Table 4.4
class KQPhieuNoiKiemChatLuong(CommonModel):
    __tablename__ = 'kqphieunoikiemtrachatluong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    phieunoikiemchatluong_id = db.Column(UUID(as_uuid=True), ForeignKey('phieunoikiemchatluong.id'),index=True, nullable=True)
    vitrilaymau = db.Column(db.String)
    ph = db.Column(db.String)
    doduc = db.Column(db.String)
    clodu = db.Column(db.String)
    tieuchikhac = db.Column(JSON)
    danhgia = db.Column(db.String)

#Mau 4.5.
class PhieuNgoaiKiemChatLuong(CommonModel):
    __tablename__ = 'phieungoaikiemchatluong'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanhthongtu = db.Column(db.DateTime())
    tenphieu = db.Column(db.String)
    loaiphieu = db.Column(db.String)
    tencoso = db.Column(db.String)
    diachi = db.Column(db.String)
    congsuat = db.Column(db.String)
    sodan = db.Column(db.Integer)
    thoigiankiemtra = db.Column(db.DateTime())
    thanhphandoan = db.Column(db.String)
    thongtinmau = db.Column(db.String)
    nguyco_nuocngam = db.Column(db.String)
    danhgia_nuocngam = db.Column(db.String)
    nguycon_nuocsong = db.Column(db.String)
    danhgia_nuocsong = db.Column(db.String)
    nguycon_hochua = db.Column(db.String)
    danhgia_hochua = db.Column(db.String)
    vsngoaicanhcoso = db.Column(db.String)
    vssxbeho = db.Column(db.String)
    vssxtrambomtho = db.Column(db.String)
    vssxkhusatmangan = db.Column(db.String)
    vssxbekeotulang = db.Column(db.String)
    vssxbeloc = db.Column(db.String)
    hethongkhutrung = db.Column(db.String)
    hoachat = db.Column(db.String)
    phongho = db.Column(db.String)
    bechua = db.Column(db.String)
    hosoquanly = db.Column(db.String)
    tansuatkiemtra = db.Column(db.String)
    baocao = db.Column(db.String)
    ketluan = db.Column(db.String)
    kiennghi = db.Column(db.String)
    daidiencosokyten = db.Column(db.String)
    ngaykiemtra = db.Column(db.DateTime())
    nguoikiemtrakyten = db.Column(db.String)
#     kqphieungoaikiemtrachatluong_id = db.Column(UUID(as_uuid=True), ForeignKey('kqphieungoaikiemtrachatluong.id'), nullable=True)
    kqphieungoaikiemtrachatluong = relationship('KQPhieuNgoaiKiemChatLuong',viewonly=True)


#Table 4.5
class KQPhieuNgoaiKiemChatLuong(CommonModel):
    __tablename__ = 'kqphieungoaikiemtrachatluong'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    phieungoaikiemchatluong_id = db.Column(UUID(as_uuid=True), ForeignKey('phieungoaikiemchatluong.id'),index=True, nullable=True)
    vitrilaymau = db.Column(db.String)
    ph = db.Column(db.String)
    doduc = db.Column(db.String)
    clodu = db.Column(db.String)
    tieuchikhac = db.Column(JSON)
    danhgia = db.Column(db.String)


#Mau 4.6.
class KiemTraNguonNuocHoGiaDinh(CommonModel):
    __tablename__ = 'kiemtranguonnuochogiadinh'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanhthongtu = db.Column(db.DateTime())
    tenphieu = db.Column(db.String)
    tenhogiadinh = db.Column(db.String)
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = relationship('XaPhuong')
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh', viewonly=True)
    thonxom_id = db.Column(UUID(as_uuid=True), ForeignKey('thonxom.id'), nullable=True)
    thonxom = relationship('ThonXom')
    diachi = db.Column(db.String)
    sonhankhau = db.Column(db.Integer)
    hinhthuccungcapnuoc = db.Column(db.String)
    thoigiankiemtra = db.Column(db.DateTime())
    nguoikiemtra = db.Column(db.String)
    thongtinmau = db.Column(db.String)


    nguonnuoctuchay_id = db.Column(UUID(as_uuid=True), ForeignKey('nguonnuoctuchay.id'), nullable=True)
    nguonuoctuchay = relationship('NguonNuocTuChay')
#
    nguonnuocgiengdao_id = db.Column(UUID(as_uuid=True), ForeignKey('nguonnuocgiengdao.id'), nullable=True)
    nguonnuocgiengdao = relationship('NguonNuocGiengDao')
#
    nguonnuocgiengkhoantren25m_id = db.Column(UUID(as_uuid=True), ForeignKey('nguonnuocgiengkhoantren25m.id'), nullable=True)
    nguonnuocgiengkhoantren25m = relationship('NguonNuocGiengKhoanTren25m')
#
    nguonnuocgiengkhoanduoi25m_id = db.Column(UUID(as_uuid=True), ForeignKey('nguonnuocgiengkhoanduoi25m.id'), nullable=True)
    nguonnuocgiengkhoanduoi25m = relationship('NguonNuocGiengKhoanDuoi25m')
#
    hethongthuhungnuocmua_id = db.Column(UUID(as_uuid=True), ForeignKey('hethongthuhungnuocmua.id'), nullable=True)
    hethongthuhungnuocmua = relationship('HeThongThuHungNuocMua')
#
    luutrunuocbechumvai_id = db.Column(UUID(as_uuid=True), ForeignKey('luutrunuocbechumvai.id'), nullable=True)
    luutrunuocbechumvai = relationship('LuuTruNuocBECHUMVAI')
    

    gianmua = db.Column(db.String)
    beloc = db.Column(db.String)
    vatlieutrongbeloc = db.Column(db.String)
    dungcuchuanuocsauxuly = db.Column(db.String)
    ketluan = db.Column(db.String)
    kiennghi = db.Column(db.String)
    daidienhogiadinhkyten = db.Column(db.String)
    ngaykiemtra = db.Column(db.DateTime())
    nguoikiemtrakyten = db.Column(db.String)
    ktnuochogiadinh = relationship('KTNuocHoGiaDinh',viewonly=True)


#Table 4.6
class KTNuocHoGiaDinh(CommonModel):
    __tablename__ = 'ktnuochogiadinh'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    kiemtranguonnuochogiadinh_id = db.Column(UUID(as_uuid=True), ForeignKey('kiemtranguonnuochogiadinh.id'), nullable=True)
    vitrilaymau = db.Column(db.String)
    ph = db.Column(db.String)
    doduc = db.Column(db.String)
    clodu = db.Column(db.String)
    tieuchikhac = db.Column(JSON)
    danhgia = db.Column(db.String)


#<------------------------------
class NguonNuocTuChay(CommonModel):
    __tablename__ = 'nguonnuoctuchay'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    phamvi = db.Column(db.String)
    nguoisinhhoat = db.Column(db.Integer)
    duongong = db.Column(db.Integer)
    nuoitrong = db.Column(db.Integer)
    vatnuoi = db.Column(db.Integer)
    racthai = db.Column(db.Integer)
    dungcudannuoc = db.Column(db.Integer)
    dungcuchuanuoc = db.Column(db.Integer)
    cong = db.Column(db.Integer)


class NguonNuocGiengDao(CommonModel):
    __tablename__ = 'nguonnuocgiengdao'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    conhatieugangieng10m = db.Column(db.Integer)
    cobairacgangieng10m = db.Column(db.Integer)
    cochuonggiasucgangieng10m = db.Column(db.Integer)
    napdaygieng = db.Column(db.Integer)
    thanhgieng = db.Column(db.Integer)
    vachgieng = db.Column(db.Integer)
    sangieng = db.Column(db.Integer)
    ranhthoatnuoc = db.Column(db.Integer)
    dungculaynuoc = db.Column(db.Integer)
    cong = db.Column(db.Integer)


class NguonNuocGiengKhoanTren25m(CommonModel):
    __tablename__ = 'nguonnuocgiengkhoantren25m'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    conggieng = db.Column(db.Integer)
    sangieng = db.Column(db.Integer)
    dungcubomnuoc = db.Column(db.Integer)
    cong = db.Column(db.Integer)


class NguonNuocGiengKhoanDuoi25m(CommonModel):
    __tablename__ = 'nguonnuocgiengkhoanduoi25m'
    id = db.Column(UUID(as_uuid=True),primary_key=True, default=default_uuid)
    thongtinkiemtra = db.Column(db.String)
    congieng = db.Column(db.Integer)
    sangieng = db.Column(db.Integer)
    dungcubomnuoc = db.Column(db.Integer)
    conhatieugangieng10m = db.Column(db.Integer)
    cobairacgangieng10m = db.Column(db.Integer)
    cochuonggiasucgangieng10m = db.Column(db.Integer)
    ranhthoatnuoc = db.Column(db.Integer)
    cong = db.Column(db.Integer)


class HeThongThuHungNuocMua(CommonModel):
    __tablename__ = 'hethongthuhungnuocmua'
    id = db.Column(UUID(as_uuid=True),primary_key=True, default=default_uuid)
    thongtinkiemtra = db.Column(db.String)
    vatlieumaihungmua = db.Column(db.Integer)
    maihungmangdan = db.Column(db.Integer)
    ganganrac = db.Column(db.Integer)
    napdaybe = db.Column(db.Integer)
    thanhbe = db.Column(db.Integer)
    rongreucontrung = db.Column(db.Integer)
    dungculaynuoc = db.Column(db.Integer)
    cong = db.Column(db.Integer)


class LuuTruNuocBECHUMVAI(CommonModel):
    __tablename__ = 'luutrunuocbechumvai'
    id = db.Column(UUID(as_uuid=True),primary_key=True, default=default_uuid)
    thongtinkiemtra = db.Column(db.String)
    napday = db.Column(db.Integer)
    rongreucontrung = db.Column(db.Integer)
    dungculaynuoc = db.Column(db.Integer)
    cong = db.Column(db.Integer)
#------------------------------------->

#Mau 4.7.
class KiemTraVSChatLuongNuocThanhPham(CommonModel):
    __tablename__ = 'kiemtrachatluongnuocthanhpham'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanhthongtu = db.Column(db.DateTime())
    tencoso = db.Column(db.String)
    so = db.Column(db.String)
    ngaytaophieu = db.Column(db.DateTime())
    tenphieu = db.Column(db.String)
    loaiphieu = db.Column(db.String)
    diachi = db.Column(db.String)
    congsuat = db.Column(db.String)
    sodan = db.Column(db.Integer)
    nguonnguocnguyenlieu = db.Column(db.String)
    tinhtrangnguonnuocnguyenlieu = db.Column(db.String)
    tinhtrangngoaicanhcoso = db.Column(db.String)
    tinhtrangethongsanxuat = db.Column(db.String)
    somautansuatxetnghiem = db.Column(db.String)
    tongsomaudat = db.Column(db.Integer)
    tylemaudat = db.Column(db.Integer)
    tongsomaukhongdat = db.Column(db.Integer)
    somaukhongdatvelyhoahoc = db.Column(db.Integer)
    somaukhongdatvevisinhvat = db.Column(db.Integer)
    somaukhongdatlyhoahocvavisinhvat = db.Column(db.Integer)
    chitieukhongdat = db.Column(db.String)
    chitieua = db.Column(db.String)
    chitieub = db.Column(db.String)
    khacphuc = db.Column(db.String)
    ketluan = db.Column(db.String)
    kyten = db.Column(db.String)

# Mau 4.12
class TongHopKQNuocSinhHoatTren1000m(CommonModel):
    __tablename__ = 'tonghopkqnuocsinhhoattren1000m'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanhthongtu = db.Column(db.DateTime())
    donvibaocao = db.Column(db.String)
    sophieu = db.Column(db.Integer)
    ngaybanhanhphieu = db.Column(db.DateTime())
    tenbaocao = db.Column(db.String)
    phamvi = db.Column(db.String)
    ngaybaocao = db.Column(db.DateTime())
    cosocapnuoc = db.Column(db.Integer)
    cosoguibaocao = db.Column(db.Integer)
    cosodambaovs = db.Column(db.Integer)
    tyle = db.Column(db.Integer)
    cosokhongdambaovs = db.Column(db.String)
    cosodatchuan = db.Column(db.Integer)
    cosokhongdatchuan = db.Column(db.String)
    maunuoclamxn = db.Column(db.Integer)
    maudatchuan = db.Column(db.Integer)
    tylemaudatchuan = db.Column(db.Integer)
    mauxnkhongdatchuan = db.Column(db.Integer)
    maukodatlyhoahoc = db.Column(db.Integer)
    maukodatvsvatly = db.Column(db.Integer)
    maukodatvisinhvat = db.Column(db.Integer)
    bienphapkhacphuc = db.Column(db.Integer)
    nhanxet = db.Column(db.String)
    kiennghi = db.Column(db.String)
    kyten = db.Column(db.String)

# Mau 4.11
class KQChatLuongNuocAnUong(CommonModel):
    __tablename__ = 'kqchatluongnuocanuong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanhthongtu = db.Column(db.DateTime())
    donvibaocao = db.Column(db.String)
    sophieu = db.Column(db.Integer)
    ngaytaophieu = db.Column(db.DateTime())
    tenbaocao = db.Column(db.String)
    phamvi = db.Column(db.String)
    ngaybaocao = db.Column(db.DateTime())
    baocaodinhky = db.Column(db.String)
    sotinhtrendiaban = db.Column(db.Integer)
    sotinhcobaocao = db.Column(db.Integer)
    sonhamaynuoc = db.Column(db.Integer)
    sonhamaykiemtra = db.Column(db.Integer)
    soluotkiemtra = db.Column(db.Integer)
    soluotkiemtrakhongdat = db.Column(db.Integer)
    tylekodat = db.Column(db.Integer)
    coso2lankhongdat = db.Column(db.Integer)
    maunuoclamxn = db.Column(db.Integer)
    maudatchuan = db.Column(db.Integer)
    tyledatchuan = db.Column(db.Integer)
    maukhongdatchuan = db.Column(db.Integer)
    kodatchitieuvatlyhoahoc = db.Column(db.Integer)
    kodatchitieuvisinhvat = db.Column(db.Integer)
    bienphap = db.Column(db.String)
    tongsomaunuoclamxn = db.Column(db.Integer)
    tongsodatquydinh = db.Column(db.Integer)
    tyledungquydinh = db.Column(db.Integer)
    tongsokodatquydinh = db.Column(db.Integer)
    bienphapxuli = db.Column(db.String)
    ketqua = db.Column(db.String)
    hoatdongnghiencuu = db.Column(db.String)
    nhanxetkiennghi = db.Column(db.String)
    kyten = db.Column(db.String)
    cosocapnuoctt = db.Column(db.Integer)
    giengdao = db.Column(db.Integer)
    giengkhoan = db.Column(db.Integer)
    mangnuoctuchay = db.Column(db.Integer)
    benuocmua = db.Column(db.Integer)
    loaikhac = db.Column(db.Integer)
    cong = db.Column(db.Integer)
    cosocapnuocduoi1000m_id = db.Column(UUID(as_uuid=True), ForeignKey('cosocapnuocduoi1000m.id'), nullable=True)
    cosocapnuocduoi1000m = relationship('CoSoCapNuocDuoi1000m')
    cosocapnuocduoi1000mkodat_id = db.Column(UUID(as_uuid=True), ForeignKey('cosocapnuocduoi1000mkodat.id'), nullable=True)
    cosocapnuocduoi1000mkdat = relationship('CoSoCapNuocDuoi1000mKoDat')

#Table 4.11 - 1
class CoSoCapNuocDuoi1000m(CommonModel):
    __tablename__ = 'cosocapnuocduoi1000m'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    diabancosocapnuoctt = db.Column(db.Integer)
    diabangiengdao = db.Column(db.Integer)
    diabangiengkhoan = db.Column(db.Integer)
    diabanmangtuchay = db.Column(db.Integer)
    diabanbenuocmua = db.Column(db.Integer)
    diabanloaikhac = db.Column(db.Integer)
    diabancong = db.Column(db.Integer)

    kiemtracosocapnuoctt = db.Column(db.Integer)
    kiemtragiengdao = db.Column(db.Integer)
    kiemtragiengkhoan = db.Column(db.Integer)
    kiemtramangtuchay = db.Column(db.Integer)
    kiemtrabenuocmua = db.Column(db.Integer)
    kiemtraloaikhac = db.Column(db.Integer)
    kiemtracong = db.Column(db.Integer)

    tieuchuancosocapnuoctt = db.Column(db.Integer)
    tieuchuangiengdao = db.Column(db.Integer)
    tieuchuangiengkhoan = db.Column(db.Integer)
    tieuchuanmangtuchay = db.Column(db.Integer)
    tieuchuanbenuocmua = db.Column(db.Integer)
    tieuchuanloaikhac = db.Column(db.Integer)
    tieuchuancong = db.Column(db.Integer)

    tylecosocapnuoctt = db.Column(db.Integer)
    tylegiengdao = db.Column(db.Integer)
    tylegiengkhoan = db.Column(db.Integer)
    tylemangtuchay = db.Column(db.Integer)
    tylebenuocmua = db.Column(db.Integer)
    tyleloaikhac = db.Column(db.Integer)
    tylecong = db.Column(db.Integer)


#Table 4.11 - 2
class CoSoCapNuocDuoi1000mKoDat(CommonModel):
    __tablename__ = 'cosocapnuocduoi1000mkodat'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    lyhoahoccosocapnuoctt = db.Column(db.Integer)
    lyhoahocgiengdao = db.Column(db.Integer)
    lyhoahocgiengkhoan = db.Column(db.Integer)
    lyhoahocmangtuchay = db.Column(db.Integer)
    lyhoahocbenuocmua = db.Column(db.Integer)
    lyhoahocloaikhac  = db.Column(db.Integer)

    visinhvatcosocapnuoctt = db.Column(db.Integer)
    visinhvatgiengdao = db.Column(db.Integer)
    visinhvatgiengkhoan = db.Column(db.Integer)
    visinhvatmangtuchay = db.Column(db.Integer)
    visinhvatbenuocmua = db.Column(db.Integer)
    visinhvatloaikhac  = db.Column(db.Integer)


# Mau 4.10
class KQNgoaiKiemNuocSinhHoat(CommonModel):
    __tablename__ = 'kqngoaikiemnuocsinhhoat'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanhthongtu = db.Column(db.DateTime())
    donvibaocao = db.Column(db.String)
    sophieu = db.Column(db.Integer)
    ngaytaophieu = db.Column(db.DateTime())
    tenbaocao = db.Column(db.String)
    phamvi = db.Column(db.String)
    baocaodinhky = db.Column(db.String)
    cosocapnuoc = db.Column(db.Integer)
    cosoduockiemtra = db.Column(db.Integer)
    soluotkiemtra = db.Column(db.Integer)
    soluotkiemtrakodat = db.Column(db.Integer)
    tylekodat = db.Column(db.Integer)
    coso2lankhongdat = db.Column(db.Integer)
    cosothuchiennghiemtuc = db.Column(db.Integer)
    tyle = db.Column(db.Integer)
    somaulamxn = db.Column(db.Integer)
    somaudatchuan = db.Column(db.Integer)
    tylemaudatchuan = db.Column(db.Integer)
    maukhongdatchuan = db.Column(db.Integer)
    kdatvelihoahoc = db.Column(db.Integer)
    kdatvevisinhvat = db.Column(db.Integer)
    kdatvelyhoavisinh = db.Column(db.Integer)
    bienphapnhamaykdat = db.Column(db.String)
    maulamxn = db.Column(db.Integer)
    maudatchuan = db.Column(db.Integer)
    tyledatchuan = db.Column(db.Integer)
    maukhongdat = db.Column(db.Integer)
    chitieukdat = db.Column(db.String)
    bienphapxuly = db.Column(db.String)
    nhanxet = db.Column(db.String)
    kyten = db.Column(db.String)

    kqkt1000mnuochogiadinh_id = db.Column(UUID(as_uuid=True), ForeignKey('kqkt1000mnuochogiadinh.id'), nullable=True)
    kqkt1000mnuochogiadinh = relationship('KQKT1000mNuocHoGiaDinh')

    kqkt1000mnuochogiadinhkodat_id = db.Column(UUID(as_uuid=True), ForeignKey('kqkt1000mnuochogiadinhkodat.id'), nullable=True)
    kqkt1000mnuochogiadinhkodat = relationship('KQKT1000mNuocHoGiaDinhKoDat')


#Table 4.10 - 1
class KQKT1000mNuocHoGiaDinh(CommonModel):
    __tablename__ = 'kqkt1000mnuochogiadinh'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    diabancosocapnuoctt = db.Column(db.Integer)
    diabangiengdao = db.Column(db.Integer)
    diabangiengkhoan = db.Column(db.Integer)
    diabanmangtuchay = db.Column(db.Integer)
    diabanbenuocmua = db.Column(db.Integer)
    diabanloaikhac = db.Column(db.Integer)
    diabancong = db.Column(db.Integer)

    kiemtracosocapnuoctt = db.Column(db.Integer)
    kiemtragiengdao = db.Column(db.Integer)
    kiemtragiengkhoan = db.Column(db.Integer)
    kiemtramangtuchay = db.Column(db.Integer)
    kiemtrabenuocmua = db.Column(db.Integer)
    kiemtraloaikhac = db.Column(db.Integer)
    kiemtracong = db.Column(db.Integer)

    tieuchuancosocapnuoctt = db.Column(db.Integer)
    tieuchuangiengdao = db.Column(db.Integer)
    tieuchuangiengkhoan = db.Column(db.Integer)
    tieuchuanmangtuchay = db.Column(db.Integer)
    tieuchuanbenuocmua = db.Column(db.Integer)
    tieuchuanloaikhac = db.Column(db.Integer)
    tieuchuancong = db.Column(db.Integer)

    tylecosocapnuoctt = db.Column(db.Integer)
    tylegiengdao = db.Column(db.Integer)
    tylegiengkhoan = db.Column(db.Integer)
    tylemangtuchay = db.Column(db.Integer)
    tylebenuocmua = db.Column(db.Integer)
    tyleloaikhac = db.Column(db.Integer)
    tylecong = db.Column(db.Integer)


#Table 4.10 - 2
class KQKT1000mNuocHoGiaDinhKoDat(CommonModel):
    __tablename__ = 'kqkt1000mnuochogiadinhkodat'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    lyhoahoccosocapnuoctt = db.Column(db.Integer)
    lyhoahocgiengdao = db.Column(db.Integer)
    lyhoahocgiengkhoan = db.Column(db.Integer)
    lyhoahocmangtuchay = db.Column(db.Integer)
    lyhoahocbenuocmua = db.Column(db.Integer)
    lyhoahocloaikhac  = db.Column(db.Integer)

    visinhvatcosocapnuoctt = db.Column(db.Integer)
    visinhvatgiengdao = db.Column(db.Integer)
    visinhvatgiengkhoan = db.Column(db.Integer)
    visinhvatmangtuchay = db.Column(db.Integer)
    visinhvatbenuocmua = db.Column(db.Integer)
    visinhvatloaikhac  = db.Column(db.Integer)


# Mau 4.9
class KQKTChatLuongNuocSinhHoatCapHuyen(CommonModel):
    __tablename__ = 'kqktchatluongnuocsinhhoatcaphuyen'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanhthongtu = db.Column(db.DateTime())
    donvibaocao = db.Column(db.String)
    sophieu = db.Column(db.String)
    ngaytaophieu = db.Column(db.DateTime)
    tenbaocao = db.Column(db.String)
    phamvi = db.Column(db.String)
    baocaodinhky = db.Column(db.String)
    somaulamxn = db.Column(db.Integer)
    somaudatchuan = db.Column(db.Integer)
    tyledatchuan = db.Column(db.Integer)
    maukhongdatchuan = db.Column(db.Integer)
    bienphapxuly = db.Column(db.String)
    nhanxet = db.Column(db.String)
    kyten = db.Column(db.String)
    cosocapnuoctt = db.Column(db.Integer)
    giengdao = db.Column(db.Integer)
    giengkoan = db.Column(db.Integer)
    mangtuchay = db.Column(db.Integer)
    benuocmua = db.Column(db.Integer)
    loaikhac = db.Column(db.Integer)
    cong = db.Column(db.Integer)

    kqvscosocungcapnuochogd_id = db.Column(UUID(as_uuid=True), ForeignKey('kqvscosocungcapnuochogdcaphuyen.id'), nullable=True)
    kqvscosocungcapnuochogd = relationship('KQVSCoSoCungCapNuocHoGdCapHuyen')

    kqvscscungcapnuocgdkdat_id = db.Column(UUID(as_uuid=True), ForeignKey('kqvscscungcapnuocgdkdatcaphuyen.id'), nullable=True)
    kqvscscungcapnuocgdkdat = relationship('KQVSCSCungCapNuocGdKoDatCapHuyen')

# Table  4.9 - 1
class KQVSCoSoCungCapNuocHoGdCapHuyen(CommonModel):
    __tablename__ = 'kqvscosocungcapnuochogdcaphuyen'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    diabancosocapnuoctt = db.Column(db.Integer)
    diabangiengdao = db.Column(db.Integer)
    diabangiengkhoan = db.Column(db.Integer)
    diabanmangtuchay = db.Column(db.Integer)
    diabanbenuocmua = db.Column(db.Integer)
    diabanloaikhac = db.Column(db.Integer)
    diabancong = db.Column(db.Integer)

    kiemtracosocapnuoctt = db.Column(db.Integer)
    kiemtragiengdao = db.Column(db.Integer)
    kiemtragiengkhoan = db.Column(db.Integer)
    kiemtramangtuchay = db.Column(db.Integer)
    kiemtrabenuocmua = db.Column(db.Integer)
    kiemtraloaikhac = db.Column(db.Integer)
    kiemtracong = db.Column(db.Integer)

    tieuchuancosocapnuoctt = db.Column(db.Integer)
    tieuchuangiengdao = db.Column(db.Integer)
    tieuchuangiengkhoan = db.Column(db.Integer)
    tieuchuanmangtuchay = db.Column(db.Integer)
    tieuchuanbenuocmua = db.Column(db.Integer)
    tieuchuanloaikhac = db.Column(db.Integer)
    tieuchuancong = db.Column(db.Integer)

    tylecosocapnuoctt = db.Column(db.Integer)
    tylegiengdao = db.Column(db.Integer)
    tylegiengkhoan = db.Column(db.Integer)
    tylemangtuchay = db.Column(db.Integer)
    tylebenuocmua = db.Column(db.Integer)
    tyleloaikhac = db.Column(db.Integer)
    tylecong = db.Column(db.Integer)


# Table  4.9 - 2
class KQVSCSCungCapNuocGdKoDatCapHuyen(CommonModel):
    __tablename__ = 'kqvscscungcapnuocgdkdatcaphuyen'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    lycosocapnuocttsoluong = db.Column(db.Integer)
    lycosocapnuocttphantram = db.Column(db.Integer)
    lygiengdaosoluong = db.Column(db.Integer)
    lygiengdaophantram = db.Column(db.Integer)
    lygiengkhoansoluong = db.Column(db.Integer)
    lygiengkhoanphantram = db.Column(db.Integer)
    lymangtuchaysoluong = db.Column(db.Integer)
    lymangtuchayphantram = db.Column(db.Integer)
    lybenuocmuasoluong = db.Column(db.Integer)
    lybenuocmuaphantram = db.Column(db.Integer)
    lyloaikhacsoluong = db.Column(db.Integer)
    lybenuocmuaphantram = db.Column(db.Integer)

    vicosocapnuocttsoluong = db.Column(db.Integer)
    vicosocapnuocttphantram = db.Column(db.Integer)
    vigiengdaosoluong = db.Column(db.Integer)
    vigiengdaophantram = db.Column(db.Integer)
    vigiengkhoansoluong = db.Column(db.Integer)
    vigiengkhoanphantram = db.Column(db.Integer)
    vimangtuchaysoluong = db.Column(db.Integer)
    vimangtuchayphantram = db.Column(db.Integer)
    vibenuocmuasoluong = db.Column(db.Integer)
    vibenuocmuaphantram = db.Column(db.Integer)
    viloaikhacsoluong = db.Column(db.Integer)
    vibenuocmuaphantram = db.Column(db.Integer)


# Mau 4.8
class KQKTVeSinhNuocSinhHoatCapXa(CommonModel):
    __tablename__ = 'kqktvesinhnuocsinhhoatcapxa'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanhthongtu = db.Column(db.DateTime())
    donvibaocao = db.Column(db.String)
    sophieu = db.Column(db.String)
    ngaytaophieu = db.Column(db.DateTime())
    tenbaocao = db.Column(db.String)
    phamvi = db.Column(db.String)
    bienphapxuly = db.Column(db.String)
    nhanxet = db.Column(db.String)

    kqvscosocungcapnuochogd_id = db.Column(UUID(as_uuid=True), ForeignKey('kqvscosocungcapnuochogdcapxa.id'), nullable=True)
    kqvscosocungcapnuochogd = relationship('KQVSCoSoCungCapNuocHoGdCapXa')

    kqvscscungcapnuocgdkdat_id = db.Column(UUID(as_uuid=True), ForeignKey('kqvscscungcapnuocgdkdatcapxa.id'), nullable=True)
    kqvscscungcapnuocgdkdat = relationship('KQVSCSCungCapNuocGdKoDatCapXa')



# Table KetQuaKiemTraNuoc 4.8 - 1
class KQVSCoSoCungCapNuocHoGdCapXa(CommonModel):
    __tablename__ = 'kqvscosocungcapnuochogdcapxa'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    diabancosocapnuoctt = db.Column(db.Integer)
    diabangiengdao = db.Column(db.Integer)
    diabangiengkhoan = db.Column(db.Integer)
    diabanmangtuchay = db.Column(db.Integer)
    diabanbenuocmua = db.Column(db.Integer)
    diabanloaikhac = db.Column(db.Integer)
    diabancong = db.Column(db.Integer)

    kiemtracosocapnuoctt = db.Column(db.Integer)
    kiemtragiengdao = db.Column(db.Integer)
    kiemtragiengkhoan = db.Column(db.Integer)
    kiemtramangnuochay = db.Column(db.Integer)
    kiemtrabenuocmua = db.Column(db.Integer)
    kiemtraloaikhac = db.Column(db.Integer)
    kiemtracong = db.Column(db.Integer)

    vesinhcosocapnuoctt = db.Column(db.Integer)
    vesinhgiengdao = db.Column(db.Integer)
    vesinhgiengkhoan = db.Column(db.Integer)
    vesinhmangnuocchay = db.Column(db.Integer)
    vesinhbenuocmua = db.Column(db.Integer)
    vesinhloaikhac = db.Column(db.Integer)
    vesinhcong = db.Column(db.Integer)

    tylecosocapnuoctt = db.Column(db.Integer)
    tylegiengdao  = db.Column(db.Integer)
    tylegiengkhoan = db.Column(db.Integer)
    tylebenuocmua = db.Column(db.Integer)
    tylemangnuocchay = db.Column(db.Integer)
    tyleloaikhac = db.Column(db.Integer)
    tylecong = db.Column(db.Integer)

# Table KetQuaKiemTraNuoc 4.8 - 2

#4.8.2
class KQVSCSCungCapNuocGdKoDatCapXa(CommonModel):
    __tablename__ = 'kqvscscungcapnuocgdkdatcapxa'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    diabancosocapnuoctt = db.Column(db.Integer)
    diabangiengdao = db.Column(db.Integer)
    diabangiengkhoan = db.Column(db.Integer)
    diabanmangtuchay = db.Column(db.Integer)
    diabanbenuocmua = db.Column(db.Integer)
    diabanloaikhac = db.Column(db.Integer)
    diabancong = db.Column(db.Integer)

    kiemtracosocapnuoctt = db.Column(db.Integer)
    kiemtragiengdao = db.Column(db.Integer)
    kiemtragiengkhoan = db.Column(db.Integer)
    kiemtramangtuchay = db.Column(db.Integer)
    kiemtrabenuocmua = db.Column(db.Integer)
    kiemtraloaikhac = db.Column(db.Integer)
    kiemtracong = db.Column(db.Integer)

    tieuchuancosocapnuoctt = db.Column(db.Integer)
    tieuchuangiengdao = db.Column(db.Integer)
    tieuchuangiengkhoan = db.Column(db.Integer)
    tieuchuanmangtuchay = db.Column(db.Integer)
    tieuchuanbenuocmua = db.Column(db.Integer)
    tieuchuanloaikhac = db.Column(db.Integer)
    tieuchuancong = db.Column(db.Integer)

    tylecosocapnuoctt = db.Column(db.Integer)
    tylegiengdao = db.Column(db.Integer)
    tylegiengkhoan = db.Column(db.Integer)
    tylemangtuchay = db.Column(db.Integer)
    tylebenuocmua = db.Column(db.Integer)
    tyleloaikhac = db.Column(db.Integer)
    tylecong = db.Column(db.Integer)


# Mau 5.1
class BCThuThapDuLieu(CommonModel):
    __tablename__ = 'bcthuthapdulieu'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    tenbaocao = db.Column(db.String)
    tenduan = db.Column(db.String)
    nguoicungcap = db.Column(db.String)
    thongtinbosung = db.Column(db.String)
    ngaytaobaocao = db.Column(db.DateTime())
    xacnhancuadonvi = db.Column(db.String)
    xacnhancuadonvi_kyten = db.Column(db.String)
    nguoilapbaocao = db.Column(db.String)
    nguoilapbaocao_kyten = db.Column(db.String)

    tonghopthuthap = relationship('TongHopThuThap',viewonly=True)



#Table 5.1
class TongHopThuThap(CommonModel):
    __tablename__ = 'tonghopthuthap'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    bcthuthapdulieu_id = db.Column(UUID(as_uuid=True), ForeignKey('bcthuthapdulieu.id'),index=True, nullable=True)
    stt = db.Column(db.Integer)
    dulieu = db.Column(db.String)
    khuondang = db.Column(db.String)
    dvt = db.Column(db.String)
    soluong = db.Column(db.Integer)
    ghichu = db.Column(db.String)


# Mau 5.2
class BanGiaoDuLieuDaThuThap(CommonModel):
    __tablename__ = 'bangiaodulieudathuthap'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    tenbaocao = db.Column(db.String)
    ngaybaocao = db.Column(db.DateTime())
    thanhphan = db.Column(db.String)
    bengiao = db.Column(db.String)
    daidienbengiao = db.Column(db.String)
    chucvubengiap = db.Column(db.String)
    bennhan = db.Column(db.String)
    daidienbennhan = db.Column(db.String)
    chucvubennhan = db.Column(db.String)
    cungnhaubangiao = db.Column(db.String)
    bengiaoky = db.Column(db.String)
    bennhanky = db.Column(db.String)

    bangiaothuthap = relationship('BanGiaoThuThap')


#Table 5.2
class BanGiaoThuThap(CommonModel):
    __tablename__ = 'bangiaothuthap'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    bangiaodulieudathuthap_id = db.Column(UUID(as_uuid=True), ForeignKey('bangiaodulieudathuthap.id'),index=True, nullable=True)
    stt = db.Column(db.Integer)
    dulieu = db.Column(db.String)
    khuondang = db.Column(db.String)
    dvt = db.Column(db.String)
    soluong = db.Column(db.Integer)
    ghichu = db.Column(db.String)


# Mau 5.3
class PhanLoaiVaDanhGiaDuLieu(CommonModel):
    __tablename__ = 'phanloaivadanhgiadulieu'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    tenbaocao = db.Column(db.String)
    tenduan = db.Column(db.String)
    tennhomdulieu = db.Column(db.String)
    tonghopphanloai = db.Column(db.String)
    thongtinbosung = db.Column(db.String)
    ngaytaobaocao = db.Column(db.DateTime())
    nguoiphanloaiky = db.Column(db.String)
    nguoilapbaocaoky = db.Column(db.String)
    danhgiabangiaothuthap = relationship('DanhGiaBanGiaoThuThap')
    

#Table 5.3
class DanhGiaBanGiaoThuThap(CommonModel):
    __tablename__ = 'danhgiabangiaothuthap'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    phanloaivadanhgiadulieu_id = db.Column(UUID(as_uuid=True), ForeignKey('phanloaivadanhgiadulieu.id'),index=True, nullable=True)
    stt = db.Column(db.Integer)
    dulieu = db.Column(db.String)
    khuondang = db.Column(db.String)
    dvt = db.Column(db.String)
    soluong = db.Column(db.Integer)
    ghichu = db.Column(db.String)

# Mau 5.4
class BCXayDungDuLieuDacTa(CommonModel):
    __tablename__ = 'bcxaydungdulieudacta'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    tenbaocao = db.Column(db.String)
    tenduan = db.Column(db.String)
    donvithuchien = db.Column(db.String)
    thongtinbosung = db.Column(db.String)
    ngaytaobaocao = db.Column(db.DateTime())
    nguoitaobaocaoky = db.Column(db.String)
#     dulieutheochuan = relationship('DuLieuDacTaTheoChuan')


#Table 5.4 -1
# class DuLieuDacTaTheoChuan(CommonModel):
#     __tablename__ = 'dulieudactatheochuan'
#     id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
#     bcxaydungdulieudacta_id = db.Column(UUID(as_uuid=True), ForeignKey('bcxaydungdulieudacta.id'),index=True, nullable=True)
#     mathongtin = db.Column(db.String)
#     tenthongtin = db.Column(db.String)
#     mota = db.Column(db.String)

#Table 5.5 -1
class NhanLucSuaChua(CommonModel):
    __tablename__ = 'nhanlucsuachua'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    bcketquasuachua_id = db.Column(UUID(as_uuid=True), ForeignKey('bcketquasuachua.id'),index=True, nullable=True)
    stt = db.Column(db.String)
    hovaten = db.Column(db.String)
    congviecthuchien = db.Column(db.String)

#Table 5.5 -2
class KetQuaSuaChua(CommonModel):
    __tablename__ = 'ketquasuachua'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    bcketquasuachua_id = db.Column(UUID(as_uuid=True), ForeignKey('bcketquasuachua.id'),index=True, nullable=True)
    stt = db.Column(db.String)
    loi = db.Column(db.String)
    chuasua = db.Column(db.Integer)
    dasua = db.Column(db.Integer)
    thoigian = db.Column(db.DateTime())
    ghichu = db.Column(db.String)    
  
#Table 5.5 -3
class KetQuaSuaChuaDuLieu(CommonModel):
    __tablename__ = 'ketquasuachuadulieu'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    bcketquasuachua_id = db.Column(UUID(as_uuid=True), ForeignKey('bcketquasuachua.id'),index=True, nullable=True)
    tt = db.Column(db.String)
    loi = db.Column(db.String)
    chuasua = db.Column(db.Integer)
    dasua = db.Column(db.Integer)
    thoigian = db.Column(db.DateTime())
    ghichu = db.Column(db.String)    


# Mau 5.5
class BCKetQuaSuaChua(CommonModel):
    __tablename__ = 'bcketquasuachua'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    tenbaocao = db.Column(db.String)
    tenduan = db.Column(db.String)
    mucdich = db.Column(db.String)

    nhanlucsuachua = relationship('NhanLucSuaChua')
    ketquasuachua = relationship('KetQuaSuaChua')
    ketquasuachuadulieu = relationship('KetQuaSuaChuaDuLieu')


# Mau 5.6
class BCKetQuaKiemTra(CommonModel):
    __tablename__ = 'bcketquakiemtra'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    tenbaocao = db.Column(db.String)
    tenduan = db.Column(db.String)
    mucdich = db.Column(db.String)
    ngaytaobaocao = db.Column(db.DateTime())
    nguoilapbaocaokyten = db.Column(db.String)
    cacnhomdexuat = db.Column(db.String)
    kqnhanlucthamgiakt = relationship('KQNhanLucThamGiaKT')
    kqnhanlucthamgiaktdacta = relationship('KQNhanLucThamGiaKTDacTa')

#Table 5.6 -1
class KQNhanLucThamGiaKT(CommonModel):
    __tablename__ = 'kqnhanlucthamgiakt'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    bcketquakiemtra_id = db.Column(UUID(as_uuid=True), ForeignKey('bcketquakiemtra.id'),index=True, nullable=True)
    stt = db.Column(db.String)
    hovate = db.Column(db.String)
    congiecthuchien = db.Column(db.String)  

#Table 5.6 -2
class KQNhanLucThamGiaKTDacTa(CommonModel):
    __tablename__ = 'kqnhanlucthamgiaktdacta'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    bcketquakiemtra_id = db.Column(UUID(as_uuid=True), ForeignKey('bcketquakiemtra.id'),index=True, nullable=True)
    stt = db.Column(db.String)
    loi = db.Column(db.String)
    mota = db.Column(db.String) 


# Mau 5.7
class BienBanBanGiaoSanPham(CommonModel):
    __tablename__ = 'bienbanbangiaosanpham'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ngaytaobienban = db.Column(db.DateTime())
    chungtoigom = db.Column(db.String)
    bengiao = db.Column(db.String)
    daidienbengiao = db.Column(db.String)
    chucvubengiao = db.Column(db.String)
    bennhan = db.Column(db.String)
    daidienbennhan = db.Column(db.String)
    chucvubennhan = db.Column(db.String)
    cungnhaubangiao = db.Column(db.String)
    daidienbengiaoky = db.Column(db.String)
    daidienbennhanky = db.Column(db.String)

    cungnhaubangiaosanpham = relationship('CungNhauBanGiaoSanPham')

#Table 5.7 -1
class CungNhauBanGiaoSanPham(CommonModel):
    __tablename__ = 'cungnhaubangiaosanpham'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    bienbanbangiaosanpham_id = db.Column(UUID(as_uuid=True), ForeignKey('bienbanbangiaosanpham.id'),index=True, nullable=True)
    stt = db.Column(db.String)
    danhmucsanpham = db.Column(db.String)
    khuondang = db.Column(db.String) 
    kdv = db.Column(db.String) 
    soluong = db.Column(db.Integer) 
    ghichu = db.Column(db.String) 

#############################################



class NhaTieuTuHoai(CommonModel):
    __tablename__ = "nhatieutuhoai"
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanh = db.Column(db.DateTime())
    tenphieu = db.Column(db.String)
    phamvi = db.Column(db.String)   
    tieuchichinh = db.Column(db.String)
    tieuchichinhkdat = db.Column(db.String)  
    xuly3be = db.Column(db.String)
    xuly3bekhongdat = db.Column(db.String)   
    xulyphan = db.Column(db.String)
    xulyphankhongdat = db.Column(db.String)   
    lapbechuaphan = db.Column(db.String)
    lapbechuaphankhongdat = db.Column(db.String)    
    lapbechuaphankhongdat = db.Column(db.String)
    lapbechuaphankhongdat = db.Column(db.String)    
    matsannhan = db.Column(db.String)
    matsannhankhongdat = db.Column(db.String)    
    bexiconutnuoc = db.Column(db.String)
    bexiconutnuockhongdat = db.Column(db.String)    
    coongthonghoi = db.Column(db.String)
    coongthonghoikhongdat = db.Column(db.String) 
    codunuocdoi = db.Column(db.String)
    codunuocdoikhongdat = db.Column(db.String)   
    dungcunuocdoi = db.Column(db.String)
    dungcunuocdoikhongdat = db.Column(db.String)   
    khongcomuihoi = db.Column(db.String)
    khongcomuihoikhongdat = db.Column(db.String)    
    nuoctube = db.Column(db.String)
    nuoctubekhongdat = db.Column(db.String)   
    matsannhatieu = db.Column(db.String)
    matsannhatieukhongdat = db.Column(db.String)    
    giayvesinh = db.Column(db.String)
    giayvesinhkhongdat = db.Column(db.String)   
    khongcoruoi = db.Column(db.String)
    khongcoruoikhongdat = db.Column(db.String)    
    bexisach = db.Column(db.String)
    bexisachkhongdat = db.Column(db.String)    
    dcchekin = db.Column(db.String)
    dcchekinkhongdat = db.Column(db.String)   
    vsxungquanh = db.Column(db.String)
    vsxungquanhkhongdat = db.Column(db.String)
    danhgiahopvs = db.Column(db.String)
    danhgiakhonghopvs = db.Column(db.String)
    nhadattieuchuan = db.Column(db.String)
    cactieuchiphu = db.Column(db.String)
    cactieuchiphukdat = db.Column(db.String)
    

class NhaTieuThamDoiNuoc(CommonModel):  
    __tablename__ = "nhatieuthamdoinuoc"
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanh = db.Column(db.DateTime())
    tenphieu = db.Column(db.String)
    phamvi = db.Column(db.String) 
    tieuchichinh = db.Column(db.String)
    tieuchichinhkdat = db.Column(db.String) 
    nuocbingapung = db.Column(db.String)
    nuocbingapungkdat = db.Column(db.String) 
    sinhhoat10m = db.Column(db.String)
    sinhhoat10mkdat = db.Column(db.String)
    bexulyphan = db.Column(db.String)
    bexulyphankdat = db.Column(db.String)
    napbechuaphan = db.Column(db.String)
    napbechuaphankdat = db.Column(db.String)
    matsannhan = db.Column(db.String)
    matsannhankdat = db.Column(db.String)
    bexiconutnuoc = db.Column(db.String)
    bexiconutnuockdat = db.Column(db.String)    
    codunuocdoi = db.Column(db.String)
    codunuocdoikdat = db.Column(db.String)   
    dungcuchuanuocdoi = db.Column(db.String)
    dungcuchuanuocdoikdat = db.Column(db.String)    
    nuoctubechua = db.Column(db.String)
    nuoctubechuakdat = db.Column(db.String)    
    kcomuihoi = db.Column(db.String)
    kcomuihoikdat = db.Column(db.String)    
    cactieuchiphu = db.Column(db.String)
    cactieuchiphukdat = db.Column(db.String)  
    matsannhatieu = db.Column(db.String)
    matsannhatieukdat = db.Column(db.String)
    giayvesinh = db.Column(db.String)
    giayvesinhkdat = db.Column(db.String)   
    kocoruoi = db.Column(db.String)
    kocoruoikdat = db.Column(db.String)    
    bexisach = db.Column(db.String)
    besisachkdat = db.Column(db.String)   
    dcchekin = db.Column(db.String)
    dcchekinkdat = db.Column(db.String)   
    vsxungquanh = db.Column(db.String)
    vsxungquanhkdat = db.Column(db.String)
    danhgiahopvs = db.Column(db.String)
    danhgiakhonghopvs = db.Column(db.String)
    nhadattieuchuan = db.Column(db.String)
    
class DungChoNhaTieu2Ngan(CommonModel):
    __tablename__ = "dungchonhatieu2ngan"
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanh = db.Column(db.DateTime())
    tenphieu = db.Column(db.String)
    phamvi = db.Column(db.String)
    tieuchichinh = db.Column(db.String)
    tieuchichinhkdat = db.Column(db.String)      
    tuongngan = db.Column(db.String)
    tuongngankdat = db.Column(db.String)   
    cualayphan = db.Column(db.String)
    cualayphankdat = db.Column(db.String)      
    matsannhan = db.Column(db.String)
    matsannhankdat = db.Column(db.String)        
    conapday2lotieu = db.Column(db.String)
    conapday2totieukdat = db.Column(db.String)      
    lotieudcdaykin = db.Column(db.String)
    lotieudcdaykinkdat = db.Column(db.String)      
    ksudungdongthoi2ngan = db.Column(db.String)
    ksudungdongthoi2ngankdat = db.Column(db.String)      
    coduchatdon = db.Column(db.String)
    coduchatdonkdat = db.Column(db.String)      
    klayphantrongngan = db.Column(db.String)
    klayphantrongngankdat = db.Column(db.String)     
    nganuphanconap = db.Column(db.String)
    nganuphanconapkdat = db.Column(db.String)    
    kcomuihoi = db.Column(db.String)
    kcomuihoikdat = db.Column(db.String)     
    kcobogay = db.Column(db.String)
    kcobogaykdat = db.Column(db.String)
    nctieu = db.Column(db.String)
    nctieukdat = db.Column(db.String)     
    
    cachitieuphu = db.Column(db.String)
    cachitieuphukdat = db.Column(db.String)      
    matsanvaranhnuoc = db.Column(db.String)
    matsanvaranhnuockdat = db.Column(db.String)      
    giaybandcbo = db.Column(db.String)
    giaybandcbokdat = db.Column(db.String)     
    kcoruoi = db.Column(db.String)
    kcoruoikdat = db.Column(db.String)      
    mienglotieu = db.Column(db.String)
    mienglotieukdat = db.Column(db.String)     
    vsxungquanhsachse = db.Column(db.String)
    vsxungquanhsachsekdat = db.Column(db.String)
    ongthonghoi = db.Column(db.String)
    ongthonghoikdat = db.Column(db.String)    
    dcchekindao = db.Column(db.String)
    dcchekindaokdat = db.Column(db.String)  
    danhgiahopvs = db.Column(db.String)
    danhgiakhonghopvs = db.Column(db.String)
    nhadattieuchuan = db.Column(db.String)
    
class NhaTieuThongHoi(CommonModel):  
    __tablename__ = "nhatieuthonghoi"
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanh = db.Column(db.DateTime())
    tenphieu = db.Column(db.String)
    phamvi = db.Column(db.String) 
    tieuchichinh = db.Column(db.String)
    tieuchichinhkdat = db.Column(db.String) 
    nuocbingapung = db.Column(db.String)
    nuocbingapungkdat = db.Column(db.String) 
    sinhhoat10m = db.Column(db.String)
    sinhhoat10mkdat = db.Column(db.String)
    bexulyphan = db.Column(db.String)
    bexulyphankdat = db.Column(db.String)
    napbechuaphan = db.Column(db.String)
    napbechuaphankdat = db.Column(db.String)
    matsannhan = db.Column(db.String)
    matsannhankdat = db.Column(db.String)
    bexiconutnuoc = db.Column(db.String)
    bexiconutnuockdat = db.Column(db.String)    
    codunuocdoi = db.Column(db.String)
    codunuocdoikdat = db.Column(db.String)   
    dungcuchuanuocdoi = db.Column(db.String)
    dungcuchuanuocdoikdat = db.Column(db.String)    
    nuoctubechua = db.Column(db.String)
    nuoctubechuakdat = db.Column(db.String)    
    kcomuihoi = db.Column(db.String)
    kcomuihoikdat = db.Column(db.String)    
    cactieuchiphu = db.Column(db.String)
    cactieuchiphukdat = db.Column(db.String)  
    matsannhatieu = db.Column(db.String)
    matsannhatieukdat = db.Column(db.String)
    giayvesinh = db.Column(db.String)
    giayvesinhkdat = db.Column(db.String)   
    kocoruoi = db.Column(db.String)
    kocoruoikdat = db.Column(db.String)    
    bexisach = db.Column(db.String)
    besisachkdat = db.Column(db.String)   
    dcchekin = db.Column(db.String)
    dcchekinkdat = db.Column(db.String)   
    vsxungquanh = db.Column(db.String)
    vsxungquanhkdat = db.Column(db.String)
    dcche = db.Column(db.String)
    dcchekdat = db.Column(db.String)
    
    danhgiahopvs = db.Column(db.String)
    danhgiakhonghopvs = db.Column(db.String)
    nhadattieuchuan = db.Column(db.String)
    
# Biểu mẫu số 1: Cấp thôn
# Bang 1:
class CapThon(CommonModel):
    __tablename__ = 'capthon'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    nguoibaocao_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=True)
    nguoibaocao = db.relationship('User', viewonly=True)
    tinhtrang = db.Column(db.SmallInteger,nullable=False)
    capxa_id = db.Column(UUID(as_uuid=True), ForeignKey('capxa.id'), nullable=True)
    
    danhgianam = db.Column(db.String)
    nhatieuthonhvs = relationship('NhaTieuThonHVS')
    stt = db.Column(db.Integer)
    tentinh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tentinh = relationship('TinhThanh')
    tenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    tenhuyen = relationship('QuanHuyen')
    tenxa_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    tenxa = relationship('XaPhuong')
    suprsws = db.Column(db.Integer)
    tenthon = db.Column(db.String)
    thon_id = db.Column(UUID(as_uuid=True), ForeignKey('thonxom.id'), nullable=True)
    thon = relationship('ThonXom', viewonly=True)
    hotrongthon = db.Column(db.Integer)
    chuholanu = db.Column(db.Integer)
    sohongheo = db.Column(db.Integer)
    sohodtts = db.Column(db.Integer)
    dantrongthon = db.Column(db.Integer)
    sonam = db.Column(db.Integer)
    sonu = db.Column(db.Integer)
    #bo sung them tong cua cac truong can thong ke
    tong_tuhoai = db.Column(db.Integer)
    tong_thamdoi = db.Column(db.Integer)
    tong_2ngan = db.Column(db.Integer)
    tong_ongthonghoi = db.Column(db.Integer)
    tong_khongnhatieu = db.Column(db.Integer)
    tong_hopvs = db.Column(db.Integer)
    tong_khonghopvs = db.Column(db.Integer)
    tong_dccaithien = db.Column(db.Integer)
    tong_diemruatay = db.Column(db.Integer)
    
    
class NhaTieuThonHVS(CommonModel):
    __tablename__ = 'nhatieuthonhvs'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    capthon_id = db.Column(UUID(as_uuid=True), ForeignKey('capthon.id'), nullable=True) 
#     dantoc_id = db.Column(UUID(as_uuid=True), ForeignKey('dantoc.id'), nullable=True)
#     dantoc = relationship('DanToc')

    dantoc = db.Column(db.Integer)
    stt = db.Column(db.Integer)
    tenchuho = db.Column(db.String)
    gioitinh = db.Column(db.Integer)
#     dtts = db.Column(db.Integer)
    hongheo = db.Column(db.Integer) # la ho ngheo ghi 1
    tuhoai = db.Column(db.Integer)
    thamdoi = db.Column(db.Integer)
    haingan = db.Column(db.Integer)
    coongthong = db.Column(db.Integer)
#     loaikhac = db.Column(db.String)
    kconhatieu = db.Column(db.Integer)
    hopvs = db.Column(db.Integer)
    khopvs = db.Column(db.Integer)
    caithien = db.Column(db.Integer)
    diemruatay = db.Column(db.Integer)
    tong = db.Column(db.Integer)
    loaikhac = db.Column(db.Integer)
    
#Biểu mẫu số 2: Cấp xã
class CapXa(CommonModel):
    __tablename__ = 'capxa'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    nguoibaocao_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=True)
    nguoibaocao = db.relationship('User', viewonly=True)
    tinhtrang = db.Column(db.SmallInteger,nullable=False)
    
    caphuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('caphuyen.id'), nullable=True)
    danhgianam = db.Column(db.String)
    capthon = relationship('CapThon')
#     nhatieuxahvs = relationship('NhaTieuXaHVS')
    stt = db.Column(db.Integer)
    tentinh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tentinh = relationship('TinhThanh')
    tenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    tenhuyen = relationship('QuanHuyen')
    tenxa_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=False)
    tenxa = relationship('XaPhuong')
    sothon = db.Column(db.Integer)
    suprsws = db.Column(db.Integer)
    hotrongxa = db.Column(db.Integer)
    chuholanu = db.Column(db.Integer)
    sohongheo = db.Column(db.Integer)
    sohodtts = db.Column(db.Integer)
    dantrongxa = db.Column(db.Integer)
    sonam = db.Column(db.Integer)
    sonu = db.Column(db.Integer)
    loaikhac = db.Column(db.Integer)
    __table_args__ = (UniqueConstraint('donvi_id', 'danhgianam', name='uq_CapXa_donvi_id_danhgianam'),)

#Biểu mẫu số 3: Cấp huyen
class CapHuyen(CommonModel):
    __tablename__ = 'caphuyen'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    nguoibaocao_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=True)
    nguoibaocao = db.relationship('User', viewonly=True)
    tinhtrang = db.Column(db.SmallInteger,nullable=False)

    capxa = relationship('CapXa')

    danhgianam = db.Column(db.String)
    stt = db.Column(db.Integer)
    tentinh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tentinh = relationship('TinhThanh')
    tenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    tenhuyen = relationship('QuanHuyen')
    tenxa_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    tenxa = relationship('XaPhuong')
    tenthon = db.Column(db.String)
    tenthon_id = db.Column(UUID(as_uuid=True), ForeignKey('thonxom.id'), nullable=True)
    tenthon = relationship('ThonXom')

    tonghotronghuyen = db.Column(db.Integer)
    chuholanu = db.Column(db.Integer)
    sohongheo = db.Column(db.Integer)
    sohodtts = db.Column(db.Integer)
    tongdantronghuyen = db.Column(db.Integer)
    sonam = db.Column(db.Integer)
    sonu = db.Column(db.Integer)
    loaikhac = db.Column(db.Integer)
    __table_args__ = (UniqueConstraint('donvi_id', 'danhgianam', name='uq_CapHuyen_donvi_id_danhgianam'),)


#Biểu mẫu số 4: Cấp tinh
class CapTinh(CommonModel):
    __tablename__ = 'captinh'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    danhgianam = db.Column(db.String)
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    nguoibaocao_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=True)
    nguoibaocao = db.relationship('User', viewonly=True)
    tinhtrang = db.Column(db.SmallInteger,nullable=False)

    stt = db.Column(db.Integer)
    tentinh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tentinh = relationship('TinhThanh')
    tenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    tenhuyen = relationship('QuanHuyen')
    tenxa_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    tenxa = relationship('XaPhuong')
    tenthon = db.Column(db.String)
    tenthon_id = db.Column(UUID(as_uuid=True), ForeignKey('thonxom.id'), nullable=True)
    tenthon = relationship('ThonXom')
    hotrongthon = db.Column(db.Integer)
    chuholanu = db.Column(db.Integer)
    sohongheo = db.Column(db.Integer)
    sohodtts = db.Column(db.Integer)
    dantrongthon = db.Column(db.Integer)
    sonam = db.Column(db.Integer)
    sonu = db.Column(db.Integer)
    loaikhac = db.Column(db.Integer)
    __table_args__ = (UniqueConstraint('donvi_id', 'danhgianam', name='uq_CapTinh_donvi_id_danhgianam'),)
    
# Biểu mẫu số 1: Tiến độ lập kế hoạch và thực hiện Kế Hoạch Truyền Thông tiến độ lập kế hoạch và phê duyệt

class LapKHTinh(CommonModel):
    __tablename__ =  'lapkhtinh'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    nganh = db.Column(db.String)
    tiendo = db.Column(db.String)
    vihema = db.Column(db.String)
    khpheduyet = db.Column(db.String)
    ngaypheduyet = db.Column(db.DateTime())
    ngaytinhpheduyet = db.Column(db.DateTime())
    tentinh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tentinh = relationship('TinhThanh') 
    itemtinh = relationship('ItemTinh')
    
class ItemTinh(CommonModel):
    __tablename__ = 'itemtinh'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    lapkhtinh_id = db.Column(UUID(as_uuid=True), ForeignKey('lapkhtinh.id'), nullable=True)
    hoatdong_tinh = db.Column(db.String)
    muctieu_tinh = db.Column(db.Integer)
    ketqua_tinh = db.Column(db.String)
    songtg_tinh = db.Column(db.Integer)
    sonutg_tinh = db.Column(db.Integer)
    dttstg_tinh = db.Column(db.Integer)

    
class LapKHHuyen(CommonModel):
    __tablename__ =  'lapkhhuyen'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    nganh = db.Column(db.String)
    tiendo = db.Column(db.String)
    vihema = db.Column(db.String)
    khpheduyet = db.Column(db.String)
    ngaypheduyet = db.Column(db.DateTime())
    ngaytinhpheduyet = db.Column(db.DateTime())
    tentinh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tentinh = relationship('TinhThanh') 
    itemhuyen = relationship('ItemHuyen')
    
class ItemHuyen(CommonModel):
    __tablename__ = 'itemhuyen'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    lapkhhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('lapkhhuyen.id'), nullable=True)
    hoatdong_huyen = db.Column(db.String)
    muctieu_huyen = db.Column(db.Integer)
    ketqua_huyen = db.Column(db.String)
    songtg_huyen = db.Column(db.Integer)
    sonutg_huyen = db.Column(db.Integer)
    dttstg_huyen = db.Column(db.Integer)
    
class LapKHXa(CommonModel):
    __tablename__ =  'lapkhxa'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    nganh = db.Column(db.String)
    tiendo = db.Column(db.String)
    vihema = db.Column(db.String)
    khpheduyet = db.Column(db.String)
    ngaypheduyet = db.Column(db.DateTime())
    ngaytinhpheduyet = db.Column(db.DateTime())
    tentinh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tentinh = relationship('TinhThanh')  
    itemxa = relationship('ItemXa')
    
    
class ItemXa(CommonModel):
    __tablename__ = 'itemxa'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    lapkhxa_id = db.Column(UUID(as_uuid=True), ForeignKey('lapkhxa.id'), nullable=True)
    hoatdong_xa = db.Column(db.String)
    muctieu_xa = db.Column(db.Integer)
    ketqua_xa = db.Column(db.String)
    songtg_xa = db.Column(db.Integer)
    sonutg_xa = db.Column(db.Integer)
    dttstg_xa = db.Column(db.Integer)
    
class LapKHThon(CommonModel):
    __tablename__ =  'lapkhthon'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    nganh = db.Column(db.String)
    tiendo = db.Column(db.String)
    vihema = db.Column(db.String)
    khpheduyet = db.Column(db.String)
    ngaypheduyet = db.Column(db.DateTime())
    ngaytinhpheduyet = db.Column(db.DateTime())
    tentinh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tentinh = relationship('TinhThanh') 
    itemthon = relationship('ItemThon') 

class ItemThon(CommonModel):
    __tablename__ = 'itemthon'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    lapkhthon_id = db.Column(UUID(as_uuid=True), ForeignKey('lapkhthon.id'), nullable=True)
    hoatdong_thon = db.Column(db.String)
    muctieu_thon = db.Column(db.Integer)
    ketqua_thon = db.Column(db.String)
    songtg_thon = db.Column(db.Integer)
    sonutg_thon = db.Column(db.Integer)
    dttstg_thon = db.Column(db.Integer)
    
# Biểu mẫu số 2: Tiến độ thực hiện vệ sinh toàn xã của tỉnh
class VSToanXa(CommonModel):
    __tablename__ = 'vstoanxa'
    
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    nguoibaocao_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=True)
    nguoibaocao = db.relationship('User', viewonly=True)
    tinhtrang = db.Column(db.SmallInteger,nullable=True)
    
    nambaocao = db.Column(db.SmallInteger(),nullable=False)
    kybaocao = db.Column(db.SmallInteger(),nullable=False)
    tentinh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tentinh = relationship('TinhThanh')
    tenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    tenhuyen = relationship('QuanHuyen')
    tenxa_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    tenxa = relationship('XaPhuong')
    nhatieu = db.Column(db.Integer)
    diemruatay =  db.Column(db.Integer)
    truonghvs = db.Column(db.Integer)
    sohocsinh = db.Column(db.Integer)
    tramytehvs = db.Column(db.Integer)
    sohogd = db.Column(db.Integer)
    danso = db.Column(db.Integer)
    nuchuho = db.Column(db.Integer)
    dtts = db.Column(db.Integer)
   
#Biểu mẫu số 3: Tiến độ thực hiện duy trì vệ sinh toàn xã bền vững
class DuyTriVS(CommonModel):
    __tablename__ = 'duytrivs'
    tentinh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tentinh = relationship('TinhThanh')
    tenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    tenhuyen = relationship('QuanHuyen')
    tenxa_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    tenxa = relationship('XaPhuong')
    namdatvstx = db.Column(db.DateTime())
    truongvs = db.Column(db.Integer)
    tramytevs = db.Column(db.Integer)
   
#Biểu mẫu số 4: Giới và Dân tộc thiểu số
class DTThieuSo(CommonModel):
    __tablename__ = 'dtthieuso'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
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
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
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
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ncchinh = db.Column(db.Integer)
    nguonnckhac = db.Column(db.String)
    
    khuvstrg = db.Column(db.Integer)
    khuvsnam = db.Column(db.Integer)
    khuvsnu = db.Column(db.Integer)
    khuvsgvnam = db.Column(db.Integer)
    khuvsgvnu = db.Column(db.Integer)
    
   
class CapNcTruongTram(CommonModel):
    __tablename__ = 'capnctruongtram'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
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

    
    
    
    
    