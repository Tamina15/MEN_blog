require('dotenv').config();
const express = require('express');
// const app = express();
const router = express.Router();
const {UserPage, Login, Register } = require('../controllers/user.controller');

// routing
router.get('/',UserPage);

router.get('/login', Login);

router.get('/register', Register);

router.get('/test', function (req, res) {
    res.send('Testing');
})

module.exports = router;