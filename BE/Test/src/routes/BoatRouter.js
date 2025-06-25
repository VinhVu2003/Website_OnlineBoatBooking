// Routes/BoatRouter.js
const express = require('express');
const router = express.Router();
const BoatController = require('../Controller/BoatController');

router.post('/', BoatController.create);
router.put('/:id', BoatController.update);
router.delete('/:id', BoatController.delete);
router.get('/', BoatController.findAll);
router.get('/:id', BoatController.findById);
router.get('/procedure/all', BoatController.getAllBoatOwnerLocationTrip);
router.get('/procedure/:id', BoatController.findByIdUser);
module.exports = router;
