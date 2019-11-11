// Install express server
const express = require('express');
const cors = require('cors')

const app = express();

app.use(cors());

// Serve only the static files form the dist directory
app.use(express.static('./app/dist/contractor-finder-ui'));

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 80);
