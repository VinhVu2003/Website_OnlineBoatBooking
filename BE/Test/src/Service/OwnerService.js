// Service/OwnerService.js
const OwnerRepository = require('../Repository/OwnerRepository');

class OwnerService {
    async create(data) {
        return await OwnerRepository.create(data);
    }

    async update(id, data) {
        return await OwnerRepository.update(id, data);
    }

    async delete(id) {
        return await OwnerRepository.delete(id);
    }

    async findAll() {
        return await OwnerRepository.findAll();
    }

    async findById(id) {
        return await OwnerRepository.findById(id);
    }
}

module.exports = new OwnerService();
