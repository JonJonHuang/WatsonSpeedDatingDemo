const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uri = require('../../config.json').dev.dbURI;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(uri);
}

const userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true},
  pwHash: {type: String, required: true},
  messages: {type: Array, required: true, }
}, { strict: true });
const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;
