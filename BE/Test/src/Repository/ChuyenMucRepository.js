// repositories/chuyenMucRepository.js
const ChuyenMuc = require('../Model/ChuyenMuc');

class ChuyenMucRepository {
    async create(chuyenMucData) {
        return await ChuyenMuc.create(chuyenMucData);
    }

    async update(id, chuyenMucData) {
        const chuyenMuc = await ChuyenMuc.findByPk(id);
        if (chuyenMuc) {
            return await chuyenMuc.update(chuyenMucData);
        }
        throw new Error('Chuyên mục không tồn tại');
    }

    async delete(id) {
        const result = await ChuyenMuc.destroy({ where: { MaChuyenMuc: id } });
        if (result === 0) {
            throw new Error('Chuyên mục không tồn tại');
        }
        return true;
    }

    async findAll() {
        return await ChuyenMuc.findAll();
    }

    async findById(id) {
        return await ChuyenMuc.findByPk(id);
    }
}

module.exports = new ChuyenMucRepository();
