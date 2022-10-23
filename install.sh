sudo apt update
sudo apt install nginx

# maybe enable port
# not sure if david did this
sudo ufw allow 'Nginx HTTP'

# self signed
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
CA
Ontario
Guelph
CIS3760
Group103
34.130.28.136
goodmand@uoguelph.ca
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

(COPY self-signed.conf from repo)
(COPY ssl-params.conf from repo)
(COPY 'default' server block from repo)

# react build
mkdir /var/www/G103/html
(COPY react build from repo to above ^)

# enable changes in nginx
sudo nginx -t
systemctl restart nginx
