require('dotenv').config();
const express = require('express');
// const app = express();
const router = express.Router();
const { GetDashboardPage, GetStatistics, GetOthers, Search } = require('../../controllers/admin/dashboard.admin.controller');


// router.use(SetSession);

// routing
// router.get('/', GetDashboardPage);
router.get('/', function (req, res) {
    res.redirect('./dashboard/blogs');
});
router.get('/statistics', GetStatistics);
router.get('/others', GetOthers);


router.use('/blogs', require('./blog.admin.route'));
router.use('/users', require('./user.admin.route'));
router.use('/admins', require('./admin.admin.route'));
router.post('/search', Search)
router.get('/test', function (req, res) {
    res.send('Testing Dashboard');
})

module.exports = router;
