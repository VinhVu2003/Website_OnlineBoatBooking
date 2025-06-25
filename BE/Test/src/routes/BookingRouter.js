const express = require('express');
const router = express.Router();
const BookingController = require('../Controller/BookingController');

const bookingRouter = (io) => {
    // Endpoint để tạo booking
    router.post('/create', async (req, res) => {
      const result = await BookingController.createBookingWithCustomer(req, res);
      
      // console.log("đây là booking")
      // Nếu booking thành công, phát sự kiện
      io.emit('boatBooked', "Đặt thành công"); // Giả sử bạn có boatId trong kết quả
      
      return result; // Trả về kết quả từ controller
    });
    router.get('/getAll', BookingController.getAllBookings);
    
    router.get('/getbyBoatID/:boatId', BookingController.getBookingsByBoatID);

    router.get('/getallbookingdetails/:id', BookingController.getAllBookingDetailsByBookingID);
    // Endpoint để cập nhật booking
    router.put('/update', BookingController.updateBooking);
    
    router.put('/updatestatus', BookingController.updateBookingStatus);
    // Endpoint để lấy tất cả các booking theo BoatID

    router.post('/getBookingStatistics', BookingController.getBookingStatistics);
    // Endpoint để cập nhật trạng thái booking
    return router; // Trả về router
  };
  
  module.exports = bookingRouter;