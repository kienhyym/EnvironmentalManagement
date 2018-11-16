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
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenphuluc = db.Column(db.String)
    thongtu = db.Column(db.String)
    ngaybanhanhthongtu = db.Column(db.DateTime())
    tenphieu = db.Column(db.String)
    loaiphieu = db.Column(db.String)
    phamvi = db.Column(db.String)
    tuongraobaove = db.Column(db.Integer)#(Có: 1 điểm; không: 0 điểm)
    congtrinhxaydung = db.Column(db.Integer)
    duongongchayqua = db.Column(db.Integer)
    canhtacnongnghiep = db.Column(db.Integer)
    bairacthai = db.Column(db.Integer)
    vatnuoi = db.Column(db.Integer)
    phandongvat = db.Column(db.Integer)
    nhatieu = db.Column(db.Integer)
    
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
    active = db.Column(db.Boolean(), default=True)
    phone = db.Column(db.String(255), unique=True)
    birthday = db.Column(db.DateTime())
    gender = db.Column(db.String(255))
    macongdan = db.Column(db.String(255), unique=True)
    roles = db.relationship('Role', secondary=roles_users,
                            backref=db.backref('users', lazy='dynamic'))
 
    donvi_id = db.Column(UUID(as_uuid=True), ForeignKey('donvi.id',onupdate='CASCADE', ondelete='SET NULL'), nullable=True)
    donvi = db.relationship("DonVi")
    
    confirmed_at = db.Column(db.DateTime())
    last_login_at = db.Column(db.DateTime())
    current_login_at = db.Column(db.DateTime())
    last_login_ip = db.Column(db.String(255))
    current_login_ip = db.Column(db.String(255))
    login_count = db.Column(db.Integer)
 
    
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
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(String(255), nullable=True)
    ten = db.Column(String(255), nullable=False)
    sodienthoai = db.Column(String(63))
    diachi = db.Column(String(255))
    email = db.Column(String(255))
    ghichu = db.Column(String(255))
    xaphuong_id = db.Column(UUID(as_uuid=True), ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = relationship('XaPhuong') 
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')  
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh', viewonly=True)
    quocgia_id = db.Column(UUID(as_uuid=True), ForeignKey('quocgia.id'), nullable=True)
    quocgia = relationship('QuocGia')
    tuyendonvi_id = db.Column(UUID(as_uuid=True), ForeignKey('tuyendonvi.id'), nullable=True)
    tuyendonvi = relationship('TuyenDonVi')
    coquanchuquan = db.Column(String(255))
    parent_id = db.Column(UUID(as_uuid=True), ForeignKey('donvi.id'), nullable=True)
    active = db.Column(Boolean(), default=False)
    users = relationship('UserDonvi', viewonly=True)
    children = relationship("DonVi",
        # cascade deletions
        cascade="all, delete-orphan",
        # many to one + adjacency list - remote_side
        # is required to reference the 'id'
        # column in the join condition.
        backref=backref("captren", remote_side=id),
        # children will be represented as a dictionary
        # on the "id" attribute.
        collection_class=attribute_mapped_collection('id'),
    )

    def __repr__(self):
        return "DonVi(id=%r, ten=%r, parent_id=%r, tuyendonvi_id=%r)" % (
                    self.id,
                    self.ten,
                    self.parent_id,
                    self.tuyendonvi_id
                )
    def __todict__(self):
        return {"id":str(self.id), "ma": self.ma,"text": self.ten,"ten": self.ten, "parent_id": str(self.parent_id), "tuyendonvi_id":str(self.tuyendonvi_id)}

    def __toid__(self):
        return self.id

    def dump(self, _indent=0):
        obj = self.__todict__()
        #obj["tuyendonvi"] = to_dict(self.tuyendonvi)
        obj["nodes"] = [c.dump() for c in self.children.values()]
        return obj

    def get_children_ids(self, data):
        if type(data) is list:
            data.append(self.id)
            for r in self.children.values():
                r.get_children_ids(data)

    def getlistid(self):
        data = []
        self.get_children_ids(data)
        return data

class UserDonvi(CommonModel):
    __tablename__ = 'user_donvi'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    uid = db.Column(String(200), index=True, nullable=False)
    ten = db.Column(String(255), nullable=False)
    macongdan = db.Column(String(200), nullable=True)
    donvi_id = db.Column(UUID(as_uuid=True), ForeignKey('donvi.id'), index=True, nullable=False)
    donvi = relationship('DonVi')
    __table_args__ = (UniqueConstraint('uid','donvi_id', name='uq_user_donvi_uid_donvi_id'),)

