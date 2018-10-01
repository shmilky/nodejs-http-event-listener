'use strict';

const router = require('express').Router();
const request = require('simple-server-request');

const queueUrl = process.env.QUEUE_URL;

function publishEvent (req, res) {
    const {url, method, body} = req;

    const parsedRequest = {url, type: method};

    if (body && (method.toLowerCase() === 'post' || method.toLowerCase() === 'put')) {
        parsedRequest.body = body;
    }

    request.post(queueUrl, {messageType: 'incoming_Event', data: parsedRequest.body}, function (err) {
        if (err) {
            res.status(500);
            res.send({errorMessage: err})
        }
        else {
            res.send({successMessage: 'Successfully published the received event', data: parsedRequest});
        }
    });
}

function queueUrlExistedCheck (req, res, next) {
    if (queueUrl) {
        next();
    }
    else {
        res.status(500);
        res.send('Configuration error, no url was defined for the queue at the QUEUE_URL param')
    }
}

function notSupported (req, res) {
    res.status(403);
    res.send('Only POST request are supported')
}

function livenessConfirmation (req, res) {
    res.send('Up and running');
}

router.get('/', livenessConfirmation);
router.all('*', queueUrlExistedCheck);
router.post('/event-publish', publishEvent);
router.all('*', notSupported);

module.exports = router;