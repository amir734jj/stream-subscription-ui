FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN NODE_OPTIONS=--openssl-legacy-provider npm install -f

CMD [ "npm", "start" ]
