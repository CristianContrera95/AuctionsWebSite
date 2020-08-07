FROM python:3.8
MAINTAINER CRISTIAN_CONTRERA <cristiancontrera95@gmail.com>

RUN apt-get update
RUN apt-get install default-libmysqlclient-dev python3-dev -y
WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Uncomment for production
# COPY ./src/*.py ./

EXPOSE 5000


CMD ["python", "run.py"]
