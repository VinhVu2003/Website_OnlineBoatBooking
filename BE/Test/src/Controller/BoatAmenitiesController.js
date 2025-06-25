const { Model } = require("sequelize");
const BoatAmenitiesRepository = require('../Repository/Boat_AmenitiesRepository');
class BoatAmenitiesController{
    async getall(req, res) {
        try {
            const categories = await BoatAmenitiesRepository.getAll();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getallByBoatId(req, res) {
        try {
            const categories = await BoatAmenitiesRepository.getAllByBoatId(req.params.BoatId);
            res.json(categories);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async addNew_Arr_Amenity(req, res) {
        try {
            const AmenityIds = req.body.AmenityIds; // Assuming AmenityIds is an array in the request body
            const BoatId = req.params.BoatId;
            const result = await BoatAmenitiesRepository.addNew_Arr_Amenities(AmenityIds, BoatId);
            if (result) {
                res.status(201).json({ message: "Amenities added successfully" });
            } else {
                res.status(500).json({ message: "Failed to add amenities" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findBoatsByAmenity(req, res) {
        try {
            const amenityIDs = req.params.amenityID; // Lấy amenityIDs từ params

            // Kiểm tra xem amenityIDs có tồn tại không
            if (!amenityIDs) {
                return res.status(400).json({ message: "amenityIDs không được cung cấp" });
            }

            const amenityArray = amenityIDs.split(',').map(id => parseInt(id, 10)); // Tách chuỗi thành mảng số nguyên

            const boats = await BoatAmenitiesRepository.findBoatsByAmenity(amenityArray);
            res.json(boats);
        } catch (error) {
            console.error("Lỗi khi tìm thuyền theo tiện nghi:", error);
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = new BoatAmenitiesController();