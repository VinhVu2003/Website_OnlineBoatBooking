const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo đường dẫn đúng đến file cấu hình

const Room = sequelize.define('Room', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    BoatID: {
        type: DataTypes.INTEGER,
    },
    RoomName: {
        type: DataTypes.STRING,
    },
    PeopleCount: {
        type: DataTypes.INTEGER,
    },
    Size: {
        type: DataTypes.STRING,
    },
    Image: {
        type: DataTypes.STRING,
    },
    Quantity: {
        type: DataTypes.INTEGER, // Chỉnh lại kiểu dữ liệu thành INTEGER thay vì NUMBER
      
    },
    Status: {
        type: DataTypes.STRING,
    },
    

}, {
    tableName: 'Room', // Chỉ định tên bảng cụ thể
    timestamps: false // Nếu không sử dụng các trường createdAt, updatedAt
});

module.exports = Room;
