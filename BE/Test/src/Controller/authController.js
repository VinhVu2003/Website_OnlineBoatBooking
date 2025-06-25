// Controllers/authController.js
const Account = require('../Model/Account');
const AccountRepository = require('../Repository/Account_R');
const bcrypt = require('bcrypt');

class AuthController {
    // Đăng nhập và trả về token
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const token = await AccountRepository.login(username, password);
            res.status(200).json({ token });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new AuthController();
