import uuid

from application.database import db
from application.database.model import CommonModel
from PIL.JpegImagePlugin import COM
from sqlalchemy import (DECIMAL, Boolean, Column, Date, DateTime, Float,
                        ForeignKey, Integer, String, Text, UniqueConstraint)
from sqlalchemy.dialects.postgresql import JSON, JSONB, UUID
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
    kqphieunoikiemtrachatluong_id = db.Column(UUID(as_uuid=True), ForeignKey('kqphieunoikiemtrachatluong.id'), nullable=True)
    kqphieunoikiemtrachatluong = relationship('KQPhieuNoiKiemChatLuong')


#Table 4.4
class KQPhieuNoiKiemChatLuong(CommonModel):
    __tablename__ = 'kqphieunoikiemtrachatluong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    vitrilaymau = db.Cloumn(db.String)
    ph = db.Cloumn(db.String)
    doduc = db.Cloumn(db.String)
    clodu = db.Cloumn(db.String)
    danhgia = db.Cloumn(db.String)

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
    kqphieungoaikiemtrachatluong_id = db.Column(UUID(as_uuid=True), ForeignKey('kqphieungoaikiemtrachatluong.id'), nullable=True)
    kqphieungoaikiemtrachatluong = relationship('KQPhieuNgoaiKiemChatLuong')


#Table 4.5
class KQPhieuNgoaiKiemChatLuong(CommonModel):
    __tablename__ = 'kqphieungoaikiemtrachatluong'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    vitrilaymau = db.Cloumn(db.String)
    ph = db.Cloumn(db.String)
    doduc = db.Cloumn(db.String)
    clodu = db.Cloumn(db.String)
    danhgia = db.Cloumn(db.String)


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


#     NguonNuocTuChay_id = db.Column(UUID(as_uuid=True), ForeignKey('NguonNuocTuChay'), nullable=True)
    nguonuoctuchay = relationship('NguonNuocTuChay')
#
#     kiemtranguonnuocgiengdao_id = db.Column(UUID(as_uuid=True), ForeignKey('kiemtranguonnuocgiengdao'), nullable=True)
    nguonnuocgiengdao = relationship('NguonNuocGiengDao')
#
#     kiemtranguonnuocgiengkhoantren25m_id = db.Column(UUID(as_uuid=True), ForeignKey('kiemtranguonnuocgiengkhoantren25m'), nullable=True)
    nguonnuocgiengkhoantren25m = relationship('NguonNuocGiengKhoanTren25m')
#
#     kiemtranguonnuocgiengkhoanduoi25m_id = db.Column(UUID(as_uuid=True), ForeignKey('kiemtranguonnuocgiengkhoanduoi25m'), nullable=True)
    nguonnuocgiengkhoansauduoi25m = relationship('NguonNuocGiengKhoanDuoi25m')
#
#     kiemtrahethongthuhungnuocmua_id = db.Column(UUID(as_uuid=True), ForeignKey('kiemtrahethongthuhungnuocmua'), nullable=True)
    hethongluutrunuocmua = relationship('HeThongThuHungNuocMua')
#
#     luutrunuoc_id = db.Column(UUID(as_uuid=True), ForeignKey('luutrunuoc'), nullable=True)
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
    ktnuochogiadinh_id = db.Column(UUID(as_uuid=True), ForeignKey('ktnuochogiadinh.id'), nullable=True)
    ktnuochogiadinh = relationship('KTNuocHoGiaDinh')


#Table 4.6
class KTNuocHoGiaDinh(CommonModel):
    __tablename__ = 'ktnuochogiadinh'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    vitrilaymau = db.Cloumn(db.String)
    ph = db.Cloumn(db.String)
    doduc = db.Cloumn(db.String)
    clodu = db.Cloumn(db.String)
    danhgia = db.Cloumn(db.String)


#<------------------------------
class NguonNuocTuChay(CommonModel):
    __tablename__ = 'NguonNuocTuChay'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    nguonnuochogiadinh_id = db.Column(UUID(as_uuid=True), ForeignKey('kiemtranguonnuochogiadinh.id'), nullable=True)
    phamvi = db.Column(db.String)
    nguoisinhhoat = db.Column(db.Integer)
    duongong = db.Column(db.Integer)
    nuoitrong = db.Column(db.Integer)
    vatnuoi = db.Column(db.Integer)
    racthai = db.Column(db.Integer)
    dungcudannuoc = db.Column(db.Integer)
    dungcuchuanuoc = db.Column(db.Integer)


