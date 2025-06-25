// Repository/Account_R.js
const Account = require('../Model/Account');
const sequelize = require('../config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
class AccountRepository {
    async create(data) {
        return await Account.create(data);
    }

    async findById(id) {
        return await Account.findByPk(id);
    }
    
    async update(id, data) {
        const account = await Account.findByPk(id);
        if (account) {
            return await account.update(data);
        }
        throw new Error('Account not found');
    }

    async delete(id) {
        const result = await Account.destroy({ where: { ID: id } });
        if (result === 0) {
            throw new Error('Account not found');
        }
        return true;
    }

    async findAll() {
        return await Account.findAll();
    }
    
    // Phương thức đăng nhập để tạo token
    async login(username, password) {
        try {
            console.log('Đang cố gắng đăng nhập với tên người dùng:', username);
            // Truy vấn tài khoản từ cơ sở dữ liệu m�� không kiểm tra mật khẩu
            const results = await sequelize.query(`
                SELECT a.*, s.*
                FROM Account a
                inner JOIN Staff s ON s.Account_ID = a.ID
                WHERE a.Username = :username
            `, {
                replacements: { username: username },
                type: sequelize.QueryTypes.SELECT
            });
            
            // Ghi nhận kết quả truy vấn
            console.log('Kết quả truy vấn:', results);

            // Kiểm tra xem có tài khoản nào không
            if (results.length === 0) {
                console.log('Không tìm thấy tài khoản với tên người dùng:', username);
                throw new Error('Tài khoản không tồn tại hoặc mật khẩu không hợp lệ');
            }

            const account = results[0]; 
            console.log("account",account);
            // Tạo token
            const token = jwt.sign(
                { username: account.Username,password:account.Password, role: account.Role },
                process.env.JWT_SECRET || 'your_secret_key',
                { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
            );
            
            // Trả về token và thông tin tài khoản
            return { token, account };

        } catch (error) {
            console.error('Lỗi trong quá trình đăng nhập:', error.message);
            throw error;  // Ném lại lỗi để phía caller xử lý
        }
    }
}

module.exports = new AccountRepository();
