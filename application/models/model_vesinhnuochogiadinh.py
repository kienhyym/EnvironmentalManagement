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

### Mau 4.1
class NcSachNhaTieuHoGD(CommonModel):
    __tablename__ = 'ncsachnhatieuhogd'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanhthongtu = db.Column(db.DateTime())
    tenphieu = db.Column(db.String)
    donvibaocao = db.Column(db.String)
    phamvi = db.Column(db.String)
    ngaynaocao = db.Column(db.DateTime())
    
    hinhthuccapnuoc_id = db.Column(UUID(as_uuid=True), ForeignKey('hinhthuccungcapnchogd.id'), nullable=True)
    hinhthuccapnuoc = relationship('HinhThucCungCapNcHoGD')
    cacbienphapsuly_id = db.Column(UUID(as_uuid=True), ForeignKey('cacbienphapsuly.id'), nullable=True)
    cacbienphapsuly = relationship('CacBienPhapSuLy')
    
    nhanxetkiennghi = db.Column(db.String)
    kyten = db.Column(db.String)
    
    
#Table 4.1
class HinhThucCungCapNcHoGD(CommonModel):
    __tablename__ = 'hinhthuccungcapnchogd'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    
    tongsodiabangiengdao = db.Column(db.String)
    tongsodiabangiengkhoan = db.Column(db.String)
    tongsodiabanmangtuchay = db.Column(db.String)
    tongsodiabangbenuocmua = db.Column(db.String)
    tongsodiabanloaikhac = db.Column(db.String)
    tongsodiabancong = db.Column(db.String)
    
    tongsokiemtragiengdao = db.Column(db.String)
    tongsokiemtragiengkhoan = db.Column(db.String)
    tongsokiemtramangtuchay = db.Column(db.String)
    tongsokiemtrabenuocmua = db.Column(db.String)
    tongsokiemtraloaikhac = db.Column(db.String)
    tongsokiemtracong = db.Column(db.String)
    
    tongsodattieuchuaniengdao = db.Column(db.String)
    tongsodattieuchuangiengkhoan = db.Column(db.String)
    tongsodattieuchuanmangtuchay = db.Column(db.String)
    tongsodattieuchuangbenuocmua = db.Column(db.String)
    tongsodattieuchuanloaikhac = db.Column(db.String)
    tongdattieuchuanbancong = db.Column(db.String)
    
##table 4.1 -2 
class CacBienPhapSuLy(CommonModel):
    __tablename__ = 'cacbienphapsuly'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)  
    
    tongsoho = db.Column(db.String)
    sohoconhatieu = db.Column(db.String)
    sohoconhaiteuhopvs = db.Column(db.String)
    phantramhodatvs = db.Column(db.String)
    sohohvsmoixaycobaocao = db.Column(db.String)
    sohokhvsxuongcap = db.Column(db.String)
    
    tongsonhatieu = db.Column(db.String)
    sonhatieuhvs = db.Column(db.String)
    phantramhvs = db.Column(db.String)
    sonhatieuhvsmoidcxaydung = db.Column(db.String)
    sonhatieubixuongcap = db.Column(db.String)
    
    tongsonhatieudoinuoc = db.Column(db.String)
    sonhatieuhvsdoinuoc = db.Column(db.String)
    phantramhvsdoinuoc = db.Column(db.String)
    sonhatieuhvsmoidcxaydungdoinuoc = db.Column(db.String)
    sonhatieubixuongcapdoinuoc = db.Column(db.String)
    
    tongsonhatieuhaingan = db.Column(db.String)
    sonhatieuhvshaingan = db.Column(db.String)
    phantramhvshaingan = db.Column(db.String)
    sonhatieuhvsmoidcxaydunghaungan = db.Column(db.String)
    sonhatieubixuongcaphaingan = db.Column(db.String)
    
    tongsonhatieuongthonghoi = db.Column(db.String)
    sonhatieuhvsongthonghoi = db.Column(db.String)
    phantramhvsongthonghoi = db.Column(db.String)
    sonhatieuhvsmoidcxaydungongthonghoi = db.Column(db.String)
    sonhatieubixuongcapongthonghoi = db.Column(db.String)
    
    soluongnhatieuloaikhac = db.Column(db.String)
    phantramloaikhac = db.Column(db.String)
    
    
    
    
