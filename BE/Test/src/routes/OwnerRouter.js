// Routes/OwnerRouter.js
const express = require('express');
const router = express.Router();
const OwnerController = require('../Controller/OwnerController');

router.post('/', OwnerController.create);
router.put('/:id', OwnerController.update);
router.delete('/:id', OwnerController.delete);
router.get('/', OwnerController.findAll);
router.get('/:id', OwnerController.findById);

module.exports = router;
