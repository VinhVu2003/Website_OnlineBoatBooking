// services/chuyenMucService.js
const ChuyenMucRepository = require('../repositories/chuyenMucRepository');

class ChuyenMucService {
    async create(chuyenMucData) {
        return await ChuyenMucRepository.create(chuyenMucData);
    }

    async update(id, chuyenMucData) {
        return await ChuyenMucRepository.update(id, chuyenMucData);
    }

    async delete(id) {
        return await ChuyenMucRepository.delete(id);
    }

    async findAll() {
        return await ChuyenMucRepository.findAll();
    }

    async findById(id) {
        return await ChuyenMucRepository.findById(id);
    }
}

module.exports = new ChuyenMucService();
