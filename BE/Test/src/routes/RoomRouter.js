// routes/RoomRouter.js
const express = require('express');
const router = express.Router();
const RoomController = require('../Controller/RoomController');

router.post('/', RoomController.create);
router.post('/createwithprice', RoomController.createWithPrice);
router.put('/:id', RoomController.update);
router.delete('/:id', RoomController.delete);
router.get('/', RoomController.findAll);
router.get('/:id', RoomController.findById);
router.get('/getall/:boatId', RoomController.findAllByBoatId);
router.put('/updatewithprice/:id', RoomController.updateRoomWithPrice);

module.exports = router;
