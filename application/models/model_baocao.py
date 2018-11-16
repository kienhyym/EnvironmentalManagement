from sqlalchemy import(Column, String, Integer, Float, DateTime, Date, Boolean, DECIMAL, Text, ForeignKey, UniqueConstraint)
# from sqlalchemy import *
from sqlalchemy.orm import *
from sqlalchemy.dialects.postgresql import UUID, JSON, JSONB
from sqlalchemy.orm import relationship, backref
from sqlalchemy.orm.collections import attribute_mapped_collection

from application.database import db

from application.database.model import CommonModel

import uuid
from PIL.JpegImagePlugin import COM


def default_uuid():
    return str(uuid.uuid4())


class KhaiThacNuocNgam(CommonModel):
    __tablename__ = 'khaithacnuocngam'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
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
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
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
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
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

    
class PhieuNoiKiemChatLuong(CommonModel):
    __tablename__ = 'phieunoikiemchatluong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
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
#     tablephieunoixetnghiemnuoctaicho_id = db.Column(UUID(as_uuid=True), ForeignKey('tablephieunoixetnghiemnuoctaicho.id'), nullable=True)
#     kiemtraxetnghiem = relationship('tablePhieuNoiXetNghiemNuocTaiCho')  
    bienphapkhacphuc = db.Column(db.String)
    ketluan = db.Column(db.String)
    ngaykiemtra = db.Column(db.DateTime())
    nguoikiemtrakyten = db.Column(db.String)

    
class KetQuaXNNuocTaiCho(CommonModel):
    __tablename__ = 'ketquaxetnghiemtaicho'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    baocao_id = db.Column(UUID(as_uuid=True), nullable=False)
    baocao_tenphieu = db.Column(db.String)
    mamau = db.Column(db.String)
    tenmau = db.Column(db.String)
    vitrilaymau = db.Column(db.String)
    ph = db.Column(db.Integer)
    doduc = db.Column(db.Integer)
    clodu = db.Column(db.Integer)
    chitieukhac = db.Column(db.JSON)
    danhgia = db.Column(db.String)


class PhieuNgoaiKiemChatLuong(CommonModel):
    __tablename__ = 'phieungoaikiemchatluong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
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

    
    
class KiemTraNguonNuocHoGiaDinh(CommonModel):
    __tablename__ = 'kiemtranguonnuochogiadinh'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
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
    thonxom_ten = db.Column(db.String)
    xaphuong_ten = db.Column(db.String)
    quanhuyen_ten = db.Column(db.String)
    tinhthanh_ten = db.Column(db.String)
    sonhankhau = db.Column(db.Integer)
    hinhthuccungcapnuoc = db.Column(db.String)
    thoigiankiemtra = db.Column(db.DateTime())
    nguoikiemtra = db.Column(db.String)
    thongtinmau = db.Column(db.String)
    
    kiemtranguonnuoctuchay_id = db.Column(UUID(as_uuid=True), ForeignKey('kiemtranguonnuoctuchay'), nullable=True)
    nguonnuocmang = relationship('KiemTraNguonNuocTuChay') 
     
    kiemtranguonnuocgiengdao_id = db.Column(UUID(as_uuid=True), ForeignKey('kiemtranguonnuocgiengdao'), nullable=True)
    nuocgiengdao = relationship('KiemTraNguonNuocGiengDao') 
     
    kiemtranguonnuocgiengkhoantren25m_id = db.Column(UUID(as_uuid=True), ForeignKey('kiemtranguonnuocgiengkhoantren25m'), nullable=True)
    nuocgiengkhoantren25m = relationship('KiemTraNguonNuocGiengKhoanTren25m') 
     
    kiemtranguonnuocgiengkhoanduoi25m_id = db.Column(UUID(as_uuid=True), ForeignKey('kiemtranguonnuocgiengkhoanduoi25m'), nullable=True)
    giengkhoansauduoi25m = relationship('KiemTraNguonNuocGiengKhoanDuoi25m') 
     
    kiemtrahethongthuhungnuocmua_id = db.Column(UUID(as_uuid=True), ForeignKey('kiemtrahethongthuhungnuocmua'), nullable=True)
    thuhungluutrunuocmua = relationship('KiemTraHeThongThuHungNuocMua')
      
    luutrunuoc_id = db.Column(UUID(as_uuid=True), ForeignKey('luutrunuoc'), nullable=True)
    bechumvai = relationship('LuuTruNuoc') 
    
    gianmua = db.Column(db.String)
    beloc = db.Column(db.String)
    vatlieutrongbeloc = db.Column(db.String)
    dungcuchuanuocsauxuly = db.Column(db.String)
    ketluan = db.Column(db.String)
    kiennghi = db.Column(db.String)
    daidienhogiadinhkyten = db.Column(db.String)
    ngaykiemtra = db.Column(db.DateTime())
    nguoikiemtrakyten = db.Column(db.String)


