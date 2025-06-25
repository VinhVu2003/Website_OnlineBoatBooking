// models/Staff.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Account = require('./Account')
const Staff = sequelize.define('Staff', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Sex: {
        type: DataTypes.STRING(10),
    },
    Email: {
        type: DataTypes.STRING(100),
    },
    Phone: {
        type: DataTypes.STRING(15),
    },
    Address: {
        type: DataTypes.STRING(255),
    },
    Position: {
        type: DataTypes.STRING(50),
    },
    Account_ID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Account',
            key: 'ID',
        },
        allowNull: true, // Cho phép giá trị NULL
    },
}, {
    tableName: 'Staff', // Chỉ định tên bảng cụ thể
    timestamps: false, // Không sử dụng các trường createdAt, updatedAt
});
// Mối quan hệ: Staff.hasOne(Account)
module.exports = Staff;
