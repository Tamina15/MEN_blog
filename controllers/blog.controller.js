const Blog = require('../model/Blog');
async function GetBlogByID(req, res) {
    const blog = await Blog.findById(req.params.id);
    res.render('blog', { blog });
}
module.exports = { GetBlogByID };