const Admin = require('../../model/Admin');
const User = require('../../model/User');
const Blog = require('../../model/Blog');
const { isObjectIdOrHexString } = require('mongoose');
const layout = './admin/layouts/admin';
const css = ['adminUsers.css', 'adminBlogs.css'];
const title = '';
const searchType = 'user';

async function GetUserPage(req, res) {
    console.log('Getting all users')
    const users = await User.find();
    res.render('./admin/adminUsers', { layout, css, title,searchType,  users });
}
async function GetSingleUser(req, res) {
    const id = req.params.id;
    if (!id || id === '') {
        return res.redirect('./?message:No ID');
    }
    const isID = isObjectIdOrHexString(id);
    if (!isID) {
        return res.redirect('./?message:Wrong ID');
    }
    const user = await User.findById(id);
    if (!user) {
        return res.redirect('./?message:No User');
    }
    res.render('./admin/adminUserEdit', { layout, title, css,searchType, user });

}
function InsertUser(req, res) {

}
function UpdateUser(req, res) {

}
async function BlockUser(req, res) {
    const id = req.body.id;
    if (!id || id == '') {
        res.redirect('./?message=No ID. Cannot Block')
    }
    const result = await User.updateOne({ "_id": id }, { $set: { isBlock: true } })
    if (!result.acknowledged) {
        res.redirect('./?message=Fail to Block')
    }
    res.redirect('./?message=Lock User Success');
}
async function UnblockUser(req, res) {
    const id = req.body.id;
    if (!id || id == '') {
        res.redirect('./?message=No ID. Cannot Unblock')
    }
    const result = await User.updateOne({ "_id": id }, { $set: { isBlock: false } })
    if (!result.acknowledged) {
        res.redirect('./?message=Fail to Unblock')
    }
    res.redirect('./?message=Unblock User Success');
}
function DeleteUser(req, res) {

}
module.exports = { GetUserPage, GetSingleUser, InsertUser, UpdateUser, DeleteUser, BlockUser, UnblockUser }