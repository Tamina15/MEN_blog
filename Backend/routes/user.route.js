require('dotenv').config();
const express = require('express');
// const app = express();
const router = express.Router();
const { UserPage, GetLoginPage, GetRegisterPage, Login, Logout, Register, CheckLoggedIn, CheckNotLoggedIn} = require('../controllers/user.controller');

// routing
router.get('/test', function (req, res) {
    res.send('Testing User');
})
router.get('/login', CheckNotLoggedIn, GetLoginPage);

router.get('/register', CheckNotLoggedIn,GetRegisterPage);

router.post('/login',CheckNotLoggedIn, Login);

router.post('/register',CheckNotLoggedIn, Register);

router.use(CheckLoggedIn);

router.get('/', UserPage);

router.get('/logout', Logout)


module.exports = router;