import asyncio
import aiohttp
import hashlib
import ujson
from application.extensions import apimanager
from application.server import app
from application.database import db
from application.extensions import auth
from sqlalchemy.orm import aliased, joinedload_all
from gatco.response import json, text, html
from gatco_restapi.helpers import to_dict

from application.models.model_user import *
from .helpers import *
from sqlalchemy import or_
from application.client import HTTPClient 


#donvidangky = Blueprint('dangky', __name__)

def auth_func(**kw):
    pass

@app.route('/api/v1/donvitree')
async def DonVitree(request):
    currentuser = await current_user(request)
    if currentuser is None:
        return json({"error_code":"SESSION_EXPIRED","error_message":"Hết phiên hoạt động, vui lòng đăng nhập lại"}, status=520)
      
    is_admin = await hasRole(request, "Admin")
    if(is_admin == True):
        data = db.session.query(DonVi).\
            options(joinedload_all("children", "children",
                "children", "children")).\
            filter(DonVi.id == currentuser.donvi_id).\
            first()
    else:
        ata = db.session.query(DonVi).\
            options(joinedload_all("children", "children", "children", "children")).\
            join(TuyenDonVi, DonVi.tuyendonvi).filter(TuyenDonVi.ma == 'TW').first()
               
    if data is not None:
        obj = data.dump()
        print(obj)
        return  json(to_dict(obj))
    else:
        return json({})
    

# 
@app.route('/api/donvi/adduser/new', methods=["POST"])
async def addUserDonvi(request):
    error_msg = None
    if request.method == 'POST':
#         fullname = request.json.get('fullname' None)
#         donvi_sodienthoai = request.json.get('donvi_sodienthoai' None)
#         donvi_ten = request.json.get('donvi_ten' None)
#         donvi_diachi = request.json.get('donvi_diachi' None)
        password = request.json.get('password', None)
        cfpassword = request.json.get('password_confirm', None)
        email = request.json.get('email', None)
        phone_number = request.json.get('phone', None)
        if ((email is None) or (email == '')):
            error_msg = u"Xin mời nhập email!"
        if(error_msg is None):
            if  not valid_phone_number(phone_number):
                error_msg = u"Số điện thoại không đúng định dạng, xin mời nhập lại!"
            else:
                checkphone = await check_user(phone_number)
                if(checkphone is not None):
                    error_msg = u"Số điện thoại đã có người sử dụng, xin mời nhập lại!"                     
        if((error_msg is None)):
            if((password is None) or (password == '')) :
                error_msg = u"Xin mời nhập lại mật khẩu!"
             
        if((error_msg is None)):
            if(password != cfpassword ) :
                error_msg = u"Mật khẩu không khớp!"
                
            return json("OK", status=200)
    return json({"error_code": "ADD_USER_FAILED", "error_message": error_msg},status=520)
 
@app.route('/api/donvi/adduser/exist', methods=["POST"])
async def addUserExistToDonvi(request):
    error_msg = None
    if request.method == 'POST':
        donvi_id = request.json.get('donvi_id',None)
        account = request.json.get('account', None)
        userinfo = None
        if(error_msg is None):
            if  account is None:
                error_msg = u"Tham số không hợp lệ, xin mời nhập lại!"
            else:
                userinfo = db.session.query(User).filter(or_(User.id == account, User.email == account, User.phone == account)).first()
                if(userinfo is None):
                    error_msg = u"Tài khoản không tồn tại, Vui lòng kiểm tra lại hoặc tạo mới tài khoản!"
 
        if (error_msg is None):
            if ((userinfo.donvi_id == donvi_id) or (userinfo.donvi_id is not None and userinfo.donvi_id != "")):
                error_msg = u"Tài khoản đã tồn tại trong đơn vị ( Mã tài khoản: "+ userinfo.id+ " )"
            else:
                userinfo.donvi_id = donvi_id
                db.session.commit()
                return json({"uid": userinfo.id, "name":userinfo.name, "phone":userinfo.phone}, status=200)
 
    return json({"error_code": "UPDATE_DONVI_FAILED", "error_message": error_msg},status=520)


async def apply_DonVi_filter(search_params, request=None, **kw ):
    
#     request = kw.get("request", None)
    if request is None:
        print("======================apply_DonVi_filter request is None")
    currentUser = current_user(request)
#     userInfo = db.session.query(UserInfo).filter(UserInfo.user_id == currentUser.id).first()
    if currentUser is not None:
        currDonVi = currentUser.DonVi
        DonVichildids = []
        if(currDonVi is not None):
            currDonVi.get_children_ids(DonVichildids)
            if currDonVi.tuyenDonVi != 1:
                search_params["filters"] = ("filters" in search_params) and {"$and":[search_params["filters"], {"DonVi_id":{"$in": DonVichildids}}]} \
                                        or {"DonVi_id":{"$in": DonVichildids}}
    
#@jwt_required()
async def entity_pregetmany(search_params=None,request=None, **kw):
    await apply_DonVi_filter(search_params, request)
    
