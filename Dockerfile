FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .

RUN NODE_OPTIONS="--openssl-legacy-provider --max-old-space-size=1536" npm install -f --legacy-peer-deps

CMD [ "npm", "start" ]
