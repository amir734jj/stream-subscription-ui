FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY . .
RUN NODE_OPTIONS="--max-old-space-size=1536 --openssl-legacy-provider" npm install -f --legacy-peer-deps


FROM node:18-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts --legacy-peer-deps && npm cache clean --force

COPY server.js ./
COPY --from=build /usr/src/app/app/dist ./app/dist

CMD [ "npm", "start" ]
