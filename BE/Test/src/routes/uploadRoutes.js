const express = require('express');
const router = express.Router();
const { uploadMiddlewares, processUpload } = require('../uploadHandler2');

// Route upload sản phẩm
router.post('/boat', processUpload(uploadMiddlewares.boatImage));

// Route upload avatar  
router.post('/room', processUpload(uploadMiddlewares.roomImage));

// Route upload tùy chỉnh
router.post('/introduceBoat', processUpload(uploadMiddlewares.introduceBoatImage));

module.exports = router;