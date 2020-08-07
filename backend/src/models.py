from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import exc
from marshmallow import fields
from flask_marshmallow import Marshmallow
from utils import response

db = SQLAlchemy()
ma = Marshmallow()

MAX_INTEGER_MYSQL = 2147483647


def parse_sql_errors(error):
    # decode mysql errors
    pass


class ModelBase:

    def commit(self):
        try:
            db.session.commit()
            return self
        except:
            return False

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
        except exc.IntegrityError as ex:
            return response(409, f'Confict in Database: {ex.args[0]}')
        except Exception as ex:
            return response(500, f'Data base error\n{ex}')

    def delete_(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except exc.IntegrityError as ex:
            return response(409, f'Confict in Database: {ex.args[0]}')
        except Exception as ex:
            return response(500, f'Data base error\n{ex}')


class Permission(ModelBase, db.Model):
    __tablename__ = 'permission'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)

    def __init__(self, **kwargs):
        for key in kwargs:
            if hasattr(self, key):
                setattr(self, key, kwargs[key])

    def __repr__(self):
        return f'permission {self.id}'


class RoleSchema(ma.Schema):
    id = fields.Integer()
    # permission_id = fields.Integer()
    role_name = fields.Integer()


class RoleModel(ModelBase, db.Model):
    __tablename__ = 'role'

    PERMISION = {'admin': 1,
                 'fullview': 2,
                 'commonuser': 3,
                 }

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    # permission_id = db.Column('permission_id', db.ForeignKey('permission.id', ondelete='CASCADE'), nullable=False)
    role_name = db.Column('role_name', db.String(25), default='Unauthorized')

    def __init__(self, role_name):
        if role_name == 'admin':
            self.role_name = role_name
        elif role_name == 'fullview':
            self.role_name = role_name
        elif role_name == 'commonuser':
            self.role_name = role_name
        # self.permission_id = self.PERMISION[self.role_name]

    def __repr__(self):
        return f'{self.role_name} role'


class AccountSchema(ma.Schema):
    id = fields.Integer()
    role_id = fields.Integer(required=True)
    username = fields.String(required=True)
    email = fields.String(required=True)
    password = fields.String(required=True)


class AccountModel(ModelBase, db.Model):
    __tablename__ = 'account'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    role_id = db.Column('role_id', db.ForeignKey('role.id', ondelete='CASCADE'))
    email = db.Column('email', db.String(255), unique=True)
    username = db.Column('username', db.String(255), unique=True)
    password = db.Column('password', db.String(255), nullable=False)
    validated = db.Column(db.Boolean(), default=False)

    # last_update = db.Column('last_update', db.DateTime,server_default=db.func.current_timestamp(), nullable=True)

    def __init__(self, role_id, password, email, username):
        super(AccountModel, self).__init__()
        self.role_id = role_id
        self.password = password
        self.email = email
        self.username = username

    def __repr__(self):
        return f'Account {self.id}: {self.email}'


class UserSchema(ma.Schema):
    id = fields.Integer()
    account_id = fields.Integer()
    username = fields.String()
    firstname = fields.String()
    lastname = fields.String()
    sex = fields.String()
    dni_type = fields.String()
    dni = fields.String()
    bdate = fields.String()
    province = fields.String()
    city = fields.String()
    address = fields.String()
    phone = fields.String()
    mStatus = fields.String()


