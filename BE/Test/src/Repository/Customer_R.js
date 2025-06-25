const Customer = require('../Model/Customer');
const { Op } = require('sequelize'); // Nhập Op từ Sequelize
const sequelize = require("../config/database");
const { QueryTypes } = require("sequelize");
class CusRepository {
    async create(Data) {
        return await Customer.create(Data);
    }

    async update(id, data) {
        const customer = await Customer.findByPk(id);
        if (customer) {
            return await customer.update(data);
        }
        throw new Error('Customer not found');
    }

    async delete(id) {
        const result = await Customer.destroy({ where: { ID: id } });
        if (!result) throw new Error('Customer not found');
        return true;
    }
    async findById(id) {
        return await Customer.findByPk(id);
    }
    async searchByName(name) {
        return await Customer.findAll({
            where: {
                Name: {
                    [Op.like]: `%${name}%`, // Tìm kiếm theo tên
                }
            }
        });
    }

    // Lấy tất cả Cus
  async GetAllCus() {
    try {
      const query = `Select*from Customer`;
      const trips = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return trips;
    } catch (error) {
      throw new Error(`Lỗi lấy tất cả chuyến đi: ${error.message}`);
    }
  }

}

module.exports = new CusRepository();
