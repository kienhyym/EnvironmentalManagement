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

roles_users = db.Table('roles_users',
                       db.Column('user_id', UUID(as_uuid=True), db.ForeignKey('user.id')),
                       db.Column('role_id', db.Integer(), db.ForeignKey('role.id')))


#Enum
class TuyenDonViEnum(object):
    TW = 1
    soyte = 2
    cosodaotao = 3
    bvydct = 4
    khoaydct = 5
    quanhuyen = 6
    bvtructhuocso = 7
    moidangky = 99

class TrangThaiDangKyDonViEnum(object):
    khoa = 1
    taomoi = 2
    dongbo = 3

class TinhTrangBaocaoEnum(object):
    taomoi = 1
    daduyet = 2
    dakhoa = 3
    
    

class Role(CommonModel):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))
    
class Permission(CommonModel):
    __tablename__ = 'permission'
    id = db.Column(Integer(), primary_key=True)
    role_id = db.Column(Integer, ForeignKey('role.id'), nullable=False)
    subject = db.Column(String,index=True)
    permission = db.Column(String)
    value = db.Column(Boolean, default=False)
    __table_args__ = (UniqueConstraint('role_id', 'subject', 'permission', name='uq_permission_role_subject_permission'),)
    
    
class User(CommonModel):
    __tablename__ = 'user'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    fullname = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    confirmpassword = db.Column(db.String(255))
    active = db.Column(db.Boolean(), default=True)
    phone = db.Column(db.String(255), unique=True)
    birthday = db.Column(db.DateTime())
    gender = db.Column(db.String(255))
    macongdan = db.Column(db.String(255), unique=True)
    roles = db.relationship('Role', secondary=roles_users,
                            backref=db.backref('users', lazy='dynamic'))
 
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=False)
    donvi = db.relationship('DonVi', viewonly=True)
    
    confirmed_at = db.Column(db.DateTime())
    last_login_at = db.Column(db.DateTime())
    current_login_at = db.Column(db.DateTime())
    last_login_ip = db.Column(db.String(255))
    current_login_ip = db.Column(db.String(255))
    login_count = db.Column(db.Integer)
    trangthai = db.Column(db.SmallInteger)
 
    
    def __repr__(self):
        """ Show user object info. """
        return '<User: {}>'.format(self.id)
    
    def has_role(self, role):
        if isinstance(role, str):
            return role in (role.name for role in self.roles)
        else:
            return role in self.roles
    
    def add_role(self, role):
        pass
    
    def remove_role(self,role):
        pass


class DonVi(CommonModel):
    __tablename__ = 'donvi'
    id = db.Column(db.Integer, primary_key=True)
    ten = db.Column(db.String(255), nullable=False)
    ma = db.Column(db.String(255))
    sodienthoai = db.Column(db.String(63))
    diachi = db.Column(db.String(255))
    email = db.Column(db.String(255))
    ghichu = db.Column(db.String(255))
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = relationship('XaPhuong') 
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')  
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh', viewonly=True)
    quocgia_id = db.Column(UUID(as_uuid=True), ForeignKey('quocgia.id'), nullable=True)
    quocgia = relationship('QuocGia')
    tuyendonvi_id = db.Column(db.SmallInteger, db.ForeignKey('tuyendonvi.id'), nullable=False) # la trung tam, hay truong hoc ...
    tuyendonvi = db.relationship('TuyenDonVi')
    coquanchuquan = db.Column(db.String(255))
    captren_id = db.Column(db.Integer, db.ForeignKey('donvi.id'), nullable=True)
    laysolieu = db.Column(db.Boolean(), default=True)
    active = db.Column(db.Boolean(), default=False)
    users = db.relationship('User', viewonly=True)
    
    
    children = relationship("DonVi",
        order_by="asc(DonVi.ten)",
        # cascade deletions
        cascade="all, delete-orphan",
        # many to one + adjacency list - remote_side
        # is required to reference the 'remote'
        # column in the join condition.
        backref=backref("captren", remote_side=id),
        # children will be represented as a dictionary
        # on the "name" attribute.
        collection_class=attribute_mapped_collection('id'),
    )


    def __repr__(self):
        return "DonVi(id=%r, ten=%r, captren_id=%r, tuyendonvi_id=%r)" % (
                    self.id,
                    self.ten,
                    self.captren_id,
                    self.tuyendonvi_id
                )
    def __todict__(self):
        return {"id":str(self.id),"ma": self.ma, "ten": self.ten, "captren_id": str(self.captren_id), "tuyendonvi_id":str(self.tuyendonvi_id)}

    def __toid__(self):
        return self.id

    def dump(self, _indent=0):
        obj = self.__todict__()
        #obj["tuyendonvi"] = to_dict(self.tuyendonvi)
        obj["nodes"] = [c.dump() for c in self.children.values()]
        return obj

    def get_children_ids(self, data):