class KiemTraNguonNuocTuChay(CommonModel):
    __tablename__ = 'kiemtranguonnuoctuchay'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    baocao_id = db.Column(UUID(as_uuid=True), nullable=False)
    thongtinkiemtra = db.Column(db.String)
    phamvi = db.Column(db.String)
    nguoisinhhoat = db.Column(db.Integer)
    duongong = db.Column(db.Integer)
    nuoitrong = db.Column(db.Integer)
    vatnuoi = db.Column(db.Integer)
    racthai = db.Column(db.Integer)
    dungcudannuoc = db.Column(db.Integer)
    dungcuchuanuoc = db.Column(db.Integer)
    
    
class KiemTraNguonNuocGiengDao(CommonModel):
    __tablenameclass__ = 'kiemtranguonnuocgiengdao'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    baocao_id = db.Column(UUID(as_uuid=True), nullable=False)
    thongtinkiemtra = db.Column(db.String)
    khoangcachgiengtoinhatieugannhat = db.Column(db.Integer)
    khoangcachgiengtoibairacgannhat = db.Column(db.Integer)
    khoangcachgiengtoichuonggiasucgannhat = db.Column(db.Integer)
    napdaygieng = db.Column(db.Integer)
    thanhgieng = db.Column(db.Integer)
    vachgieng = db.Column(db.Integer)
    sangieng = db.Column(db.Integer)
    ranhthoatnuoc = db.Column(db.Integer)
    dungculaynuoc = db.Column(db.Integer)

    
class KiemTraNguonNuocGiengKhoanTren25m(CommonModel):
    __tablenameclass__ = 'kiemtranguonnuocgiengkhoantren25m'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    baocao_id = db.Column(UUID(as_uuid=True), nullable=False)
    thongtinkiemtra = db.Column(db.String)
    cogieng = db.Column(db.Integer)
    sangieng = db.Column(db.Integer)
    dungcubomnuoc = db.Column(db.Integer)

    
class KiemTraNguonNuocGiengKhoanDuoi25m(CommonModel):
    __tablenameclass__ = 'kiemtranguonnuocgiengkhoanduoi25m'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    baocao_id = db.Column(UUID(as_uuid=True), nullable=False)
    thongtinkiemtra = db.Column(db.String)
    cogieng = db.Column(db.Integer)
    sangieng = db.Column(db.Integer)
    dungcubomnuoc = db.Column(db.Integer)
    khoangcachgiengtoinhatieugannhat = db.Column(db.Integer)
    khoangcachgiengtoibairacgannhat = db.Column(db.Integer)
    khoangcachgiengtoichuonggiasucgannhat = db.Column(db.Integer)
    ranhthoatnuoc = db.Column(db.Integer)


class KiemTraHeThongThuHungNuocMua(CommonModel):
    __tablenameclass__ = 'kiemtrahethongthuhungnuocmua'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    baocao_id = db.Column(UUID(as_uuid=True), nullable=False)
    thongtinkiemtra = db.Column(db.String)
    vatlieumaihungmua = db.Column(db.Integer)
    maihungmangdan = db.Column(db.Integer)
    ganganrac = db.Column(db.Integer)
    napdaybe = db.Column(db.Integer)
    thanhbe = db.Column(db.Integer)
    rongreucontrung = db.Column(db.Integer)
    dungculaynuoc = db.Column(db.Integer)

    
