from sqlalchemy import(Column, String, Integer, Float, DateTime, Date, Boolean, DECIMAL, Text, ForeignKey, UniqueConstraint)
# from sqlalchemy import *
from sqlalchemy.orm import *
from sqlalchemy.dialects.postgresql import UUID, JSON, JSONB
from sqlalchemy.orm import relationship, backref
from sqlalchemy.orm.collections import attribute_mapped_collection

from application.database import db

from application.database.model import CommonModel

import uuid


def default_uuid():
    return str(uuid.uuid4())


class NguyCoVSKhaiThacNuocNgam(CommonModel):
    __tablename__ = 'nguycokhaithacnuocngam'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanhthongtu = db.Column(db.DateTime())
    tenphieu = db.Column(db.String)
    loaiphieu = db.Column(db.String)
    phamvi = db.Column(db.String)
    tuongraobaove = db.Column(db.Integer)  # (Có: 1 điểm; không: 0 điểm)
    congtrinhxaydung = db.Column(db.Integer)
    duongongchayqua = db.Column(db.Integer)
    canhtacnongnghiep = db.Column(db.Integer)
    bairacthai = db.Column(db.Integer)
    vatnuoi = db.Column(db.Integer)
    phandongvat = db.Column(db.Integer)
    nhatieu = db.Column(db.Integer)

    
class KQNoiKiemVeSinhNcUongNcSinhHoat12(CommonModel):
    __tablename__ = 'kqnoikiemtravesinhncuongncsinhhoat12'
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

    
class KTVeSinhChatluongNcUongNcSinhHoat11(CommonModel):
    __tablename__ = 'ktvesinhchatluongncuongncsinhhoat11'
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
    tableKTVeSinhChatluongNcUongNcSinhHoat11_id = db.Column(UUID(as_uuid=True), ForeignKey('tableKTVeSinhChatluongNcUongNcSinhHoat11.id'), nullable=True)
    tableKTVeSinhChatluongNcUongNcSinhHoat11 = relationship('tableKTVeSinhChatluongNcUongNcSinhHoat11')
    tongsomaunuoclamxn = db.Column(db.Integer)
    tongsodatquydinh = db.Column(db.Integer)
    tyledungquydinh = db.Column(db.Integer)
    tongsokodatquydinh = db.Column(db.Integer)
    table2KTVeSinhChatluongNcUongNcSinhHoat11_id = db.Column(UUID(as_uuid=True), ForeignKey('tableKTVeSinhChatluongNcUongNcSinhHoat11.id'), nullable=True)
    table2KTVeSinhChatluongNcUongNcSinhHoat11 = relationship('tableKTVeSinhChatluongNcUongNcSinhHoat11')
    cacbienphapxulinhamaykodatchitieuchatluong = db.Column(db.String)
    ketqua = db.Column(db.String)
    hoatdongnghiencuu = db.Column(db.String)
    nhanxetkiennghi = db.Column(db.String)
    kyten = db.Column(db.String)

    
class table2KTVeSinhChatluongNcUongNcSinhHoat11(CommonModel):
    __tablename__ = 'table2KTVeSinhChatluongNcUongNcSinhHoat11'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    cosocapnuoctt = db.Column(db.Integer)
    giengdao = db.Column(db.Integer)
    giengkhoan = db.Column(db.Integer)
    mangtuchay = db.Column(db.Integer)
    benuocmua = db.Column(db.Integer)
    loaikhac = db.Column(db.Integer)
    
    
class tableKTVeSinhChatluongNcUongNcSinhHoat11(CommonModel):
    __tablename__ = 'tableKTVeSinhChatluongNcUongNcSinhHoat11'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    cosocapnuoctt = db.Column(db.Integer)
    giengdao = db.Column(db.Integer)
    giengkhoan = db.Column(db.Integer)
    mangtuchay = db.Column(db.Integer)
    benuocmua = db.Column(db.Integer)
    loaikhac = db.Column(db.Integer)
    cong = db.Column(db.Integer)
    
    
class KQNgoaiKiemVSChatluongDoAnNcUong10(CommonModel):
    __tablename__ = 'kqNgoaiKiemVSChatluongDoAnNcUong10'
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
    tableKTVeSinhChatluongNcUongNcSinhHoat11_id = db.Column(UUID(as_uuid=True), ForeignKey('tableKTVeSinhChatluongNcUongNcSinhHoat11.id'), nullable=True)
    tableKTVeSinhChatluongNcUongNcSinhHoat11 = relationship('tableKTVeSinhChatluongNcUongNcSinhHoat11')
    tongsoncmaulamxn = db.Column(db.Integer)
    tongsomauquydinhchuan = db.Column(db.Integer)
    tylemaudatquydinh = db.Column(db.Integer)
    tongsomaukhongquydinh = db.Column(db.Integer)
    table2KTVeSinhChatluongNcUongNcSinhHoat11_id = db.Column(UUID(as_uuid=True), ForeignKey('tableKTVeSinhChatluongNcUongNcSinhHoat11.id'), nullable=True)
    table2KTVeSinhChatluongNcUongNcSinhHoat11 = relationship('tableKTVeSinhChatluongNcUongNcSinhHoat11')
    cacbienphapsulinhamaykhongdambaovs = db.Column(db.String)
    nhanxet = db.Column(db.String)
    kyten = db.Column(db.String)
    
    
