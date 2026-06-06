FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN NODE_OPTIONS="--max-old-space-size=1536 --openssl-legacy-provider" npm install -f --legacy-peer-deps

CMD [ "npm", "start" ]
