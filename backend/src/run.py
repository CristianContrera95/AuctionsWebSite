from app import app
from config import PROD


if __name__ == '__main__':
    if PROD:
        app.run(host='0.0.0.0', debug=False)
        exit(0)

    app.run(host='0.0.0.0', debug=True)
