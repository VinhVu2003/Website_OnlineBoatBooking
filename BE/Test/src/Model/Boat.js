const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo đường dẫn đúng đến file cấu hình

const Boat = sequelize.define('Boat', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    LocationId: {
        type: DataTypes.INTEGER,
    },
    Owner_ID: {
        type: DataTypes.INTEGER,
    },
    Name: {
        type: DataTypes.STRING,
    },
    IMG: {
        type: DataTypes.STRING,
    },
    Full_Price: {
        type: DataTypes.FLOAT,
    },
    Cabin_Count: {
        type: DataTypes.INTEGER, // Chỉnh lại kiểu dữ liệu thành INTEGER thay vì NUMBER
      
    },
    OtherInfo: {
        type: DataTypes.STRING,
    },
    Status: {
        type: DataTypes.STRING,
    }

}, {
    tableName: 'Boat', // Chỉ định tên bảng cụ thể
    timestamps: false // Nếu không sử dụng các trường createdAt, updatedAt
});

module.exports = Boat;
