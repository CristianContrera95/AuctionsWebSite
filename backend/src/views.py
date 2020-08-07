import random
from datetime import datetime as dt, date, timedelta
import marshmallow
from flask import request
from flask_restful import Resource

from message import message_register, message_contact, message_recovery_password

from marshmallow.exceptions import ValidationError

from models import (
    AccountModel,
    RoleModel,
    UserModel,
    UserSchema,
    AccountSchema,
    ContactModel,
    ContactSchema,
    AuctionModel,
    AuctionSchema,
    ItemModel,
    ItemSchema,
    UrlImageModel,
    UrlImageSchema,
    CharacteristicKeyValueModel,
    CharacteristicKeyValueSchema,
    CharacteristicValueModel,
    CharacteristicValueSchema,
    OfferSchema,
    OfferModel,
)
from utils import (
    response,
    get_data,
    gen_token,
    validate_dates,
    decode_token,
    validate_token,
    validate_json_payload,
    send_email,
    check_minuto_ley,
    hashed_password,
    comparate_hashed,
)


class BaseView(Resource):
    """
    Class base with methods common in other views
    """

    def __init__(self):
        super(BaseView, self).__init__()

    def get(self, **kwargs):
        return response(401)

    def post(self, **kwargs):
        return response(401)

    def put(self, **kwargs):
        return response(401)

    def delete(self, **kwargs):
        return response(401)

    def patch(self, **kwargs):
        return response(401)

    def exists_account(self, username=None, email=None):
        if username:
            username = AccountModel.query.filter_by(username=username).first()
        if email:
            email = AccountModel.query.filter_by(email=email).first()
        return username is not None or email is not None

    def is_valid_token_data(self, username, email):
        account = AccountModel.query.filter_by(username=username, email=email).first()
        return account is not None

    def account_has_userdata(self, username):
        account = AccountModel.query.filter_by(username=username).first()
        user = UserModel.query.filter_by(account_id=account.id).first()
        return user is not None


class RoleView(BaseView):

    def __init__(self):
        super(RoleView, self).__init__()
        # self.role_schema = RoleSchema()
        # self.roles_schema = RoleSchema(many=True)


class AccountView(BaseView):

    def __init__(self):
        super(AccountView, self).__init__()
        self.account_schema = AccountSchema()
        self.accounts_schema = AccountSchema(many=True)

    def get(self):
        """
        Method to validate email
        """
        token = request.args.get('token', '')
        if token:
            token_data = decode_token(token)
            account = AccountModel.query.filter_by(username=token_data['username']).first()
            if account:
                account.validated = True
                errors = account.save()
                if not errors:
                    return response(200, data={'username': token_data['username']})
        return response(400)

    def post(self):
        """
        Method to register a new user
        """
        json_data, error = get_data(request)
        if self.exists_account(username=json_data['username'], email=json_data['email']):
            return response(409, 'Usuario ya registrado')
        if not error:
            try:
                account_data = self.account_schema.load({'email': json_data['email'],
                                                         'username': json_data['username'],
                                                         'password': hashed_password(json_data['password']),
                                                         'role_id': 3,  # common user
                                                         })
            except marshmallow.exceptions.ValidationError as errors:
                print('error', errors)
                return response(400, str(errors))

            new_account = AccountModel(**account_data)
            error = new_account.save()
            if not error:
                token = gen_token({'email': json_data['email'], 'username': json_data['username']})
                msg = message_register.format(json_data['username'], token)
                sent = send_email(json_data['email'], msg)
                return response(200, data={'id': new_account.id})

        print('error', error)
        return response(400, msg="Error en backend")

    def put(self):
        """
        Method to allow change password
        """
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['username'], account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            try:
                account = AccountModel.query.filter_by(username=json_data['username']).first()
            except marshmallow.exceptions.ValidationError as errors:
                print('error', errors)
                return response(400, str(errors))

            if account is not None:
                account.password = hashed_password(json_data['password'])
                error = account.save()
                if not error:
                    return response(200, data={'id': account.id})

        return response(400, msg="Error en backend")

    def patch(self):
        json_data, error = get_data(request)
        if not error:
            try:
                account = AccountModel.query.filter_by(email=json_data['email']).first()
            except marshmallow.exceptions.ValidationError as errors:
                print('error', errors)
                return response(400, str(errors))

            if account is not None:
                password = gen_token({'now': dt.now().second})[:16]
                account.password = hashed_password(password)

                msg = message_recovery_password.format(password)
                send_email(json_data['email'], msg)

                error = account.save()
                if not error:
                    return response(200, data={'id': account.id})

        return response(400, msg="Error en backend")


