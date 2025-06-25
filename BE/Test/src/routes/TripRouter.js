const express = require('express');
const router = express.Router();
const TripController = require('../Controller/TripControler');

// Route to create a new trip
router.post('/', TripController.createTrip);

router.get('/getall', TripController.getAllTrips);
// Route to get trips by BoatID
router.get('/:BoatID', TripController.getTripsByBoatID);

router.put('/:id', TripController.updateTripSchedule);
// Route to get trips by conditions
router.get('/', TripController.getTripsByCondition);

// Route to update a trip

// Route to delete a trip
router.delete('/:id', TripController.deleteTrip);

// Route to get all trips


module.exports = router;