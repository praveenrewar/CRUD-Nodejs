const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database Error' + err);
});

const app = express();

const users = require('./routes/users');

const port = 3000;

app.use(cors());

app.use(bodyParser.json());

app.use('/users', users);

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.get('/', (req, res) => {
    res.send("Welcome to the future");
})

app.listen(port, () => {
    console.log("Server is running on port " + port);
});