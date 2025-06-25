// routes/PriceRouter.js
const express = require('express');
const router = express.Router();
const PriceController = require('../Controller/PriceController');

router.post('/', PriceController.create);
router.put('/:id', PriceController.update);
router.delete('/:id', PriceController.delete);
router.get('/', PriceController.findAll);
router.get('/:id', PriceController.findById);

module.exports = router;
