const express = require('express');
const jwt = require('jsonwebtoken');
const {pool, createConnection} = require('../config/database')
// const achievements = require('./achievements');
// const checkAchievements = achievements.checkAchievements;

const router = express.Router();

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

// 로그인 API
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

        // try {
        //     await checkAchievements(users[0].id, 'login_time_special');
        //     console.log(`로그인 시간 업적 체크 완료 - 사용자 ${users[0].id}`);
        // } catch (achievementError) {
        //     console.error('로그인 업적 체크 에러:', achievementError);
        // }

        res.json({
            success: true,
            message: '로그인 성공!',
            token: token,
            user: {
                id: users[0].id,
                email: users[0].email,
                username: users[0].username || users[0].email.split('@')[0],
                level: users[0].level || 1,
                experience_points: users[0].experience_points || 0,
                fish_coins: users[0].fish_coins || 0,
                profile_image_url: users[0].profile_image_url,
                github_id: users[0].github_id // GitHub 연동 상태 확인을 위해 추가
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: '❌ 서버 오류가 발생했습니다.'
        });
    }
});

// GitHub OAuth 시작
router.get('/oauth/github', (req, res) => {
    const githubAuthURL = `https://github.com/login/oauth/authorize?` +
        `client_id=${process.env.GITHUB_CLIENT_ID}&` +
        `redirect_uri=${process.env.GITHUB_CALLBACK_URL}&` +
        `scope=user:email,repo`;

    res.redirect(githubAuthURL);
});

// GitHub OAuth 콜백
router.get('/oauth/github/callback', async (req, res) => {
    const { code, state } = req.query;

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

        if (!tokenData.access_token) {
            console.error('GitHub 토큰 받기 실패');
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

        // 기존 GitHub 사용자 확인
        let [existingGithubUsers] = await pool.execute(
            'SELECT * FROM users WHERE github_id = ?',
            [githubUser.id]
        );

        let user;
        let isNewConnection = false;

        if (existingGithubUsers.length > 0) {
            // 이미 GitHub 계정이 연동된 경우 - 기존 사용자 로그인
            user = existingGithubUsers[0];

            // GitHub 정보 업데이트
            await pool.execute(
                'UPDATE users SET github_token = ?, profile_image_url = ?, public_repos = ?, followers = ?, following = ?, updated_at = CURRENT_TIMESTAMP WHERE github_id = ?',
                [accessToken, githubUser.avatar_url, githubUser.public_repos || 0, githubUser.followers || 0, githubUser.following || 0, githubUser.id]
            );

        } else if (state === 'connect') {
            let [existingEmailUsers] = await pool.execute(
                'SELECT * FROM users WHERE email = ? AND github_id IS NULL',
                [githubUser.email]
            );

            if (existingEmailUsers.length > 0) {
                // 기존 이메일 사용자에게 GitHub 정보 추가
                user = existingEmailUsers[0];

                await pool.execute(
                    `UPDATE users SET 
                     github_id = ?, github_username = ?, github_token = ?,
                     profile_image_url = ?, public_repos = ?, followers = ?, following = ?,
                     updated_at = CURRENT_TIMESTAMP 
                     WHERE id = ?`,
                    [
                        githubUser.id, githubUser.login, accessToken,
                        githubUser.avatar_url, githubUser.public_repos || 0,
                        githubUser.followers || 0, githubUser.following || 0,
                        user.id
                    ]
                );

                isNewConnection = true;

            } else {
                // 연동할 기존 사용자를 찾을 수 없는 경우
                return res.redirect('http://localhost:5173/login?error=user_not_found');
            }

        } else {
            // 완전히 새로운 GitHub 사용자 생성
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
                    githubUser.login,
                    githubUser.email,
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

        try {
            await checkAchievements(user.id, 'login_time_special');
            console.log(`⏰ GitHub 로그인 시간 업적 체크 완료 - 사용자 ${user.id}`);
        } catch (achievementError) {
            console.error('GitHub 로그인 업적 체크 에러:', achievementError);
        }

        const token = jwt.sign(
            {
                userId: user.id,
                githubId: githubUser.id,
                username: user.username || githubUser.login,
                loginType: isNewConnection ? 'email' : 'github' // 연동인 경우 기존 로그인 타입 유지
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // 성공 메시지와 함께 리다이렉트
        const successMessage = isNewConnection ? 'github_connected' : 'auth_success';
        res.redirect(`http://localhost:5173/aquarium?${successMessage}=true&session=${token}`);

    } catch (error) {
        console.error('GitHub OAuth 에러:', error);
        res.redirect('http://localhost:5173/login?error=github_auth_failed');
    }
});

// 사용자 프로필 조회 API
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        try {
            await checkAchievements(userId, 'login_time_special');
        } catch (achievementError) {
            console.error('프로필 조회시 업적 체크 에러:', achievementError);
        }

        const [users] = await pool.execute(
            `SELECT id, email, username, github_username, github_id, profile_image_url, 
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
                github_id: user.github_id, // GitHub 연동 상태 확인용
                level: user.level || 1,
                experience_points: user.experience_points || 0,
                fish_coins: user.fish_coins || 0,
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