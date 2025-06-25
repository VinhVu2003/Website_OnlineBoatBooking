const express = require('express');
const router = express.Router();
const BoatAmenitiesController = require('../Controller/BoatAmenitiesController');


router.get('/', BoatAmenitiesController.getall);
router.get('/:BoatId', BoatAmenitiesController.getallByBoatId);
router.post('/:BoatId', BoatAmenitiesController.addNew_Arr_Amenity);
router.get('/amenity/:amenityID', BoatAmenitiesController.findBoatsByAmenity);


module.exports = router;