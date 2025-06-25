// Routes/LocationRouter.js
const express = require('express');
const router = express.Router();
const LocationController = require('../Controller/LocationController');

router.post('/', LocationController.create);
router.put('/:id', LocationController.update);
router.delete('/:id', LocationController.delete);
router.get('/', LocationController.findAll);
router.get('/:id', LocationController.findById);

module.exports = router;
