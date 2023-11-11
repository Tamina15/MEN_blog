const Blog = require('../model/Blog');
const User = require('../model/User');
const moment = require('moment');
const css = ['blog.css'];
async function GetIndexPage(req, res) {
    try {

        const title = 'My Blog';
        // const search = await User.find({_id:"64f0086923f43238c6b817ca"});
        // const random = await User.aggregate([{ $sample: { size: 5 } }]).exec(); // You want to get 5 docs
        // console.log(random);
        const data = await Blog.find();
        const datas = [title, moment, data];
        res.render('index', { title, moment, data, css });
    } catch (error) {
        console.log(error);
    }
}
async function Search(req, res) {
    const title = "Search";
    try {
        const search = req.body.search;
        const searchNoSpecialChar = search.replace(/[^a-zA-Z0-9 ]/g, "");
        const data = await Blog.find({
            $or: [
                {
                    title: { $regex: new RegExp(searchNoSpecialChar, 'i') }
                }
            ]
        });
        res.render('index', { title, moment, data, search, css });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
    // console.log(req.body);
}
function GetNewBlog(req, res) {
const title = 'New Blog'
    res.render('newblog', { title, css })
}
function RedirectIndex(req, res) {
    res.redirect('/');
}



module.exports = { GetIndexPage, Search, RedirectIndex, GetNewBlog };