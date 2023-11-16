const Blog = require('../model/Blog');
const css = ['blog.css'];

async function GetBlogByID(req, res) {
    const blog = await Blog.findById(req.params.id);
    const newest_blog = await Blog.find().sort({ x: -1 }).limit(3);
    res.render('blog', {css, blog, newest_blog });
}
function InsertBlog(req,res) {
    
}

module.exports = { GetBlogByID ,InsertBlog};