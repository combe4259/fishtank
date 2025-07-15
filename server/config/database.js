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
    host: 'centerbeam.proxy.rlwy.net',
    port: 31261,
    user: 'root',
    password: 'ELLkzaBSwUUzHaDLppQGEzIwxJXnTquX',
    database: 'railway',
    connectionLimit: 10,
    ssl: {
        rejectUnauthorized: false
    },
};

// 커넥션 풀 생성
const pool = mysql.createPool(dbConfig);

// DB 연결 생성
const createConnection = async () => {
    return await mysql.createConnection(dbConfig);
};

// DB 연결 테스트
// const testConnection = async () => {
//     try {
//         const connection = await createConnection();
//         console.log('데이터베이스 연결 성공');
//         await connection.end();
//         return true;
//     } catch (error) {
//         console.error('데이터베이스 연결 실패:', error);
//         return false;
//     }
// };

// DB 연결 테스트
const testConnection = async () => {
    try {
        console.log('데이터베이스 연결 테스트 시작...');
        console.log('연결 설정:', {
            host: dbConfig.host,
            port: dbConfig.port,
            user: dbConfig.user,
            database: dbConfig.database
        });

        const connection = await createConnection();
        console.log('데이터베이스 연결 성공!');

        // 간단한 쿼리 테스트
        const [rows] = await connection.execute('SELECT 1 as test');
        console.log('쿼리 테스트 성공:', rows);

        await connection.end();
        return true;
    } catch (error) {
        console.error('데이터베이스 연결 실패:', error);
        console.error('에러 상세:', {
            code: error.code,
            errno: error.errno,
            sqlState: error.sqlState
        });
        return false;
    }
};

module.exports = {
    dbConfig,
    pool,
    createConnection,
    testConnection
};