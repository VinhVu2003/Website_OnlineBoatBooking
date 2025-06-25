// Routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');

// Đăng nhập
router.post('/', authController.login);

module.exports = router;
