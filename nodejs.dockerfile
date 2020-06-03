FROM node:10.14.1
MAINTAINER TRAN SY BAO

# Install Node.js and other dependencies
RUN echo "Nodejs version" && node -v
RUN echo "NPM version" && npm -v

RUN mkdir /api
WORKDIR /api

COPY . /api

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

ENV MONGODB_URI=mongodb://mongo/stably-test

#Running the app
EXPOSE 3000
CMD ["npm", "start"]