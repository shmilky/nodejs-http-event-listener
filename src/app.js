"use strict";

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Middlewares
// app.use(require('./middlewares/basicAuth'));

const tempRouter = require('./routes/temp');

// Listeners
app.use(tempRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
