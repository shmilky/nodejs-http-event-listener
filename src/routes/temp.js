'use strict';

const router = require('express').Router();

router.all('*', function (req, res) {
    const parsedRequest = {
        params: req.params,
        headers: req.headers,
    };

    if (req.body && req.method.toLowerCase() !== 'get') {
        parsedRequest.body = req.body;
    }

    res.send(parsedRequest);
});

module.exports = router;