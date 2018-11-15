var users = {};
var db = require('./db.js');

async function findMatch(userEmail) {
    let users = await db.getAllUsers();
    let user = await db.getUser(userEmail);
    var personalityArr = user.personality;
    var tempUserArr;
    var userMap = new Map();
    var scores = [];
    for (let user of users) {
        if (user.email.localeCompare(userEmail) != 0) {
            tempUserArr = user.personality;
            var email = user.email;
            var i;
            var dist;
            var totalDist = 0;
            if (tempUserArr.length > 0) {
                for (i = 0; i < personalityArr.length; i++) {
                    dist = Math.pow((personalityArr[i].val - tempUserArr[i].val), 2);
                    totalDist += dist;
                }
                userMap.set(Math.sqrt(totalDist), email);
                scores.push(Math.sqrt(totalDist));
                console.log(email + " " + totalDist);
            }
        }
    }
        scores.sort(function (a, b) {
            return a - b
        });
        var topMatch = [];
        for (i = 0; i < scores.length; i++) {
            topMatch.push(userMap.get(scores[i]));
        }
    
    console.log(topMatch);
    return topMatch;
}

module.exports = {
    findMatch : findMatch
};