class LuuTruNuoc(CommonModel):
    __tablenameclass__ = 'luutrunuoc'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    baocao_id = db.Column(UUID(as_uuid=True), nullable=False)
    thongtinkiemtra = db.Column(db.String)
    napday = db.Column(db.Integer)
    rongreucontrung = db.Column(db.Integer)
    dungculaynuoc = db.Column(db.Integer)

    
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

    
class BanGiaoSanPham(CommonModel):
    __tablename__ = 'bangiaosanpham'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    tenbienban = db.Column(db.String)
    ngaytaobienban = db.Column(db.DateTime())
    thanhphan = db.Column(db.String)
    bengiao = db.Column(db.String)
    daidienbengiao = db.Column(db.String)
    chucvubengiao = db.Column(db.String)
    bennhan = db.Column(db.String)
    daidienbennhan = db.Column(db.String)
    chuvubennhan = db.Column(db.String)
    sanphambangiao = db.Column(db.String)
    duanbangiao_id = db.Column(UUID(as_uuid=True), ForeignKey('duanbangiao'), nullable=True)
    duan = relationship('DuAnBanGiao') 
    bengiaokyten = db.Column(db.String)
    bennhankyten = db.Column(db.String)

    
class DuAnBanGiao(CommonModel):
    __tablenameclass__ = 'duanbangiao'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    baocao_id = db.Column(UUID(as_uuid=True), nullable=False)
    stt = db.Column(db.Integer)
    danhmucsp = db.Column(db.String)
    khuondang = db.Column(db.String)
    dvt = db.Column(db.String)
    soluong = db.Column(db.Integer)
    ghichu = db.Column(db.String)

    
class BaoCaoKetQuaKiemTra(CommonModel):
    __tablename__ = 'baocaoketquakiemtra'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    tenbaocao = db.Column(db.String)
    tenduan = db.Column(db.String)
    mucdich = db.Column(db.String)
    tablenhanlucthamgiakiemtra_id = db.Column(UUID(as_uuid=True), ForeignKey('nhanlucthamgiakiemtra'), nullable=True)
    nhanluc = relationship('NhanLucThamGiaKiemTra') 
    tableketquakiemtradulieu_id = db.Column(UUID(as_uuid=True), ForeignKey('ketquakiemtradulieu'), nullable=True)
    thongke = relationship('KetQuaKiemTraDuLieu') 
    ykiennhomkiemtra = db.Column(db.String)
    ngaylapbaocao = db.Column(db.DateTime())
    kyten = db.Column(db.String)

    
class NhanLucThamGiaKiemTra(CommonModel):
    __tablenameclass__ = 'nhanlucthamgiakiemtra'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    baocao_id = db.Column(UUID(as_uuid=True), nullable=False)
    stt = db.Column(db.Integer)
    hovaten = db.Column(db.String)
    congviec = db.Column(db.String)

    
class KetQuaKiemTraDuLieu(CommonModel):
    __tablenameclass__ = 'ketquakiemtradulieu'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    baocao_id = db.Column(UUID(as_uuid=True), nullable=False)
    stt = db.Column(db.Integer)
    loi = db.Column(db.String)
    mota = db.Column(db.String)
    
    
   
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
    ketquaviesinh = db.Column(db.String)
    tongsocosocapnuoc = db.Column(db.Integer)
    tongsocosocapnuocguibaocao = db.Column(db.Integer)
    tongsocosocapnuocdambaovesinh = db.Column(db.Integer)
    tyle = db.Column(db.Integer)
    danhsachcosokhongdambaovs = db.Column(db.String)
    kqxetnghiemnuoc = db.Column(db.String);
    tongsocosocungcapncchuan = db.Column(db.Integer)
    danhsachcosokhongquychuan = db.Column(db.String)
    tongsomaunuoclamxn = db.Column(db.Integer)
    tongsomaudattieuchuan = db.Column(db.Integer)
    tylemaudattieuchuan = db.Column(db.Integer)
    tongsomauxnkhongdat = db.Column(db.Integer)
    somaukodatlyhoahoc = db.Column(db.Integer)
    somaukodatvsvatly = db.Column(db.Integer)
    somaukodatvisinhvat = db.Column(db.Integer)
    cacbienphapkhacphuc = db.Column(db.Integer)
    nhanxet = db.Column(db.String)
    kiennghi = db.Column(db.String)
    kyten = db.Column(db.String)

    
