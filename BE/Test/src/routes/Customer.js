const express = require('express');
const CusController = require('../Controller/CustomerController');

const router = express.Router();

router.post('/create', CusController.create);
router.get('/getAll', CusController.getAllCus);
router.put('/:id', CusController.update);
router.delete('/:id', CusController.delete);
router.post('/search', CusController.search);
router.get('/:id', CusController.getById);

module.exports = router;