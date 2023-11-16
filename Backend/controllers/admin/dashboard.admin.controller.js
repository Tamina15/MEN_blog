const Admin = require('../../model/Admin');
const User = require('../../model/User');
const Blog = require('../../model/Blog');
const layout = './admin/layouts/admin';
const { Render } = require('../../utils');
const css = [];
async function GetDashboardPage(req, res) {
    const blogs = await Blog.find();
    res.render('./admin/adminDashboard', { layout, blogs });
}

function GetStatistics(req, res) {
    res.render('./admin/adminDashboard', { layout });

}
function GetOthers(req, res) {
    res.render('./admin/adminDashboard', { layout });

}
async function Search(req, res) {
    const title = "Search";
    const searchType = req.body.searchType;
    console.log('Search ' + searchType);
    const search = req.body.search;
    switch (searchType) {
        case 'blog':
            const blogs = await MiniSearch(req, res, search, Blog, 'title');
            if (blogs == 0) {
                break;
            }
            console.log(blogs)
            return Render(req, res, './admin/adminBlogs', { layout: false, search, css, blogs });
            break;
        case 'user':
            const users = await MiniSearch(req, res, search, User, 'username');
            if (users == 0) {
                break;
            }
            return Render(req, res, './admin/adminUsers', { layout: false, search, css, users })
            break;
        case 'admin':
            const admins = await MiniSearch(req, res, search, Admin, 'username');
            if (admins == 0) {
                break;
            }
            return Render(req, res, './admin/adminAdmins', { layout: false, search, css, admins })
            break;
        default:
            return res.redirect('/admin/dashboard/');
            break;
    }
    return res.redirect('/admin/dashboard/');
}
async function MiniSearch(req, res, search, model, searchField) {
    try {
        const searchNoSpecialChar = search.replace(/[^a-zA-Z0-9 ]/g, "");
        const data = await model.find({
            $or: [
                {
                    [searchField] : { $regex: new RegExp(searchNoSpecialChar, 'i') }
                }
            ]
        }, {}).sort({ createdAt: -1 });
        return data;
    } catch (error) {
        console.log(error);
        return 0;
    }

}
module.exports = { GetDashboardPage, GetStatistics, GetOthers, Search }