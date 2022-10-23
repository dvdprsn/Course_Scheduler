#!/bin/bash
apt-get install nginx
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt -subj "/C=CA/ST=Ontario/L=Guelph/O=G103/OU=CIS3760/CN=CourseSelect/emailAddress=example@gmail.com"
openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
cp ./course-parser-sprint-4/resources/default /etc/nginx/sites-available/
cp ./course-parser-sprint-4/resources/self-signed.conf /etc/nginx/snippets/
cp ./course-parser-sprint-4/resources/ssl-params.conf /etc/nginx/snippets/
cp -r ./course-parser-sprint-4/resources/build/* /var/www/html
nginx -t
systemctl restart nginx
