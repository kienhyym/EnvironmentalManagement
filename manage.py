""" Module for managing tasks through a simple cli interface. """
# Libraries
import sys
import json
import os

from os.path import abspath, dirname
sys.path.insert(0, dirname(abspath(__file__)))

from sqlalchemy.inspection import inspect

from manager import Manager
from application.server import app

from application import run_app
from application.database import db
from application.extensions import auth
from application.models.model_user import Role, User, Permission,TuyenDonVi,DonVi
from application.models.model_danhmuc import DanToc, QuocGia, TinhThanh, QuanHuyen, XaPhuong


# Instance
manager = Manager()


@manager.command
def generate_schema(path = None, exclude = None, prettyprint = True):
    """ Generate javascript schema"""
    exclude_list = None
    if path is None:
        print("Path is required")
        return
    
    if exclude is not None:
        exclude_list = exclude.split(",")
        
    for cls in [cls for cls in db.Model._decl_class_registry.values() if isinstance(cls, type) and issubclass(cls, db.Model)]:
        classname = cls.__name__
        if (exclude_list is not None) and (classname in exclude_list):
            continue
        schema = {}
        for col in cls.__table__.c:
            col_type = str(col.type)
            schema_type = ''
            if 'DECIMAL' in col_type:
                schema_type = 'number'
            if col_type in ['INTEGER','SMALLINT', 'FLOAT' ]:
                schema_type = 'number'
            if col_type == 'DATETIME':
                schema_type = 'datetime'
            if col_type == 'DATE':
                schema_type = 'datetime'
            if 'VARCHAR' in col_type:
                schema_type = 'string'
            if col_type in ['VARCHAR', 'UUID', 'TEXT']:
                schema_type = 'string'
            if col_type in ['JSON', 'JSONB']:
                schema_type = 'json'
            if 'BOOLEAN' in col_type:
                schema_type = 'boolean'
            
            schema[col.name] = {"type": schema_type}
            
            if col.primary_key:
                schema[col.name]["primary"] = True
            #nullabel
            if (not col.nullable) and (not col.primary_key):
                schema[col.name]["required"] = True
                
            if hasattr(col.type, "length") and (col.type.length is not None):
                schema[col.name]["length"] = col.type.length
            
            #default
            if (col.default is not None) and (col.default.arg is not None) and (not callable(col.default.arg)):
                #print(col.default, col.default.arg, callable(col.default.arg))
                schema[col.name]["default"] = col.default.arg
                
            #User confirm_password
#             if (classname == "User") and ("password" in col.name):
#                 schema["confirm_password"] = {"type": schema_type}
#                 schema["confirm_password"]["length"] = col.type.length
                
                
        
        relations = inspect(cls).relationships
        for rel in relations:
            if rel.direction.name in ['MANYTOMANY', 'ONETOMANY']:
                schema[rel.key] = {"type": "list"}
            if rel.direction.name in ['MANYTOONE']:
                schema[rel.key] = {"type": "dict"}
            
        if prettyprint:
            with open(path + '/' + classname + 'Schema.json', 'w') as outfile:
                json.dump(schema,  outfile, indent=4,)
        else:
            with open(path + '/' + classname + 'Schema.json', 'w') as outfile:
                json.dump(schema,  outfile,)

@manager.command
def create_quocgia_tinhthanh():
    
    db.session.commit()

@manager.command
def create_dantoc_model():
    check_exist_dantoc = db.session.query(DanToc).count()
    if (check_exist_dantoc == 0):
        
            
            
        db.session.commit()



