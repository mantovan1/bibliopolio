require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(express.static('thumbs'));
app.use(express.static('uploads'));

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./routes/user.js');
const emailRouter = require('./routes/email.js');
const bookRouter = require('./routes/book.js');
const favoriteRouter = require('./routes/favorite.js');

app.use('/user', userRouter);
app.use('/email', emailRouter);
app.use('/book', bookRouter);
app.use('/favorite', favoriteRouter);

module.exports = app;