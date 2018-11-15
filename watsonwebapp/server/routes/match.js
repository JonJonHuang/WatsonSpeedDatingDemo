const express = require('express');
const router = express.Router();


var db = require('../../util/db.js');
var matcher = require('../../util/match');
router.get('/', async function(req, res, next) {
    var matched = matcher.findMatch(userEmail);
});

module.exports = router;
