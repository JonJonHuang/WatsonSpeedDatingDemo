var users = {};
var db = require('../../util/db.js');

function findMatch(userEmail){
    var users = db.getAllUsers();
    var personalityArr = db.getUser(userEmail).personality;
    var personalityArr1;
    for (var user in users) {
        if (user.email.localeCompare(userEmail) != 0) {
            personalityArr1 = user.personality;
            var userName = user.username;
            var i;
            var dist;
            var totalDist = 0;
            for (i = 0; i < personalityArr.length; i++) {
                dist = Math.pow((personalityArr[i] - personalityArr1[i]), 2);
                totalDist += dist;
            }
            var userMap = new Map();
            userMap.set(Math.sqrt(totalDist), userName);
            var scores = [];
            scores.push(totalDist);
        }
        scores.sort(function (a, b) {
            return a - b
        });
        var topMatch = [];
        for (i = 0; i < scores.length; i++) {
            topMatch.push(userMap.get(scores[i]));
        }
    }
    return topMatch;
}

module.exports = {
    findMatch : findMatch
};
