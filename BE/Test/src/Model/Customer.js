const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo đường dẫn đúng đến file cấu hình

const Customer = sequelize.define('Customer', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING,
    },
    Sex: {
        type: DataTypes.STRING,
    },
    Address: {
        type: DataTypes.STRING,
    },
    Phone: {
        type: DataTypes.STRING,
    },
    Email: {
        type: DataTypes.STRING,
    },
    Account_ID: {
        type: DataTypes.INTEGER, // Chỉnh lại kiểu dữ liệu thành INTEGER thay vì NUMBER
        allowNull: true, // Cho phép giá trị NULL
    }
}, {
    tableName: 'Customer', // Chỉ định tên bảng cụ thể
    timestamps: false // Nếu không sử dụng các trường createdAt, updatedAt
});

module.exports = Customer;
