// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const AccountController = require('../Controller/AccountController');

router.post('/', AccountController.create);
router.get('/:id', AccountController.getById);
router.put('/:id', AccountController.update);
router.delete('/:id', AccountController.delete);
router.get('/', AccountController.findAll); // Để lấy danh sách tất cả tài khoản
router.post('/login', AccountController.login);

module.exports = router;
