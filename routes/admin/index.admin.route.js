require('dotenv').config();
const express = require('express');
// const app = express();
const router = express.Router();
const { GetAdminLogin, Login, Logout } = require('../../controllers/admin/index.admin.controller');
const {SetAdminSession, CheckNotLoggedIn} = require('../../utils');



router.use(SetAdminSession);

// routing
router.get('/', GetAdminLogin);

router.get('/logout', Logout);

router.post('/', Login);

router.use('/dashboard', require('./dashboard.admin.route'));

router.get('/test', function (req, res) {
    res.send('Testing Index');
})


// const Admin = require('../../model/Admin')
// function InsertAdmin() {
//     Admin.insertMany([
//         {
//             username: 'Admin',
//             email: 'admin@gmail.com',
//             gender: true,
//             age: 35,
//             phone: '0958456235',
//             password: '$2b$10$oORATbhiS03zyNiiOzpqZeJYpONaqBq/bm/.xcG0BCG8.EfXrxs1e',
//             authorization: 2,
//         },
//         {
//             username: 'admin2',
//             email: 'admin2@gmail.com',
//             gender: false,
//             age: 20,
//             phone: '0975462581',
//             password: '$2b$10$oORATbhiS03zyNiiOzpqZeJYpONaqBq/bm/.xcG0BCG8.EfXrxs1e',
//             authorization: 10,
//         }
//     ])
// }
// InsertAdmin();

module.exports = router;
