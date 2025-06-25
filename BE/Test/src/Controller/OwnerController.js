// Controller/OwnerController.js
const OwnerService = require('../Service/OwnerService');

class OwnerController {
    async create(req, res) {
        try {
            const owner = await OwnerService.create(req.body);
            res.status(201).json({ message: 'Owner created successfully', data: owner });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        try {
            const owner = await OwnerService.update(id, req.body);
            res.json({ message: 'Owner updated successfully', data: owner });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            await OwnerService.delete(id);
            res.json({ message: 'Owner deleted successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const owners = await OwnerService.findAll();
            res.json(owners);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findById(req, res) {
        const { id } = req.params;
        try {
            const owner = await OwnerService.findById(id);
            if (owner) {
                res.json(owner);
            } else {
                res.status(404).json({ message: 'Owner not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new OwnerController();
