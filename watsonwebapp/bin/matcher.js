
var UserMatcher = class {
  constructor() {
    this.userProfiles = [];
  }

  addUser(username) {
    var matchingUsers = this.userProfiles.filter(function(value) {
      return value.username === username;
    });
    if (matchingUsers.length === 0) {
      this.userProfiles.push({username: username});
    }
  }

  addInterest(username, category, value) {
    var matchingUsers = this.userProfiles.filter(function(value) {
      return value.username === username;
    });
    for (let user of matchingUsers) {
      user[category] = value;
    }
  }

  findMatches(entities, groupsize) {
    var incompleteGroups = {};
    var completeGroups = [];
    for (let entity of entities) {
        incompleteGroups[entity] = {};
    }
    for (let user of this.userProfiles) {
        for (let entity of entities) {
            if (!user.hasOwnProperty(entity)) continue;
            var userValue = user[entity];
            if (!incompleteGroups[entity].hasOwnProperty(userValue)) {
                incompleteGroups[entity][userValue] = [user];
            } else if (groupsize === 0 || incompleteGroups[entity][userValue].length < groupsize) {
                incompleteGroups[entity][userValue].push(user);
            } else {
                completeGroups.push(incompleteGroups[entity][userValue]);
                incompleteGroups[entity][userValue] = [user];
            }
        }
    }
    for (let entity in incompleteGroups) {
        for (let entityVal in incompleteGroups[entity]) {
            completeGroups.push(incompleteGroups[entity][entityVal]);
        }
    }
    return completeGroups;
  }

// TEMPORARY FIX FOR OUR MVP
  findGenreMatches() {
    var results = [];
    for (let user of this.userProfiles) {
      var user_to_compare = user;
      for (let other_user of this.userProfiles) {
        if (user_to_compare.username != other_user.username) {
          if (user_to_compare.genre == other_user.genre) {
            results.push("Pair: " + user_to_compare.username + ' and ' + other_user.username);
          }
        }
      }
    }
    return results;
    }

};

module.exports = UserMatcher;