class UserView(BaseView):
    """
    Class user which allow register, login and logout an user
    """

    def __init__(self):
        super(UserView, self).__init__()
        self.user_schema = UserSchema()
        self.users_schema = UserSchema(many=True)

    def get(self):
        username = request.args.get('username', None)
        if username is not None:
            account = AccountModel.query.filter_by(username=username).first()
            user = UserModel.query.filter_by(account_id=account.id).first()
            if user is not None:
                return response(200, data={'user': {'firstname': user.firstname.title(),
                                                    'lastname': user.lastname.title(),
                                                    'sex': user.sex,
                                                    'dni_type': user.dni_type,
                                                    'dni': user.dni,
                                                    'bdate': user.bdate,
                                                    'province': user.province.title(),
                                                    'city': user.city.title(),
                                                    'address': user.address.title(),
                                                    'phone': str(user.phone),
                                                    'mStatus': user.mStatus,
                                                    'email': account.email}})
        return response(400)

    def post(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['username'], account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            account = AccountModel.query.filter_by(username=json_data['username']).first()
            if account is not None:
                try:
                    user_data = self.user_schema.load({'firstname': json_data['firstname'],
                                                       'lastname': json_data['lastname'],
                                                       'sex': json_data['sex'],
                                                       'dni_type': json_data['dni_type'],
                                                       'dni': json_data['dni'],
                                                       'bdate': json_data['bdate'],
                                                       'province': json_data['province'],
                                                       'city': json_data['city'],
                                                       'address': json_data['address'],
                                                       'phone': str(json_data['phone']),
                                                       'mStatus': str(json_data['mStatus'])})
                except marshmallow.exceptions.ValidationError as errors:
                    print('error', errors)
                    return response(400, str(errors))
                new_user = UserModel(**user_data)
                new_user.account_id = account.id
                error = new_user.save()
                if not error:
                    return response(200, data={'id': new_user.id})
                print(error)
                return error
            else:
                print('user don\'t exists')
        print(error)
        return response(400, msg="Error en backend")

    def put(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['username'], account_data['email']):
            return response(401, 'Wrong token')
        json_data, error = get_data(request)
        if not error:
            try:
                account = AccountModel.query.filter_by(username=json_data['username']).first()
                user = UserModel.query.filter_by(account_id=account.id).first()
                user_data = self.user_schema.load({'firstname': json_data['firstname'],
                                                   'lastname': json_data['lastname'],
                                                   'sex': json_data['sex'],
                                                   'dni_type': json_data['dni_type'],
                                                   'dni': json_data['dni'],
                                                   'bdate': json_data['bdate'],
                                                   'province': json_data['province'],
                                                   'city': json_data['city'],
                                                   'address': json_data['address'],
                                                   'phone': str(json_data['phone']),
                                                   'mStatus': str(json_data['mStatus'])})
            except marshmallow.exceptions.ValidationError as errors:
                print('error', errors)
                return response(400, str(errors))

            user.firstname = user_data['firstname']
            user.lastname = user_data['lastname']
            user.sex = user_data['sex']
            user.dni_type = user_data['dni_type']
            user.dni = user_data['dni']
            user.bdate = user_data['bdate']
            user.province = user_data['province']
            user.city = user_data['city']
            user.address = user_data['address']
            user.phone = user_data['phone']
            user.mStatus = user_data['mStatus']

            error = user.save()
            if not error:
                return response(200, data={'id': user.id})

        return response(400, msg="Error en backend")


class ContactView(BaseView):
    """
    Class user which allow register, login and logout an user
    """

    def __init__(self):
        super(ContactView, self).__init__()
        self.contact_schema = ContactSchema()
        self.contacts_schema = ContactSchema(many=True)

    def get(self):
        response(200)

    def post(self):
        json_data, error = get_data(request)
        if not error:
            try:
                contact_data = self.contact_schema.load({'fullname': json_data['name'],
                                                         'cel_phone': json_data['phone'],
                                                         'body': json_data['body'],
                                                         'email': json_data['email']})
            except marshmallow.exceptions.ValidationError as errors:
                print('\033[93m' + 'error' + '\033[0m', errors)
                return response(400, str(errors))

            new_contact = ContactModel(**contact_data)
            error = new_contact.save()
            if not error:
                msg = message_contact.format(fullname=json_data['name'],
                                             body=json_data['body'],
                                             email=json_data['email'],
                                             phone=json_data['phone'], )

                subject = f'Contacto de {json_data["name"].strip()}, el {dt.now().strftime("%d-%m-%Y")}.'
                print(subject)
                sent = send_email('subastasenweb.contact@gmail.com',
                                  msg,
                                  subject)
                return response(200, data={'id': 'asfd'})

        return response(400, msg="Error en backend")


class LoginView(BaseView):
    def post(self):
        json_data, error = get_data(request)
        if not error:
            try:
                account = AccountModel.query.filter_by(validated=True).filter_by(email=json_data['email']).first()
                if account is not None:
                    role = RoleModel.query.filter_by(id=account.role_id).first()
                    if comparate_hashed(json_data['password'], account.password):
                        user = UserModel.query.filter_by(account_id=account.id).first()  # deberia existir
                        token = gen_token({'email': account.email,
                                           'username': account.username})

                        return response(200, data={'token': token,
                                                   'username': account.username,
                                                   'has_user': user is not None,
                                                   'role': role.role_name if role is not None else 'commonuser'})  # send false if not has user already
                else:
                    return response(402)
            except Exception as ex:
                print(ex)
                return response(400, ex)
        return response(400, error)


class OfferView(BaseView):
    """
    Class Offers to get and save offers
    """

    def __init__(self):
        super(OfferView, self).__init__()
        self.offer_schema = OfferSchema()
        self.offers_schema = OfferSchema(many=True)

    def get(self, auction_id):
        auction = AuctionModel.query.filter_by(id=auction_id).first()
        offers = OfferModel.query.filter_by(finished=False).filter_by(auction_id=auction.id).order_by(
            OfferModel.amount.desc()).limit(7)
        if offers is not None:
            offers = self.offers_schema.dump(offers)
            for offer in offers:
                account = AccountModel.query.filter_by(id=offer['account_id']).first()
                # offer['date'] = dt.strptime(offer['date'], '%m/%d/%Y').strftime('%d-%m-%Y')
                offer['username'] = account.username.title() if account is not None else 'xxx'

            return response(200, data={'offers': offers})
        return response(400)

    def post(self, auction_id):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['username'], account_data['email']):
            return response(401, 'Wrong token')

        json_data, error = get_data(request)
        if not self.account_has_userdata(json_data['username']):
            return response(409, 'Account don\'t has user data')

        if not error:
            try:
                account = AccountModel.query.filter_by(username=json_data['username']).first()
                if account is None:
                    return response(400, msg='Bad user')
                offer_data = self.offer_schema.load({'auction_id': auction_id,
                                                     'account_id': account.id,
                                                     'amount': json_data['amount'],
                                                     'hour': json_data['hour'],
                                                     'date': json_data['date']})
            except marshmallow.exceptions.ValidationError as errors:
                print(errors)
                return response(400, str(errors))
            new_offer = OfferModel(**offer_data)
            error = new_offer.save()
            if not error:
                auction = AuctionModel.query.filter_by(id=auction_id).first()
                if check_minuto_ley(auction, new_offer):
                    next_end = (dt.combine(date.today(), auction.end_hour) + timedelta(seconds=60)).time()
                    auction.end_hour = next_end  # new_offer.hour + timedelta(minutes=1)
                    error = auction.save()
                if not error:
                    return response(200, data={'id': new_offer.id})

        return response(400, msg="Error en backend")


