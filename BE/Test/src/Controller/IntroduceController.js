const IntroduceBoatRepository = require('../Repository/IntroduceBoatRepository');

class IntroduceBoatController {
  // Tạo mới giới thiệu thuyền
  async createIntroduceBoat(req, res) {
    try {
      const tripData = req.body;
      const newTrip = await IntroduceBoatRepository.createIntroduceBoat(tripData);
      res.status(201).json({
        message: 'Tạo giới thiệu thuyền thành công',
        tripId: newTrip
      });
    } catch (error) {
      res.status(500).json({
        message: 'Lỗi tạo giới thiệu thuyền',
        error: error.message
      });
    }
  }
  async getAllIntroduceBoat(req, res) {
    try {
      const trips = await IntroduceBoatRepository.getAllIntroduceBoat();
      res.status(200).json(trips);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi lấy tất cả giới thiệu thuyền', error: error.message });
    }
  }
  async updateIntroduceBoat(req, res) {
    try {
      const tripData = req.body;
      const updatedTrip = await IntroduceBoatRepository.updateIntroduceBoat(tripData);
      res.status(200).json({ message: 'Cập nhật giới thiệu thuyền thành công', tripId: updatedTrip });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi cập nhật giới thiệu thuyền', error: error.message });
    }
  }
  async getIntroduceBoatById(req, res) {
    try {
      const boatId = req.params.boatId;
      const introduceBoat = await IntroduceBoatRepository.getIntroduceBoatById(boatId);
      res.status(200).json(introduceBoat);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi lấy giới thiệu thuyền theo ID', error: error.message });
    }
  }
}

module.exports = new IntroduceBoatController();