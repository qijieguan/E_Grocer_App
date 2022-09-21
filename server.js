const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');

bodyParser = require('body-parser'),

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'client/dist/e-grocer')));
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const itemListRouter = require('./routes/item-list');

app.route('/api/map/getKey').get((req, res) => { res.json(process.env.MAP_API) });
app.use('/api/item-list', itemListRouter);
 
app.get('/*', function(req, res) {
 res.sendFile(path.join(__dirname + '/client/dist/e-grocer/index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}!`);
});