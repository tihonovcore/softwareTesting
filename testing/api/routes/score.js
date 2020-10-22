var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    const name = req.body.name;

    //todo: use database
    //todo: support registration
    const map = {
        "we": 30,
        "qw": 40,
        "eew": 50
    };

    res.json({ score: map[name] })
});

module.exports = router;
