// controllers/ArticleCategoryController.js
const ArticleCategoryService = require('../Service/ArticleCategoryService');

class ArticleCategoryController {
    async create(req, res) {
        try {
            const category = await ArticleCategoryService.create(req.body);
            res.status(201).json({ message: 'Article category created successfully', data: category });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        try {
            const category = await ArticleCategoryService.update(id, req.body);
            res.json({ message: 'Article category updated successfully', data: category });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            await ArticleCategoryService.delete(id);
            res.json({ message: 'Article category deleted successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const categories = await ArticleCategoryService.findAll();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findById(req, res) {
        const { id } = req.params;
        try {
            const category = await ArticleCategoryService.findById(id);
            if (category) {
                res.json(category);
            } else {
                res.status(404).json({ message: 'Article category not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ArticleCategoryController();