###Mau 4.2   
class yTEDuPhongHuyen(CommonModel):
    __tablename__ = 'yteduphonghuyen'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanhthongtu = db.Column(db.DateTime())
    tenphieu = db.Column(db.String)
    donvibaocao = db.Column(db.String)
    phamvi = db.Column(db.String)
    ngaynaocao = db.Column(db.DateTime())  
      
    kqvschung_id = db.Column(UUID(as_uuid=True), ForeignKey('kqvschung.id'), nullable=True)
    kqvschung = relationship('KetQuaVSChung')
    
    tongsomaunuoclamxetnghiem = db.Column(db.String)
    tongsodat = db.Column(db.String)
    tyledat = db.Column(db.String)
    tongsokdat = db.Column(db.String)
    
    cumdancuduoi500ng_id = db.Column(UUID(as_uuid=True), ForeignKey('cumdancuduoi500ng.id'), nullable=True)
    cumdancuduoi500ng = relationship('CumDanCuDuoi500ng')  
    
    cacbienphapsuly = db.Column(db.String)
    
    cacbienphapsuly500ng_id = db.Column(UUID(as_uuid=True), ForeignKey('cacbienphapsuly500ng.id'), nullable=True)
    cacbienphapsuly500ng = relationship('CacBienPhapSuLy500ng')  
    nhanxet = db.Column(db.String)
    kiennghi = db.Column(db.String)
    kyten = db.Column(db.String)
    
#Table 4.2 -1
class KetQuaVSChung(CommonModel):
    __tablename__ = 'kqvschung'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    
    tongsodiabantt = db.Column(db.String)
    tongsodiabangiengdao = db.Column(db.String)
    tongsodiabangiengkhoan = db.Column(db.String)
    tongsodiabanmangtuchay = db.Column(db.String)
    tongsodiabangbenuocmua = db.Column(db.String)
    tongsodiabanloaikhac = db.Column(db.String)
    tongsodiabancong = db.Column(db.String)
    
    togsokiemtratt = db.Column(db.String)
    tongsokiemtragiengdao = db.Column(db.String)
    tongsokiemtragiengkhoan = db.Column(db.String)
    tongsokiemtramangtuchay = db.Column(db.String)
    tongsokiemtrabenuocmua = db.Column(db.String)
    tongsokiemtraloaikhac = db.Column(db.String)
    tongsokiemtracong = db.Column(db.String)
    
    tongsodatchuantt = db.Column(db.String)
    tongsodattieuchuaniengdao = db.Column(db.String)
    tongsodattieuchuangiengkhoan = db.Column(db.String)
    tongsodattieuchuanmangtuchay = db.Column(db.String)
    tongsodattieuchuangbenuocmua = db.Column(db.String)
    tongsodattieuchuanloaikhac = db.Column(db.String)
    tongdattieuchuanbancong = db.Column(db.String)
    
    tylett = db.Column(db.String)
    tylegiengdao = db.Column(db.String)
    tylegiengkhoan = db.Column(db.String)
    tylemangtuchay = db.Column(db.String)
    tylebenuocmua = db.Column(db.String)
    tyleloaikhac = db.Column(db.String)
    tylecong = db.Column(db.String)
      
###table 4.2 -2
class CumDanCuDuoi500ng(CommonModel):
    __tablename__ = 'cumdancuduoi500ng'
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
    
    
##table 4.2 - 3
class CacBienPhapSuLy500ng(CommonModel):
    __tablename__ = 'cacbienphapsuly500ng'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)  
    
    tongsoho = db.Column(db.String)
    sohoconhatieu = db.Column(db.String)
    sohoconhaiteuhopvs = db.Column(db.String)
    phantramhodatvs = db.Column(db.String)
    sohohvsmoixaycobaocao = db.Column(db.String)
    sohokhvsxuongcap = db.Column(db.String)
    
    tongsonhatieu = db.Column(db.String)
    sonhatieuhvs = db.Column(db.String)
    phantramhvs = db.Column(db.String)
    sonhatieuhvsmoidcxaydung = db.Column(db.String)
    sonhatieubixuongcap = db.Column(db.String)
    
    tongsonhatieudoinuoc = db.Column(db.String)
    sonhatieuhvsdoinuoc = db.Column(db.String)
    phantramhvsdoinuoc = db.Column(db.String)
    sonhatieuhvsmoidcxaydungdoinuoc = db.Column(db.String)
    sonhatieubixuongcapdoinuoc = db.Column(db.String)
    
    tongsonhatieuhaingan = db.Column(db.String)
    sonhatieuhvshaingan = db.Column(db.String)
    phantramhvshaingan = db.Column(db.String)
    sonhatieuhvsmoidcxaydunghaungan = db.Column(db.String)
    sonhatieubixuongcaphaingan = db.Column(db.String)
    
    tongsonhatieuongthonghoi = db.Column(db.String)
    sonhatieuhvsongthonghoi = db.Column(db.String)
    phantramhvsongthonghoi = db.Column(db.String)
    sonhatieuhvsmoidcxaydungongthonghoi = db.Column(db.String)
    sonhatieubixuongcapongthonghoi = db.Column(db.String)
    
    soluongnhatieuloaikhac = db.Column(db.String)
    phantramloaikhac = db.Column(db.String)
    
