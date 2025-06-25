// repository/StaffRepository.js
const Staff = require('../Model/Staff');

class StaffRepository {
    async create(data) {
        return await Staff.create(data);
    }

    async update(id, data) {
        const staff = await Staff.findByPk(id);
        if (staff) {
            return await staff.update(data);
        }
        throw new Error('Staff not found');
    }

    async delete(id) {
        const result = await Staff.destroy({ where: { ID: id } });
        if (result === 0) {
            throw new Error('Staff not found');
        }
        return true;
    }

    async findAll() {
        return await Staff.findAll();
    }

    async findById(id) {
        return await Staff.findByPk(id);
    }
}

module.exports = new StaffRepository();
