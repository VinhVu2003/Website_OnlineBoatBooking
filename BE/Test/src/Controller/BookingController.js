const BookingService = require('../Service/Booking_Service');
const BookingRepository = require('../Repository/BookingRepository')
class BookingController {
    static async createBookingWithCustomer(req, res) {
        try {
            const result = await BookingService.createBookingWithCustomer(req.body);
            res.status(201).json({
                success: true,
                message: 'Booking created successfully',
                data: result // Giả sử result chứa thông tin booking, bao gồm boatId
            });
            
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    static async updateBooking(req, res) {
        try {
            const { data, detailsAction } = req.body;
            const result = await BookingService.updateBooking(data, detailsAction);
            res.status(200).json({
                success: true,
                message: 'Booking updated successfully',
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
  
    static async getAllBookings(req, res) {
        try {
            const result = await BookingService.getAllBookings();
            res.status(200).json({
                success: true,
                message: 'All bookings fetched successfully',
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async getBookingsByBoatID(req, res) {
        try {
            const { boatId } = req.params;
            const result = await BookingService.getAllBookingsByBoatID(boatId);
            res.status(200).json({
                success: true,
                message: 'Bookings by boat ID fetched successfully',
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    static async updateBookingStatus(req, res) {
        try {
            const { id, status } = req.body;
            const result = await BookingRepository.UpdateStatus(id, status);
            if (result) {
                res.status(200).json({
                    success: true,
                    message: 'Booking status updated successfully'
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Failed to update booking status'
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async getAllBookingDetailsByBookingID(req, res) {
        try {
            const { id } = req.params;
            const result = await BookingService.getAllBookingDetailsByBookingID(id);
            res.status(200).json({
                success: true,
                message: 'Bookings by ID fetched successfully',
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async getBookingStatistics(req, res) {
        try {
            const { startDate, endDate } = req.body;
            const result = await BookingRepository.getBookingStatistics(startDate, endDate);
            res.status(200).json({
                success: true,
                message: 'Booking statistics fetched successfully',
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = BookingController;