class ChatLuongNuocAnUong(CommonModel):
    __tablename__ = 'chatluongnuocanuong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    donvisophieu = db.Column(db.String)
    sophieu = db.Column(db.Integer)
    ngaylamphieu = db.Column(db.DateTime())
    tenbaocao = db.Column(db.String)
    phamvi = db.Column(db.String)
    ngaybaocao = db.Column(db.DataTime())
    thongtinchung = db.Column(db.String)
    tongsonhamaynctrendiaban = db.Column(db.Integer)
    tongsonhamayncdckiemtra = db.Column(db.Integer)
    tongsoluotkiemtracuanhamay = db.Column(db.Integer)
    tongluotkiemtrakhongdat = db.Column(db.Integer)
    chiemtylekodat = db.Column(db.Integer)
    tongsomaunclamxn = db.Column(db.Integer)
    tongsomauncdatquydinh = db.Column(db.Integer)
    somauncdatquydinh = db.Column(db.Integer)
    somaunckodatquydinh = db.Column(db.Integer)
    kodatchitieuvatlyhoahoc = db.Column(db.Integer)
    kodatchitieuvisinhvat = db.Column(db.Integer)
    cacbienphapdoivoinhamaykodatchitieu = db.Column(db.String)
    kqchatluongnuoctren1000m_id = db.Column(UUID(as_uuid=True), ForeignKey('kqchatluongnuoctren1000m.id'), nullable=True)
    kqchatluongnuoctren1000m = relationship('KQChatLuongNuocTren1000m')
    tongsomaunuoclamxn = db.Column(db.Integer)
    tongsodatquydinh = db.Column(db.Integer)
    tyledungquydinh = db.Column(db.Integer)
    tongsokodatquydinh = db.Column(db.Integer)
    maunuockhongdat_id = db.Column(UUID(as_uuid=True), ForeignKey('maunuockhongdat.id'), nullable=True)
    maunuockhongdat = relationship('MauNuocKhongDat')
    cacbienphapxulinhamaykodatchitieuchatluong = db.Column(db.String)
    ketqua = db.Column(db.String)
    hoatdongnghiencuu = db.Column(db.String)
    nhanxetkiennghi = db.Column(db.String)
    kyten = db.Column(db.String)

    
class KQChatLuongNuocTren1000m(CommonModel):
    __tablenameclass__ = 'kqchatluongnuoctren1000m'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    baocao_id = db.Column(UUID(as_uuid=True), nullable=False)
    cosocapnuoctt = db.Column(db.Integer)
    giengdao = db.Column(db.Integer)
    giengkhoan = db.Column(db.Integer)
    mangtuchay = db.Column(db.Integer)
    benuocmua = db.Column(db.Integer)
    loaikhac = db.Column(db.Integer)
    
    
class MauNuocKhongDat(CommonModel):
    __tablenameclass__ = 'maunuockhongdat'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    cosocapnuoctt = db.Column(db.Integer)
    giengdao = db.Column(db.Integer)
    giengkhoan = db.Column(db.Integer)
    mangtuchay = db.Column(db.Integer)
    benuocmua = db.Column(db.Integer)
    loaikhac = db.Column(db.Integer)
    cong = db.Column(db.Integer)
    
    
