require('dotenv').config();
const express = require('express');
// const app = express();
const router = express.Router();
const { RedirectIndex } = require('../controllers/index.controller');
const { GetBlogByID, InsertBlog } = require('../controllers/blog.controller');
const { CheckLoggedIn } = require('../utils');
// routing
router.get('/', RedirectIndex);

router.get('/:id', GetBlogByID);

router.post('/', InsertBlog);

router.get('/test', function (req, res) {
    res.send('Testing Blog');
})

module.exports = router;