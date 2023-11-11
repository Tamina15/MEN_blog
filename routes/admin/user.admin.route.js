require('dotenv').config();
const express = require('express');
// const app = express();
const router = express.Router();
const { GetUserPage, GetSingleUser, InsertUser, UpdateUser, DeleteUser, BlockUser, UnblockUser } = require('../../controllers/admin/user.admin.controller');


// router.use(SetSession);

// routing
router.get('/', GetUserPage);

router.get('/:id', GetSingleUser);

router.post('/', InsertUser);

router.put('/:id', UpdateUser);

router.delete('/:id', DeleteUser);
router.post('/edit', DeleteUser);

router.post('/block', BlockUser);
router.post('/unblock', UnblockUser);

router.get('/test', function (req, res) {
    res.send('Testing Admin User');
})

module.exports = router;
