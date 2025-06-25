// controllers/AccountController.js
const AccountService = require('../Service/Account_S');

class AccountController {
    async create(req, res) {
        try {
            const account = await AccountService.create(req.body);
            res.status(201).json({ message: 'Account created successfully', data: account });
        } catch (error) {
            res.status(500).json({ message: 'Server error: ' + error.message });
        }
    }

    async getById(req, res) {
        const { id } = req.params;
        try {
            const account = await AccountService.getById(id);
            res.json({ message: 'Account retrieved successfully', data: account });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        try {
            const account = await AccountService.update(id, req.body);
            res.json({ message: 'Account updated successfully', data: account });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            await AccountService.delete(id);
            res.json({ message: 'Account deleted successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const accounts = await AccountService.findAll();
            res.json({ message: 'Accounts retrieved successfully', data: accounts });
        } catch (error) {
            res.status(500).json({ message: 'Server error: ' + error.message });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;
        try {
            const account = await AccountService.login(username, password);
            res.json({ message: 'Login successful', data: account });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}

module.exports = new AccountController();
