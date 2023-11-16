const bcrypt = require('bcrypt');
const Admin = require('../../model/Admin');
const User = require('../../model/User');
const layout = './admin/layouts/adminLogin';
const css = ['adminLogin.css'];


function GetAdminLogin(req, res) {
    res.render('./admin/adminLogin', { layout });
}

async function Login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.render('./admin/adminLogin', { layout, message: 0 });
    }
    const admin = await Admin.findOne({ email })
    if (!admin) {
        return res.render('./admin/adminLogin', { layout, message: -1 });
    }
    const hashedPassword = await bcrypt.compare(password, admin.password);
    if (!hashedPassword) {
        return res.render('./admin/adminLogin', { layout, message: -2 });
    }
    if (admin.isLogin) {
        return res.render('./admin/adminLogin', { layout, message: -3 });
    }
    const id = admin.id;
    const result = await Admin.updateOne({ _id: id }, { $set: { isLogin: true } });
    if (result) {
        req.session.adminName = admin.username;
        req.session.adminEmail = admin.email;
        req.session.adminId = admin.id;
        req.session.save();
        return res.redirect('/admin/dashboard');
    }
    else {
        return res.render('./admin/adminLogin', { layout, message: -4 });
    }
}

async function Register(req, res) {

}

async function Logout(req, res) {
    const id = req.session.adminId;
    if (!id) {
        return res.redirect('/admin');
    }
    const find = await Admin.findById({ id });
    if (!find) {
        return res.redirect('/admin');
    }
    try {
        const result = await Admin.updateOne({ _id: id }, { $set: { isLogin: false } });
    } catch (error) {
        console.log(error);
    }
    res.redirect('/admin');
}

module.exports = { GetAdminLogin, Login, Register, Logout };