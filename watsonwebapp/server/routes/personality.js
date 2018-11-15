var express = require('express');
var router = express.Router();


var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var personalityInsight = new PersonalityInsightsV3({
    version: '2018-09-20',
    username: '46267b81-a12c-436a-9cfc-e315fc056275',
    password: 'EKB44xNnNUUF',
    url: 'https://gateway-wdc.watsonplatform.net/personality-insights/api'
});

var userMatcher = require('../../util/match.js');
var matcher = new userMatcher;
var personalityAnalyzer = require('../../util/personalityanalyzer.js');
var pa = new personalityAnalyzer;

router.get('/', async function(req,res,next){
    let user = await db.getUser(req.body.email);
    if (user) {
      var personalityArr = pa.getPersonality(req.body.email);
      console.log(personalityArr);
    } else {
        res.send(['There was an error.'])
    } 
})

module.exports = router;
