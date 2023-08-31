require('dotenv').config();
const express = require('express');
// const app = express();
const router = express.Router();
const { RedirectIndex } = require('../controllers/index.controller');
const { GetBlogByID } = require('../controllers/blog.controller');
// routing
router.get('/', RedirectIndex);
router.get('/:id', GetBlogByID);
router.get('/test', function (req, res) {
    res.send('Testing Blog');
})

module.exports = router;