class AuctionView(BaseView):
    def __init__(self):
        super(AuctionView, self).__init__()
        self.auction_schema = AuctionSchema(unknown='EXCLUDE')
        self.auction_schemas = AuctionSchema(many=True, unknown='EXCLUDE')
        self.item_schema = ItemSchema(unknown='EXCLUDE')
        self.urlimage_schema = UrlImageSchema(unknown='EXCLUDE')
        self.keyvalue_schema = CharacteristicKeyValueSchema(unknown='EXCLUDE')
        self.value_schema = CharacteristicValueSchema(unknown='EXCLUDE')

    def get(self):
        result = {
            'started': [],
            'future': []
        }
        try:
            category = request.args.get('category', None)
            inmueble = request.args.get('inmueble', '')
            vehiculo = request.args.get('vehiculo', '')
            mueble = request.args.get('mueble', '')
            otro = request.args.get('otro', '')
            localidades = request.args.get('localidades', '')
            provincias = request.args.get('provincias', '')

            price_from = request.args.get('price_from', None)
            price_until = request.args.get('price_until', None)

            auctions = AuctionModel.query.filter((AuctionModel.end_date > dt.now().date()) |
                                                 ((AuctionModel.end_date == dt.now().date()) & (
                                                         AuctionModel.end_hour > dt.now().time())))
            if category is not None:
                auctions = auctions.filter_by(category=category)
            if price_from is not None:
                auctions = auctions.filter(AuctionModel.base_price >= price_from)
            if price_until is not None:
                auctions = auctions.filter(AuctionModel.base_price <= price_until)
            auctions = self.auction_schemas.dump(auctions.all())

            for auction in auctions:
                item = ItemModel.query.filter_by(auction_id=auction['id']).first()
                if (item is not None) and (inmueble or vehiculo or mueble or otro):
                    item_categories = '.'.join(map(lambda x: x.lower() if x else '',
                                                   filter(lambda x: x, [inmueble, vehiculo, mueble, otro])
                                                   )).split('.')
                    if item.item_category.lower() not in item_categories:
                        item = None
                if (item is not None) and (localidades or provincias):
                    if item.province.lower() not in provincias.lower().split('.'):
                        if item.city.lower() not in localidades.lower().split('.'):
                            item = None
                if item is None:
                    continue
                url = UrlImageModel.query.filter_by(item_id=item.id).first()
                auction['url_image'] = url.url if url is not None else None  # En el front esta una imagen por defecto
                auction['start_date'] = dt.strptime(auction['start_date'], '%Y-%m-%d').strftime('%d-%m-%Y')
                auction['end_date'] = dt.strptime(auction['end_date'], '%Y-%m-%d').strftime('%d-%m-%Y')
                if validate_dates(auction['start_date'], date_format='%d-%m-%Y'):
                    result['started'].append(auction)
                else:
                    result['future'].append(auction)

            random.shuffle(result['started'])
            random.shuffle(result['future'])

            return response(200, data={'auctions': result})
        except Exception as ex:
            print(ex)
            return response(404)


