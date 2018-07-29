const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/user');
const config = require('../config/database');

router.post('/register', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err) => {
        if(err) {
            res.json({ success: false, msg: 'Failed to register user' });
        } else {
            res.json({ success: true, msg: 'User registered' });
        }
    });
});

router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        //if(err) throw (err);
        if(!user) {
            return res.json({ success: false, msg: "User not found" });
        }

        User.verifyPassword(password, user.password, (err, isMatch) => {
            //if(err) throw (err);
            if(isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800   // 1 week in seconds
                });
                
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                      id: user._id,
                      name: user.name,
                      username: user.username,
                      email: user.email
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        })
    });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        user: req.user
    });
});

module.exports = router;