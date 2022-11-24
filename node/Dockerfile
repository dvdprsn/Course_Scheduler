FROM node:16 as build-step
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY ./src ./src
COPY ./public ./public
RUN npm install
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
COPY ./Resources/certs /etc/nginx/certs
RUN rm /etc/nginx/conf.d/default.conf
# TODO Changed path here
COPY ./Resources/nginx.conf /etc/nginx/conf.d/
