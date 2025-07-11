const express = require('express');
const mysql = require('mysql2/promise');

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);

const router = express.Router();

// MySQL 연결 설정
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'fishtank',
    password: process.env.DB_PASSWORD || 'fishtank',
    database: process.env.DB_NAME || 'fishtank'
};

// 회원가입 API (JWT 제거)
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: '모든 필드를 입력해주세요.'
            });
        }

        const connection = await mysql.createConnection(dbConfig);

        const [existingUsers] = await connection.execute(
            'SELECT id FROM test_users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            await connection.end();
            return res.status(400).json({
                success: false,
                message: '이미 존재하는 이메일입니다.'
            });
        }

        const [result] = await connection.execute(
            'INSERT INTO test_users (name, email) VALUES (?, ?)',
            [username, email]
        );

        await connection.end();

        res.status(201).json({
            success: true,
            message: '회원가입이 완료되었습니다!',
            user: {
                id: result.insertId,
                username: username,
                email: email
            }
        });

    } catch (error) {
        console.error('회원가입 에러:', error);
        res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.'
        });
    }
});

module.exports = router;