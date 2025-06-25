// service/StaffService.js
const StaffRepository = require('../Repository/StaffRepository');

class StaffService {
    async create(data) {
        return await StaffRepository.create(data);
    }

    async update(id, data) {
        return await StaffRepository.update(id, data);
    }

    async delete(id) {
        return await StaffRepository.delete(id);
    }

    async findAll() {
        return await StaffRepository.findAll();
    }

    async findById(id) {
        return await StaffRepository.findById(id);
    }
}

module.exports = new StaffService();
