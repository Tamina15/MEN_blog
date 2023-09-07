require('dotenv').config();

const express = require('express');
const app = express();

// variable
const port = process.env.PORT || 15000;
const express_layout = require('express-ejs-layouts');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
// connect to DB
connectDB();

// setting
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));
app.use(express_layout);


app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', require('./routes/index.route'));
app.use('/user', require('./routes/user.route'));
app.use('/blog', require('./routes/blog.route'));

// routing


// 404
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

// listen
app.listen(port, function () {
  console.log("App running at " + port);
})