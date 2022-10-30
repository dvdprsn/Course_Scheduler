#!/bin/bash

# install dependencies
echo "Installing dependencies"
apt-get -y install nginx python3-pip python3-dev build-essential libssl-dev libffi-dev python3-setuptools
apt-get -y install python3-venv

#Create ssl
echo "Creating SSL"
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt -subj "/C=CA/ST=Ontario/L=Guelph/O=G103/OU=CIS3760/CN=CourseSelect/emailAddress=example@gmail.com"
openssl dhparam -dsaparam -out /etc/ssl/certs/dhparam.pem 2048

#Move SSL CHANGE
echo "Moving SSL configs"
cp ./resources/self-signed.conf /etc/nginx/snippets/
cp ./resources/ssl-params.conf /etc/nginx/snippets/

# working folder for venv
echo "make py-env/backend dir"
mkdir -p /home/py-env/backend
#Move project.py to /home/py-env/backend
echo "move myproject.py to backend"
cp ./resources/myproject.py /home/py-env/backend
#Move wsgi.py to /home/py-env/backend
echo "move wsgi.py to backend"
cp ./resources/wsgi.py /home/py-env/backend
#Move myproject.ini to /home/py-env/myproject.ini
echo "move myproject.ini to backend"
cp ./resources/myproject.ini /home/py-env/backend
#Move myproject.service to /etc/systemd/system/myproject.service
echo "move myproject.service to system files"
cp ./resources/myproject.service /etc/systemd/system/myproject.service
#Move nginx default to sites-available
echo "move nginx confi to sites-available"
cp ./resources/default /etc/nginx/sites-available/
#Move build 
echo "move project build to root path"
cp -r ./resources/build/* /var/www/html
#Cd for Venv
echo "cd to py-env"
cd /home/py-env

# new venv
echo "Create venv and enter"
python3 -m venv backend/venv
source backend/venv/bin/activate

# install in venv only (doesn't effect anything else)
pip install wheel
pip install uwsgi flask

# deactivate venv
echo "exit venv"
deactivate

# start the uWSGI service and enable it
echo "start myproject systemctl"
systemctl start myproject
systemctl enable myproject

#ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled

# restart NGINX
echo "restart nginx"
nginx -t
systemctl restart nginx
