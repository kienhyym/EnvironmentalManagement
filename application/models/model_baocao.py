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
    tuongraobaove = db.Column(db.Integer)#(Có: 1 điểm; không: 0 điểm)
    congtrinhxaydung = db.Column(db.Integer)
    duongongchayqua = db.Column(db.Integer)
    canhtacnongnghiep = db.Column(db.Integer)
    bairacthai = db.Column(db.Integer)
    vatnuoi = db.Column(db.Integer)
    phandongvat = db.Column(db.Integer)
    nhatieu = db.Column(db.Integer)

