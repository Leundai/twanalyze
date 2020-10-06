# this dockerfile is used for product deployments
FROM python:3.7
LABEL maintainer "MLH PEEPO"

COPY requirements.txt requirements.txt
RUN apt-get update -y && \
    apt-get install -y python-pip python-dev

RUN pip install -r requirements.txt

COPY . /app
WORKDIR /app

ENTRYPOINT [ "python" ]

CMD [ "manage.py", "runprod" ]
