// Service/Account_S.js
const AccountRepository = require('../Repository/Account_R');

class AccountService {
    async create(data) {
        return await AccountRepository.create(data);
    }

    async getById(id) {
        return await AccountRepository.findById(id);
    }

    async update(id, data) {
        return await AccountRepository.update(id, data);
    }

    async delete(id) {
        return await AccountRepository.delete(id);
    }

    async findAll() {
        return await AccountRepository.findAll();
    }

    async login(username, password) {
        return await AccountRepository.login(username, password);
    }
}

module.exports = new AccountService();
