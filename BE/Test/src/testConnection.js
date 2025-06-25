const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('BTL_API_BLBH', 'vinh', '12345', {
    host: 'DESKTOP-QLK1R2V\\SQLEXPRESS', // Hoặc 'DESKTOP-QLK1R2V\\SQLEXPRESS'
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: false, // Thay đổi thành true nếu cần thiết (nếu bạn sử dụng Azure)
            trustServerCertificate: true // Thay đổi nếu không cần thiết
        },
        port: 1433 // Chỉ định cổng nếu cần
    }
});

// Kiểm tra kết nối
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Kết nối thành công!');
    } catch (error) {
        console.error('Không thể kết nối: ', error.message);
        console.error('Thông tin chi tiết: ', error);
    }
})();
