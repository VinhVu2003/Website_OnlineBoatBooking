// controllers/RoomController.js
const RoomService = require('../Service/RoomService');

class RoomController {
    async create(req, res) {
        try {
            const room = await RoomService.create(req.body);
            res.status(201).json({ message: 'Room created successfully', data: room });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async createWithPrice(req, res) {
        try {
            const result = await RoomService.createWithPrice(req.body);
            res.status(201).json({
                success: true,
                message: 'Room created successfully',
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    async updateRoomWithPrice(req, res) {
        const { id } = req.params;
        try {
            const room = await RoomService.updateRoomWithPrice(id, req.body);
            res.json({ message: 'Room updated successfully', data: room });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    async update(req, res) {
        const { id } = req.params;
        try {
            const room = await RoomService.update(id, req.body);
            res.json({ message: 'Room updated successfully', data: room });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            await RoomService.delete(id);
            res.json({ message: 'Room deleted successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const rooms = await RoomService.findAll();
            res.json(rooms);
            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findById(req, res) {
        const { id } = req.params;
        try {
            const room = await RoomService.findById(id);
            if (room) {
                res.json(room);
            } else {
                res.status(404).json({ message: 'Room not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async findAllByBoatId(req, res) {
        const { boatId } = req.params;
        try {
            const rooms = await RoomService.findAllByBoatId(boatId);
            res.json(rooms);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new RoomController();