class KTNgoaiVeSinhChatLuongNcUongNcSinhHoat(CommonModel):
    __tablename__ = 'kTNgoaiVeSinhChatLuongNcUongNcSinhHoat'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    banhanhthongtu = db.Column(db.String)
    donvibaocao = db.Column(db.String)
    sohieu = db.Column(db.Integer)
    ngaytaophieu = db.Column(db.DateTime())
    tenbaocao = db.Column(db.String)
    phamvi = db.Column(db.String)
    tongsocscungcapnuoc = db.Column(db.Integer)
    tongsodckiemtra = db.Column(db.Integer)
    tongsoluotdckiemtra = db.Column(db.Integer)
    tongsoluotkiemtrakodat = db.Column(db.Integer)
    tylekodat = db.Column(db.Integer)
    socoso2lankhongdat = db.Column(db.Integer)
    socsthuchiennghiemtucnoiquy = db.Column(db.Integer)
    chiemtyle = db.Column(db.Integer)
    tongsomaunclamxn = db.Column(db.Integer)
    tongsomaunuocdatquychuan = db.Column(db.Integer)
    tylemaunuocdatquychuan = db.Column(db.Integer)
    tongsomaunckhogdatquychuan = db.Column(db.Integer)
    khongdatchitieulihoahoc = db.Column(db.Integer)
    khongdatchitieuvisinhvat = db.Column(db.Integer)
    khongdatchitieulihoa = db.Column(db.Integer)
    cacbienphapsulinhamaykodutieuchuan = db.Column(db.String)
    tableKQKTVeSinhChatLuongNcTren1000m_id = db.Column(UUID(as_uuid=True), ForeignKey('tableKQKTVeSinhChatLuongNcTren1000m.id'), nullable=True)
    tableKQKTVeSinhChatLuongNcTren1000m = relationship('tableKQKTVeSinhChatLuongNcTren1000m')
    tongsoncmaulamxn = db.Column(db.Integer)
    tongsomauquydinhchuan = db.Column(db.Integer)
    tylemaudatquydinh = db.Column(db.Integer)
    tongsomaukhongquydinh = db.Column(db.Integer)
    tableSoLuongMauNcKhongDat_id = db.Column(UUID(as_uuid=True), ForeignKey('tableSoLuongMauNcKhongDat.id'), nullable=True)
    tableSoLuongMauNcKhongDat = relationship('tableSoLuongMauNcKhongDat')
    cacbienphapsulinhamaykhongdambaovs = db.Column(db.String)
    nhanxet = db.Column(db.String)
    kyten = db.Column(db.String)
    
    
class KQKTVeSinhChatLuongNcUongNcSinhHoat(CommonModel):
    __tablename__ = 'kQKTVeSinhChatLuongNcUongNcSinhHoat'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    banhanhthongtu = db.Column(db.String)
    donvibaocao = db.Column(db.String)
    sophieu = db.Column(db.String)
    ngaytaophieu = db.Column(db.DateTime)
    tenbaocao = db.Column(db.String)
    phamvi = db.Column(db.String)
    tableKQKTVeSinhChatLuongNcTren1000m_id = db.Column(UUID(as_uuid=True), ForeignKey('tableKQKTVeSinhChatLuongNcTren1000m.id'), nullable=True)
    tableKQKTVeSinhChatLuongNcTren1000m = relationship('tableKQKTVeSinhChatLuongNcTren1000m')
    tongsomaunclamxn = db.Column(db.Integer)
    tongsomaudatquydinh = db.Column(db.Integer)
    tyledatyeucau = db.Column(db.Integer)
    tongsokhongdatyeucau = db.Column(db.Integer)
    tableSoLuongMauNcKhongDatTheoPhanTram_id = db.Column(UUID(as_uuid=True), ForeignKey('tableSoLuongMauNcKhongDatTheoPhanTram.id'), nullable=True)
    tableSoLuongMauNcKhongDatTheoPhanTram = relationship('tableSoLuongMauNcKhongDatTheoPhanTram')
    cacbienphapsulicaccosovipham = db.Column(db.String)
    nhanxetkiennghi = db.Column(db.String)
    kyten = db.Column(db.String)
    
    
