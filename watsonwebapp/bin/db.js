var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

// var uri = "mongodb://JHuang:watsonspeedfriending@watsonspeedfriending-shard-00-00-2njuo.mongodb.net:27017,watsonspeedfriending-shard-00-01-2njuo.mongodb.net:27017,watsonspeedfriending-shard-00-02-2njuo.mongodb.net:27017/test?ssl=true&replicaSet=WatsonSpeedFriending-shard-0&authSource=admin&retryWrites=true"
var uri = "mongodb://localhost:27017";
mongoose.connect(uri, (err) => {
    if (err)
        throw err;
});

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    pwHash: {type: String, required: true},
    messages: {type: Array, required: true, }
}, {
    strict: true
});
const UserModel = mongoose.model('users', userSchema);

/**
 * 
 * @param {*} email 
 * @returns Promise<User>
 */
function getUser(email) {
    return UserModel.findOne({email: email});
}

/**
 * 
 * @param {*} email 
 * @param {*} username 
 * @param {*} password 
 * @returns Promise<boolean> that resolves with whether the user was successfully created.
 */
function registerUser(email, username, password) {
    return getUser(email).then((user) => {
        if (user) {
            //Dont do anything, user already exists
            return false;
        }
        return bcrypt.genSalt().then((salt) => {
            return bcrypt.hash(password, salt).then((hash) => {
                var newUser = new UserModel({
                    email: email,
                    username: username,
                    pwHash: hash
                });
                return newUser.save().then(() => {
                    return true;
                });
            });
        });
    }, (err) => {
        console.error(err);
        return false;
    });
}

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @returns Promise<boolean> that resolves with whether the credentials match.
 */
function validateUser(email, password) {
    return getUser(email).then((user) => {
        if (!user) {
            // TODO - fail the validation
            return false;
        }
        return bcrypt.compare(password, user.pwHash);
    });
}

/**
 * 
 * @param {*} email 
 * @param {*} message 
 * @returns Promise<boolean> that resolves with if the user message was saved.
 */
function addUserMessage(email, message) {
    return getUser(email).then((user) => {
        if (!user) {
            // User doesn't exist
            return false;
        }
        user.messages.push(message);
        user.save().then(() => {
            return true;
        });
    }, (err) => {
        console.error(err);
        return false;
    });
}

module.exports = {
    getUser: getUser,
    registerUser: registerUser,
    validateUser: validateUser,
    addUserMessage: addUserMessage
};
