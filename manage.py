""" Module for managing tasks through a simple cli interface. """
# Libraries
import sys
import json
import os

from os.path import abspath, dirname
sys.path.insert(0, dirname(abspath(__file__)))

from sqlalchemy.inspection import inspect
import sqlalchemy

from manager import Manager
from application.server import app

from application import run_app
from application.database import db
from application.extensions import auth
from application.models.model_user import Role, User, Permission,TuyenDonVi,DonVi
from application.models.model_danhmuc import DanToc

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
            if (col.default is not None) and (col.default.arg is not None) \
                and (not callable(col.default.arg)) and not isinstance(col.default.arg, sqlalchemy.sql.functions.GenericFunction):
                #print(col.default, col.default.arg, callable(col.default.arg))
                schema[col.name]["default"] = col.default.arg
                
            #User confirm_password
            if (classname == "User") and ("password" in col.name):
                schema["confirm_password"] = {"type": schema_type}
                schema["confirm_password"]["length"] = col.type.length
                
                
        
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
def create_dantoc_model():
    check_exist_dantoc = db.session.query(DanToc).count()
    if (check_exist_dantoc == 0):
        SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
        json_url_dantoc = os.path.join(SITE_ROOT, "static/js/app/enum", "DanTocEnum.json");
        data_dantoc = json.load(open(json_url_dantoc))
        for item_dantoc in data_dantoc:
            dantoc = DanToc(ma = item_dantoc["value"], ten = item_dantoc["text"])
            db.session.add(dantoc)
        db.session.commit()



#@app.route('/createdata', methods=['GET'])
@manager.command
def create_test_models():    
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url_tuyendonvi = os.path.join(SITE_ROOT, "static/js/app/enum", "TuyenDonViEnum.json");
    data_tuyendonvi = json.load(open(json_url_tuyendonvi))
    for item_tdv in data_tuyendonvi:
        print (item_tdv)
        dmTuyenDonVi = TuyenDonVi(id = item_tdv["value"],ma = item_tdv["name"], ten = item_tdv["text"])
        db.session.add(dmTuyenDonVi)
        
    tuyendonvi = TuyenDonVi.query.filter(TuyenDonVi.ma == "TW").first()
    donvi = DonVi( ten=u'Cục MTYT', captren = None, tuyendonvi_id = tuyendonvi.id)
    db.session.add(donvi)
    db.session.flush()
    
    role1 = Role(id=1,name='Admin')
    db.session.add(role1)
    role2 = Role(id=2,name='CanBo')
    db.session.add(role2)
    role3 = Role(id=3,name='User')
    db.session.add(role3)
    
               
            
    user1 = User(email='admin', fullname='Admin', password=auth.encrypt_password('123456'),donvi_id=1,active=True)
    user1.roles.append(role1)
    user4 = User(email='cuongnd', fullname='Cuong Souciu', password=auth.encrypt_password('123456'),donvi_id=1,active=True)
    user4.roles.append(role1)
    db.session.add(user1)
    user2 = User(email='canbo', fullname='Can Bo', password=auth.encrypt_password('123456'),donvi_id=1,active=True)
    user2.roles.append(role2)
    db.session.add(user2)

         
    db.session.commit()


    
@manager.command
def run():
    create_dantoc_model();

    role = db.session.query(Role).filter(Role.name == 'User').first()
    if role is None:
        create_test_models()
        print("Khoi tao admin and role")
        
    run_app(host="0.0.0.0", port=9070)
    
    
if __name__ == '__main__':
    
    manager.main()

    