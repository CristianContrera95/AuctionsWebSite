import os


BASEDIR = os.path.abspath(os.path.dirname(__file__))
DEBUG = False
WTF_CSRF_ENABLED = True
PROD = False

DB = {
    'driver': '{MySQL ODBC 8.0 Driver}',
    'server': '172.17.0.2',
    'port': '3306',
    'database': 'subastasenweb',
    'username': 'root',
    'password': 'fernetconcoca2020!',
}


SQLALCHEMY_ECHO = False
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_DATABASE_URI = f'mysql://{DB["username"]}:{DB["password"]}@{DB["server"]}:{DB["port"]}/{DB["database"]}'

SQLALCHEMY_POOL_RECYCLE = 3600

SECRET_KEY = os.getenv('SECRET_KEY', 'my_precious')
