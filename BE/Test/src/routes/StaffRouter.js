// routes/StaffRouter.js
const express = require('express');
const router = express.Router();
const StaffController = require('../Controller/StaffController');

router.post('/', StaffController.create);
router.put('/:id', StaffController.update);
router.delete('/:id', StaffController.delete);
router.get('/', StaffController.findAll);
router.get('/:id', StaffController.findById);

module.exports = router;
