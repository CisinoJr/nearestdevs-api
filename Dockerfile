FROM node:12.14.1-alpine

WORKDIR /usr/src/app
COPY package.json yarn.lock ./

COPY . .

RUN yarn

EXPOSE 3333

CMD ["yarn", "dev"]
