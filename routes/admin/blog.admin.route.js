require('dotenv').config();
const express = require('express');
// const app = express();
const router = express.Router();
const {GetBlogPage, GetSingleBlog, InsertBlog, UpdateBlog, DeleteBlog} = require('../../controllers/admin/blog.admin.controller');


// router.use(SetSession);

// routing
router.get('/', GetBlogPage);

router.get('/:id', GetSingleBlog);

router.post('/', InsertBlog);

router.put('/:id', UpdateBlog);

router.delete('/delete', DeleteBlog);

router.post('/delete', DeleteBlog);


router.get('/test', function (req, res) {
    res.send('Testing Dashboard');
})

module.exports = router;
