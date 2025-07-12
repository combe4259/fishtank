const express = require('express');

const {pool, createConnection} = require('../config/database')
const router = express.Router();


// 회원가입 API
router.post('/signup', async (req, res) => {
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
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({
                success: false,
                message: '이미 존재하는 이메일입니다.'
            });
        }

        const [result] = await pool.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, password]
        );

        res.status(201).json({
            success: true,
            message: '✅ 회원가입이 완료되었습니다!',
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


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 이메일로 사용자 찾기
        const [users] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: '❌ 존재하지 않는 이메일입니다.'
            });
        }


        //TODO:해싱 추가필요함
        //비밀번호 확인
        if (users[0].password !== password) {
            return res.status(401).json({
                success: false,
                message: '❌ 비밀번호가 일치하지 않습니다.'
            });
        }

        res.json({
            success: true,
            message: '로그인 성공!',
            user: {
                id: users[0].id,
                username: users[0].username,
                email: users[0].email
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: '❌ 서버 오류가 발생했습니다.'
        });
    }
});


//github 시작
router.get('/oauth/github', (req, res) => {
    const githubAuthURL = `https://github.com/login/oauth/authorize?` +
        `client_id=${process.env.GITHUB_CLIENT_ID}&` +
        `redirect_uri=${process.env.GITHUB_CALLBACK_URL}&` +
        `scope=user:email,repo`;

    res.redirect(githubAuthURL);
});

router.get('/oauth/github/callback', async (req, res) => {
    const { code } = req.query;

    try {
        // GitHub에서 액세스 토큰 받기
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code: code
            })
        });

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // GitHub 사용자 정보 가져오기
        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const userData = await userResponse.json();

        // 사용자 정보를 DB에 저장하거나 세션에 저장
        // TODO: 실제 사용자 저장 로직

        // 성공 시 프론트엔드로 리다이렉트 (토큰과 함께)
        res.redirect(`http://localhost:5173/dashboard?token=${accessToken}&user=${encodeURIComponent(JSON.stringify(userData))}`);
        // res.redirect(`http://localhost:5173/`)

    } catch (error) {
        console.error('GitHub OAuth 에러:', error);
        res.redirect('http://localhost:5173/login?error=github_auth_failed');
    }
});

module.exports = router;