""" Module for managing tasks through a simple cli interface. """
# Libraries
import sys
import json

from os.path import abspath, dirname
sys.path.insert(0, dirname(abspath(__file__)))

from sqlalchemy.inspection import inspect

from manager import Manager
from application.server import app

from application import run_app
from application.database import db
from application.extensions import auth
from application.models.models import Role, User, Permission


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
            if 'BOOLEAN' in col_type:
                schema_type = 'boolean'
            
            schema[col.name] = {"type": schema_type}
            
            if col.primary_key:
                schema[col.name]["primary"] = True
            #nullabel
            if (not col.nullable) and (not col.primary_key):
                schema[col.name]["required"] = True
                
            if hasattr(col.type, "length"):
                schema[col.name]["length"] = col.type.length
        
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

#@app.route('/createdata', methods=['GET'])
@manager.command
def create_test_models():
     
    role1 = Role(name='Admin')
    db.session.add(role1)
    role2 = Role(name='CanBo')
    db.session.add(role2)
    role3 = Role(name='User')
    db.session.add(role3)
    
    
    user1 = User(email='admin', fullname='Admin', password=auth.encrypt_password('123456'), active=True)
    user1.roles.append(role1)
    db.session.add(user1)
    user2 = User(email='canbo', fullname='Can Bo', password=auth.encrypt_password('123456'), active=True)
    user2.roles.append(role2)
    db.session.add(user2)
    user3 = User(email='namdv', fullname='Dang Nam', password=auth.encrypt_password('123456'), active=True)
    user3.roles.append(role3)
    db.session.add(user3)
        
    db.session.commit()

@manager.command
def run():
    role = db.session.query(Role).filter(Role.name == 'User').first()
    if role is None:
        create_test_models()
        print("Khoi tao admin and role")
        
    run_app(host="0.0.0.0", port=9070)
    
    
if __name__ == '__main__':
    
    manager.main()

    
