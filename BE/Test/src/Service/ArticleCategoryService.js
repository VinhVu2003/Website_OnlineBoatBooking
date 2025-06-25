// service/ArticleCategoryService.js
const ArticleCategoryRepository = require('../Repository/ArticleCategoryRepository');

class ArticleCategoryService {
    async create(data) {
        return await ArticleCategoryRepository.create(data);
    }

    async update(id, data) {
        return await ArticleCategoryRepository.update(id, data);
    }

    async delete(id) {
        return await ArticleCategoryRepository.delete(id);
    }

    async findAll() {
        return await ArticleCategoryRepository.findAll();
    }

    async findById(id) {
        return await ArticleCategoryRepository.findById(id);
    }
}

module.exports = new ArticleCategoryService();
