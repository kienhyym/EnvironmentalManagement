class Config(object):
    #DEV MODE
    DEBUG = True
    STATIC_URL = "static"
    SQLALCHEMY_DATABASE_URI = 'postgresql://moitruongyteusr:123456@localhost:5432/moitruongyte'
#     SQLALCHEMY_DATABASE_URI = 'sqlite:///testdb.db'
#     SQLALCHEMY_TRACK_MODIFICATIONS = True
    
    AUTH_LOGIN_ENDPOINT = 'login'
    AUTH_PASSWORD_HASH = 'sha512_crypt'
    AUTH_PASSWORD_SALT = 'add_salt'
    SECRET_KEY = 'acndef'
    SESSION_COOKIE_SALT = 'salt_key'
