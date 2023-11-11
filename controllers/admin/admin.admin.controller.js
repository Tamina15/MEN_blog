const Admin = require('../../model/Admin');
const User = require('../../model/User');
const Blog = require('../../model/Blog');
const layout = './admin/layouts/admin';
const css = ['adminAdmins.css'];
const searchType = 'admin';

async function GetAdminPage(req, res) {
    const admins = await Admin.find({}, { password: 0, token: 0, authorization: 0, createdAt: 0, updatedAt: 0 });
    res.render('./admin/adminAdmins', { layout, css,searchType,  admins });
}

module.exports = { GetAdminPage }