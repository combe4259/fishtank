const express = require('express');

const {pool, createConnection} = require('../config/database')
const router = express.Router();


// 회원가입 API
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
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
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, password]
        );

        res.status(201).json({
            success: true,
            message: '✅ 회원가입이 완료되었습니다!',
            user: {
                id: result.insertId,
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
        const token = jwt.sign(
            {
                userId: users[0].id,
                email: users[0].email,
                loginType: 'email'
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: '로그인 성공!',
            token: token, // 토큰 추가
            user: {
                id: users[0].id,
                email: users[0].email,
                username: users[0].username || users[0].email.split('@')[0],
                level: users[0].level || 1,
                experience_points: users[0].experience_points || 0,
                fish_coins: users[0].fish_coins || 0,
                profile_image_url: users[0].profile_image_url
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
//로그인 후 콜백
const jwt = require('jsonwebtoken')
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
        //토큰 수신
        const tokenData = await tokenResponse.json();

        if (!tokenData.access_token) {
            console.error('GitHub 토큰 받기 실패:');
            return res.redirect('http://localhost:5173/login?error=token_failed');
        }
        const accessToken = tokenData.access_token;


        // GitHub 사용자 정보 가져오기
        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!userResponse.ok) {
            throw new Error('GitHub 사용자 정보를 가져올 수 없습니다');
        }
        const githubUser = await userResponse.json();
        let [existingUsers] = await pool.execute(
            'SELECT * FROM users WHERE github_id = ?',
            [githubUser.id]
        );
        let user;
        if (existingUsers.length > 0) {
            // 기존 GitHub 사용자
            user = existingUsers[0];
            await pool.execute(
                'UPDATE users SET github_token = ?, profile_image_url = ?, updated_at = CURRENT_TIMESTAMP WHERE github_id = ?',
                [accessToken, githubUser.avatar_url, githubUser.id]
            );
        } else {
            // 새로운 GitHub 사용자
            const [result] = await pool.execute(
                `INSERT INTO users 
                 (github_id, github_username, github_token, username, email, 
                  profile_image_url, public_repos, followers, following,
                  level, experience_points, fish_coins) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    githubUser.id,
                    githubUser.login,
                    accessToken,
                    githubUser.login, // username에 GitHub 사용자명 저장
                    githubUser.email, // GitHub 이메일
                    githubUser.avatar_url,
                    githubUser.public_repos || 0,
                    githubUser.followers || 0,
                    githubUser.following || 0,
                    1, // 초기 레벨
                    0, // 초기 경험치
                    100 // 신규 가입 보너스
                ]
            );

            user = {
                id: result.insertId,
                github_id: githubUser.id,
                github_username: githubUser.login,
                username: githubUser.login,
                email: githubUser.email
            };
        }
        const token = jwt.sign(
            {
                userId: user.id,
                githubId: githubUser.id,
                username: githubUser.login,
                loginType: 'github' // GitHub 로그인
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // 토큰만 전달
        res.redirect(`http://localhost:5173/aquarium?auth_success=true&session=${token}`);

    } catch (error) {
        console.error('GitHub OAuth 에러:', error);
        res.redirect('http://localhost:5173/login?error=github_auth_failed');
    }
});

// JWT 검증 미들웨어
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({
            success: false,
            message: '인증 토큰이 필요합니다.'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: '유효하지 않은 토큰입니다.'
            });
        }
        req.user = decoded;
        next();
    });
};

// 사용자 프로필 조회 API
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        const [users] = await pool.execute(
            `SELECT id, email, username, github_username, profile_image_url, 
                    level, experience_points, fish_coins, 
                    public_repos, followers, following, 
                    created_at, updated_at 
             FROM users 
             WHERE id = ?`,
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: '사용자를 찾을 수 없습니다.'
            });
        }

        const user = users[0];

        res.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                username: user.username || user.github_username || user.email?.split('@')[0],
                profileImageUrl: user.profile_image_url,
                gameStats: {
                    level: user.level || 1,
                    experiencePoints: user.experience_points || 0,
                    fishCoins: user.fish_coins || 0
                },
                githubStats: {
                    publicRepos: user.public_repos || 0,
                    followers: user.followers || 0,
                    following: user.following || 0
                },
                createdAt: user.created_at,
                updatedAt: user.updated_at
            }
        });

    } catch (error) {
        console.error('프로필 조회 에러:', error);
        res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.'
        });
    }
});

module.exports = router;