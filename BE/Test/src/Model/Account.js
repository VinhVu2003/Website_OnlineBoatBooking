// Model/Account.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo đường dẫn đúng đến file cấu hình
const Staff = require('./Staff');
const Account = sequelize.define('Account', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Role: {
        type: DataTypes.STRING
    },
    Status: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'Account', // Chỉ định tên bảng cụ thể
    timestamps: false // Nếu không sử dụng các trường createdAt, updatedAt
});
module.exports = Account;
