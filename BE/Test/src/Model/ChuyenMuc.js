// models/chuyenMuc.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo đường dẫn đúng đến file cấu hình

const ChuyenMuc = sequelize.define('ChuyenMuc', {
    MaChuyenMuc: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TenChuyenMuc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DacBiet: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    NoiDung: {
        type: DataTypes.TEXT
    }
}, {
    timestamps: false // Nếu không sử dụng các trường createdAt, updatedAt
});

module.exports = ChuyenMuc;
