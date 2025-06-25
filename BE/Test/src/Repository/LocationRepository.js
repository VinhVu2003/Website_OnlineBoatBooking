// Repository/LocationRepository.js
const Location = require('../Model/Location');

class LocationRepository {
    async create(data) {
        return await Location.create(data);
    }

    async update(id, data) {
        const location = await Location.findByPk(id);
        if (location) {
            return await location.update(data);
        }
        throw new Error('Location not found');
    }

    async delete(id) {
        const result = await Location.destroy({ where: { ID: id } });
        if (result === 0) {
            throw new Error('Location not found');
        }
        return true;
    }

    async findAll() {
        return await Location.findAll();
    }

    async findById(id) {
        return await Location.findByPk(id);
    }
}

module.exports = new LocationRepository();
