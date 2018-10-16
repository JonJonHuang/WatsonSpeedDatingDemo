const UserModel = require('../server/models').UserModel;

/**
 * 
 * @param {*} email 
 * @returns Promise<User>
 */
async function getUser(email) {
  return UserModel.findOne({email: email});
}

module.exports.getUser = {
  getUser: getUser
};
