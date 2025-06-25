const CustomerRepository = require('../Repository/Customer_R');
class CustomerService {
    async create(data) {
        return await CustomerRepository.create(data);
    }

    async update(id, data) {
        return await CustomerRepository.update(id, data);
    }

    async delete(id) {
        return await CustomerRepository.delete(id);
    }

    async searchByName(name) {
        return await CustomerRepository.searchByName(name);
    }
    async getById(id) {
        const customer = await CustomerRepository.findById(id);
        if (!customer) {
            throw new Error('Customer not found');
        }
        return customer;
    }
    async getAllCus() {
        return await CustomerRepository.GetAllCus();
    }
}

module.exports = new CustomerService();