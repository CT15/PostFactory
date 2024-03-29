const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

// static methods of the model
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = { username: username };
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        //if(err) throw (err);
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            //if(err) throw (err);
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}

module.exports.verifyPassword = function(userPassword, hash, callback) {
    bcrypt.compare(userPassword, hash, (err, isMatch) => {
        //if(err) throw (err);
        callback(null, isMatch);
    })
}