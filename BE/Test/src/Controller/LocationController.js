// Controller/LocationController.js
const LocationService = require('../Service/LocationService');

class LocationController {
    async create(req, res) {
        try {
            const location = await LocationService.create(req.body);
            res.status(201).json({ message: 'Location created successfully', data: location });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        try {
            const location = await LocationService.update(id, req.body);
            res.json({ message: 'Location updated successfully', data: location });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            await LocationService.delete(id);
            res.json({ message: 'Location deleted successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const locations = await LocationService.findAll();
            res.json(locations);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findById(req, res) {
        const { id } = req.params;
        try {
            const location = await LocationService.findById(id);
            if (location) {
                res.json(location);
            } else {
                res.status(404).json({ message: 'Location not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new LocationController();
