// controllers/PriceController.js
const PriceService = require('../Service/PriceService');

class PriceController {
    async create(req, res) {
        try {
            const price = await PriceService.create(req.body);
            res.status(201).json({ message: 'Price created successfully', data: price });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        try {
            const price = await PriceService.update(id, req.body);
            res.json({ message: 'Price updated successfully', data: price });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            await PriceService.delete(id);
            res.json({ message: 'Price deleted successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const prices = await PriceService.findAll();
            res.json(prices);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findById(req, res) {
        const { id } = req.params;
        try {
            const price = await PriceService.findById(id);
            if (price) {
                res.json(price);
            } else {
                res.status(404).json({ message: 'Price not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new PriceController();
