const express = require('express');
const router = express.Router();
var users = {};
var personalityArr = require('../routes/personality.js');
var matched;

var db = require('../../util/db.js');
router.get('/', async function(req, res, next) {
    matched = findMatch(personalityArr)
});
function findMatch(personalityArr){
    var users = db.getAllUsers();
    var personalityArr1;
    for (var user in users) {
        personalityArr1 = user.personality();
        var userName = user.username();
        var i;
        var dist;
        var totalDist = 0;
        var maxDist = Number.MIN_VALUE;
        for(i = 0; i<personalityArr.length; i++){
            dist = Math.pow((personalityArr[i]-personalityArr1[i]),2);
            if(dist >= maxDist){
                maxDist = dist;
            }
            totalDist += dist;
            totalDist = Math.sqrt(totalDist);
        }
        var userMap = new Map();
        userMap.set(totalDist, userName);
        var scores = [];
        scores.push(totalDist);
    }
    scores.sort(function(a, b){return a - b});
    var topMatch = [];
    for(i=0;i<scores.length;i++){
        topMatch.push(userMap.get(scores[i]));
    }
    return topMatch;
}
module.exports = router;