# mau 4.3
class yTEDuPhongTinh(CommonModel):
    __tablename__ = 'yteduphongtinh'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanhthongtu = db.Column(db.DateTime())
    tenphieu = db.Column(db.String)
    donvibaocao = db.Column(db.String)
    phamvi = db.Column(db.String)
    ngaynaocao = db.Column(db.DateTime())
    tongsonhamay = db.Column(db.String)
    tongsonhamaydckt = db.Column(db.String)
    tongsoluotkt = db.Column(db.String)
    soluotktkodat = db.Column(db.String)
    tylekodat = db.Column(db.String)
    socskt2lankdat = db.Column(db.String)
    tongsomaulamxn = db.Column(db.String)
    tongsodat = db.Column(db.String)
    tyledat = db.Column(db.String)
    tongsomaukdat = db.Column(db.String)
    tylekodat = db.Column(db.String)
    halankodat = db.Column(db.String)
    
    somaukdatvatly = db.Column(db.String)
    somaukdatvisinhvat = db.Column(db.String)
    cacbienphapsuly = db.Column(db.String)
    
    tramcapnuoc500ng_id = db.Column(UUID(as_uuid=True), ForeignKey('tramcapnuoc500ng.id'), nullable=True)
    tramcapnuoc500ng = relationship('TramCapNuoc500ng')
    
    tongsomaulamxetnghiem2 = db.Column(db.String)
    tongsomaudat2 = db.Column(db.String)
    tyledat2 = db.Column(db.String)  
       
    xetnghiemnuoc500ng_id = db.Column(UUID(as_uuid=True), ForeignKey('xetnghiemnuoc500ng.id'), nullable=True)
    xetnghiemnuoc500ng = relationship('XetNghiemNuoc500ng')  
    
    vsnhatieugd_id = db.Column(UUID(as_uuid=True), ForeignKey('vsnhatieugd.id'), nullable=True)
    vsnhatieugd = relationship('VSNhaTieuGD')  
    
    nhanxet = db.Column(db.String)
    kiennghi = db.Column(db.String)
    kyten = db.Column(db.String)

#table 4.3 -1
class TramCapNuoc500ng(CommonModel):
    __tablename__ = 'tramcapnuoc500ng'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    
    tongsodiabantt = db.Column(db.String)
    tongsodiabangiengdao = db.Column(db.String)
    tongsodiabangiengkhoan = db.Column(db.String)
    tongsodiabanmangtuchay = db.Column(db.String)
    tongsodiabangbenuocmua = db.Column(db.String)
    tongsodiabanloaikhac = db.Column(db.String)
    tongsodiabancong = db.Column(db.String)
    
    togsokiemtratt = db.Column(db.String)
    tongsokiemtragiengdao = db.Column(db.String)
    tongsokiemtragiengkhoan = db.Column(db.String)
    tongsokiemtramangtuchay = db.Column(db.String)
    tongsokiemtrabenuocmua = db.Column(db.String)
    tongsokiemtraloaikhac = db.Column(db.String)
    tongsokiemtracong = db.Column(db.String)
    
    tongsodatchuantt = db.Column(db.String)
    tongsodattieuchuaniengdao = db.Column(db.String)
    tongsodattieuchuangiengkhoan = db.Column(db.String)
    tongsodattieuchuanmangtuchay = db.Column(db.String)
    tongsodattieuchuangbenuocmua = db.Column(db.String)
    tongsodattieuchuanloaikhac = db.Column(db.String)
    tongdattieuchuanbancong = db.Column(db.String)
    
    tylett = db.Column(db.String)
    tylegiengdao = db.Column(db.String)
    tylegiengkhoan = db.Column(db.String)
    tylemangtuchay = db.Column(db.String)
    tylebenuocmua = db.Column(db.String)
    tyleloaikhac = db.Column(db.String)
    tylecong = db.Column(db.String)   

##Table 4.3 -2 
class XetNghiemNuoc500ng(CommonModel):
    __tablename__ = 'xetnghiemnuoc500ng'
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

