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

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    