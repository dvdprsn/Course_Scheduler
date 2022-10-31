# Simple script to update the web server build

npm run build
cp -r ./build/* /var/www/html
systemctl restart nginx
