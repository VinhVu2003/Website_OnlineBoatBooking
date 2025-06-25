const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo đường dẫn đúng đến file cấu hình

const Owner = sequelize.define('Owner', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING,
    },
    Phone: {
        type: DataTypes.STRING,
    },
    Email: {
        type: DataTypes.STRING,
    },
    Address: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'Owner', // Chỉ định tên bảng cụ thể
    timestamps: false // Nếu không sử dụng các trường createdAt, updatedAt
});

module.exports = Owner;
