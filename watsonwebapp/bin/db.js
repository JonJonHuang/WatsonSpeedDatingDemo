const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// const uri = "mongodb://Default:12345@watsonspeedfriending-shard-00-00-2njuo.mongodb.net:27017,watsonspeedfriending-shard-00-01-2njuo.mongodb.net:27017,watsonspeedfriending-shard-00-02-2njuo.mongodb.net:27017/test?ssl=true&replicaSet=WatsonSpeedFriending-shard-0&authSource=admin&retryWrites=true";
const uri = "mongodb+srv://Default:12345@watsonspeedfriending-2njuo.mongodb.net/test?retryWrites=true";
// const uri = "mongodb://localhost:27017";
// mongoose.connect(uri, (err) => {
//     if (err)
//         throw err;
// });

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    pwHash: {type: String, required: true},
    messages: {type: Array, required: true},
    contextId: {type: String, default: null},
    personality: {type: Array, required: true}
}, {
    strict: true
});
const UserModel = mongoose.model('users', userSchema);

mongoose.connect(uri).then(() => {
    console.log('Mongoose connection opened.');
}).catch((err) => {
    console.error(err);
    process.exit(1);
});

process.on('exit', () => {
    console.log('Closing Mongoose connection.');
    mongoose.disconnect().then(() => {
        console.log('Mongoose connection closed.')
        process.exit(0);
    }, (err) => {
        throw err;
    });
});
// process.on('SIGINT', () => {
//     console.log('hi');
//     mongoose.disconnect().then(() => {
//         console.log('Mongoose connection closed.')
//         process.exit(0);
//     }, (err) => {
//         throw err;
//     });
// });

/**
 * 
 * @param {*} email 
 * @returns Promise<User>
 */
async function getUser(email) {
    return UserModel.findOne({email: email}).catch((err) => {
        console.error(err);
    });;
}

/**
 * @returns Promise<Users>
 */
async function getAllUsers() {
    return UserModel.find({}).catch((err) => {
        console.error(err);
    });
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
            messages: [],
            personality: []
        });
        let success = await newUser.save().then(() => {
            return true;
        }, (err) => {
            console.error(err);
            return false;
        });
        return success;
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
        return bcrypt.compare(password, user.pwHash).catch((err) => {
            console.error(err);
        });
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
        let success = await user.save().then(() => {
            return true;
        }, (err) => {
            return false;;
        });
        return success;
    }
    return false;
}

async function setContextId(email, contextId) {
    return UserModel.updateOne({email: email}, {contextId: contextId}).catch((err) => {
        console.error(err);
    });
}

module.exports = {
    getUser: getUser,
    registerUser: registerUser,
    validateUser: validateUser,
    addUserMessage: addUserMessage,
    setContextId: setContextId,
    getAllUsers: getAllUsers
};