class NewAuctionView(BaseView):
    """
    Class to save/get new auction in data base
    """

    def __init__(self):
        super(NewAuctionView, self).__init__()
        self.auction_schema = AuctionSchema(unknown='EXCLUDE')
        self.auction_schemas = AuctionSchema(many=True, unknown='EXCLUDE')
        self.item_schema = ItemSchema(unknown='EXCLUDE')
        self.urlimage_schema = UrlImageSchema(unknown='EXCLUDE')
        self.keyvalue_schema = CharacteristicKeyValueSchema(unknown='EXCLUDE')
        self.value_schema = CharacteristicValueSchema(unknown='EXCLUDE')

    def get(self):
        auction_id = request.args.get('auction_id', None)
        if auction_id is not None:
            auction = AuctionModel.query.filter_by(id=auction_id).first()
            if auction is not None:
                item = ItemModel.query.filter_by(auction_id=auction.id).first()
                if item is not None:
                    key_values = CharacteristicKeyValueModel.query.filter_by(item_id=item.id).all()
                    # key_values = self.keyvalue_schema.dump(key_values)
                    values = CharacteristicValueModel.query.filter_by(item_id=item.id).all()
                    # values = self.value_schema.dump(values)
                    urls = UrlImageModel.query.filter_by(item_id=item.id).all()
                    # urls = self.urlimage_schema.dump(urls)
                    # auction = self.auction_schema.dump(auction)
                    # item = self.item_schema.dump(item)
                    return response(200, data={'title': auction.title,
                                               'subtitle': auction.subtitle,
                                               'base_price': auction.base_price,
                                               'market_price': auction.market_price,
                                               'hammer': auction.hammer,
                                               'currency': auction.currency,
                                               'start_date': auction.start_date.strftime('%d-%m-%Y'),
                                               'start_hour': str(auction.start_hour),
                                               'end_date': auction.end_date.strftime('%d-%m-%Y'),
                                               'end_hour': str(auction.end_hour),
                                               'category': auction.category,
                                               'item_category': item.item_category,
                                               'description': item.description,
                                               'province': item.province.title(),
                                               'city': item.city.title(),
                                               'address': item.address.title(),
                                               'url_images': [url.url for url in urls],
                                               'key_value': [(key_value.key, key_value.value) for key_value in
                                                             key_values],
                                               'values': [value.value for value in values]
                                               })
        return response(400)

    def post(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['username'], account_data['email']):
            return response(401, 'Wrong token')

        json_data, error = get_data(request)
        if not error:
            # se puede validar que los campos requeridos estan vacios
            # if validate_json_payload(json_data,
            #                          [(c,True) for c in ['action']])>
            #     pass
            try:
                # Try to catch errors en requests, such as missing fields
                json_data['item_category'] = json_data['item_category'].lower()
                auction = self.auction_schema.load(json_data)  # ['auction']
                item = self.item_schema.load(json_data)  # ['item']
                urls = []
                key_values = []
                values = []
                for key, value in json_data['key_value']:
                    key_values.append(self.keyvalue_schema.load({'key': key, 'value': value}))
                for value in json_data['values']:
                    values.append(self.value_schema.load({'value': value}))
                for url in json_data['url_images']:
                    urls.append(self.urlimage_schema.load({'url': url}))

            except ValidationError as e:
                print(e)
                return response(400, str(e))
            except Exception as ex:
                print(ex)
                return response(400, str(ex))

            new_auction = AuctionModel(**auction)
            error = new_auction.save()
            if not error:
                new_item = ItemModel(**item)
                new_item.auction_id = new_auction.id
                error = new_item.save()
                if not error:
                    for url in urls:
                        new_urls = UrlImageModel(**url)
                        new_urls.item_id = new_item.id
                        error = new_urls.save()
                        if error:
                            break
                    if not error:
                        for key_value in key_values:
                            new_value = CharacteristicKeyValueModel(**key_value)
                            new_value.item_id = new_item.id
                            error = new_value.save()
                            if error:
                                break
                        for value in values:
                            new_value = CharacteristicValueModel(**value)
                            new_value.item_id = new_item.id
                            error = new_value.save()
                            if error:
                                break
                        if not error:
                            return response(200, data={'id': new_auction.id})

        return response(400, str(error))

    def put(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['username'], account_data['email']):
            return response(401, 'Wrong token')

        json_data, error = get_data(request)
        auction_id = json_data.get('auction_id', None)
        if auction_id is not None:
            auction = AuctionModel.query.filter_by(id=auction_id).first()
            if auction is not None:
                item = ItemModel.query.filter_by(auction_id=auction.id).first()
                if item is not None:
                    CharacteristicKeyValueModel.query.filter_by(item_id=item.id).delete()
                    CharacteristicValueModel.query.filter_by(item_id=item.id).delete()
                    UrlImageModel.query.filter_by(item_id=item.id).delete()
                    try:
                        json_data['item_category'] = json_data['item_category'].lower()
                        auction_data = self.auction_schema.load(json_data)  # ['auction']
                        item_data = self.item_schema.load(json_data)  # ['item']
                        urls_data = []
                        key_values_data = []
                        values_data = []
                        for key, value in json_data['key_value']:
                            key_values_data.append(self.keyvalue_schema.load({'key': key, 'value': value}))
                        for value in json_data['values']:
                            values_data.append(self.value_schema.load({'value': value}))
                        for url in json_data['url_images']:
                            urls_data.append(self.urlimage_schema.load({'url': url}))

                    except ValidationError as e:
                        print(e)
                        return response(400, str(e))
                    except Exception as ex:
                        print(ex)
                        return response(400, str(ex))

                    for key, value in auction_data.items():
                        setattr(auction, key, value)
                    error = auction.save()

                    if not error:
                        for key, value in item_data.items():
                            setattr(item, key, value)
                        error = item.save()

                        if not error:
                            for url in urls_data:
                                new_urls = UrlImageModel(**url)
                                new_urls.item_id = item.id
                                error = new_urls.save()
                                if error:
                                    break
                            if not error:
                                for key_value in key_values_data:
                                    new_value = CharacteristicKeyValueModel(**key_value)
                                    new_value.item_id = item.id
                                    error = new_value.save()
                                    if error:
                                        break
                                for value in values_data:
                                    new_value = CharacteristicValueModel(**value)
                                    new_value.item_id = item.id
                                    error = new_value.save()
                                    if error:
                                        break
                                if not error:
                                    return response(200, data={'id': auction.id})
        return response(400)