##Table 4.3 - 3 
class VSNhaTieuGD(CommonModel):
    __tablename__ = 'vsnhatieugd'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)  
    
    tongsoho = db.Column(db.String)
    sohoconhatieu = db.Column(db.String)
    sohoconhaiteuhopvs = db.Column(db.String)
    phantramhodatvs = db.Column(db.String)
    sohohvsmoixaycobaocao = db.Column(db.String)
    sohokhvsxuongcap = db.Column(db.String)
    
    tongsonhatieu = db.Column(db.String)
    sonhatieuhvs = db.Column(db.String)
    phantramhvs = db.Column(db.String)
    sonhatieuhvsmoidcxaydung = db.Column(db.String)
    sonhatieubixuongcap = db.Column(db.String)
    
    tongsonhatieudoinuoc = db.Column(db.String)
    sonhatieuhvsdoinuoc = db.Column(db.String)
    phantramhvsdoinuoc = db.Column(db.String)
    sonhatieuhvsmoidcxaydungdoinuoc = db.Column(db.String)
    sonhatieubixuongcapdoinuoc = db.Column(db.String)
    
    tongsonhatieuhaingan = db.Column(db.String)
    sonhatieuhvshaingan = db.Column(db.String)
    phantramhvshaingan = db.Column(db.String)
    sonhatieuhvsmoidcxaydunghaungan = db.Column(db.String)
    sonhatieubixuongcaphaingan = db.Column(db.String)
    
    tongsonhatieuongthonghoi = db.Column(db.String)
    sonhatieuhvsongthonghoi = db.Column(db.String)
    phantramhvsongthonghoi = db.Column(db.String)
    sonhatieuhvsmoidcxaydungongthonghoi = db.Column(db.String)
    sonhatieubixuongcapongthonghoi = db.Column(db.String)
    
    soluongnhatieuloaikhac = db.Column(db.String)
    phantramloaikhac = db.Column(db.String)
   
##Mau 4.4
class TrungTamYteDuPhong(CommonModel):
    __tablename__ = 'trungtamyteduphong'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanhthongtu = db.Column(db.DateTime())
    tenphieu = db.Column(db.String)
    donvibaocao = db.Column(db.String)
    phamvi = db.Column(db.String)
    ngaynaocao = db.Column(db.DateTime())
    tongsonhamay = db.Column(db.String)
    sonhamaydckiemtra = db.Column(db.String)
    sonhamaydambaovesinh = db.Column(db.String)
    
    somaulaxn = db.Column(db.String)
    somaudat = db.Column(db.String)
    tyledat = db.Column(db.String)
    kodatvatlyhoahoc = db.Column(db.String)
    kdatvisinhvat = db.Column(db.String)
    cacbienphapsuly = db.Column(db.String)
    nhanxet = db.Column(db.String)
    kiennghi = db.Column(db.String)
    kyten = db.Column(db.String)
    
# mau 4.5
class VienChuyenNganhKhuVuc(CommonModel):
    __tablename__ = 'vienchuyennganhkhuvuc'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanhthongtu = db.Column(db.DateTime())
    tenphieu = db.Column(db.String)
    donvibaocao = db.Column(db.String)
    phamvi = db.Column(db.String)
    ngaynaocao = db.Column(db.DateTime())
    tongsonhamay = db.Column(db.String)
    tongsonhamaydckt = db.Column(db.String)
    tongsoluotkt = db.Column(db.String)
    soluotktkodat = db.Column(db.String)
    tylekodat = db.Column(db.String)
    socskt2lankdat = db.Column(db.String)
    tongsomaulamxn = db.Column(db.String)
    tongsodat = db.Column(db.String)
    tyledat = db.Column(db.String)
    tongsomaukdat = db.Column(db.String)
    tylekodat = db.Column(db.String)
    halankodat = db.Column(db.String)
    
    somaukdatvatly = db.Column(db.String)
    somaukdatvisinhvat = db.Column(db.String)
    cacbienphapsuly = db.Column(db.String)
    
    kqktvschungho500ng_id = db.Column(UUID(as_uuid=True), ForeignKey('kqktvschungho500ng.id'), nullable=True)
    kqktvschungho500ng = relationship('KQKTVSChungHo500ng')
    
    tongsomaulamxetnghiem2 = db.Column(db.String)
    tongsomaudat2 = db.Column(db.String)
    tyledat2 = db.Column(db.String)  
       
    kqktvschungho500ngkdat_id = db.Column(UUID(as_uuid=True), ForeignKey('kqktvschungho500ngkdat.id'), nullable=True)
    kqktvschungho500ngkdat = relationship('KQKTVSChungHo500ngKDat')  
    
    tonghopkqktvschungho500ng_id = db.Column(UUID(as_uuid=True), ForeignKey('tonghopkqktvschungho500ng.id'), nullable=True)
    tonghopkqktvschungho500ng = relationship('TongHopKQKTVSChungHo500ng')  
    
    
    ketqua = db.Column(db.String)
    hoatdong = db.Column(db.String)
    kyten = db.Column(db.String)
    nhanxetkiennghi = db.Column(db.String)
    kyten = db.Column(db.String)

