const express = require('express');
const { Octokit } = require('octokit');
const { pool } = require('../config/database');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');

// JWT 검증 미들웨어
const authenticateToken = (req, res, next) => {
    // console.log('JWT 인증 미들웨어 시작...');
    // console.log('요청 헤더 확인:', {
    //     authorization: req.headers['authorization'] ? '존재함' : '없음'
    // });

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log('토큰이 없어서 인증 실패');
        return res.status(401).json({
            success: false,
            message: '인증 토큰이 필요합니다.'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // console.error('JWT 검증 실패:', err.message);
            return res.status(403).json({
                success: false,
                message: '유효하지 않은 토큰입니다.',
                error: err.message
            });
        }

        req.user = decoded;
        next();
    });
};

// getTodayCommits 함수 정의
async function getTodayCommits(octokit, username, todayStart, todayEnd) {
    const todayCommits = [];
    let totalCommitsToday = 0;

    try {
        // 사용자의 리포지토리 목록 가져오기
        const { data: repos } = await octokit.rest.repos.listForUser({
            username: username,
            type: 'owner',
            per_page: 100
        });

        for (const repo of repos) {
            try {
                // 각 리포지토리의 오늘 커밋 조회
                const { data: commits } = await octokit.rest.repos.listCommits({
                    owner: username,
                    repo: repo.name,
                    author: username,
                    since: todayStart.toISOString(),
                    until: todayEnd.toISOString(),
                    per_page: 100
                });

                totalCommitsToday += commits.length;

                // 커밋 정보 가공
                commits.forEach(commit => {
                    todayCommits.push({
                        repo: repo.name,
                        message: commit.commit.message,
                        date: commit.commit.author.date,
                        sha: commit.sha,
                        url: commit.html_url
                    });
                });
            } catch (repoError) {
                console.error(`레포 ${repo.name} 커밋 조회 실패:`, repoError.message);
                continue;
            }
        }
    } catch (error) {
        console.error('리포지토리 목록 조회 실패:', error.message);
        throw error;
    }

    return {
        todayCommits,
        totalCommitsToday
    };
}

// 공통 함수: 코인 계산 및 지급
async function awardCoins(connection, userId, totalCommits, openIssues, mergedPrs) {
    const commitCoins = totalCommits * 10;
    const issueCoins = openIssues * 20;
    const prCoins = mergedPrs * 30;
    const totalCoins = commitCoins + issueCoins + prCoins;

    if (totalCoins > 0) {
        await connection.execute(
            'UPDATE users SET fish_coins = fish_coins + ? WHERE id = ?',
            [totalCoins, userId]
        );
    }

    return {
        totalCoins,
        details: {
            commits: commitCoins,
            issues: issueCoins,
            prs: prCoins
        }
    };
}

// 공통 함수: 경험치와 레벨 업데이트
async function updateExperienceAndLevel(connection, userId, expGained) {
    const [user] = await connection.execute(
        'SELECT level, experience_points FROM users WHERE id = ?',
        [userId]
    );

    if (user.length === 0) {
        throw new Error('사용자를 찾을 수 없습니다.');
    }

    let { level, experience_points } = user[0];
    experience_points += expGained;

    const expPerLevel = 100; // 레벨당 100 경험치 필요
    while (experience_points >= expPerLevel) {
        level += 1;
        experience_points -= expPerLevel;
    }

    await connection.execute(
        'UPDATE users SET level = ?, experience_points = ? WHERE id = ?',
        [level, experience_points, userId]
    );

    return { level, experience_points };
}

// 공통 함수: 오늘 커밋 조회 (보상 지급 기능 포함)
router.get('/commits/today', authenticateToken, async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const userId = req.user.userId;

        const [users] = await connection.execute(
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
        const octokit = new Octokit({ auth: github_token });

        // 날짜 로직 제거: 모든 커밋을 조회
        const todayCommits = [];
        let totalCommitsToday = 0;

        const { data: repos } = await octokit.rest.repos.listForUser({
            username: github_username,
            type: 'owner',
            per_page: 100
        });

        for (const repo of repos) {
            try {
                const { data: commits } = await octokit.rest.repos.listCommits({
                    owner: github_username,
                    repo: repo.name,
                    author: github_username,
                    per_page: 100 // 날짜 필터(since, until) 제거
                });

                totalCommitsToday += commits.length;

                commits.forEach(commit => {
                    todayCommits.push({
                        repo: repo.name,
                        message: commit.commit.message,
                        date: commit.commit.author.date,
                        sha: commit.sha,
                        url: commit.html_url
                    });
                });
            } catch (repoError) {
                console.error(`레포 ${repo.name} 커밋 조회 실패:`, repoError.message);
                continue;
            }
        }

        // 보상 로직도 날짜 기반이 아니므로 단순화 (필요 시 제거 가능)
        await connection.beginTransaction();
        const coinResult = await awardCoins(connection, userId, totalCommitsToday, 0, 0);
        const expResult = await updateExperienceAndLevel(connection, userId, totalCommitsToday * 10);
        await connection.commit();

        res.json({
            success: true,
            data: {
                totalCommitsToday,
                commits: todayCommits.slice(0, 10),
                username: github_username,
                coinsEarned: coinResult.totalCoins,
                experienceGained: totalCommitsToday * 10,
                currentLevel: expResult.level,
                currentExperience: expResult.experience_points
            }
        });
    } catch (error) {
        await connection.rollback();
        console.error('GitHub 커밋 조회 에러:', error);
        res.status(500).json({
            success: false,
            message: 'GitHub 데이터를 가져올 수 없습니다.'
        });
    } finally {
        connection.release();
    }
});

