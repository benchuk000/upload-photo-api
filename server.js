const express     = require('express');
const path        = require('path');
const MongoClient = require('mongodb').MongoClient;
const bodyParser  = require('body-parser');
const app         = express();
const mongoose    = require('mongoose');
const config      = require('./config');
const jwt         = require('express-jwt');
const cors        = require('cors');
const corsPrefetch = require('cors-prefetch-middleware');
const imagesUpload = require('images-upload-middleware');

app.use(cors());

app.use(bodyParser.json());

app.use(
  jwt({ secret: config.JWT_SECRET })
    .unless({ path: [ '/signin', '/signup', /\/img\/*./ ] })
);

app.use(express.static(path.join(__dirname, 'uploads')));

app.use(require('./routes'));

mongoose.connection.openUri(config.MONGO_URI);

app.listen(config.PORT, () => {
  console.log(`Live at Port ${config.PORT}`);
});