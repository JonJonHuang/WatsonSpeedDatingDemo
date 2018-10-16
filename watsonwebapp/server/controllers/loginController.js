const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const UserModel = require('../models').UserModel;
const dbUtils = require('../../util').db;

// TODO - have user enter db credentials instead of storing raw uri in file.
// const uri = "mongodb://JHuang:watsonspeedfriending@watsonspeedfriending-shard-00-00-2njuo.mongodb.net:27017,watsonspeedfriending-shard-00-01-2njuo.mongodb.net:27017,watsonspeedfriending-shard-00-02-2njuo.mongodb.net:27017/test?ssl=true&replicaSet=WatsonSpeedFriending-shard-0&authSource=admin&retryWrites=true";
const uri = require('../../config').dev.dbURI;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(uri);
}

/**
 * 
 * @param {*} email 
 * @param {*} username 
 * @param {*} password 
 * @returns Promise<boolean> that resolves with whether the user was successfully created.
 */
async function registerUser(email, username, password) {
  let user = await getUser(email);
  if (!user) {
    let salt = await bcrypt.genSalt();
    let hash = await bcrypt.hash(password, salt);
    let newUser = new UserModel({
      email: email,
      username: username,
      pwHash: hash,
      messages: []
    });
    await newUser.save();
    return true;
  }
  return false;
}

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @returns Promise<boolean> that resolves with whether the credentials match.
 */
async function validateUser(email, password) {
  let user = await getUser(email);
  if (user) {
    return bcrypt.compare(password, user.pwHash);
  }
  return false;
}

module.exports = {
  registerUser: registerUser,
  validateUser: validateUser   
}
