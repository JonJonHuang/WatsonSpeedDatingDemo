var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('uuid/v4');

// var uri = "mongodb://JHuang:watsonspeedfriending@watsonspeedfriending-shard-00-00-2njuo.mongodb.net:27017,watsonspeedfriending-shard-00-01-2njuo.mongodb.net:27017,watsonspeedfriending-shard-00-02-2njuo.mongodb.net:27017/test?ssl=true&replicaSet=WatsonSpeedFriending-shard-0&authSource=admin&retryWrites=true"
var uri = "mongodb://localhost:27017"

var loginSchema = new Schema({
    email: String,
    username: String,
    pwHash: String,
    pwSalt: String
});

function registerUser(email, username, password) {
    
}
