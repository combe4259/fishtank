// routes/github.js
const express = require('express');
const { Octokit } = require('octokit');
const { pool } = require('../config/database');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');
// // JWT 검증 미들웨어
const authenticateToken = (req, res, next) => {
    console.log('JWT 인증 미들웨어 시작...');
    console.log('요청 헤더 확인:');
    console.log('- Authorization 헤더:', req.headers['authorization'] ? '존재함' : '없음');

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('토큰 추출 결과:');
    console.log('- Auth Header:', authHeader ? authHeader.substring(0, 20) + '...' : '없음');
    console.log('- 추출된 토큰:', token ? '존재함 (길이: ' + token.length + ')' : '없음');

    if (!token) {
        console.log('토큰이 없어서 인증 실패');
        return res.status(401).json({
            success: false,
            message: '인증 토큰이 필요합니다.'
        });
    }

    console.log('🔍 JWT 검증 시작...');
    console.log('- JWT_SECRET 존재 여부:', process.env.JWT_SECRET ? '✅' : '❌');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(' JWT 검증 실패:');
            console.log('- 에러 타입:', err.name);
            console.log('- 에러 메시지:', err.message);
            return res.status(403).json({
                success: false,
                message: '유효하지 않은 토큰입니다.',
                error: err.message
            });
        }

        console.log(' JWT 검증 성공!');
        console.log('- 디코딩된 정보:', {
            userId: decoded.userId,
            loginType: decoded.loginType,
            exp: new Date(decoded.exp * 1000).toISOString()
        });

        req.user = decoded;
        console.log(' req.user 설정 완료');
        next();
    });
};

// GitHub 커밋 통계 조회 API
router.get('/commits/today', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId

        // 사용자의 GitHub 토큰 가져오기
        const [users] = await pool.execute(
            'SELECT github_token, github_username FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0 || !users[0].github_token) {
            return res.status(404).json({
                success: false,
                message: 'GitHub 계정이 연동되지 않았습니다.'
            });
        }

        const { github_token, github_username } = users[0];

        // Octokit 인스턴스 생성
        const octokit = new Octokit({
            auth: github_token
        });

        // 오늘 날짜 구하기
        const today = new Date();
        const koreanToday = new Date(today.getTime() + (9 * 60 * 60 * 1000)); // UTC+9
        const todayStart = new Date(koreanToday.getFullYear(), koreanToday.getMonth(), koreanToday.getDate());
        const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000 - 1);

        // 사용자의 모든 레포지토리 가져오기
        const { data: repos } = await octokit.rest.repos.listForUser({
            username: github_username,
            type: 'owner',
            per_page: 100
        });

        let todayCommits = [];
        let totalCommitsToday = 0;

        // 각 레포지토리에서 오늘의 커밋 찾기
        for (const repo of repos) {
            try {
                const { data: commits } = await octokit.rest.repos.listCommits({
                    owner: github_username,
                    repo: repo.name,
                    author: github_username,
                    since: todayStart.toISOString(),
                    until: todayEnd.toISOString(),
                    per_page: 100
                });

                // 오늘 커밋된 것들만 필터링
                const todayRepoCommits = commits.filter(commit => {
                    const commitDate = new Date(commit.commit.author.date);
                    const commitKoreanDate = new Date(commitDate.getTime() + (9 * 60 * 60 * 1000));
                    const commitDateOnly = new Date(commitKoreanDate.getFullYear(), commitKoreanDate.getMonth(), commitKoreanDate.getDate());
                    return commitDateOnly.getTime() === todayStart.getTime();
                });

                todayCommits.push(...todayRepoCommits.map(commit => ({
                    sha: commit.sha.substring(0, 7),
                    message: commit.commit.message.split('\n')[0], // 첫 번째 줄만
                    repository: repo.name,
                    time: new Date(commit.commit.author.date).toLocaleTimeString('ko-KR', {
                        timeZone: 'Asia/Seoul',
                        hour: '2-digit',
                        minute: '2-digit'
                    }),
                    url: commit.html_url,
                    date: commit.commit.author.date
                })));

                totalCommitsToday += todayRepoCommits.length;

            } catch (repoError) {
                console.log(`레포 ${repo.name}에서 커밋을 가져올 수 없습니다:`, repoError.message);
                continue;
            }
        }

        // 시간순으로 정렬
        todayCommits.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.json({
            success: true,
            data: {
                totalCommitsToday,
                commits: todayCommits.slice(0, 10), // 최대 10개만
                date: todayStart.toLocaleDateString('ko-KR'),
                username: github_username
            }
        });

    } catch (error) {
        console.error('GitHub 커밋 조회 에러:', error);
        res.status(500).json({
            success: false,
            message: 'GitHub 커밋 정보를 가져올 수 없습니다.'
        });
    }
});

// GitHub 주간 커밋 통계 API
router.get('/commits/week',authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        const [users] = await pool.execute(
            'SELECT github_token, github_username FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0 || !users[0].github_token) {
            return res.status(404).json({
                success: false,
                message: 'GitHub 계정이 연동되지 않았습니다.'
            });
        }

        const { github_token, github_username } = users[0];

        const octokit = new Octokit({
            auth: github_token
        });

        // 지난 7일간의 커밋 수 계산
        const weeklyStats = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);

            const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000 - 1);

            // 해당 날짜의 커밋 수 계산 (간단화를 위해 주요 레포만)
            let dayCommits = 0;

            try {
                const { data: repos } = await octokit.rest.repos.listForUser({
                    username: github_username,
                    type: 'owner',
                    per_page: 10 // 성능을 위해 최대 10개 레포만
                });

                for (const repo of repos.slice(0, 5)) { // 상위 5개 레포만
                    try {
                        const { data: commits } = await octokit.rest.repos.listCommits({
                            owner: github_username,
                            repo: repo.name,
                            author: github_username,
                            since: dayStart.toISOString(),
                            until: dayEnd.toISOString(),
                            per_page: 100
                        });
                        dayCommits += commits.length;
                    } catch (repoError) {
                        continue;
                    }
                }
            } catch (error) {
                console.log('주간 통계 계산 중 오류:', error.message);
            }

            weeklyStats.push({
                date: dayStart.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
                commits: dayCommits
            });
        }

        res.json({
            success: true,
            data: {
                weeklyStats,
                totalWeekCommits: weeklyStats.reduce((sum, day) => sum + day.commits, 0)
            }
        });

    } catch (error) {
        console.error('GitHub 주간 통계 에러:', error);
        res.status(500).json({
            success: false,
            message: '주간 커밋 통계를 가져올 수 없습니다.'
        });
    }
});

module.exports = router;