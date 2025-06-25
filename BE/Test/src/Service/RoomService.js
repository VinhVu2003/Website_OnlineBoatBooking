// service/RoomService.js
const RoomRepository = require('../Repository/RoomRepository');

class RoomService {
    async create(data) {
        return await RoomRepository.create(data);
    }
    async createWithPrice(data) {
        try {
          
            return await RoomRepository.createRoomWithPrice(data);
        } catch (error) {
            throw new Error(`Service Error: ${error.message}`);
        }
    }
    async update(id, data) {
        return await RoomRepository.update(id, data);
    }

    async delete(id) {
        return await RoomRepository.delete(id);
    }

    async findAll() {
        return await RoomRepository.findAll();
    }

    async findById(id) {
        return await RoomRepository.findById(id);
    }
    async findAllByBoatId(boatId) {
        return await RoomRepository.findAllByBoatId(boatId);
    }
    async updateRoomWithPrice(id, data) {
        return await RoomRepository.updateRoomWithPrice(id, data);
    }
}

module.exports = new RoomService();
