FROM node:alpine

WORKDIR /usr/src/app/client

COPY package*.json ./

RUN yarn install

EXPOSE 5173

CMD ["yarn", "dev"]