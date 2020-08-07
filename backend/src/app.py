from flask import Flask, Blueprint
from flask_restful import Api
from flask_socketio import SocketIO
from flask_cors import CORS

from routes import urls
from models import db


def index():
    return '<h1>API for REMATES CALAMUCHITA </h1>'


# Create flask web application
app = Flask(__name__)

cors = CORS(app, resources={r"*": {"origins": "*"}})

app.config.from_object('config')  # load settings


app.add_url_rule('/', 'index', index)  # simple greeting in /

# Create access point for api rest
app_bp = Blueprint('api', __name__)
# Create api rest
api = Api(app_bp)

# Add urls for api rest
for url in urls:
    api.add_resource(url['resource'], url['path'], endpoint=url['endpoint'])

# Add access point to flask app
app.register_blueprint(app_bp, url_prefix='/api')

# Init data base
db.init_app(app)
# Add web socket support
# socketio = SocketIO(api)
