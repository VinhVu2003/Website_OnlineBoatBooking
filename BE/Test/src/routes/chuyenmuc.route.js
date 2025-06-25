// routes/chuyenMucRoutes.js
const express = require('express');
const ChuyenMucController = require('../Controller/ChuyenMucController');

const router = express.Router();

router.post('/', ChuyenMucController.create);
router.put('/:id', ChuyenMucController.update);
router.delete('/:id', ChuyenMucController.delete);
router.get('/', ChuyenMucController.findAll);
router.get('/:id', ChuyenMucController.findById);

module.exports = router;