class SoLuongMauNcKhongDatTheoPhanTram(CommonModel):
     __tablenameclass__ = 'SoLuongMauNcKhongDatTheoPhanTram'
     id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
     soluong = db.Column(db.Integer)
     phantram = db.Column(db.Integer)
    
    
class KQKTVeSinhChatLuongNcUongNcSinhHoat(CommonModel):
    __tablename__ = 'kQKTVeSinhChatLuongNcUongNcSinhHoat'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    donvibaocao = db.Column(db.String)
    sophieu = db.Column(db.String)
    ngaytaophieu = db.Column(db.DateTime())
    tenbaocao = db.Column(db.String)
    phamvi = db.Column(db.String)
    tableKQKTVeSinhChatLuongNcTren1000m_id = db.Column(UUID(as_uuid=True), ForeignKey('tableKQKTVeSinhChatLuongNcTren1000m.id'), nullable=True)
    tableKQKTVeSinhChatLuongNcTren1000m = relationship('tableKQKTVeSinhChatLuongNcTren1000m')
    cacbienphapsulicachogdvipham = db.Column(db.String)

    
class BaoCaoThuThapDuLieu(CommonModel):
    __tablename__ = 'baoCaoThuThapDuLieu'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    tenbaocao = db.Column(db.String)
    tenduan = db.Column(db.String)
    donvingcungcap = db.Column(db.String)
    tableBaoCaoThuThapDuLieu_id = db.Column(UUID(as_uuid=True), ForeignKey('tableBaoCaoThuThapDuLieu.id'), nullable=True)
    tableBaoCaoThuThapDuLieu = relationship('tableBaoCaoThuThapDuLieu')
    thongtinbosung = db.Column(db.String)
    ngaytaobaocao = db.Column(db.DateTime())
    xacnhancuadonvi = db.Column(db.String)
    nguoilapbaocao = db.Column(db.String)
    
    
class BaoCaoThuThapDuLieu(CommonModel):
      __tablenameclass__ = 'BaoCaoThuThapDuLieu'
      id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
      stt = db.Column(db.Integer)
      dulieutailieu = db.Column(db.String)
      khuondang = db.Column(db.String)
      dvt = db.Column(db.String)
      soluong = db.Column(db.Integer)
      ghichu = db.Column(db.String)

    
class BienBanGiaoGiuLieuThuThap(CommonModel):
    __tablename__ = 'bienBanGiaoGiuLieuThuThap'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    tenbaocao = db.Column(db.String)
    ngaytaobaocao = db.Column(db.DateTime())
    chungtoigom = db.Column(db.String)
    bengiao = db.Column(db.String)
    daidienbengiao = db.Column(db.String)
    chucvubengiap = db.Column(db.String)
    bennhan = db.Column(db.String)
    daidienbennhan = db.Column(db.String)
    chucvubennhan = db.Column(db.String)
    tableBaoCaoThuThapDuLieu_id = db.Column(UUID(as_uuid=True), ForeignKey('tableBaoCaoThuThapDuLieu.id'), nullable=True)
    tableBaoCaoThuThapDuLieu = relationship('tableBaoCaoThuThapDuLieu')
    daidienbengiaoky = db.Column(db.String)
    daidienbennhanky = db.Column(db.String)

    
class BaoCaoPhanLoaiVaDanhGia(CommonModel):
    __tablename__ = 'baoCaoPhanLoaiVaDanhGia'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    tenbaocao = db.Column(db.String)
    tenduan = db.Column(db.String)
    tennhomdulieu = db.Column(db.String)
    tonghopphanloai = db.Column(db.String)
    tableBaoCaoThuThapDuLieu_id = db.Column(UUID(as_uuid=True), ForeignKey('tableBaoCaoThuThapDuLieu.id'), nullable=True)
    tableBaoCaoThuThapDuLieu = relationship('tableBaoCaoThuThapDuLieu')
    thongtinbosung = db.Column(db.String)
    ngaytao = db.Column(db.DateTime())
    ngthuchienphanloaidulieukyten = db.Column(db.String)
    nguoilapbaocaokyten = db.Column(db.String)
    
    
