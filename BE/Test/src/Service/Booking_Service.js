const BookingRepository = require('../Repository/BookingRepository');

class BookingService {
    async createBookingWithCustomer(data) {
        try {
            this.validateBookingData(data);
            return await BookingRepository.createBookingWithCustomer(data);
        } catch (error) {
            throw new Error(`Service Error: ${error.message}`);
        }
    }
   
    async updateBooking(data, detailsAction) {
        try {
            // this.validateBookingData(data);
            return await BookingRepository.updateBooking(data, detailsAction);
        } catch (error) {
            throw new Error(`Service Error: ${error.message}`);
        }
    }
    async getAllBookingsByBoatID(boatId) {
        try {
            return await BookingRepository.getAllBookingsbyBoatID(boatId);
        } catch (error) {
            throw new Error(`Service Error: ${error.message}`);
        }
    }
    async getAllBookings() {
        try {
            return await BookingRepository.getAllBookings();
        } catch (error) {
            throw new Error(`Service Error: ${error.message}`);
        }
    }



    async getAllBookingDetailsByBookingID(id) {
        try {
            return await BookingRepository.getAllBookingDetailsByBookingID(id);
        } catch (error) {
            throw new Error(`Service Error: ${error.message}`);
        }
    }







    validateBookingData(data) {
        // Validate Customer data
        if (!data.customer) {
            throw new Error('Customer information is required');
        }
        if (!data.customer.name || !data.customer.phone) {
            throw new Error('Customer name and phone are required');
        }

        // Validate Booking data
        if (!data.booking) {
            throw new Error('Booking information is required');
        }
        if (!data.booking.boatId || !data.booking.checkInDate || !data.booking.checkOutDate) {
            throw new Error('Booking boat, check-in and check-out dates are required');
        }
    }
}

module.exports = new BookingService();