class AuctionDetailView(BaseView):

    def __init__(self):
        super(AuctionDetailView, self).__init__()
        self.auction_schema = AuctionSchema(unknown='EXCLUDE')
        self.item_schema = ItemSchema(unknown='EXCLUDE')
        self.urlimage_schema = UrlImageSchema(many=True, unknown='EXCLUDE')
        self.keyvalue_schema = CharacteristicKeyValueSchema(many=True, unknown='EXCLUDE')
        self.value_schema = CharacteristicValueSchema(many=True, unknown='EXCLUDE')
        self.offer_schema = OfferSchema(unknown='EXCLUDE')

    def get(self, auction_id):
        auction = AuctionModel.query.filter_by(id=auction_id).first()
        if auction is not None:
            item = ItemModel.query.filter_by(auction_id=auction.id).first()
            if item is not None:
                key_values = CharacteristicKeyValueModel.query.filter_by(item_id=item.id).all()
                key_values = self.keyvalue_schema.dump(key_values)
                urls = UrlImageModel.query.filter_by(item_id=item.id).all()
                urls = self.urlimage_schema.dump(urls)
                values = CharacteristicValueModel.query.filter_by(item_id=item.id).all()
                values = self.value_schema.dump(values)
                offer = OfferModel.query.filter_by(finished=False).filter_by(auction_id=auction.id).order_by(
                    OfferModel.amount.desc()).first()
                offer = self.offer_schema.dump(offer)
                auction = self.auction_schema.dump(auction)
                item = self.item_schema.dump(item)

                auction['title'] = auction['title'].title()
                item['province'] = item['province'].title()
                item['city'] = item['city'].title()
                item['address'] = item['address'].title()

                return response(200, data={'auction': auction,
                                           'item': item,
                                           'key_values': key_values,
                                           'url_images': urls,
                                           'values': values,
                                           'curr_price': offer['amount'] if 'amount' in offer.keys() else -1
                                           })
        return response(400)