class NguonNuocGiengDao(CommonModel):
    __tablename__ = 'nguonnuocgiengdao'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    nguonnuochogiadinh_id = db.Column(UUID(as_uuid=True), ForeignKey('kiemtranguonnuochogiadinh.id'), nullable=True)
    conhatieugangieng10m = db.Column(db.Integer)
    cobairacgangieng10m = db.Column(db.Integer)
    cochuonggiasucgangieng10m = db.Column(db.Integer)
    napdaygieng = db.Column(db.Integer)
    thanhgieng = db.Column(db.Integer)
    vachgieng = db.Column(db.Integer)
    sangieng = db.Column(db.Integer)
    ranhthoatnuoc = db.Column(db.Integer)
    dungculaynuoc = db.Column(db.Integer)


class NguonNuocGiengKhoanTren25m(CommonModel):
    __tablename__ = 'nguonnuocgiengkhoantren25m'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    nguonnuochogiadinh_id = db.Column(UUID(as_uuid=True), ForeignKey('kiemtranguonnuochogiadinh.id'), nullable=True)
    conggieng = db.Column(db.Integer)
    sangieng = db.Column(db.Integer)
    dungcubomnuoc = db.Column(db.Integer)


class NguonNuocGiengKhoanDuoi25m(CommonModel):
    __tablename__ = 'nguonnuocgiengkhoanduoi25m'
    id = db.Column(UUID(as_uuid=True),primary_key=True, default=default_uuid)
    nguonnuochogiadinh_id = db.Column(UUID(as_uuid=True), ForeignKey('kiemtranguonnuochogiadinh.id'), nullable=True)
    thongtinkiemtra = db.Column(db.String)
    cogieng = db.Column(db.Integer)
    sangieng = db.Column(db.Integer)
    dungcubomnuoc = db.Column(db.Integer)
    conhatieugangieng10m = db.Column(db.Integer)
    cobairacgangieng10m = db.Column(db.Integer)
    cochuonggiasucgangieng10m = db.Column(db.Integer)
    ranhthoatnuoc = db.Column(db.Integer)


class HeThongThuHungNuocMua(CommonModel):
    __tablename__ = 'hethongthuhungnuocmua'
    id = db.Column(UUID(as_uuid=True),primary_key=True, default=default_uuid)
    nguonnuochogiadinh_id = db.Column(UUID(as_uuid=True), ForeignKey('kiemtranguonnuochogiadinh.id'), nullable=True)
    thongtinkiemtra = db.Column(db.String)
    vatlieumaihungmua = db.Column(db.Integer)
    maihungmangdan = db.Column(db.Integer)
    ganganrac = db.Column(db.Integer)
    napdaybe = db.Column(db.Integer)
    thanhbe = db.Column(db.Integer)
    rongreucontrung = db.Column(db.Integer)
    dungculaynuoc = db.Column(db.Integer)


class LuuTruNuocBECHUMVAI(CommonModel):
    __tablename__ = 'luutrunuocbechumvai'
    id = db.Column(UUID(as_uuid=True),primary_key=True, default=default_uuid)
    nguonnuochogiadinh_id = db.Column(UUID(as_uuid=True), ForeignKey('kiemtranguonnuochogiadinh.id'), nullable=True)
    thongtinkiemtra = db.Column(db.String)
    napday = db.Column(db.Integer)
    rongreucontrung = db.Column(db.Integer)
    dungculaynuoc = db.Column(db.Integer)
#------------------------------------->

