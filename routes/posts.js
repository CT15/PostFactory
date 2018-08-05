const express = require('express');
const router = express.Router();

const Post = require('../models/post');

// Create a new post
router.post('/new', (req, res) => {
    let username = "Anonymous";

    if(!req.body.isAnonymous) { username = req.body.username; }

    let newPost = new Post({
        username: username,
        datetime: new Date(),
        content: req.body.content,
        likes: 0
    });

    Post.addPost(newPost, (err) => {
        if(err) {
            res.json({ success: false, msg: 'Failed to add new post' });
        } else {
            res.json({ success: true, msg: 'New post added' });
        }
    });
});

// Get all posts posted by everyone
router.get('/', (req, res) => {
    Post.getAllPosts((err, posts) => {
        if(err) {
            return res.json({ success: false, msg: 'Unable to retrieve posts' });
        }
        res.json({ success: true, posts: posts });
    });        
});

router.get('/user/:username', (req, res) => {
    Post.getPostsByUsername(req.params.username, (err, posts) => {
        if(err) {
            return res.json({ success: false, msg: 'Unable to retrieve posts' });
        }
        res.json({ success: true, posts: posts });
    });
});

router.post('/id/:id/like', (req, res) => {
    Post.increaseLikeById(req.params.id, (err) => {
        if(err) {
            return res.json({ success: false, msg: 'Unable to increase likes' });
        }
        return res.json({ success: true, msg: 'Likes count increased' });
    })
});

module.exports = router;
