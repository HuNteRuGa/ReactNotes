FROM node:current

WORKDIR /app
COPY package.json ./
COPY .npmrc ./
COPY .babelrc ./
COPY postcss.config.js ./
COPY webpack.config.js ./
RUN npm install -g webpack webpack-cli
RUN npm install