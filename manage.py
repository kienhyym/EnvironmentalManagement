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
from application.models.model_thongtuquychuannuoc import CaiDatThongSoNuocDiaPhuong,DanhMucThongSoNuocSach    
import ujson
from gatco_restapi.helpers import to_dict


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
    json_url_dantoc = os.path.join(SITE_ROOT, "static/js/app/enum", "DanTocEnum.json")
    data_dantoc = json.load(open(json_url_dantoc))
    for item_dantoc in data_dantoc:
        dantoc = DanToc(ma = item_dantoc["value"], ten = item_dantoc["text"])
        db.session.add(dantoc)
        db.session.commit()

@manager.command
def add_danhsach_quocgia_tinhthanh():   
    quocgias = QuocGia(ma = "VN", ten = "Việt Nam")
    db.session.add(quocgias)
    db.session.flush() 
    db.session.commit()
    try:
        SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
        json_url_dstinhthanh = os.path.join(SITE_ROOT, "static/js/app/enum", "ThongTinTinhThanh.json")
        data_dstinhthanh = json.load(open(json_url_dstinhthanh))
        for item_dstinhthanh in data_dstinhthanh:
            tinhthanh_filter = db.session.query(TinhThanh).filter(TinhThanh.ma == item_dstinhthanh["matinhthanh"]).first()
            if tinhthanh_filter is None:
                quocgia_filter = db.session.query(QuocGia).filter(QuocGia.ma == 'VN').first()
                tinhthanh_filter = TinhThanh(ten = item_dstinhthanh["tentinhthanh"], ma = item_dstinhthanh["matinhthanh"], quocgia_id = quocgia_filter.id)
                db.session.add(tinhthanh_filter)
                db.session.commit()
    except Exception as e:
        print("TINH THANH ERROR",e)


@manager.command
def add_danhsach_quanhuyen():
    try:
        SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
        json_url_dsquanhuyen = os.path.join(SITE_ROOT, "static/js/app/enum", "ThongTinTinhThanh.json")
        data_dsquanhuyen = json.load(open(json_url_dsquanhuyen))
        for item_dsquanhuyen in data_dsquanhuyen:
            quanhuyen_filter = db.session.query(QuanHuyen).filter(QuanHuyen.ma == item_dsquanhuyen["maquanhuyen"]).first()
            if quanhuyen_filter is None:
                tinhthanh_filter = db.session.query(TinhThanh).filter(TinhThanh.ma == item_dsquanhuyen["matinhthanh"]).first()
                quanhuyen_filter = QuanHuyen(ten = item_dsquanhuyen["tenquanhuyen"], ma = item_dsquanhuyen["maquanhuyen"], tinhthanh_id = tinhthanh_filter.id)
                db.session.add(quanhuyen_filter)
                db.session.commit()
    except Exception as e:
        print("QUAN HUYEN ERROR", e)

@manager.command
def add_danhsach_xaphuong():
    try:
        SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
        json_url_dsxaphuong = os.path.join(SITE_ROOT, "static/js/app/enum", "ThongTinTinhThanh.json")
        data_dsxaphuong = json.load(open(json_url_dsxaphuong))
        for item_dsxaphuong in data_dsxaphuong:
            xaphuong_filter = db.session.query(XaPhuong).filter(XaPhuong.ma == item_dsxaphuong["maxaphuong"]).first()
            if xaphuong_filter is None:
                quanhuyen_filter = db.session.query(QuanHuyen).filter(QuanHuyen.ma == item_dsxaphuong["maquanhuyen"]).first()
                xaphuong_filter = XaPhuong(ten = item_dsxaphuong["tenxaphuong"], ma = item_dsxaphuong["maxaphuong"], quanhuyen_id = quanhuyen_filter.id)
                db.session.add(xaphuong_filter)
                db.session.commit()
    except Exception as e:
        print("XA PHUONG ERROR", e)

@manager.command
def create_default_thongso_tinhthanh():

    check_exist = db.session.query(DanhMucThongSoNuocSach).count()
    if(check_exist is not None and check_exist>0):
        print("da khoi tao danh muc thong so")
        return
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url_dsthongso = os.path.join(SITE_ROOT, "static/js/app/enum", "danhsach_thongso_macdinh.json")
    dsthongso = json.load(open(json_url_dsthongso))
    arrThongSo = []
    
    for ts in dsthongso:
        thongso = DanhMucThongSoNuocSach()
        thongso.id = ts['id']
        thongso.tenthongso = ts['tenthongso']
        thongso.donvitinh = ts['donvitinh']
        thongso.gioihan_toithieu = ts['gioihan_toithieu']
        thongso.gioihan_toida = ts['gioihan_toida']
        if "batbuoc" in ts and ts['batbuoc'] is not None and ts['batbuoc'] == 1:
            thongso.batbuoc = True
        else:
            thongso.batbuoc = False
        
        db.session.add(thongso)
        ts_tinhthanh = to_dict(thongso)
        ts_tinhthanh["nuocmat"] = 0
        ts_tinhthanh["nuocngam"] = 0
        arrThongSo.append(ts_tinhthanh)
        
    danhmuc_tinhthanhs = db.session.query(TinhThanh).all()
    for item_tinhthanh in danhmuc_tinhthanhs:
        thongso_tinhthanh = CaiDatThongSoNuocDiaPhuong()
        thongso_tinhthanh.tinhthanh_id = item_tinhthanh.id
        thongso_tinhthanh.tentinhthanh = item_tinhthanh.ten
        thongso_tinhthanh.danhsachthongso = ujson.loads(ujson.dumps(arrThongSo))
        db.session.add(thongso_tinhthanh)
    db.session.commit()



    
@manager.command
def run():
    role = db.session.query(Role).filter(Role.name == 'User').first()
    if role is None:
        create_default_models()
        add_danhsach_quocgia_tinhthanh()
        add_danhsach_quanhuyen()
        add_danhsach_xaphuong()
        create_default_thongso_tinhthanh()
        print("Khoi tao du lieu mau")
        
    run_app(host="0.0.0.0", port=9070)
    
    
if __name__ == '__main__':
    
    manager.main()

    