require('dotenv').config();

const layout = './layouts/noheader';
const User = require('../model/User');
const bcrypt = require('bcrypt');
const css = ['login.css'];
function UserPage(req, res) {
    res.render('user');
}

function GetLoginPage(req, res) {
    res.render('login', { layout, css })
}

function GetRegisterPage(req, res) {
    res.render('register', { layout, css });
}

//  0  Information Error
async function Login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.render('login', { layout, css, message: 0 });
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.render('login', { layout, css, message: 0 });
    }
    const hashedPassword = await bcrypt.compare(password, user.password);
    if (!hashedPassword) {
        return res.render('login', { layout, css, message: 0 });
    }
    req.session.user = user.username;
    req.session.id = user.id;
    req.session.save();
    res.redirect('/');
}

function Logout(req, res) {
    req.session.destroy(function () {
        console.log('User Log Out');
    });
    res.redirect('/');
}
//  0  Information Error
// -1  User Existed
async function Register(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const phone = req.body.phone;
    const age = req.body.age;
    const gender = req.body.gender;
    const password = req.body.password;
    const repeat_password = req.body.repeat_password;
    if (!username || !email || !phone || !password || !repeat_password) {
        return res.render('register', { layout, css, message: 0 });
    }
    const user = await User.findOne({ email });
    if (user) {
        return res.render('register', { layout, css, message: -1 });
    }
    if (password !== repeat_password) {
        return res.render('register', { layout, css, message: -2 });
    }
    const salt = bcrypt.genSaltSync(process.env.SALT);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const hashedRepeatedPassword = bcrypt.hashSync(repeat_password, salt);
    if (hashedPassword !== hashedRepeatedPassword) {
        return res.render('register', { layout, css, message: -2 });
    }
    const gen = gender === 'male' ? true : false;
    const newUser = new User({
        username: username,
        email: email,
        age: age,
        phone: phone,
        gender: gen,
        password: hashedPassword
    });
    console.log(newUser);
    const result = await User.create(newUser);
    if (!result) {
        return res.render('register', { layout, css, message: -4 });
    }
    Login(req, res);
}

function CheckNotLoggedIn(req, res, next) {
    // If not logged in, continue
    if (req.session.user == undefined) {
        next();
    }
    // If logged in, return to main page
    else {
        console.log('User Logged In');
        res.redirect('/');
    }
}
function CheckLoggedIn(req, res, next) {
    // If logged in, continue
    if (req.session.user) {
        next();
    }
    // If not logged in, return to main page
    else {
        console.log('User Logged In');
        res.redirect('/');
    }
}
module.exports = { UserPage, GetLoginPage, GetRegisterPage, Login, Logout, Register, CheckLoggedIn, CheckNotLoggedIn };