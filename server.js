// Install express server
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PROXY_URL = process.env.PROXY_URL;
console.log(PROXY_URL);

const app = express();
const proxy = createProxyMiddleware({ target: PROXY_URL, changeOrigin: true, ws: true });

app.use('/hub', proxy);

app.use('/api', proxy);

// Serve only the static files form the dist directory
app.use(express.static('./app/dist/stream-subscription-ui'));

// Start the app by listening on the default Heroku port
const server = app.listen(process.env.PORT || 80, function () {
  console.log('Server is running at %s:%d', server.address().address, server.address().port);
});
