const Blog = require('../model/Blog');
const User = require('../model/User');
const moment = require('moment');

async function GetIndexPage(req, res) {
    try {

        const title = 'My Blog';
        // const search = await User.find({_id:"64f0086923f43238c6b817ca"});
        // const random = await User.aggregate([{ $sample: { size: 5 } }]).exec(); // You want to get 5 docs
        // console.log(random);
        const data = await Blog.find();
        const datas = [title, moment, data];
        res.render('index', { title, moment, data });
        //res.json({"message":"alive"});
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
        res.render('index', { title, moment, data, search });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
    // console.log(req.body);
}
function RedirectIndex(req, res) {
    res.redirect('/');
}

function SetSession(req, res, next) {
    if (req.session.user != undefined) {
        console.log(req.session);
        res.locals.user = req.session.user;
        res.locals.id = req.session.id;
    }
    next();
}

module.exports = { GetIndexPage, Search, RedirectIndex, SetSession };
