from __future__ import division
import asyncio
import aiosmtplib
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from gatco.response import json,text, html
from application.extensions import apimanager
from application.models.model_user import *
from application.extensions import auth
from application.database import db
from application.server import app
from gatco_restapi.helpers import to_dict
from application.controllers.helpers import *
from sqlalchemy import or_
 
 
async def get_user_with_permission(user):
    user_info = to_dict(user)
    roles = [{"id":str(role.id),"description":role.description,"role_name":role.name} for role in user.roles]
    roleids = [role.id for role in user.roles]
    user_info["roles"] = roles
    del(user_info["password"])
     
    #permission:
    perms = Permission.query.filter(Permission.role_id.in_(roleids)).order_by(Permission.subject).all()
    permobj = {}
     
    for perm in perms:
        if perm.subject not in permobj:
            permobj[perm.subject] = {}
             
        if perm.permission not in permobj[perm.subject]:
            permobj[perm.subject][perm.permission] = perm.value
        elif not permobj[perm.subject][perm.permission]:
            permobj[perm.subject][perm.permission] = perm.value        
    user_info["permission"] = permobj
     
    return user_info
 
 
@app.route('/logout')
async def logout(request):
    try:
        auth.logout_user(request)
    except:
        pass
    return json({})
 
 

@app.route('api/v1/login', methods=['POST'])
async def login(request):
    username = request.json.get("data", None)
    password = request.json.get("password", None)
    user = db.session.query(User).filter(or_(User.email == username, User.phone == username)).first()
    print(password)
    print(auth.encrypt_password(password))
    print(to_dict(user))
    if (user is not None) and auth.verify_password(password, user.password):
        auth.login_user(request, user)
        
        result = await get_user_with_permission(user)
        return json(result)
    return json({"error_code":"LOGIN_FAILED","error_message":"user does not exist or incorrect password"}, status=520)
 
 
@app.route('/current_user')
async def get_current_user(request):
    error_msg = None
    currentUser = await current_user(request)
    if currentUser is not None:
        user_info = await get_user_with_permission(currentUser)
        return json(user_info)
    else:
        error_msg = "User does not exist"
    return json({
        "error_code": "USER_NOT_FOUND",
        "error_message":error_msg
    }, status = 520)
    
@app.route('/user/changepw', methods=['POST'])
async def user_changepw(request):
    currentUser = current_user(request)
    if currentUser is not None:
        password = request.json.get('password', None)
        newpassword = request.json.get('newpassword', None)
        cfpassword = request.json.get('confirm', None)
        if((password is not None) and (newpassword is not None) and (cfpassword is not None)):
            if(newpassword  == cfpassword):
                if auth.verify_password(password, currentUser.password):
                    passwd = auth.encrypt_password(newpassword)
                    user = db.session.query(User).filter(User.id == currentUser.id).first()
                    user.password = passwd
                    db.session.commit()
                    return json({"error_message":"Successfully"},status=200)
                else:
                    return json({"error_code":"PARAMS_ERROR","error_message":"Password is not correct"},status=520)
            else:
                return json({"error_code":"PARAMS_ERROR","error_message":"Confirm password is not match"},status=520)
        else:
            return json({"error_code":"PARAMS_ERROR","error_message":"Parameters are not correct"},status=520)
    return json({"error_code":"ERROR_SESSION","error_message":"Session expired!"},status=520)   

@app.route('/user/changephone', methods=['POST'])
async def user_change_phone(request):
    currentUser = current_user(request)
    if currentUser is not None:
        phone = request.json.get('phone', None)
        if(phone is not None):
            user = db.session.query(User).filter(User.phone == phone).filter(User.id != currentUser.id).first()
            if(user is not None):
                return json({"error_code":"PARAMS_ERROR","error_message":u"Số điện thoại đã tồn tại"},status=520)
            else:
                check_current_user = db.session.query(User).filter(User.id == currentUser.id).first()
                check_current_user.phone = phone
                db.session.commit()
                return json({"error_message":"Successfully"},status=200)
        else:
            return json({"error_code":"PARAMS_ERROR","error_message":"Parameters are not correct"},status=520)
        pass
    return json({"error_code":"ERROR_SESSION","error_message":"Session expired!"},status=520)     


@app.route('/api/v1/donvilist')
def donvilist(request):
    donvilist = DonVi.query.filter(DonVi.tuyendonvi_id < 5).order_by(DonVi.ten).all()
    dvlist = [ {"id": row.id, "ten": row.ten} for row in donvilist]
    return json(dvlist,status=200)

