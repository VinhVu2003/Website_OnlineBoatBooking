// service/PriceService.js
const PriceRepository = require('../Repository/PriceRepository');

class PriceService {
    async create(data) {
        return await PriceRepository.create(data);
    }

    async update(id, data) {
        return await PriceRepository.update(id, data);
    }

    async delete(id) {
        return await PriceRepository.delete(id);
    }

    async findAll() {
        return await PriceRepository.findAll();
    }

    async findById(id) {
        return await PriceRepository.findById(id);
    }
}

module.exports = new PriceService();
