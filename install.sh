#!/bin/bash

# install dependencies
apt-get -y install nginx python3-pip python3-dev build-essential libssl-dev libffi-dev python3-setuptools
apt-get -y install python3-venv
apt-get -y install nginx

#Create ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt -subj "/C=CA/ST=Ontario/L=Guelph/O=G103/OU=CIS3760/CN=CourseSelect/emailAddress=example@gmail.com"
openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

#Move SSL CHANGE
cp ./resources/self-signed.conf /etc/nginx/snippets/
cp ./resources/ssl-params.conf /etc/nginx/snippets/

# working folder for venv
mkdir /home/py-env
cd /home/py-env

# new venv
python3 -m venv backend/venv
source backend/venv/bin/activate

# install in venv only (doesn't effect anything else)
pip install wheel
pip install uwsgi flask

#Move project.py to /home/py-env/backend
cp -r ./resources/myproject.py /home/py-env/backend
#Move wsgi.py to /home/py-env/backend
cp -r ./resources/wsgi.py /home/py-env/backend

# deactivate venv
deactivate

#Move myproject.ini to /home/py-env/myproject.ini
cp -r ./resources/myproject.ini /home/py-env/backend
#Move myproject.service to /etc/systemd/system/myproject.service
cp -r ./resources/myproject.service /etc/systemd/system/myproject.service

# start the uWSGI service and enable it
systemctl start myproject
systemctl enable myproject

#Move nginx default to sites-available
cp ./resources/default /etc/nginx/sites-available/

#ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled

#Move build 
cp -r ./resources/build/* /var/www/html

# restart NGINX
nginx -t
systemctl restart nginx
