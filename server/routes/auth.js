const express = require('express');

const {pool, createConnection} = require('../config/database')
const router = express.Router();


// 회원가입 API
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: '모든 필드를 입력해주세요.'
            });
        }

        //커넥션 풀로 연결
        const [existingUsers] = await pool.execute(
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

        const [result] = await pool.execute(
            'INSERT INTO test_users (name, email) VALUES (?, ?)',
            [username, email]
        );

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