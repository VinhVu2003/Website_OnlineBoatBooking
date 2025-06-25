// repository/PriceRepository.js
const Price = require('../Model/Price');

class PriceRepository {
    async create(data) {
        return await Price.create(data);
    }

    async update(id, data) {
        const price = await Price.findByPk(id);
        if (price) {
            return await price.update(data);
        }
        throw new Error('Price not found');
    }

    async delete(id) {
        const result = await Price.destroy({ where: { ID: id } });
        if (result === 0) {
            throw new Error('Price not found');
        }
        return true;
    }

    async findAll() {
        return await Price.findAll();
    }

    async findById(id) {
        return await Price.findByPk(id);
    }
}

module.exports = new PriceRepository();