class UserModel(ModelBase, db.Model):
    __tablename__ = 'user'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    account_id = db.Column('account_id', db.ForeignKey('account.id', ondelete='CASCADE'), nullable=False)
    firstname = db.Column('firstname', db.String(255), unique=False)
    lastname = db.Column('lastname', db.String(255), unique=False)
    sex = db.Column('sex', db.String(255), unique=False)
    dni_type = db.Column('dni_type', db.String(25), unique=False)
    dni = db.Column('dni', db.String(25), unique=True)
    bdate = db.Column('bdate', db.String(25), unique=False)
    province = db.Column('province', db.String(255), unique=False)
    city = db.Column('city', db.String(255), unique=False)
    address = db.Column('address', db.String(255), unique=False, nullable=True)
    phone = db.Column('phone', db.String(25), unique=False, nullable=True)
    mStatus = db.Column('mStatus', db.String(225), unique=False, nullable=True)

    # last_update = db.Column('last_update', db.DateTime,server_default=db.func.current_timestamp(), nullable=True)

    def __init__(self, firstname, lastname, sex, mStatus, dni_type, phone, dni, bdate, province, city, address):
        super(UserModel, self).__init__()
        self.firstname = firstname
        self.lastname = lastname
        self.sex = sex
        self.dni_type = dni_type
        self.dni = dni
        self.bdate = bdate
        self.province = province
        self.city = city
        self.address = address
        self.phone = phone
        self.mStatus = mStatus

    def __repr__(self):
        return f'user: {self.firstname} {self.lastname}'


class ContactSchema(ma.Schema):
    id = fields.Integer()
    body = fields.String()
    fullname = fields.String()
    email = fields.String()
    cel_phone = fields.String()


class ContactModel(ModelBase, db.Model):
    __tablename__ = 'contact'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    fullname = db.Column('fullname', db.String(255), unique=False)
    email = db.Column('email', db.String(255), unique=False)
    cel_phone = db.Column('phone', db.String(30), nullable=True)
    body = db.Column('body', db.String(10000), nullable=True)

    def __init__(self, fullname, cel_phone, body, email):
        super(ContactModel, self).__init__()
        self.fullname = fullname
        self.body = body
        self.cel_phone = cel_phone
        self.email = email

    def __repr__(self):
        return f'contact: {self.fullname} {self.body}'


class AuctionSchema(ma.Schema):
    id = fields.Integer()
    title = fields.String(required=True)
    subtitle = fields.String()
    category = fields.String(required=True)
    base_price = fields.Float(required=True)
    hammer = fields.String()
    market_price = fields.Float()
    currency = fields.String()
    start_date = fields.Date(required=True, format='%Y-%m-%d')
    start_hour = fields.Time(required=True, format='%H:%M:%s')
    end_date = fields.Date(required=True, format='%Y-%m-%d')
    end_hour = fields.Time(required=True, format='%H:%M:%s')


class AuctionModel(ModelBase, db.Model):
    __tablename__ = 'auction'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    title = db.Column('title', db.String(100), unique=False)
    subtitle = db.Column('subtitle', db.String(256), unique=False, nullable=True)
    category = db.Column('category', db.String(256), unique=False)  # Categorias definidas por nosotros
    base_price = db.Column('base_price', db.Float(precision=2), unique=False)
    hammer = db.Column('hammer', db.String(40), unique=False)
    market_price = db.Column('market_price', db.Float(precision=2), unique=False, nullable=True)
    currency = db.Column('currency', db.String(15), unique=False, nullable=True)
    start_date = db.Column('start_date', db.Date, unique=False, nullable=False)
    start_hour = db.Column('start_hour', db.Time, unique=False, nullable=False)
    end_date = db.Column('end_date', db.Date, unique=False,
                         nullable=False)  # Se usa para ver si termino el tiempo de ofertar
    end_hour = db.Column('end_hour', db.Time, unique=False, nullable=False)
    finished = db.Column(db.Boolean(), default=False)  # Si es true la subasta ya se pago

    def __init__(self, title, subtitle, category,
                 base_price, market_price, currency, start_date, start_hour, hammer, end_date, end_hour):
        self.title = title
        self.subtitle = subtitle
        self.category = category
        self.base_price = base_price
        self.hammer = hammer
        self.market_price = market_price
        self.currency = currency
        self.start_date = start_date
        self.start_hour = start_hour
        self.end_date = end_date
        self.end_hour = end_hour

    def __repr__(self):
        return f'auction: {self.title} ${self.base_price}'


class ItemSchema(ma.Schema):
    id = fields.Integer()
    auction_id = fields.Integer()
    item_category = fields.String()
    description = fields.String(required=True)
    province = fields.String(required=True)
    city = fields.String(required=True)
    address = fields.String()