#Mau 4.7.
class KiemTraVSChatLuongNuocThanhPham(CommonModel):
    __tablename__ = 'kiemtrachatluongnuocthanhpham'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    baocao_id = db.Column(UUID(as_uuid=True), nullable=False)
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
    diabancosocapnuoctt = db.Cloumn(db.Integer)
    diabangiengdao = db.Cloumn(db.Integer)
    diabangiengkhoan = db.Cloumn(db.Integer)
    diabanmangtuchay = db.Cloumn(db.Integer)
    diabanbenuocmua = db.Cloumn(db.Integer)
    diabanloaikhac = db.Cloumn(db.Integer)
    diabancong = db.Cloumn(db.Integer)

    kiemtracosocapnuoctt = db.Cloumn(db.Integer)
    kiemtragiengdao = db.Cloumn(db.Integer)
    kiemtragiengkhoan = db.Cloumn(db.Integer)
    kiemtramangtuchay = db.Cloumn(db.Integer)
    kiemtrabenuocmua = db.Cloumn(db.Integer)
    kiemtraloaikhac = db.Cloumn(db.Integer)
    kiemtracong = db.Cloumn(db.Integer)

    tieuchuancosocapnuoctt = db.Cloumn(db.Integer)
    tieuchuangiengdao = db.Cloumn(db.Integer)
    tieuchuangiengkhoan = db.Cloumn(db.Integer)
    tieuchuanmangtuchay = db.Cloumn(db.Integer)
    tieuchuanbenuocmua = db.Cloumn(db.Integer)
    tieuchuanloaikhac = db.Cloumn(db.Integer)
    tieuchuancong = db.Cloumn(db.Integer)

    tylecosocapnuoctt = db.Cloumn(db.Integer)
    tylegiengdao = db.Cloumn(db.Integer)
    tylegiengkhoan = db.Cloumn(db.Integer)
    tylemangtuchay = db.Cloumn(db.Integer)
    tylebenuocmua = db.Cloumn(db.Integer)
    tyleloaikhac = db.Cloumn(db.Integer)
    tylecong = db.Cloumn(db.Integer)


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
    diabancosocapnuoctt = db.Cloumn(db.Integer)
    diabangiengdao = db.Cloumn(db.Integer)
    diabangiengkhoan = db.Cloumn(db.Integer)
    diabanmangtuchay = db.Cloumn(db.Integer)
    diabanbenuocmua = db.Cloumn(db.Integer)
    diabanloaikhac = db.Cloumn(db.Integer)
    diabancong = db.Cloumn(db.Integer)

    kiemtracosocapnuoctt = db.Cloumn(db.Integer)
    kiemtragiengdao = db.Cloumn(db.Integer)
    kiemtragiengkhoan = db.Cloumn(db.Integer)
    kiemtramangtuchay = db.Cloumn(db.Integer)
    kiemtrabenuocmua = db.Cloumn(db.Integer)
    kiemtraloaikhac = db.Cloumn(db.Integer)
    kiemtracong = db.Cloumn(db.Integer)

    tieuchuancosocapnuoctt = db.Cloumn(db.Integer)
    tieuchuangiengdao = db.Cloumn(db.Integer)
    tieuchuangiengkhoan = db.Cloumn(db.Integer)
    tieuchuanmangtuchay = db.Cloumn(db.Integer)
    tieuchuanbenuocmua = db.Cloumn(db.Integer)
    tieuchuanloaikhac = db.Cloumn(db.Integer)
    tieuchuancong = db.Cloumn(db.Integer)

    tylecosocapnuoctt = db.Cloumn(db.Integer)
    tylegiengdao = db.Cloumn(db.Integer)
    tylegiengkhoan = db.Cloumn(db.Integer)
    tylemangtuchay = db.Cloumn(db.Integer)
    tylebenuocmua = db.Cloumn(db.Integer)
    tyleloaikhac = db.Cloumn(db.Integer)
    tylecong = db.Cloumn(db.Integer)


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
class KQKTChatLuongNuocSinhHoat(CommonModel):
    __tablename__ = 'kqktchatluongnuocsinhhoat'
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

    kqvscosocungcapnuochogd_id = db.Column(UUID(as_uuid=True), ForeignKey('kqvscosocungcapnuochogd.id'), nullable=True)
    kqvscosocungcapnuochogd = relationship('KQVSCoSoCungCapNuocHoGd')

    kqvscscungcapnuocgdkdat_id = db.Column(UUID(as_uuid=True), ForeignKey('kqvscscungcapnuocgdkdat.id'), nullable=True)
    kqvscscungcapnuocgdkdat = relationship('KQVSCSCungCapNuocGdKoDat')

