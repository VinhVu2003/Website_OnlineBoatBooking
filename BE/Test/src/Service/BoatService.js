// Service/BoatService.js
const BoatRepository = require('../Repository/BoatRepository');

class BoatService {
    async create(data) {
        return await BoatRepository.create(data);
    }
    
    async update(id, data) {
        return await BoatRepository.update(id, data);
    }

    async delete(id) {
        return await BoatRepository.delete(id);
    }

    async findAll() {
        return await BoatRepository.findAll();
    }

    async findById(id) {
        return await BoatRepository.findById(id);
    }
    async findBoatsByAmenity(amenityID) {
        console.log("Amenity ID:", amenityID); // Ghi lại để kiểm tra

        return await BoatRepository.findBoatsByAmenity(amenityID);
    }
    
    
}

module.exports = new BoatService();