class FiltersView(BaseView):

    def __init__(self):
        super(FiltersView, self).__init__()
        self.auction_schema = AuctionSchema(unknown='EXCLUDE')

    def get(self):
        filters = {}
        auctions = AuctionModel.query.filter_by(finished=False)
        categories = [c for (c,) in auctions.with_entities(AuctionModel.category).distinct().all()]
        for category in categories:
            filters[category] = []
            idxs = [a.id for a in auctions.filter_by(category=category).all()]
            items = ItemModel.query.filter(ItemModel.auction_id.in_(idxs)).with_entities(ItemModel.item_category)
            for item_category in items.distinct().all():
                filters[category].append((item_category[0].title(),
                                          items.filter_by(item_category=item_category).count()))

        provinces = ItemModel.query.filter(ItemModel.auction_id.in_([auction.id for auction in auctions])) \
            .with_entities(ItemModel.province)
        cities = ItemModel.query.filter(ItemModel.auction_id.in_([auction.id for auction in auctions])) \
            .with_entities(ItemModel.city)

        filters['Provincias'] = []
        for province in provinces.distinct().all():
            filters['Provincias'].append((province, provinces.filter_by(province=province).count()))

        filters['Localidades'] = []
        for city in cities.distinct().all():
            filters['Localidades'].append((city, cities.filter_by(city=city).count()))

        filters = {cat: filters[cat] for cat in ['Inmueble', 'Vehiculo', 'Mueble', 'Otro', 'Provincias', 'Localidades']
                   if cat in filters.keys()}
        return response(200, data={'filters': filters})


