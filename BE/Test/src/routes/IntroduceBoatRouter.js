const express = require('express');
const router = express.Router();
const IntroduceBoatController = require('../Controller/IntroduceController');

// Route to create a new boat introduction trip
router.post('/create', IntroduceBoatController.createIntroduceBoat);

// Route to get all boat introduction trips with boat name
router.get('/getAll', IntroduceBoatController.getAllIntroduceBoat);

// Route to update a boat introduction trip
router.put('/update', IntroduceBoatController.updateIntroduceBoat);

// Route to get a boat introduction trip by boat ID
router.get('/getById/:boatId', IntroduceBoatController.getIntroduceBoatById);

module.exports = router;