#def donvi_pregetmany(search_params=None, **kw):
    request = kw.get("request", None)
    currentUser = current_user(request)
    if currentUser is not None:
        currdonvi = currentUser.donvi
        donvichildids = []
        if(currdonvi is not None):
            currdonvi.get_children_ids(donvichildids)
            
        search_params["filters"] = ("filters" in search_params) and {"$and":[search_params["filters"], {"id":{"$in": donvichildids}}]} \
                                or {"id":{"$in": donvichildids}}
                                        
async def donvi_predelete(instance_id=None):
    """Accepts a single argument, `instance_id`, which is the primary key
    of the instance which will be deleted.

    """
    donvi = db.session.query(DonVi).filter(DonVi.id == instance_id).first()
    if donvi is not None:
        donvichildids = []
        donvi.get_children_ids(donvichildids)
        if len(donvichildids) > 1:
            return json({"error_message":u'Không thể xoá đơn vị có đơn vị con'},
                                      status=520)

async def donvi_prepput_children(request=None, instance_id=None, data=None, **kw):
    if 'children' in data :
        del data['children']

async def donvi_prepput(instance_id=None, data=None):
    if 'children' in data :
        del data['children']
    if 'parent_id' in data:
        donvi = db.session.query(DonVi).filter(DonVi.id == instance_id).first()
        donvichildids = []
        if(donvi is not None):
            donvi.get_children_ids(donvichildids)
            #try:
            #    donvichildids.remove(instance_id)
            #except:
            #    pass
            if (data['parent_id'] is not None) and (int(data['parent_id']) in donvichildids):
                return json({"error_message":u'Cấp trên không đúng'},
                                      status=520)
 
###donvi
async def dangkydonvi_pregetmany(search_params=None):
    currdonvi = current_user.donvi
    donvichildids = []
    if(currdonvi is not None):
        currdonvi.get_children_ids(donvichildids)
         
         
    search_params["filters"] = ("filters" in search_params) and {"$and":[search_params["filters"], {"captren_id":{"$in": donvichildids}}]} \
                                or {"captren_id":{"$in": donvichildids}}
                   
#                                 
async def reset_user_passwd(instance_id=None, data=None):
    if (data is not None) and ('password' in data) and ('confirmpassword' in data):
        if (data['password'] is not None):
            if(data['password'] == data['confirmpassword']):
                #user = user_datastore.find_user(id=instance_id)
                #if verify_password(data['password'], user.password):
                data['password'] =encrypt_password(data['password'])
                    #del data['newpassword']
                del data['confirmpassword']
                #else:
                #    raise ProcessingException(description='Password is not correct',code=401)
            else:
                raise ProcessingException(description='Confirm password is not match',code=401)
        else:
            del data['confirmpassword']
            del data['password']
    else:
        raise ProcessingException(description='Parameters are not correct',code=401)             
    
    
@app.route('/api/v1/adddonviwilluser')  
async def addDonViWillUser(request):
    id = request.args.get('id', None)
    error_msg = None
    if ((id is None) or (id == '')):
        error_msg = u"Tham số không đúng"
    if(error_msg is None):
        #id = int(id)
        dangky = UserDonvi.query.filter(UserDonvi.id == id).first()
   
        if(dangky is not None):
            checkdonvi = DonVi.query.filter(DonVi.ten == dangky.fullname).first()            
            checkuser = User.query.filter(User.email == dangky.email).first()
            if((checkdonvi is None) or (checkuser is None)):                
                donvi = DonVi(
                    ten = dangky.donvi_ten,
                    captren = dangky.captren,
                    tuyendonvi_id = dangky.donvi_tuyendonvi_id,
                )
                  
                donvi.diachi = dangky.donvi_diachi
                donvi.sodienthoai = dangky.donvi_sodienthoai
                donvi.coquanchuquan = dangky.captren.ten
                donvi.active = True
                  
                db.session.add(donvi)
                db.session.flush()
                  
                # user
                user = User(
                    email = dangky.email,
                    fullname = dangky.fullname,
                    active = True,
                    phone = dangky.phone,
                    password = auth.encrypt_password(dangky.password),
                    donvi_id = donvi.id
                    
                )
                db.session.add(user)
                db.session.flush()
                  
                dangky.donvi_id = donvi.id
                dangky.user_id = user.id
                dangky.trangthai = TrangThaiDangKyDonViEnum.dongbo
                db.session.commit()
                
                print(user.id)
                print(donvi.id)
                print(to_dict(dangky))
                return json({"user_id": str(user.id),"donvi_id": str(donvi.id)},status=200)
              
            else:
                error_msg = u"Tên đơn vị hoặc email đã được sử dụng, xin mời nhập lại!"
        else:
            error_msg = u"Không tìm thấy đăng ký!"
                  
      
    return json({"error_code": "AddUserDonViWillUser_Fail", "error_message": error_msg},status=520)

                                                    
apimanager.create_api(UserDonvi,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    collection_name='user_donvi')


apimanager.create_api(TuyenDonVi,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    collection_name='tuyendonvi')

apimanager.create_api(DonVi,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func, donvi_prepput_children], DELETE_SINGLE=[auth_func]),
    collection_name='donvi',
    exclude_columns= ["children","password_mevabe"])
