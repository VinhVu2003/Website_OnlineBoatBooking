// Repository/OwnerRepository.js
const Owner = require('../Model/Owner');

class OwnerRepository {
    async create(data) {
        return await Owner.create(data);
    }

    async update(id, data) {
        const owner = await Owner.findByPk(id);
        if (owner) {
            return await owner.update(data);
        }
        throw new Error('Owner not found');
    }

    async delete(id) {
        const result = await Owner.destroy({ where: { ID: id } });
        if (result === 0) {
            throw new Error('Owner not found');
        }
        return true;
    }

    async findAll() {
        return await Owner.findAll();
    }

    async findById(id) {
        return await Owner.findByPk(id);
    }
}

module.exports = new OwnerRepository();
