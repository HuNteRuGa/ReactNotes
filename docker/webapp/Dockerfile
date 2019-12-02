FROM node:current

WORKDIR /app
COPY package.json ./
COPY .npmrc ./
COPY .env ./
RUN npm install -g supervisor
RUN npm install