class SearchView(BaseView):

    def __init__(self):
        super(SearchView, self).__init__()
        self.auction_schema = AuctionSchema(unknown='EXCLUDE')
        self.item_schema = ItemSchema(unknown='EXCLUDE')
        self.urlimage_schema = UrlImageSchema(many=True, unknown='EXCLUDE')
        self.keyvalue_schema = CharacteristicKeyValueSchema(many=True, unknown='EXCLUDE')
        self.value_schema = CharacteristicValueSchema(many=True, unknown='EXCLUDE')

    def get(self):
        query = request.args.get('query', None)
        if query is not None:
            auctions = AuctionModel.query.filter(AuctionModel.title.contains(f'{query}')).union(
                AuctionModel.query.filter(AuctionModel.subtitle.contains(f'{query}'))
            ).union(
                AuctionModel.query.filter(AuctionModel.category.contains(f'{query}'))
            ).distinct()

            items = ItemModel.query.filter(ItemModel.item_category.contains(f'{query}')).union(
                ItemModel.query.filter(ItemModel.province.contains(f'{query}'))
            ).union(
                ItemModel.query.filter(ItemModel.city.contains(f'{query}'))
            ).union(
                ItemModel.query.filter(ItemModel.description.contains(f'{query}'))
            ).union(
                ItemModel.query.filter(ItemModel.province.contains(f'{query}'))
            ).union(
                ItemModel.query.filter(ItemModel.city.contains(f'{query}'))
            ).union(
                ItemModel.query.filter(ItemModel.address.contains(f'{query}'))
            ).distinct()
            # subq, User.id == subq.c.user_id

            auctions = auctions.union(
                AuctionModel.query.filter(AuctionModel.id.in_([item.auction_id for item in items]))
            ).filter_by(finished=False).distinct().all()  # .filter_by(finished=False)

            result = {
                'started': [],
                'future': []
            }
            try:
                # categories = request.args.get('filters', [])
                # price_from = request.args.get('price_from', None)
                # price_until = request.args.get('price_until', None)
                # if price_from is not None:
                #     auctions = auctions.filter(AuctionModel.base_price >= price_from)
                # if price_until is not None:
                #     auctions = auctions.filter(AuctionModel.base_price <= price_until)
                # auctions = self.auction_schemas.dump(auctions.all())

                for auction in auctions:
                    # if categories and item is not None:
                    #     if item.item_category not in categories.split('.'):
                    #         item = None
                    item = ItemModel.query.filter_by(auction_id=auction.id).first()
                    if item is None:
                        continue
                    url = UrlImageModel.query.filter_by(item_id=item.id).first()
                    url_image = url.url if url is not None else None  # En el front esta una imagen por defecto
                    if validate_dates(str(auction.start_date)):
                        aux = self.auction_schema.dump(auction)
                        aux.update({'url_image': url_image})
                        result['started'].append(aux)
                    else:
                        aux = self.auction_schema.dump(auction)
                        aux.update({'url_image': url_image})
                        result['future'].append(aux)

                # random.shuffle(result['started'])
                # random.shuffle(result['future'])

                return response(200, data={'auctions': result})
            except Exception as ex:
                print(ex)
                return response(404)

        return response(400)