@app.route('/api/v1/register', methods=["POST", "GET"])
async def register(request):
    error_msg = None
    if request.method == 'POST':
        form_data = request.form
        #formvars = form.to_dict()
        password = request.form.get('user_password', None)
        cfpassword = request.form.get('user_password_confirm', None)
        
        user_email = request.form.get('user_email', None)
        donvi_ten = request.form.get('donvi_ten', None)
        
        if ((user_email is None) or (user_email == '')):
            error_msg = u"Xin mời nhập email!"
        
        if(error_msg is None):
            if ((donvi_ten is None) or (donvi_ten == '')):
                error_msg = u"Xin mời nhập tên đơn vị!"
            
        if(error_msg is None):
            #check email trung va ten don vi trung
            checkuser = User.query.filter(User.email == user_email).first()
            if(checkuser is not None):
                error_msg = u"Email đã có người sử dụng, xin mời nhập lại!"
                
        if(error_msg is None):
            #check email trung va ten don vi trung
            checkdonvi = DonVi.query.filter(DonVi.ten == donvi_ten).first()
            if(checkdonvi is not None):
                error_msg = u"Tên đơn vị đã được sử dụng, xin mời nhập lại!"
            
        if((error_msg is None)):
            if((password is None) or (password == '') or (password != cfpassword )) :
                error_msg = u"Xin mời nhập lại mật khẩu!"
        
        captren_id = request.form.get('captren_id', None)
        if((error_msg is None)):
            if((captren_id is None) or (captren_id == '')) :
                error_msg = u"Xin mời nhập lại Đơn vị chủ quản!"
            try:
                captren_id = int(captren_id)
            except:
                error_msg = u"Xin mời nhập lại Đơn vị chủ quản!"
        
        if((error_msg is None)):
            
            tuyendv_tw = request.form.get('donvi_tuyendonvi_tw', None)
            tuyendv_so = request.form.get('donvi_tuyendonvi_so', None)
            
            if (tuyendv_tw is None) and (tuyendv_so is None):
                error_msg = u"Xin mời nhập lại Tuyến/Khối đơn vị!"
        
        if (error_msg is None):
            dangky = UserDonvi()
            dangky.fullname = request.form.get('user_name', None)
            dangky.email = request.form.get('user_email', None)
            dangky.phone = request.form.get('user_phone', None)
            dangky.password = password
            #user.active = False
            
            dangky.donvi_ten = request.form.get('donvi_ten', None)
            dangky.captren_id = captren_id
            
            dangky.donvi_diachi = request.form.get('donvi_diachi', None)
            dangky.donvi_sodienthoai = request.form.get('donvi_sodienthoai', None)
            tuyendv_tw = request.form.get('tuyendv_tw', None)
            tuyendv_so = request.form.get('tuyendv_so', None)
            
            if (tuyendv_tw is not None):
                tuyendv = int(tuyendv_tw)
                dangky.donvi_tuyendonvi_id = tuyendv
            elif (tuyendv_so is not None):
                tuyendv = int(tuyendv_so)
                dangky.donvi_tuyendonvi_id = tuyendv
            
            dangky.trangthai = TrangThaiDangKyDonViEnum.taomoi
            
            dangky.uid = str(uuid.uuid1())
            db.session.add(dangky)
            db.session.commit()
            return json(uid=dangky.madangky,status=200)
            
            return json("Messgager : đăng ký thành công",status=200)
            #return render_template('dangky/success.html', madangky=dangky.madangky)
    
    tuyendonvi = TuyenDonVi.query.all()
    tuyendv_tw = []
    tuyendv_so = []
    for tdv in tuyendonvi:
        if (tdv.ma is not None) and (tdv.ma.endswith("_tw")):
            tuyendv_tw.append(tdv)
        if (tdv.ma is not None) and (tdv.ma.endswith("_so")):
            tuyendv_so.append(tdv) 
   
    #return render_template('dangky/index.html', tuyentw=tuyendv_tw, tuyenso=tuyendv_so,error_msg=error_msg)
    #return "dang ky blueprint"
    return json(tuyendv_tw,status=200)
    return json(tuyendv_so,status=200)
    return json({"error_code": "ERROR", "error_msg": error_msg},status=520)

@app.route('/api/resetpw', methods=["POST", "GET"])
async def resetpw(request):
    error_msg = None
    if request.method == 'POST':
        email = request.json.get("email", None)
        if ((email is None) or (email == '')):
            error_msg = u"Xin mời nhập email!"
            
        if(error_msg is None):
            user = db.session.query(User).filter(User.email == email).first()
            if(user is not None):
                await send_reset_password_instructions(request, user)
                return json({"error": 0, "error_msg": u"Yêu cầu thành công, mời bạn kiểm tra lại email để thiết lập lại mật khẩu!"})
            else:
                error_msg = u"Email không tồn tại!"
    return json({"error_code": "UNKNOW_ERROR", "error_msg": error_msg}, status=520)

    
