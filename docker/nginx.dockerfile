FROM nginx:latest
MAINTAINER Tran Sy Bao

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx-conf/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx-conf/mime.types /etc/nginx/mime.types

# Create cache and logs folder for easy error tracking
RUN mkdir /cache
RUN mkdir /logs

# Start Nginx
RUN echo "Starting nginx..."
CMD ["nginx", "-g", "daemon off;"]