#@app.route('/createdata', methods=['GET'])
@manager.command
def create_default_models():  
    #add tuyen donvi  
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url_tuyendonvi = os.path.join(SITE_ROOT, "static/js/app/enum", "TuyenDonViEnum.json")
    data_tuyendonvi = json.load(open(json_url_tuyendonvi))
    for item_tdv in data_tuyendonvi:
        print (item_tdv)
        dmTuyenDonVi = TuyenDonVi(id = item_tdv["value"],ma = item_tdv["name"], ten = item_tdv["text"])
        db.session.add(dmTuyenDonVi)
        
    tuyendonvi = TuyenDonVi.query.filter(TuyenDonVi.ma == "TW").first()
    donvi = DonVi( ten=u'Cục quản lý môi trường bộ Y Tế ', captren = None, tuyendonvi_id = tuyendonvi.id)
    db.session.add(donvi)
    db.session.flush()
    db.session.commit()
    
    #add role
    role1 = Role(id=1,name='Admin')
    db.session.add(role1)
    role2 = Role(id=2,name='CanBo')
    db.session.add(role2)
    role3 = Role(id=3,name='User')
    db.session.add(role3)
    db.session.commit()

    #add user test     
    user1 = User(email='admin', fullname='Admin', password=auth.encrypt_password('123456'),donvi_id=donvi.id,active=True)
    user1.roles.append(role1)
    user4 = User(email='namdv', fullname='Dang Nam', password=auth.encrypt_password('123456'),donvi_id=donvi.id,active=True)
    user4.roles.append(role1)
    db.session.add(user1)
    user2 = User(email='cucmtyy', fullname='Cục Môi Trường Y Tế', password=auth.encrypt_password('123456'),donvi_id=donvi.id,active=True)
    user2.roles.append(role2)
    db.session.add(user2)
    db.session.commit()
    
    #add dantoc
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url_dantoc = os.path.join(SITE_ROOT, "static/js/app/enum", "DanTocEnum.json")
    data_dantoc = json.load(open(json_url_dantoc))
    for item_dantoc in data_dantoc:
        dantoc = DanToc(ma = item_dantoc["value"], ten = item_dantoc["text"])
        db.session.add(dantoc)
        db.session.commit()

    # #add tinhthanh, quoc gia    
    quocgias = QuocGia(ma = "VN", ten = "Việt nam")
    db.session.add(quocgias)
    db.session.flush() 
    db.session.commit()

    
    quocgia_default = db.session.query(QuocGia).filter(QuocGia.ma == 'VN').first()
    print("===quocgia===== ", quocgia_default)
    db.session.add(quocgia_default)
    db.session.flush()
    db.session.commit()
    try:
        SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
        json_url_infotinhthanh = os.path.join(SITE_ROOT, "static/js/app/enum", "ThongTinTinhThanh.json")
        data_infotinhthanh = json.load(open(json_url_infotinhthanh))
        for item_infotinhthanh in data_infotinhthanh:
            tinhthanhinfo = db.session.query(TinhThanh).filter(TinhThanh.ma == item_infotinhthanh["matinhthanh"]).first()
            
            if tinhthanhinfo is None:
                print("tinhthanh===", item_infotinhthanh)
                tinhthanhinfo = TinhThanh(ten = item_infotinhthanh["tentinhthanh"], ma = item_infotinhthanh["matinhthanh"], quocgia_id =quocgia_default.id)
                db.session.add(tinhthanhinfo)
                db.session.commit()

    except Exception as e:
        print("===error===",e)    
    db.session.commit()

@manager.command
def add_quanhuyen():
    try:
        SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
        json_url_infoquanhuyen = os.path.join(SITE_ROOT, "static/js/app/enum", "ThongTinTinhThanh.json")
        data_infoquanhuyen = json.load(open(json_url_infoquanhuyen))
        for item_infoquanhuyen in data_infoquanhuyen:
            quanhuyeninfo = db.session.query(QuanHuyen).filter(QuanHuyen.ma == item_infoquanhuyen["maquanhuyen"]).first()
            if quanhuyeninfo is None:
                print("quanhuyen===", item_infoquanhuyen)
                tinhthanhfilter = db.session.query(TinhThanh).filter(TinhThanh.ma == item_infoquanhuyen["matinhthanh"]).first()
                quanhuyeninfo = QuanHuyen(ten = item_infoquanhuyen["tenquanhuyen"], ma = item_infoquanhuyen["maquanhuyen"], tinhthanh_id = tinhthanhfilter.id)
                db.session.add(quanhuyeninfo)
                db.session.commit()
    except Exception as e:
        print("errrrrorrr====", e)

@manager.command
def add_xaphuong():
    try:
        SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
        json_url_infoxaphuong = os.path.join(SITE_ROOT, "static/js/app/enum", "ThongTinTinhThanh.json")
        data_infoxaphuong = json.load(open(json_url_infoxaphuong))
        for item_infoxaphuong in data_infoxaphuong:
            xaphuonginfo = db.session.query(XaPhuong).filter(XaPhuong.ma == item_infoxaphuong["maxaphuong"]).first()

            if xaphuonginfo is None:
                quanhuyenfilter = db.session.query(QuanHuyen).filter(QuanHuyen.ma == item_infoxaphuong["maquanhuyen"]).first()
                xaphuonginfo = XaPhuong(ten = item_infoxaphuong["tenxaphuong"], ma = item_infoxaphuong["maxaphuong"], quanhuyen_id = quanhuyenfilter.id)
                db.session.add(xaphuonginfo)
                db.session.commit()
    except Exception as e:
        print("errrrrorrr xa phuong====", e)


    
@manager.command
def run():
    add_quanhuyen()
    # add_xaphuong()
    role = db.session.query(Role).filter(Role.name == 'User').first()
    if role is None:
        create_default_models()
        
        print("Khoi tao du lieu mau")
        
    run_app(host="0.0.0.0", port=9070)
    
    
if __name__ == '__main__':
    
    manager.main()

    