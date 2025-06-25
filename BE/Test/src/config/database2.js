require('dotenv').config();
const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER || 'vinh',
    password: process.env.DB_PASSWORD || '12345',
    server: process.env.DB_SERVER || 'DESKTOP-QLK1R2V\\SQLEXPRESS',
    database: process.env.DB_NAME || 'Boat_Book2',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERT === 'true'
    }
};

const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

pool.on('error', err => {
    console.error('Database Pool Error:', err);
});

module.exports = {
    pool,
    poolConnect,
    sql
};