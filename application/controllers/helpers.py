#from gatco.exceptions import ServerError
from gatco.response import json
from application.database import  db
from application.extensions import auth
from application.models.model_user import *
from application.server import app

import asyncio
import hashlib
import ujson
from datetime import datetime
from gatco_restapi.helpers import to_dict


class LoaiKyBaoCao(object):
    THANG = 1
    QUY = 2
    SAUTHANG = 3
    NAM = 4

def hash_value(value):
    return hashlib.md5(value.encode('utf-8')).hexdigest()

def check_content_json(request):
    ret = False
    try:
        content_type = request.headers.get('Content-Type', "")
        ret = content_type.startswith('application/json')
    except:
        pass
    return ret

def valid_phone_number(phone_number):
    if phone_number is None:
        return False
    if phone_number.isdigit() and len(phone_number)>=8 and len(phone_number)<=12 and phone_number.startswith("0"):
        return True
    return False

def check_donvi(donvi_id):
    return db.session.query(DonVi).filter(DonVi.id == donvi_id).first()

async def current_user(request):
    uid = auth.current_user(request)
    if uid is not None:
        user = db.session.query(User).filter(User.id == uid).first()
        return user
    return None;

def auth_func(request=None, **kw):
    uid = auth.current_user(request)
    if uid is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên làm việc, vui lòng đăng nhập lại!"},status=520)
    
def deny_func(request=None, **kw):
    return json({"error_code":"PERMISSION_DENY","error_message":"Không có quyền thực hiện hành động này!"},status=520)
    
async def hasRole(request, role):
    currentUser = await current_user(request)
    if currentUser is not None:
        return currentUser.has_role(role)
    else:    
        return False;

async def check_admin(request=None, **kw):
    currentUser = await current_user(request)
    if currentUser is not None:
        if not currentUser.has_role('Admin'):
            return json({"error_code":"PERMISSION_DENY","error_message":"Không có quyền thực hiện hành động này!"},status=520)
    else:    
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên làm việc, vui lòng đăng nhập lại!"},status=520)

    
def role_pregetmany(search_params=None, **kw):
    search_params["filters"] = {"$and":[search_params["filters"], {"id":{"$neq": 1}}]} if ("filters" in search_params)   \
                                else {"id":{"$neq": 1}}
                                
                                            
async def entity_pregetmany(search_params=None, **kw):
    request = kw.get("request", None)
    currentUser = await current_user(request)
    if currentUser is not None:
        currdonvi = currentUser.donvi
        donvichildids = []
        if(currdonvi is not None):
            currdonvi.get_children_ids(donvichildids)
        if currdonvi.id != 1:
            search_params["filters"] = ("filters" in search_params) and {"$and":[search_params["filters"], {"donvi_id":{"$in": donvichildids}}]} \
                                    or {"donvi_id":{"$in": donvichildids}}
    print("search_params====",search_params)
                                

