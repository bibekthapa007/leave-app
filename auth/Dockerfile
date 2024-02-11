FROM node:alpine AS auth

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY ./ ./

EXPOSE 5555

CMD yarn run start:dev
