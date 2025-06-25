const { Model } = require("sequelize");
const AmenitiesRepository = require('../Repository/AmenitiesRepository');
class AmenitiesController{
    async getall(req, res) {
        try {
            const categories = await AmenitiesRepository.getAll();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = new AmenitiesController();