require('dotenv').config(); // Đọc biến môi trường từ .env
const { Sequelize } = require('sequelize');
const dbConfig = {
    user: process.env.DB_USER || 'vinh',
    password: process.env.DB_PASSWORD || '12345',
    server: process.env.DB_SERVER || 'DESKTOP-QLK1R2V\\SQLEXPRESS',
    database: process.env.DB_NAME || 'Boat_Book2',
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true', // Chuyển đổi thành boolean
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERT === 'true' // Chuyển đổi thành boolean
    }
};

// Khởi tạo Sequelize
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.server,
    dialect: 'mssql', // Chỉ định dialect là mssql
    dialectOptions: {
        options: {
            encrypt: dbConfig.options.encrypt,
            trustServerCertificate: dbConfig.options.trustServerCertificate,
        },
    },
});

module.exports = sequelize;
