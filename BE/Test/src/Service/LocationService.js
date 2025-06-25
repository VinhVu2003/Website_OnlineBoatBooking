// Service/LocationService.js
const LocationRepository = require('../Repository/LocationRepository');

class LocationService {
    async create(data) {
        return await LocationRepository.create(data);
    }

    async update(id, data) {
        return await LocationRepository.update(id, data);
    }

    async delete(id) {
        return await LocationRepository.delete(id);
    }

    async findAll() {
        return await LocationRepository.findAll();
    }

    async findById(id) {
        return await LocationRepository.findById(id);
    }
}

module.exports = new LocationService();
