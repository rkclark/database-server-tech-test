'use strict';

var express = require('express');
var path = require('path');
var request = require('request');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

var memory = {};

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var dataMemory = {};

app.get('/set?*', function(req, res) {
  var key = Object.keys(req.query)[0];
  var value = req.query[key];
  console.log('Setting ' + key + ': ' + value);
  dataMemory[key] = value;
  res.send();
});

app.get('/get?*', function(req, res) {
  var key = Object.keys(req.query)[0];
  var value = dataMemory[key];
  var responseObj = {};
  responseObj[key] = value;
  console.log('Responding with: ', responseObj);
  res.setHeader('Content-Type', 'application/json');
  res.send(responseObj);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