class BaoCaoXayDungCauTruc(CommonModel):
     __tablename__ = 'baoCaoXayDungCauTruc'
     id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
     tenphuluc = db.Column(db.String)
     tenbaocao = db.Column(db.String)
     tenduan = db.Column(db.String)
     donvithuchien = db.Column(db.String)
     maudulieu = db.Column(db.String)
     tableDulieuDacTa_id = db.Column(UUID(as_uuid=True), ForeignKey('tableDulieuDacTa.id'), nullable=True)
     tableDulieuDacTa = relationship('tableDulieuDacTa')
     thongtinbosung = db.Column(db.String)
     ngaylap = db.Column(db.DateTime())
     nguoitaobaocaokyten = db.Column(db.String)

    
class DulieuDacTa(CommonModel):
     __tablenameclass__ = 'DulieuDacTa'
     id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
     stt = db.Column(db.Integer)
     dulieudactathongtin = db.Column(db.String)


class BaoCaoKetQuaSanXuat(CommonModel):
     __tablename__ = 'baoCaoKetQuaSanXuat'
     id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
     tenphuluc = db.Column(db.String)
     tenbaocao = db.Column(db.String)
     tenduan = db.Column(db.String)
     mucdich = db.Column(db.String)
     tableBaoCaoKetQuaSuaChua_id = db.Column(UUID(as_uuid=True), ForeignKey('tableBaoCaoKetQuaSuaChua.id'), nullable=True)
     tableBaoCaoKetQuaSuaChua = relationship('tableBaoCaoKetQuaSuaChua')
     tableBaoCaoThuThapDuLieu_id = db.Column(UUID(as_uuid=True), ForeignKey('tableBaoCaoThuThapDuLieu.id'), nullable=True)
     tableBaoCaoThuThapDuLieu = relationship('tableBaoCaoThuThapDuLieu')
     
     
class BaoCaoKetQuaSuaChua(CommonModel):
     __tablename__ = 'baoCaoKetQuaSuaChua'
     id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
     tenphuluc = db.Column(db.String)
     tenbaocao = db.Column(db.String)
     tenduan = db.Column(db.String)
     mucdich = db.Column(db.String)
     tableBaoCaoKetQuaSuaChua_id = db.Column(UUID(as_uuid=True), ForeignKey('tableBaoCaoKetQuaSuaChua.id'), nullable=True)
     tableBaoCaoKetQuaSuaChua = relationship('tableBaoCaoKetQuaSuaChua')
     tableBangThongKeKetQuaSuaChua_id = db.Column(UUID(as_uuid=True), ForeignKey('tableBangThongKeKetQuaSuaChua.id'), nullable=True)
     tableBangThongKeKetQuaSuaChua = relationship('tableBangThongKeKetQuaSuaChua')
     
     
class BaoCaoKetQuaSuaChua(CommonModel):
     __tablenameclass__ = 'BaoCaoKetQuaSuaChua'
     id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
     hovaten = db.Column(db.String)
     congviecthuchien = db.Column(db.String)


class BangThongKeKetQuaSuaChua(CommonModel):
    __tablenameclass__ = 'BangThongKeKetQuaSuaChua'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tt = db.Column(db.String)
    loi = db.Column(db.String)
    sua = db.Column(db.String)
    khongsua = db.Column(db.String)
    thoigiansua = db.Column(db.DateTime())
    ghichu = db.Column(db.String)
     
     
class BaoCaoThuThapDuLieu(CommonModel):
     __tablenameclass__ = 'BaoCaoThuThapDuLieu'
     id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
     tt = db.Column(db.String)
     loi = db.Column(db.String)
     sua = db.Column(db.String)
     khongsua = db.Column(db.String)
     thoigiansua = db.Column(db.String)
     ghichu = db.Column(db.String)
    
    
