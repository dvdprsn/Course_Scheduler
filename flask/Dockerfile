#Python container
FROM python:3.7.2-stretch

#Set the working dir to /app
WORKDIR /app

#Copy curr dir contents
ADD . /app

ENV PYTHONPATH /app
#Dependencies
RUN pip install -r requirements.txt

#Start wsgi
CMD ["uwsgi", "app.ini"]