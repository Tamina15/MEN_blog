const Blog = require('../model/Blog');
const moment = require('moment');
const db = require('mongoose');

async function GetIndexPage(req, res) {
    try {
        // const updat = await Blog.updateMany({ createdAt: "2023-08-31T02:03:55.552+00:00" }, { $set: { preview: "null" } });
        const data = await Blog.find();
        // console.log(updat);
        res.render('index', { moment, data });
    } catch (error) {
        console.log(error);
    }
}
function RedirectIndex(req, res) {
    res.redirect('/');
}

module.exports = { GetIndexPage, RedirectIndex };