const mysql = require('mysql2/promise');

// MySQL 연결 설정
// const dbConfig = {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//
//     connectionLimit: 10
// };
const dbConfig = {
    host: 'mysql.railway.internal',
    port: 3306,
    user: 'root',
    password: 'ELLkzaBSwUUzHaDLppQGEzIwxJXnTquX',
    database: 'railway',
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