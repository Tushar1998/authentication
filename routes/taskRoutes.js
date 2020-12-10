const express = require('express');
const getAllTask = require('../controllers/taskController');
const protectRoute = require('../middlewares/protectRoute');

const router = express.Router();

router.route('/').get(protectRoute, getAllTask);

module.exports = router;