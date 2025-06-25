const express = require('express');
const router = express.Router();
const AmenitiesController = require('../Controller/AmenitiesController');


router.get('/', AmenitiesController.getall);


module.exports = router;