class KqKtVeSinhChatLuongNcAnNcSinhHoat9(CommonModel):
    __tablename__ = 'kqKtVeSinhChatLuongNcAnNcSinhHoat9'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    banhanhthongtu = db.Column(db.String)
    donvibaocao = db.Column(db.String)
    sophieu = db.Column(db.String)
    ngaytaophieu = db.Column(db.DateTime)
    tenbaocao = db.Column(db.String)
    phamvi = db.Column(db.String)
    tableKTVeSinhChatluongNcUongNcSinhHoat11_id = db.Column(UUID(as_uuid=True), ForeignKey('tableKTVeSinhChatluongNcUongNcSinhHoat11.id'), nullable=True)
    tableKTVeSinhChatluongNcUongNcSinhHoat11 = relationship('tableKTVeSinhChatluongNcUongNcSinhHoat11')
    tongsomaunclamxn = db.Column(db.Integer)
    tongsomaudatquydinh = db.Column(db.Integer)
    tyledatyeucau = db.Column(db.Integer)
    tongsokhongdatyeucau = db.Column(db.Integer)
    table3KqKtVeSinhChatLuongNcAnNcSinhHoat9_id = db.Column(UUID(as_uuid=True), ForeignKey('table3KqKtVeSinhChatLuongNcAnNcSinhHoat9.id'), nullable=True)
    table3KqKtVeSinhChatLuongNcAnNcSinhHoat9 = relationship('table3KqKtVeSinhChatLuongNcAnNcSinhHoat9')
    cacbienphapsulicaccosovipham = db.Column(db.String)
    nhanxetkiennghi = db.Column(db.String)
    kyten = db.Column(db.String)
    
    
class table3KqKtVeSinhChatLuongNcAnNcSinhHoat9(CommonModel):
     __tablename__ = 'table3KqKtVeSinhChatLuongNcAnNcSinhHoat9'
     id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
     soluong = db.Column(db.Integer)
     phantram = db.Column(db.Integer)
    
    
class KqKtVeSinhChatLuongNcUongNcSinhHoat8(CommonModel):
    __tablename__ = 'kqKtVeSinhChatLuongNcUongNcSinhHoat8'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    donvibaocao = db.Column(db.String)
    sophieu = db.Column(db.String)
    ngaytaophieu = db.Column(db.DateTime())
    tenbaocao = db.Column(db.String)
    phamvi = db.Column(db.String)
    tableKTVeSinhChatluongNcUongNcSinhHoat11_id = db.Column(UUID(as_uuid=True), ForeignKey('tableKTVeSinhChatluongNcUongNcSinhHoat11.id'), nullable=True)
    tableKTVeSinhChatluongNcUongNcSinhHoat11 = relationship('tableKTVeSinhChatluongNcUongNcSinhHoat11')
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
    
    
class tableBaoCaoThuThapDuLieu(CommonModel):
      __tablename__ = 'tableBaoCaoThuThapDuLieu'
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

    
class tableDulieuDacTa(CommonModel):
     __tablename__ = 'tableDulieuDacTa'
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
     table2BaoCaoKetQuaSuaChua_id = db.Column(UUID(as_uuid=True), ForeignKey('table2BaoCaoKetQuaSuaChua.id'), nullable=True)
     table2BaoCaoKetQuaSuaChua = relationship('table2BaoCaoKetQuaSuaChua')
     
     
class tableBaoCaoKetQuaSuaChua(CommonModel):
     __tablename__ = 'tableBaoCaoKetQuaSuaChua'
     id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
     stt = db.Column(db.Integer)
     hovaten = db.Column(db.String)
     congviecthuchien = db.Column(db.String)
     lietkecaccacdexuat = db.Column(db.String)
     ngaytao = db.Column(db.DateTime())
     nguoilapbaocao = db.Column(db.String)
     
     
class table2BaoCaoKetQuaSuaChua(CommonModel):
     __tablename__ = 'table2BaoCaoKetQuaSuaChua'
     id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
     tt = db.Column(db.String)
     loi = db.Column(db.String)
     sua = db.Column(db.String)
     khongsua = db.Column(db.String)
     thoigiansua = db.Column(db.String)
     ghichu = db.Column(db.String)
    