# Table  4.9 - 1
class KQVSCoSoCungCapNuocHoGd(CommonModel):
    __tablename__ = 'kqvscosocungcapnuochogd'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    diabancosocapnuoctt = db.Cloumn(db.Integer)
    diabangiengdao = db.Cloumn(db.Integer)
    diabangiengkhoan = db.Cloumn(db.Integer)
    diabanmangtuchay = db.Cloumn(db.Integer)
    diabanbenuocmua = db.Cloumn(db.Integer)
    diabanloaikhac = db.Column(db.Integer)
    diabancong = db.Column(db.Integer)

    kiemtracosocapnuoctt = db.Column(db.Integer)
    kiemtragiengdao = db.Column(db.Integer)
    kiemtragiengkhoan = db.Column(db.Integer)
    kiemtramangnuochay = db.Column(db.Integer)
    kiemtrabenuocmua = db.Column(db.Integer)
    kiemtraloaikhac = db.Column(db.Integer)
    kiemtracong = db.Column(db.Integer)

    tieuchuancosocapnuoctt = db.Column(db.Integer)
    tieuchuangiengdao = db.Column(db.Integer)
    tieuchuangiengkhoan = db.Column(db.Integer)
    tieuchuanmangnuocmua  = db.Column(db.Integer)
    tieuchuanbenuocmua = db.Column(db.Integer)
    tieuchuanloaikhac = db.Column(db.Integer)
    tieuchuancong = db.Column(db.Integer)

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


# Table  4.9 - 2
class KQVSCSCungCapNuocGdKoDat(CommonModel):
    __tablename__ = 'kqvscscungcapnuocgdkdat'
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
class KQKTVeSinhNuocSinhHoat(CommonModel):
    __tablename__ = 'kqktvesinhnuocsinhhoat'
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

    ksvscapnuochgd_id = db.Column(UUID(as_uuid=True), ForeignKey('ksvscapnuochgd.id'), nullable=True)
    ksvscapnuochgd = relationship('KQVSCapNuocHGD')

    ksvscapnuochgd_id = db.Column(UUID(as_uuid=True), ForeignKey('ksvscapnuochgd.id'), nullable=True)
    ksvscapnuochgd = relationship('KQVSCapNuocHGD')



# Table KetQuaKiemTraNuoc 4.8 - 1
class KQVSCapNuocHGD(CommonModel):
    __tablename__ = 'ksvscapnuochgd'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    diabancosocapnuoctt = db.Cloumn(db.Integer)
    diabangiengdao = db.Cloumn(db.Integer)
    diabangiengkhoan = db.Cloumn(db.Integer)
    diabanmangtuchay = db.Cloumn(db.Integer)
    diabanbenuocmua = db.Cloumn(db.Integer)
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
class KQVSCapNuocTinhHGD(CommonModel):
    __tablename__ = 'ksvscapnuoctinhhgd'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    diabancosocapnuoctt = db.Cloumn(db.Integer)
    diabangiengdao = db.Cloumn(db.Integer)
    diabangiengkhoan = db.Cloumn(db.Integer)
    diabanmangtuchay = db.Cloumn(db.Integer)
    diabanbenuocmua = db.Cloumn(db.Integer)
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
    nguoilapbaocao = db.Column(db.String)

    tonghopthuthap_id = db.Column(UUID(as_uuid=True), ForeignKey('tonghopthuthap.id'), nullable=True)
    tonghopthuthap = relationship('TongHopThuThap')



#Table 5.1
class TongHopThuThap(CommonModel):
    __tablename__ = 'tonghopthuthap'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
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
    bengiaoky = db.Column(db.String)
    bennhanky = db.Column(db.String)

    bangiaothuthap_id = db.Column(UUID(as_uuid=True), ForeignKey('bangiaothuthap.id'), nullable=True)
    bangiaothuthap = relationship('BanGiaoThuThap')


#Table 5.2
class BanGiaoThuThap(CommonModel):
    __tablename__ = 'bangiaothuthap'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    stt = db.Column(db.Integer)
    dulieu = db.Cloumn(db.String)
    khuondang = db.Cloumn(db.String)
    dvt = db.Cloumn(db.String)
    soluong = db.Cloumn(db.Integer)
    ghichu = db.Cloumn(db.String)


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
    danhgiabangiaothuthap_id = db.Column(UUID(as_uuid=True), ForeignKey('danhgiabangiaothuthap.id'), nullable=True)
    danhgiabangiaothuthap = relationship('DanhGiaBanGiaoThuThap')
    

#Table 5.3
class DanhGiaBanGiaoThuThap(CommonModel):
    __tablename__ = 'danhgiabangiaothuthap'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
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


