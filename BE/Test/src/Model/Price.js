const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo đường dẫn đúng đến file cấu hình

const Price = sequelize.define('Price', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    BoatID: {
        type: DataTypes.INTEGER,
    },
    RoomID: {
        type: DataTypes.INTEGER,
    },
    StartDate: {
        type: DataTypes.DATE,
    },
    EndDate: {
        type: DataTypes.DATE,
    },
    OriginalPrice: {
        type: DataTypes.FLOAT,
    },
    DiscountedPrice: {
        type: DataTypes.FLOAT, // Chỉnh lại kiểu dữ liệu thành INTEGER thay vì NUMBER
    },
    Discount_ID: {
        type: DataTypes.INTEGER, // Chỉnh lại kiểu dữ liệu thành INTEGER thay vì NUMBER
    }
}, {
    tableName: 'Price', // Chỉ định tên bảng cụ thể
    timestamps: false // Nếu không sử dụng các trường createdAt, updatedAt
});

module.exports = Price;
