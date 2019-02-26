class Config(object):
    #DEV MODE
    DEBUG = True
    STATIC_URL = "static3"
    SQLALCHEMY_DATABASE_URI = 'postgresql://moitruongyteusr:123456@localhost:5432/moitruongyte'
#     SQLALCHEMY_DATABASE_URI = 'sqlite:///testdb.db'
#     SQLALCHEMY_TRACK_MODIFICATIONS = True
    
    AUTH_LOGIN_ENDPOINT = 'login'
    AUTH_PASSWORD_HASH = 'sha512_crypt'
    AUTH_PASSWORD_SALT = 'add_salt'
    SECRET_KEY = 'acndef'
    SESSION_COOKIE_SALT = 'salt_key'
    DOMAIN_URL = 'http://103.74.120.65:9070'
    
    
    MAIL_SERVER_HOST = 'smtp.gmail.com'
    MAIL_SERVER_PORT = 587
    MAIL_SERVER_USER = 'cucvsmtboyte@gmail.com'
    MAIL_SERVER_PASSWORD = '123456abcA'
    #'somevabe.com@gmail.com'
    #'123abc!@#'
    MAIL_SERVER_USE_TLS = False
    MAIL_SERVER_USE_SSL = True
    EMAIL_SUBJECT_PASSWORD_RESET = "Cục quản lý môi trường - Bộ YTế"
