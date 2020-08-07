import jwt
from datetime import datetime as dt, date, timedelta
import smtplib
import bcrypt
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
# from email.mime.image import MIMEImage


STATUS = {200: 'Success',
          201: 'Created',
          204: 'No Content',
          301: 'Moved Permanently',
          400: 'Bad Requests',
          402: 'No user found',
          401: 'Unauthorized',
          404: 'Not found',
          409: 'Conflict',
          413: 'Payload Too Large',
          500: 'Internal error'
          }

JWT_SECRET_KEY = 'subastasenweb.key'
JWT_ALGORITHM = 'HS256'
JWT_NOISE = b'salt'
MAIL_PASSWORD = 'Subastas2020!'


def response(status_code, msg='', data=None):
    res = {'code': status_code, 'status_code': STATUS[status_code]}
    if msg:
        res.update({'error': msg})
        print(msg)
    if data is not None:
        res.update({'data': data})

    return res, status_code


def get_data(request):
    try:
        json_data = request.get_json(force=True)
    except:
        json_data = None
    if not json_data:
        return None, response(400, 'No input data provided')
    return json_data, None


def gen_token(data):
    encoded_content = jwt.encode(data, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    token = str(encoded_content).split("'")[1]
    return token


def decode_token(token):
    try:
        data = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])

    except Exception as e:
        print(e)
        data = None
    return data


def validate_dates(first_date, last_date=None, first_hour=None, date_format='%Y-%m-%d'):
    if first_hour:
        first_date = dt.combine(first_date, first_hour).da
    if last_date is None:
        last_date = (dt.now() - timedelta(hours=3))
    if isinstance(first_date, str):
        first_date = dt.strptime(first_date, date_format)
    return first_date < last_date


def validate_json_payload(json_data, fileds):
    field = None
    try:
        for (field, required) in fileds:
            if not (json_data[field] or required):
                json_data[field] = None
            elif (not json_data[field]) and required:
                return json_data, response(400, f'Missing value for "{field}" field in payload')
        return json_data, None
    except KeyError:
        return json_data, response(400, f'Missing "{field}" field in payload')


def validate_token(token):
    token_data = token.decode_token()
    if 'username' in token_data.keys():
        return token_data['username'], None

    return None, response(400, 'Wrong token')


def send_email(email_dest, message, subject='Mail enviado desde Subastas en Web, No responder.'):
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    part1 = MIMEText(message.encode('utf-8'), "html", "utf-8")
    # file = open("img/logofull.png", "rb")
    # attach_image = MIMEImage(file.read())
    # attach_image.add_header('Content-Disposition', 'attachment; filename = "logofull.png"')
    # msg.attach(attach_image)
    msg.attach(part1)

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        result = server.login('subastasenweb.info@gmail.com', MAIL_PASSWORD)
        if result[0] == 235:
            server.sendmail('subastasenweb.info@gmail.com', email_dest, msg.as_string())
            # print(msg)
            server.quit()
            print('Mail enviado')
            return True
        print('Sesion no iniciada')
        return False
    except Exception as ex:
        print('Mail no enviado', ex)
        return False


def check_minuto_ley(auction, new_offer):
    if auction.end_date == new_offer.date:
        diff = (dt.combine(date.today(), auction.end_hour) - dt.combine(date.today(), new_offer.hour))
        if diff.seconds <= 60:
            return True
    return False


def hashed_password(password):
    password_hash = password
    hashed = bcrypt.hashpw(password_hash.encode(), bcrypt.gensalt())
    return hashed.decode()


def comparate_hashed(password, hashed):
    if bcrypt.checkpw(password.encode(), hashed.encode()):
        return True
    else:
        print("Las contraseñas no son iguales")
        return False