// GitHub 주간 통계 API
router.get('/commits/week', authenticateToken, async (req, res) => {
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
        const octokit = new Octokit({ auth: github_token });

        const weeklyStats = [];
        const today = new Date();
        const koreanToday = new Date(today.getTime() + (9 * 60 * 60 * 1000));

        for (let i = 6; i >= 0; i--) {
            const date = new Date(koreanToday);
            date.setDate(koreanToday.getDate() - i);
            const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000 - 1);

            let dayCommits = 0;

            const { data: repos } = await octokit.rest.repos.listForUser({
                username: github_username,
                type: 'owner',
                per_page: 10
            });

            for (const repo of repos) {
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
                    console.error(`레포 ${repo.name} 커밋 조회 실패:`, repoError.message);
                    continue;
                }
            }

            weeklyStats.push({
                date: dayStart.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
                commits: dayCommits
            });
        }

        let streak = 0;
        for (let i = weeklyStats.length - 1; i >= 0; i--) {
            if (weeklyStats[i].commits > 0) {
                streak++;
            } else {
                break;
            }
        }

        res.json({
            success: true,
            data: {
                weeklyStats,
                totalWeekCommits: weeklyStats.reduce((sum, day) => sum + day.commits, 0),
                streak
            }
        });
    } catch (error) {
        console.error('GitHub 주간 통계 에러:', error);
        if (error.status === 403) {
            return res.status(403).json({
                success: false,
                message: 'GitHub API 제한을 초과했습니다. 나중에 다시 시도해 주세요.'
            });
        }
        res.status(500).json({
            success: false,
            message: '주간 커밋 통계를 가져올 수 없습니다.'
        });
    }
});

// GitHub 통계 API
router.get('/stats', authenticateToken, async (req, res) => {
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
        const octokit = new Octokit({ auth: github_token });

        const today = new Date();
        const kstOffset = 9 * 60 * 60 * 1000; // UTC+9 오프셋
        const kstToday = new Date(today.getTime() + kstOffset);
        const todayStart = new Date(kstToday.getFullYear(), kstToday.getMonth(), kstToday.getDate());
        const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000 - 1);

        console.log('오늘 날짜 (KST):', todayStart.toISOString(), 'to', todayEnd.toISOString());

        const { todayCommits, totalCommitsToday } = await getTodayCommits(octokit, github_username, todayStart, todayEnd);

        let openIssues = 0;
        let openPrs = 0;

        const { data: repos } = await octokit.rest.repos.listForUser({
            username: github_username,
            type: 'owner',
            per_page: 10
        });

        for (const repo of repos) {
            try {
                const { data: issues } = await octokit.rest.issues.listForRepo({
                    owner: github_username,
                    repo: repo.name,
                    state: 'open',
                    per_page: 100
                });
                openIssues += issues.length;

                const { data: pulls } = await octokit.rest.pulls.list({
                    owner: github_username,
                    repo: repo.name,
                    state: 'open',
                    per_page: 100
                });
                openPrs += pulls.length;
            } catch (repoError) {
                console.error(`레포 ${repo.name} 데이터 조회 실패:`, repoError.message);
                continue;
            }
        }

        const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Asia/Seoul'
        });
        const formattedDate = dateFormatter.format(todayStart);

        res.json({
            success: true,
            data: {
                totalCommitsToday,
                commits: todayCommits.slice(0, 10),
                date: formattedDate,
                issues: openIssues,
                prs: openPrs,
                username: github_username
            }
        });
    } catch (error) {
        console.error('GitHub 통계 조회 에러:', error);
        if (error.status === 403) {
            return res.status(403).json({
                success: false,
                message: 'GitHub API 제한을 초과했습니다. 나중에 다시 시도해 주세요.'
            });
        }
        res.status(500).json({
            success: false,
            message: 'GitHub 통계 정보를 가져올 수 없습니다.'
        });
    }
});

module.exports = router;