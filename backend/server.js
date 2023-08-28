const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();

app.use(cors());
app.use(cookieParser());

mongoose.connect(process.env.mongodb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then( () => {
    console.log("mongoconnection successful");
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));

var index = require('./index');
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

// Listen on port 8080
app.listen(8080, () => console.log('Server running on port 8080'));