async def send_mail(subject, recipient, body):
    #new_obj = request.json

    #Thanks: https://github.com/cole/aiosmtplib/issues/1
    host = app.config.get('MAIL_SERVER_HOST')
    port = app.config.get('MAIL_SERVER_PORT')
    user = app.config.get('MAIL_SERVER_USER')
    password = app.config.get('MAIL_SERVER_PASSWORD')

    loop = asyncio.get_event_loop()

    #server = aiosmtplib.SMTP(host, port, loop=loop, use_tls=False, use_ssl=True)
    server = aiosmtplib.SMTP(hostname=host, port=port, loop=loop, use_tls=False)
    await server.connect()

    await server.starttls()
    await server.login(user, password)

    async def send_a_message():
        message = MIMEText(body)
        message['From'] = app.config.get('MAIL_SERVER_USER')
        #message['To'] = ','.join(new_obj.get('email_to'))
        message['To'] = recipient
        message['Subject'] = subject
        await server.send_message(message)

    await send_a_message()

async def send_reset_password_instructions(request, user):
    #token = generate_reset_password_token(user)
    payload = {
        "user_id": user.id,
        "user_email": user.email,
        'exprire': time.time() + app.config.get('USER_FORGOT_PASSWORD_EXPIRATION_DELTA', 0)
    }
    token = jwt.encode(payload)
    
    #reset_link = url_for_security('reset_password', token=token, _external=True)
    reset_link = "http://danso.com/api/reset_password?token=" + token
    subject = app.config.get('EMAIL_SUBJECT_PASSWORD_RESET')
    
    #get template for forgot password
    #mailbody = reset_link
    mailbody = jinja.render_string('security/email/reset_instructions.txt',request, reset_link=reset_link) 
    scheduler = AsyncIOScheduler()
    scheduler.add_job(send_mail,args=[subject, user.email, mailbody])
    scheduler.start()
    
@app.route('/api/reset_password', methods=["POST","GET"])
async def reset_password(request):
    if request.method == 'GET':
        token = request.args.get("token", None)
        return jinja.render('security/reset_password.html', request, token=token)
    
    if request.method == 'POST':
        print(request.form)
        token = request.form.get("token", None)
        password = request.form.get("password", None)
        confirm_password = request.form.get("confirm_password", None)
        
        if token is None:
            return text(u'Liên kết không hợp lệ!')
        
        if password != confirm_password:
            return text(u'mật khẩu không khớp!')
        
       
        payload = jwt.decode(token)
        user_id = payload["user_id"]
        user_email = payload["user_email"]
        exprire = payload["exprire"]
        
        if exprire < time.time():
            return text(u'Liên kết đã hết hạn!')
        
        user = User.query.filter(User.id == user_id).first()
        if (user is not None) and (user.email == user_email):
            user.password = auth.encrypt_password(password)
            auth.login_user(request, user)
            db.session.commit()
        return text(u'bạn đã lấy lại mật khẩu thành công. mời bạn đăng nhập lại để sử dụng!')


def valid_phone(phone):
    if phone is None:
        return False
    if phone.isdigit() and len(phone)>=8 and len(phone)<=12 and phone.startswith("0"):
        return True
    return False


async def set_user_passwd(data=None,**kw):
    if (data is not None) and ('password' in data) and ('confirmpassword' in data):
        if(data['password']  == data['confirmpassword']):
            data['password'] = auth.encrypt_password(data['password'])
            del data['confirmpassword']
            print(to_dict(data))
        else:
            return json({"error_code": "PARAM_ERROR", "error_message":"Confirm password is not match"},status=520)
     
    return json({"error_code": "PARAM_ERROR", "error_message":"Parameters are not correct"},status=520)
         
async def pre_post_user(data, **kw):
#     and ('macongdan' in data)
    if ('phone' in data) and ('email' in data) :
        user = db.session.query(User).filter((User.phone == data['phone']) | (User.email == data['email'])).first()
        if user is not None:
            print("user existed!!!!!!!!!!!!!!!!!!!!!!!1")
            return json({"error_code":"USER_EXISTED","error_message":'Email or Phone existed'},status=520)
    else:
        return json({"error_code":"PARRAM_ERROR","error_message":'parameter is incorrect'},status=520)

def reset_user_passwd(instance_id=None, data=None,**kw):
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
    

def user_pregetmany(search_params=None, **kw):
    apply_donvi_filter(search_params)
        
def entity_pregetmany(search_params=None, **kw):
    apply_donvi_filter(search_params)
    
apimanager.create_api(User,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(
        GET_SINGLE=[auth_func], 
        GET_MANY=[auth_func], 
        POST=[auth_func], 
        PUT_SINGLE=[auth_func,set_user_passwd]),
    collection_name='user',
    include_columns=['id', 'fullname', 'phone', 'email','active', 'roles', 'roles.id', 'roles.name', 'donvi_id', 'donvi', 'donvi.id', 'donvi.ten'])
  
   
 
apimanager.create_api(User,
    methods=['PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], PUT_SINGLE=[auth_func, set_user_passwd]),
    collection_name='user_resetpw',
    include_columns=['id', 'name'])

apimanager.create_api(Role,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, role_pregetmany], POST=[auth_func], PUT_SINGLE=[auth_func, check_admin]),
    collection_name='role'
)