#Table 5.5 -1
class NhanLucSuaChua(CommonModel):
    __tablename__ = 'nhanlucsuachua'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    stt = db.Cloumn(db.String)
    hovaten = db.Cloumn(db.String)
    congviecthuchien = db.Cloumn(db.String)

#Table 5.5 -2
class KetQuaSuaChua(CommonModel):
    __tablename__ = 'ketquasuachua'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    tt = db.Cloumn(db.String)
    loi = db.Cloumn(db.String)
    chuasua = db.Cloumn(db.Integer)
    dasua = db.Cloumn(db.Integer)
    thoigian = db.Cloumn(db.DateTime())
    ghichu = db.Cloumn(db.String)    
  
#Table 5.5 -3
class KetQuaSuaChuaDuLieu(CommonModel):
    __tablename__ = 'ketquasuachuadulieu'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    tt = db.Cloumn(db.String)
    loi = db.Cloumn(db.String)
    chuasua = db.Cloumn(db.Integer)
    dasua = db.Cloumn(db.Integer)
    thoigian = db.Cloumn(db.DateTime())
    ghichu = db.Cloumn(db.String)    


# Mau 5.5
class BCKetQuaSuaChua(CommonModel):
    __tablename__ = 'bcketquasuachua'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    tenbaocao = db.Column(db.String)
    tenduan = db.Column(db.String)
    mucdich = db.Column(db.String)

    nhanlucsuachua_id = db.Column(UUID(as_uuid=True), ForeignKey('nhanlucsuachua.id'), nullable=True)
    nhanlucsuachua = relationship('NhanLucSuaChua')

    ketquasuachua_id = db.Column(UUID(as_uuid=True), ForeignKey('ketquasuachua.id'), nullable=True)
    ketquasuachua = relationship('KetQuaSuaChua')

    ketquasuachuadulieu_id = db.Column(UUID(as_uuid=True), ForeignKey('ketquasuachuadulieu.id'), nullable=True)
    ketquasuachuadulieu = relationship('KetQuaSuaChuaDuLieu')


# Mau 5.6
class BCKetQuaKiemTra(CommonModel):
    __tablename__ = 'bcketquakiemtra'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    tenbaocao = db.Column(db.String)
    tenduan = db.Column(db.String)
    mucdich = db.Column(db.String)

    kqnhanlucthamgiakt_id = db.Column(UUID(as_uuid=True), ForeignKey('kqnhanlucthamgiakt.id'), nullable=True)
    kqnhanlucthamgiakt = relationship('KQNhanLucThamGiaKT')

    kqnhanlucthamgiaktdacta_id = db.Column(UUID(as_uuid=True), ForeignKey('kqnhanlucthamgiaktdacta.id'), nullable=True)
    kqnhanlucthamgiaktdacta = relationship('KQNhanLucThamGiaKTDacTa')

#Table 5.6 -1
class KQNhanLucThamGiaKT(CommonModel):
    __tablename__ = 'kqnhanlucthamgiakt'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    stt = db.Cloumn(db.String)
    hovate = db.Cloumn(db.String)
    congiecthuchien = db.Cloumn(db.String)  

#Table 5.6 -2
class KQNhanLucThamGiaKTDacTa(CommonModel):
    __tablename__ = 'kqnhanlucthamgiaktdacta'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    stt = db.Cloumn(db.String)
    loi = db.Cloumn(db.String)
    mota = db.Cloumn(db.String) 


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
    bangiaosanpham = relationship("KQSuaChuaSieuDuLieu")
    daidienbengiaoky = db.Column(db.String)
    daidienbennhanky = db.Column(db.String)

    cungnhaubangiaosanpham_id = db.Column(UUID(as_uuid=True), ForeignKey('cungnhaubangiaosanpham.id'), nullable=True)
    cungnhaubangiaosanpham = relationship('CungNhauBanGiaoSanPham')

#Table 5.7 -1
class CungNhauBanGiaoSanPham(CommonModel):
    __tablename__ = 'cungnhaubangiaosanpham'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    stt = db.Cloumn(db.String)
    danhmucsanpham = db.Cloumn(db.String)
    khuondang = db.Cloumn(db.String) 
    kdv = db.Cloumn(db.String) 
    soluong = db.Cloumn(db.Integer) 
    ghichu = db.Cloumn(db.String) 
