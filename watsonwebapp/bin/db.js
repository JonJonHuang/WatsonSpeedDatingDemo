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
    pwHash: {type: String, required: true}
}, {
    strict: true
});
const UserModel = mongoose.model('users', userSchema);

function getUser(email) {
    return UserModel.findOne({email: email});
}

function registerUser(email, username, password) {
    getUser(email).then((user) => {
        if (!user) {
            const salt = bcrypt.genSalt((err, salt) => {
                if (err) {
                    // TODO - should notify the user that an error occured while creating their account
                    console.error(err);
                    return;
                }
                const hash = bcrypt.hash(password, salt, (err, hash) => {
                    var newUser = new UserModel({
                        email: email,
                        username: username,
                        pwHash: hash
                    });
                    newUser.save((err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
                });
            });
        } else {
            //TODO - Dont do anything, user already exists
        }
    });
}

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @returns A Promise that resolves with a boolean value denoting whether the credentials match.
 */
function validateUser(email, password) {
    return getUser(email).then((user) => {
        if (!user) {
            // TODO - fail the validation
            return;
        }
        return bcrypt.compare(password, user.pwHash);
    });
}

module.exports = {
    getUser: getUser,
    registerUser: registerUser,
    validateUser: validateUser
};
