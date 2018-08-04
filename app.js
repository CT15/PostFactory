const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const users = require('./routes/users');
const posts = require('./routes/posts');

const config = require('./config/database');

const app = express();

const portNumber = 3000;

mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
})
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
})

app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);
app.use('/posts', posts);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Invalid endpoint.');
})

app.listen(portNumber, () => {
    console.log('Server started on port ' + portNumber);
})
