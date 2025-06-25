// repository/ArticleCategoryRepository.js
const ArticleCategory = require('../Model/ArticleCategory');

class ArticleCategoryRepository {
    async create(data) {
        return await ArticleCategory.create(data);
    }

    async update(id, data) {
        const category = await ArticleCategory.findByPk(id);
        if (category) {
            return await category.update(data);
        }
        throw new Error('Article category not found');
    }
    
    async delete(id) {
        const result = await ArticleCategory.destroy({ where: { ID: id } });
        if (result === 0) {
            throw new Error('Article category not found');
        }
        return true;
    }

    async findAll() {
        return await ArticleCategory.findAll();
    }

    async findById(id) {
        return await ArticleCategory.findByPk(id);
    }
}

module.exports = new ArticleCategoryRepository();
