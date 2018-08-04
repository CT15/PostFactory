const mongoose = require('mongoose');

// Post schema
const PostSchema = mongoose.Schema({
    username: {
        type: String,
    },
    datetime: {
        type: Date,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;

module.exports.addPost = function (newPost, callback) {
    newPost.save(callback);
}

module.exports.getAllPosts = function(callback) {
    Post.find({}, callback);
}

module.exports.getPostsByUsername = function(username, callback) {
    Post.find({ username: username }, callback);
}