#table 4.5 -1
class KQKTVSChungHo500ng(CommonModel):
    __tablename__ = 'kqktvschungho500ng'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)
    
    tongsodiabantt = db.Column(db.String)
    tongsodiabangiengdao = db.Column(db.String)
    tongsodiabangiengkhoan = db.Column(db.String)
    tongsodiabanmangtuchay = db.Column(db.String)
    tongsodiabangbenuocmua = db.Column(db.String)
    tongsodiabanloaikhac = db.Column(db.String)
    tongsodiabancong = db.Column(db.String)
    
    togsokiemtratt = db.Column(db.String)
    tongsokiemtragiengdao = db.Column(db.String)
    tongsokiemtragiengkhoan = db.Column(db.String)
    tongsokiemtramangtuchay = db.Column(db.String)
    tongsokiemtrabenuocmua = db.Column(db.String)
    tongsokiemtraloaikhac = db.Column(db.String)
    tongsokiemtracong = db.Column(db.String)
    
    tongsodatchuantt = db.Column(db.String)
    tongsodattieuchuaniengdao = db.Column(db.String)
    tongsodattieuchuangiengkhoan = db.Column(db.String)
    tongsodattieuchuanmangtuchay = db.Column(db.String)
    tongsodattieuchuangbenuocmua = db.Column(db.String)
    tongsodattieuchuanloaikhac = db.Column(db.String)
    tongdattieuchuanbancong = db.Column(db.String)
    
    tylett = db.Column(db.String)
    tylegiengdao = db.Column(db.String)
    tylegiengkhoan = db.Column(db.String)
    tylemangtuchay = db.Column(db.String)
    tylebenuocmua = db.Column(db.String)
    tyleloaikhac = db.Column(db.String)
    tylecong = db.Column(db.String)   

##Table 4.5 -2 
class KQKTVSChungHo500ngKDat(CommonModel):
    __tablename__ = 'kqktvschungho500ngkdat'
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

##Table 4.5 - 3 
class TongHopKQKTVSChungHo500ng(CommonModel):
    __tablename__ = 'tonghopkqktvschungho500ng'
    id = db.Column(UUID(as_uuid=True), primary_key=True,default=default_uuid)  
    
    tongsoho = db.Column(db.String)
    sohoconhatieu = db.Column(db.String)
    sohoconhaiteuhopvs = db.Column(db.String)
    phantramhodatvs = db.Column(db.String)
    sohohvsmoixaycobaocao = db.Column(db.String)
    sohokhvsxuongcap = db.Column(db.String)
    
    tongsonhatieu = db.Column(db.String)
    sonhatieuhvs = db.Column(db.String)
    phantramhvs = db.Column(db.String)
    sonhatieuhvsmoidcxaydung = db.Column(db.String)
    sonhatieubixuongcap = db.Column(db.String)
    
    tongsonhatieudoinuoc = db.Column(db.String)
    sonhatieuhvsdoinuoc = db.Column(db.String)
    phantramhvsdoinuoc = db.Column(db.String)
    sonhatieuhvsmoidcxaydungdoinuoc = db.Column(db.String)
    sonhatieubixuongcapdoinuoc = db.Column(db.String)
    
    tongsonhatieuhaingan = db.Column(db.String)
    sonhatieuhvshaingan = db.Column(db.String)
    phantramhvshaingan = db.Column(db.String)
    sonhatieuhvsmoidcxaydunghaungan = db.Column(db.String)
    sonhatieubixuongcaphaingan = db.Column(db.String)
    
    tongsonhatieuongthonghoi = db.Column(db.String)
    sonhatieuhvsongthonghoi = db.Column(db.String)
    phantramhvsongthonghoi = db.Column(db.String)
    sonhatieuhvsmoidcxaydungongthonghoi = db.Column(db.String)
    sonhatieubixuongcapongthonghoi = db.Column(db.String)
    
    soluongnhatieuloaikhac = db.Column(db.String)
    phantramloaikhac = db.Column(db.String)
   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
   
     
    