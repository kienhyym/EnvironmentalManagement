from __future__ import division
import asyncio
import aiosmtplib
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from gatco.response import json,text, html
from application.extensions import apimanager
from application.models.models import User, Permission, Role
from application.extensions import auth
from application.database import db
from application.server import app
from gatco_restapi.helpers import to_dict
from application.controllers.helpers import *
from sqlalchemy import or_
 
 
async def get_user_with_permission(user):
    user_info = to_dict(user)
    roles = [{"id":str(role.id),"role_name":role.name,"description":role.description} for role in user.roles]
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
 
     
async def set_user_passwd(data=None,**kw):
    if (data is not None) and ('password' in data) and ('confirm_password' in data):
        if(data['password']  == data['confirm_password']):
            data['password'] = auth.encrypt_password(data['password'])
            del data['confirm_password']
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

 
apimanager.create_api(User,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(
        GET_SINGLE=[auth_func], 
        GET_MANY=[auth_func, user_pregetmany], 
        POST=[auth_func, pre_post_user, set_user_passwd], 
        PUT_SINGLE=[auth_func, check_admin]),
    collection_name='user',
    include_columns=['id', 'name', 'email', 'tenancy_id','tenancy', 'roles', 'roles.id', 'roles.role_name', 'stores'])
 
 
apimanager.create_api(User,
    methods=['PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], PUT_SINGLE=[auth_func, set_user_passwd]),
    collection_name='user_resetpw',
    include_columns=['id', 'name'])

apimanager.create_api(Role,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func, role_pregetmany], POST=[auth_func], PUT_SINGLE=[auth_func, check_admin]),
    collection_name='role'
)
 
@app.route('/logout')
async def logout(request):
    try:
        auth.logout_user(request)
    except:
        pass
    return json({})
 
 

@app.route('/login', methods=['POST'])
async def login(request):
    username = request.json.get("data", None)
    password = request.json.get("password", None)
    user = db.session.query(User).filter(or_(User.email == username, User.phone == username)).first()
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
        phone_number = request.json.get('phone', None)
        if(phone_number is not None):
            user = db.session.query(User).filter(User.phone == phone_number).filter(User.id != currentUser.id).first()
            if(user is not None):
                return json({"error_code":"PARAMS_ERROR","error_message":u"Số điện thoại đã tồn tại"},status=520)
            else:
                check_current_user = db.session.query(User).filter(User.id == currentUser.id).first()
                check_current_user.phone = phone_number
                db.session.commit()
                return json({"error_message":"Successfully"},status=200)
        else:
            return json({"error_code":"PARAMS_ERROR","error_message":"Parameters are not correct"},status=520)
        pass
    return json({"error_code":"ERROR_SESSION","error_message":"Session expired!"},status=520)     

@app.route('/api/register', methods=["POST", "GET"])
async def register(request):
    error_msg = None
    if request.method == 'POST':
        password = request.json.get('password', None)
        cfpassword = request.json.get('password_confirm', None)
#         macongdan = request.json.get('macongdan', None)
        email = request.json.get('email', None)
        phone_number = request.json.get('phone', None)
        hoten = request.json.get('name', '')
        if ((email is None) or (email == '')):
            error_msg = u"Xin mời nhập email!"
        if(error_msg is None):
            if  not valid_phone_number(phone_number):
                error_msg = u"Số điện thoại không đúng định dạng, xin mời nhập lại!"
            checkphone = db.session.query(User).filter(User.phone == phone_number).first()
            if(checkphone is not None):
                error_msg = u"Số điện thoại đã có người sử dụng, xin mời nhập lại!"
        if(error_msg is None):
            checkuser = db.session.query(User).filter(User.email == email).first()
            if(checkuser is not None):
                error_msg = u"Email đã có người sử dụng, xin mời nhập lại!"
                    
                    
        if((error_msg is None)):
            if((password is None) or (password == '') or (password != cfpassword )) :
                error_msg = u"Xin mời nhập lại mật khẩu!"
            
        if((error_msg is None)):
            if(password != cfpassword ) :
                error_msg = u"Mật khẩu không khớp!"
                
        if (error_msg is None):
            role = db.session.query(Role).filter(Role.name == 'User').first()
            user = User(email=email, name=hoten, password=auth.encrypt_password(password), phone=phone_number, active=True)
            if role not in user.roles:
                user.roles.append(role)
            db.session.add(user)
                
            db.session.commit()           
            auth.login_user(request, user)
            result = await get_user_with_permission(user)
            return json(result,status=200)
            
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


def valid_phone_number(phone_number):
    if phone_number is None:
        return False
    if phone_number.isdigit() and len(phone_number)>=8 and len(phone_number)<=12 and phone_number.startswith("0"):
        return True
    return False