const Admin = require('./model/Admin');
const Blog = require('./model/Blog');
const jwt = require('jsonwebtoken');
function CheckNotLoggedIn(name, redirectTo) {
    return function (req, res, next) {
        // If not logged in, continue
        if (req.session[name] == undefined) {
            next();
        }
        // If logged in, return to main page
        else {
            console.log(req.session[name]);
            console.log('Logged In');
            res.redirect(redirectTo);
        }
    }
}
function CheckLoggedIn(name, redirectTo) {
    return function (req, res, next) {
        // If logged in, continue
        if (req.session[name]) {
            next();
        }
        // If not logged in, return to main page
        else {
            console.log('Not Logged In');
            res.redirect(redirectTo);
        }
    }
}

function SetUserSession(req, res, next) {
    console.log(req.session);
    console.log(req.session.id);
    if (req.session.id != undefined) {
        res.locals.user = req.session.user;
        res.locals.id = req.session.id;
    }
    next();
}

function SetAdminSession(req, res, next) {
    console.log(req.session);
    if (req.session.id != undefined) {
        res.locals.adminName = req.session.adminName;
        res.locals.adminEmail = req.session.adminEmail;
        res.locals.adminId = req.session.adminId;
    }
    next();
}

async function SetLoginFalse() {
    try {
        const result = await Admin.updateMany({}, { isLogin: false });
        console.log('Log Admins Out Succeed');
    } catch (error) {
        console.log('Cannot Log Admins Out');
    }
}

function Render(req, res, page, params) {
    res.render(page, params, (err, renderedContent) => {
        if (err) {
            console.error('Error rendering partial:', err);
            res.status(500).send('Error rendering partial');
        } else {
            // console.log(renderedContent);
            res.send(renderedContent);
        }
    });
}

function JWT(params) {
    return jwt.sign(params, process.env.JWT_TOKEN_SECRET, { expiresIn: '1800s' })
}


module.exports = { CheckNotLoggedIn, CheckLoggedIn, SetUserSession, SetAdminSession, SetLoginFalse, Render, JWT };