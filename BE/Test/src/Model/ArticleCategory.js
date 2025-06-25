// models/ArticleCategory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ArticleCategory = sequelize.define('ArticleCategory', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING(255),
    },
}, {
    tableName: 'ArticleCategory', // Chỉ định tên bảng cụ thể
    timestamps: false, // Không sử dụng các trường createdAt, updatedAt
});

module.exports = ArticleCategory;
