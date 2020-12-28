var express = require('express');
var router = express.Router();

//todo: use database
const userScore = {
    "we": 30,
    "qw": 40,
    "eew": 50
};

router.post('/', function(req, res, next) {
    const name = req.body.name;
    const newScore = req.body.newScore;

    if (newScore != null) {
        userScore[name] = newScore;
        return;
    }

    if (userScore[name] == null) {
        userScore[name] = 0;
    }

    res.json({ score: userScore[name] })
});

module.exports = router;
