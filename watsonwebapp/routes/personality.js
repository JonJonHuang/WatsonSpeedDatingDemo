var express = require('express');
var router = express.Router();


var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var personalityInsight = new PersonalityInsightsV3({
    version: '2018-09-20',
    username: '46267b81-a12c-436a-9cfc-e315fc056275',
    password: 'EKB44xNnNUUF',
    url: 'https://gateway-wdc.watsonplatform.net/personality-insights/api'
});

var userMatcher = require('../bin/matcher.js');
var mather = new userMatcher;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('personality', { title: 'User Personality' });
});

router.post('/', function(req,res,next){

})

module.exports = router;
