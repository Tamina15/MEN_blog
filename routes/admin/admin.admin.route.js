require('dotenv').config();
const express = require('express');
// const app = express();
const router = express.Router();
const {GetAdminPage } = require('../../controllers/admin/admin.admin.controller');


// router.use(SetSession);

// routing
router.get('/', GetAdminPage);

router.get('/test', function (req, res) {
    res.send('Testing Dashboard');
})

module.exports = router;
