
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
};

module.exports = UserMatcher;
