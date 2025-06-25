// Model/Account.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo đường dẫn đúng đến file cấu hình

const Location = sequelize.define('Location', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    IMG: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
}, {
    tableName: 'Location', // Chỉ định tên bảng cụ thể
    timestamps: false // Nếu không sử dụng các trường createdAt, updatedAt
});

module.exports = Location;