class OfferUserView(BaseView):

    def __init__(self):
        super(OfferUserView, self).__init__()
        self.offer_schema = OfferSchema()
        self.offers_schema = OfferSchema(many=True)

    def get(self):
        username = request.args.get('username', None)
        account = AccountModel.query.filter_by(username=username).first()
        result = {'started': [], 'finished': []}
        if account is not None:
            offers = OfferModel.query \
                .filter_by(finished=False) \
                .filter_by(account_id=account.id) \
                # .order_by(OfferModel.id.desc())
            auction_ids = []
            auctions = AuctionModel.query.filter_by(finished=False)
            for offer in offers.all():
                if offer.auction_id in auction_ids:
                    continue
                auction_ids.append(offer.auction_id)
                auction = auctions.filter_by(id=offer.auction_id).first()
                if auction is None:
                    continue
                offer_ = OfferModel.query.filter_by(finished=False).filter_by(auction_id=auction.id).order_by(
                    OfferModel.amount.desc()).first()
                row = {
                    'offer': offer_.amount,
                    'auction': auction.title,
                    'auction_id': offer_.auction_id,
                    'date': str(offer_.hour),
                    'time': offer_.date.strftime('%d-%m-%Y'),
                    'end_date': auction.end_date.strftime('%d-%m-%Y'),
                }
                result['started'].append(row)

            finished_offers = offers.all()
            auctions = AuctionModel.query.filter_by(finished=True)
            auction_ids = []
            for offer in finished_offers:
                if offer.auction_id in auction_ids:
                    continue
                auction_ids.append(offer.auction_id)
                auction = auctions.filter_by(id=offer.auction_id).first()
                if auction is None:
                    continue
                offer_ = OfferModel.query.filter_by(finished=False).filter_by(auction_id=auction.id).order_by(
                    OfferModel.amount.desc()).first()
                row = {
                    'offer': offer_.amount,
                    'position': '-',
                    'auction': auction.title,
                    'auction_id': offer_.auction_id,
                    'date': str(offer_.hour),
                    'time': offer_.date.strftime('%d-%m-%Y'),
                    'end_date': auction.end_date.strftime('%d-%m-%Y'),
                }
                result['finished'].append(row)

            return response(200, data={'offers': result})
        return response(400)


class OfferFinished(BaseView):

    def __init__(self):
        super(OfferFinished, self).__init__()
        self.offers_schema = OfferSchema(many=True)

    def get(self):

        auctions = AuctionModel.query.filter_by(finished=False).filter((AuctionModel.end_date < dt.now().date()) |
                                                                       ((AuctionModel.end_date == dt.now().date()) & (
                                                                               AuctionModel.end_hour < dt.now().time()))).all()

        offers = []
        for auction in auctions:
            offer = OfferModel.query.filter_by(finished=False).filter_by(auction_id=auction.id).order_by(
                OfferModel.amount.desc()).first()
            account = AccountModel.query.filter_by(id=offer.account_id).first()
            row = {
                'username': account.username,
                'amount': offer.amount,
                'auction': auction.title,
                'auction_id': offer.auction_id,
                'date': str(offer.hour),
                'time': offer.date.strftime('%d-%m-%Y'),
                'offer_id': offer.id,
            }
            offers.append(row)
        return response(200, data={'offers': offers})

    def post(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['username'], account_data['email']):
            return response(401, 'Wrong token')

        json_data, error = get_data(request)
        if not error:
            offer = OfferModel.query.filter_by(id=json_data['offer_id']).first()
            auction = AuctionModel.query.filter_by(id=offer.auction_id).first()
            if auction is not None:
                auction.finished = True
                errors = auction.save()
                if not errors:
                    return response(200)
        return response(400)

    def put(self):
        account_data = decode_token(request.headers.environ['HTTP_AUTHORIZATION'])
        if not self.is_valid_token_data(account_data['username'], account_data['email']):
            return response(401, 'Wrong token')

        json_data, error = get_data(request)
        if not error:
            offer = OfferModel.query.filter_by(id=json_data['offer_id']).first()
            if offer is not None:
                offer.finished = True
                errors = offer.save()
                if not errors:
                    return response(200)
        return response(400)
