const TripRepository = require('../Repository/TripRepository');

class TripController {
  // Tạo mới chuyến đi
  async createTrip(req, res) {
    try {
      const tripData = req.body;
      const newTrip = await TripRepository.createTrip(tripData);
      res.status(201).json({
        message: 'Tạo chuyến đi thành công',
        tripId: newTrip
      });
    } catch (error) {
      res.status(500).json({
        message: 'Lỗi tạo chuyến đi',
        error: error.message
      });
    }
  }

  // Lấy chuyến đi theo BoatID
  async getTripsByBoatID(req, res) {
    try {
      const { BoatID } = req.params;
      const trips = await TripRepository.getTripsByBoatID(BoatID);
      res.status(200).json(trips);
    } catch (error) {
      res.status(500).json({
        message: 'Lỗi lấy chuyến đi theo BoatID',
        error: error.message
      });
    }
  }

  // Lấy chuyến đi theo điều kiện
  async getTripsByCondition(req, res) {
    try {
      const conditions = req.query;
      const trips = await TripRepository.getTripsByCondition(conditions);
      res.status(200).json(trips);
    } catch (error) {
      res.status(500).json({
        message: 'Lỗi lấy chuyến đi',
        error: error.message
      });
    }
  }

  // Cập nhật lịch trình chuyến đi
  async updateTripSchedule(req, res) {
    try {
      const { id } = req.params;
      const tripData = {
        BoatID: req.body.BoatID,
        Schedule: req.body.Schedule,
        Str_Date: req.body.Str_Date,
        Ed_Date: req.body.Ed_Date,
        Duration: req.body.Duration,
        Detail: req.body.Detail,
        Dock:req.body.Dock,
      };
      
      const isUpdated = await TripRepository.updateTrip(id, tripData );
      if (isUpdated) {
        res.status(200).json({
          message: 'Cập nhật lịch trình chuyến đi thành công'
        });
      } else {
        res.status(404).json({
          message: 'Không tìm thấy chuyến đi để cập nhật lịch trình'
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Lỗi cập nhật lịch trình chuyến đi',
        error: error.message
      });
    }
  }

  // Xóa chuyến đi
  async deleteTrip(req, res) {
    try {
      const { id } = req.params;
      const isDeleted = await TripRepository.deleteTrip(id);
      
      if (isDeleted) {
        res.status(200).json({
          message: 'Xóa chuyến đi thành công'
        });
      } else {
        res.status(404).json({
          message: 'Không tìm thấy chuyến đi để xóa'
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Lỗi xóa chuyến đi',
        error: error.message
      });
    }
  }

  // Lấy tất cả các chuyến đi
  async getAllTrips(req, res) {
    try {
      const trips = await TripRepository.getAllTrips();
      if (trips.length > 0) {
        res.status(200).json({
          message: 'Lấy tất cả các chuyến đi thành công',
          trips: trips
        });
      } else {
        res.status(404).json({
          message: 'Không tìm thấy chuyến đi nào'
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Lỗi lấy tất cả các chuyến đi',
        error: error.message
      });
    }
  }
}

module.exports = new TripController();