#         if type(data) is list:
#             data.append(self.id)
#             for r in self.children.values():
#                 r.get_children_ids(data)
        if type(data) is list:
            for r in self.children.values():
               data.append(r.id)
#             if len(data) == 0:
#                 data.append(self.id)
        return data

    def getlistid(self):
        data = []
        self.get_children_ids(data)
        return data
    
class TuyenDonVi(CommonModel):
    __tablename__ = 'tuyendonvi'
    id = db.Column(db.Integer, primary_key=True)
    ma = db.Column(String(255), unique=True)
    ten = db.Column(String(255))
    mota = db.Column(String(255))

class BaoCaoTuyenDonVi(CommonModel):
    __tablename__ = 'bctuyendonvi'
    id = db.Column(db.Integer, primary_key=True)
    tuyendonvi_id = db.Column(db.SmallInteger, db.ForeignKey('tuyendonvi.id'), unique=True, index=True, nullable=False)
#     tuyendonvi = db.relationship('TuyenDonVi')
    collectionNames = db.Column(db.String(), nullable=False)
    
class UserDonvi(CommonModel):
    __tablename__ = 'user_donvi'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    fullname = db.Column(db.String(255))
    email = db.Column(db.String(255))
    password = db.Column(db.String(255))
    cfpassword = db.Column(db.String(255))
    phone = db.Column(db.String(255))
    macongdan = db.Column(String(200))
    user_id =  db.Column(UUID(as_uuid=True), db.ForeignKey('user.id', onupdate="CASCADE", ondelete="SET NULL"),nullable=True)
    users = db.relationship('User', viewonly=True)
    donvi_id = db.Column(db.Integer, db.ForeignKey('donvi.id', onupdate="CASCADE", ondelete="SET NULL"), nullable=True)
    donvi = db.relationship('DonVi', foreign_keys=[donvi_id], viewonly=True)
    donvi_sodienthoai = db.Column(db.String())
    donvi_diachi = db.Column(db.String())
    donvi_ten = db.Column(db.String())
    donvi_tuyendonvi_id = db.Column(db.Integer, db.ForeignKey('tuyendonvi.id', onupdate="SET NULL"), nullable=True)
    donvi_tuyendonvi = db.relationship('TuyenDonVi')
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = relationship('XaPhuong') 
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')  
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh', viewonly=True)
    quocgia_id = db.Column(UUID(as_uuid=True), ForeignKey('quocgia.id'), nullable=True)
    quocgia = relationship('QuocGia')
    captren_id = db.Column(db.Integer, db.ForeignKey('donvi.id', onupdate="CASCADE", ondelete="SET NULL"), nullable=True)
    captren = db.relationship('DonVi', foreign_keys=[captren_id],backref=db.backref('user_donvi',lazy='dynamic'), viewonly=True)
    trangthai = db.Column(db.SmallInteger ,default=2)
    #__table_args__ = (UniqueConstraint('uid','donvi_id', name='uq_user_donvi_uid_donvi_id'),)