class ItemModel(ModelBase, db.Model):
    __tablename__ = 'item'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    auction_id = db.Column('auction_id', db.ForeignKey('auction.id', ondelete='CASCADE'), nullable=False)
    item_category = db.Column('item_category', db.String(256), unique=False)  # Categorias definidas por usuarios
    description = db.Column('description', db.String(1000), unique=False)
    province = db.Column('province', db.String(256), unique=False)
    city = db.Column('city', db.String(256), unique=False)
    address = db.Column('address', db.String(256), unique=False)

    def __init__(self, item_category, description, province, city, address):
        self.item_category = item_category
        self.description = description
        self.province = province
        self.city = city
        self.address = address

    def __repr__(self):
        return f'item: {self.item_category}'


class UrlImageSchema(ma.Schema):
    id = fields.Integer()
    item_id = fields.Integer()
    url = fields.URL(required=True)


class UrlImageModel(ModelBase, db.Model):
    __tablename__ = 'urlimage'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    item_id = db.Column('item_id', db.ForeignKey('item.id', ondelete='CASCADE'), nullable=False)
    url = db.Column('url', db.String(2048), unique=False)

    def __init__(self, url):
        self.url = url

    def __repr__(self):
        return f'image: <{self.url}>'


class CharacteristicKeyValueSchema(ma.Schema):
    id = fields.Integer()
    item_id = fields.Integer()
    key = fields.String(required=True)
    value = fields.String(required=True)


class CharacteristicKeyValueModel(ModelBase, db.Model):
    """
    La idea de esta tabla es guardar datos con nombre. ejemplo:
    Sup Terreno: 300mts2
    Habitaciones: 4
    """
    __tablename__ = 'characteristickeyvalue'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    item_id = db.Column('item_id', db.ForeignKey('item.id', ondelete='CASCADE'), nullable=False)
    key = db.Column('key', db.String(256), nullable=False)
    value = db.Column('value', db.String(256), nullable=False)

    def __init__(self, key, value):
        self.key = key
        self.value = value

    def __repr__(self):
        return f'characteristic: {self.key} {self.value}'


class CharacteristicValueSchema(ma.Schema):
    id = fields.Integer()
    item_id = fields.Integer()
    value = fields.String(required=True)


class CharacteristicValueModel(ModelBase, db.Model):
    """
    La idea de esta tabla es guardar datos sin nombre. ejemplo:
    Tv cable
    Gas natural
    """
    __tablename__ = 'characteristicvalue'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    item_id = db.Column('item_id', db.ForeignKey('item.id', ondelete='CASCADE'), nullable=False)
    value = db.Column('value', db.String(256), nullable=False)

    def __init__(self, value):
        self.value = value

    def __repr__(self):
        return f'characteristic: {self.value}'


class OfferSchema(ma.Schema):
    id = fields.Integer()
    auction_id = fields.Integer(required=True)
    account_id = fields.Integer(required=True)
    amount = fields.Float(required=True)
    hour = fields.Time(required=True, format='%H:%M:%s')
    date = fields.Date(required=True, format='%d-%m-%Y')


class OfferModel(ModelBase, db.Model):
    __tablename__ = 'offer'

    id = db.Column('id', db.Integer, autoincrement=True, primary_key=True)
    auction_id = db.Column('auction_id', db.ForeignKey('auction.id', ondelete='CASCADE'), nullable=False)
    account_id = db.Column('account_id', db.ForeignKey('account.id', ondelete='CASCADE'), nullable=False)
    amount = db.Column('amount', db.Float(precision=2), unique=False)
    hour = db.Column('hour', db.Time, unique=False, nullable=False)
    date = db.Column('date', db.Date, unique=False)
    finished = db.Column(db.Boolean(), default=False)

    def __init__(self, auction_id, account_id, amount, hour, date):
        super(OfferModel, self).__init__()
        self.auction_id = auction_id
        self.account_id = account_id
        self.amount = amount
        self.hour = hour
        self.date = date

    def __repr__(self):
        return f'Account {self.id}: {self.amount}'
