const mysql = require('mysql2/promise');

// MySQL 연결 설정
const dbConfig = {
    host: process.env.DB_HOST || '143.248.172.25',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'fishtank',
    password: process.env.DB_PASSWORD || 'fishtank',
    database: process.env.DB_NAME || 'fishtank',

    connectionLimit: 10
};

// 커넥션 풀 생성
const pool = mysql.createPool(dbConfig);

// DB 연결 생성
const createConnection = async () => {
    return await mysql.createConnection(dbConfig);
};

// DB 연결 테스트
const testConnection = async () => {
    try {
        const connection = await createConnection();
        console.log('데이터베이스 연결 성공');
        await connection.end();
        return true;
    } catch (error) {
        console.error('데이터베이스 연결 실패:', error);
        return false;
    }
};

module.exports = {
    dbConfig,
    pool,
    createConnection,
    testConnection
};