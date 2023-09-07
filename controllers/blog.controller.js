const Blog = require('../model/Blog');

async function GetBlogByID(req, res) {
    const blog = await Blog.findById(req.params.id);
    const newest_blog = await Blog.find().sort({ x: -1 }).limit(3);
    res.render('blog', { blog, newest_blog });
}

module.exports = { GetBlogByID };