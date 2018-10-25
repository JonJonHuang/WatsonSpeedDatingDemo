const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// var uri = "mongodb://JHuang:watsonspeedfriending@watsonspeedfriending-shard-00-00-2njuo.mongodb.net:27017,watsonspeedfriending-shard-00-01-2njuo.mongodb.net:27017,watsonspeedfriending-shard-00-02-2njuo.mongodb.net:27017/test?ssl=true&replicaSet=WatsonSpeedFriending-shard-0&authSource=admin&retryWrites=true"
const uri = "mongodb://localhost:27017";
// mongoose.connect(uri, (err) => {
//     if (err)
//         throw err;
// });

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    pwHash: {type: String, required: true},
    messages: {type: Array, required: true, }
}, {
    strict: true
});
const UserModel = mongoose.model('users', userSchema);

async function connect(uri = uri) {
    return mongoose.connect(uri)
}

mongoose.connect(uri).then(() => {
    console.log('Mongoose connection opened.');
}, (reason) => {
    console.error(reason);
}).catch((err) => {
    throw err;
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose connection closed.');
        process.exit(0);
    });
});

/**
 * 
 * @param {*} email 
 * @returns Promise<User>
 */
async function getUser(email) {
    return UserModel.findOne({email: email});
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

/**
 * 
 * @param {*} email 
 * @param {*} message 
 * @returns Promise<boolean> that resolves with if the user message was saved.
 */
async function addUserMessage(email, message) {
    let user = await getUser(email);
    if (user) {
        user.messages.push(message);
        await user.save();
        return true;
    }
    return false;
}

module.exports = {
    getUser: getUser,
    registerUser: registerUser,
    validateUser: validateUser,
    addUserMessage: addUserMessage
};
