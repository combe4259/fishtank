const express = require('express');
const { pool } = require('../config/database');
const router = express.Router();
const jwt = require('jsonwebtoken');

// JWT 검증 미들웨어
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

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


const { Octokit } = require("octokit");

/**
 * 사용자의 최근 n일간 커밋 여부를 확인하는 함수
 * @param {string} githubToken - GitHub personal access token
 * @param {string} username - GitHub 사용자 이름
 * @param {number} n - 연속 커밋 확인할 일 수
 * @returns {Promise<boolean>} - true: n일 연속 커밋 존재, false: 하루라도 빠짐
 */
async function checkConsecutiveCommits(githubToken, username, n) {
  const octokit = new Octokit({ auth: githubToken });
  const today = new Date();

  for (let i = 0; i < n; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);

    const since = new Date(day.setHours(0, 0, 0, 0)).toISOString();
    const until = new Date(day.setHours(23, 59, 59, 999)).toISOString();

    let commitsFound = false;

    const { data: repos } = await octokit.rest.repos.listForUser({
      username,
      type: 'owner',
      per_page: 100,
    });

    for (const repo of repos) {
      try {
        const { data: commits } = await octokit.rest.repos.listCommits({
          owner: username,
          repo: repo.name,
          author: username,
          since,
          until,
          per_page: 10,
        });

        if (commits.length > 0) {
          commitsFound = true;
          break;
        }
      } catch (err) {
        console.error(`❌ ${repo.name} 커밋 조회 실패:`, err.message);
      }
    }

    if (!commitsFound) return false; // 하루라도 빠졌으면 false 즉시 반환
  }

  return true; // 모든 날에 커밋이 있음
}

module.exports = checkConsecutiveCommits;


// 업적 체크 함수
const checkAchievements = async (userId, triggerType, data = {}) => {
    // 1. authenticateToken이 JWT를 통해 사용자 ID 추출
    req.user = { user_id: userId };

    // 2. DB에서 userId로 GitHub 토큰을 조회
    const [rows] = await pool.execute(
    'SELECT github_token, github_username FROM users WHERE id = ?',
    [req.user.user_id]
    );
    const githubToken = rows[0].github_token;
    const username = rows[0].github_username;
    try {
        console.log(` 업적 체크 시작: ${triggerType} for user ${userId}`);

        // 해당 타입의 미완료 업적들 가져오기
        const [achievements] = await pool.execute(`
            SELECT a.*, 
                   COALESCE(ua.current_progress, 0) as current_progress, 
                   COALESCE(ua.is_completed, 0) as is_completed 
            FROM achievements a
            LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = ?
            WHERE a.type = ? AND a.is_active = 1 AND (ua.is_completed IS NULL OR ua.is_completed = 0)
        `, [userId, triggerType]);

        console.log(`📋 체크할 업적 수: ${achievements.length}개`);

        for (const achievement of achievements) {
            let shouldUpdate = false;
            let newProgress = achievement.current_progress || 0;
            let isCompleted = false;

            switch (triggerType) {
                case 'github_followers':
                    newProgress = data.followers || 0;
                    isCompleted = newProgress >= achievement.target_value;
                    shouldUpdate = true;
                    console.log(`👥 팔로워 체크: ${newProgress}/${achievement.target_value}`);
                    break;

                case 'github_first_commit':
                    if (data.totalCommits > 0) {
                        newProgress = 1;
                        isCompleted = true;
                        shouldUpdate = true;
                        console.log(`🚀 첫 커밋 달성!`);
                    }
                    break;

                case 'github_first_star':
                    if (data.totalStars > 0) {
                        newProgress = 1;
                        isCompleted = true;
                        shouldUpdate = true;
                        console.log(`⭐ 첫 스타 달성!`);
                    }
                    break;

                case 'login_time_special':
                    const now = new Date();
                    const hour = now.getHours();
                    const minute = now.getMinutes();
                    if (hour === 4 && minute === 4) {
                        newProgress = 1;
                        isCompleted = true;
                        shouldUpdate = true;
                        console.log(`⏰ 시간여행자 달성! (04:04)`);
                    }
                    break;
                    case 'github_commit_streak':
                        const streakTarget = achievement.target_value;
                    
                        const streakValid = await checkConsecutiveCommits(githubToken, username, streakTarget);
                        
                        if (streakValid) {
                            newProgress = streakTarget;
                            isCompleted = true;
                            shouldUpdate = true;
                            console.log(`🔥 ${streakTarget}일 연속 커밋 달성!`);
                        } else {
                            // 현재 streak progress 기록용 (예: 3일 연속까지만 성공한 상태)
                            const today = new Date();
                            let actualStreak = 0;
                    
                            for (let i = 0; i < streakTarget; i++) {
                                const day = new Date(today);
                                day.setDate(today.getDate() - i);
                                const since = new Date(day.setHours(0, 0, 0, 0)).toISOString();
                                const until = new Date(day.setHours(23, 59, 59, 999)).toISOString();
                    
                                const { data: repos } = await octokit.rest.repos.listForUser({
                                    username,
                                    type: 'owner',
                                    per_page: 100,
                                });
                    
                                let found = false;
                                for (const repo of repos) {
                                    try {
                                        const { data: commits } = await octokit.rest.repos.listCommits({
                                            owner: username,
                                            repo: repo.name,
                                            author: username,
                                            since,
                                            until,
                                            per_page: 1,
                                        });
                    
                                        if (commits.length > 0) {
                                            found = true;
                                            break;
                                        }
                                    } catch (err) {
                                        console.log(`❌ 커밋 조회 실패 (${repo.name})`, err.message);
                                    }
                                }
                    
                                if (found) {
                                    actualStreak++;
                                } else {
                                    break; // 연속성 깨졌음
                                }
                            }
                    
                            newProgress = actualStreak;
                            console.log(`📈 현재 커밋 스트릭 진행도: ${actualStreak}/${streakTarget}`);
                            shouldUpdate = true;
                        }
                        break;
            }

            if (shouldUpdate) {
                // user_achievements 테이블 업데이트 또는 삽입
                // if (achievement.current_progress !== null) {
                //     // 기존 레코드 업데이트
                //     await pool.execute(`
                //         UPDATE user_achievements 
                //         SET current_progress = ?, is_completed = ?, completed_at = ?, updated_at = NOW()
                //         WHERE user_id = ? AND achievement_id = ?
                //     `, [newProgress, isCompleted ? 1 : 0, isCompleted ? new Date() : null, userId, achievement.id]);
                // } else {
                //     // 새 레코드 삽입
                //     await pool.execute(`
                //         INSERT INTO user_achievements (user_id, achievement_id, current_progress, is_completed, completed_at)
                //         VALUES (?, ?, ?, ?, ?)
                //     `, [userId, achievement.id, newProgress, isCompleted ? 1 : 0, isCompleted ? new Date() : null]);
                // }

                const [rows] = await pool.execute(
                    `SELECT * FROM user_achievements WHERE user_id = ? AND achievement_id = ?`,
                    [userId, achievement.id]
                  );
                  
                  if (rows.length > 0) {
                    // 이미 있으면 UPDATE
                    await pool.execute(`
                      UPDATE user_achievements 
                      SET current_progress = ?, is_completed = ?, completed_at = ?, updated_at = NOW()
                      WHERE user_id = ? AND achievement_id = ?
                    `, [newProgress, isCompleted ? 1 : 0, isCompleted ? new Date() : null, userId, achievement.id]);
                  } else {
                    // 없으면 INSERT
                    await pool.execute(`
                      INSERT INTO user_achievements (user_id, achievement_id, current_progress, is_completed, completed_at)
                      VALUES (?, ?, ?, ?, ?)
                    `, [userId, achievement.id, newProgress, isCompleted ? 1 : 0, isCompleted ? new Date() : null]);
                  }

                // 업적 완료시 로그
                if (isCompleted && !achievement.is_completed) {
                    console.log(`🎉 업적 달성! "${achievement.name}" - 사용자 ${userId}`);

                }
            }
        }
    } catch (error) {
        console.error('❌ 업적 체크 에러:', error);
    }
};

// 사용자 업적 목록 조회
router.get('/list', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        const [achievements] = await pool.execute(`
            SELECT 
                a.id,
                a.name,
                a.description,
                a.type,
                a.target_value,
                a.rarity,
                a.icon,
                COALESCE(ua.current_progress, 0) as current_progress,
                COALESCE(ua.is_completed, 0) as is_completed,
                ua.completed_at
            FROM achievements a
            LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = ?
            WHERE a.is_active = 1
            ORDER BY ua.is_completed ASC, 
                     FIELD(a.rarity, 'common', 'rare', 'epic', 'legendary'), 
                     a.id ASC
        `, [userId]);

        const completed = achievements.filter(a => a.is_completed === 1);
        const inProgress = achievements.filter(a => a.is_completed === 0);

        res.json({
            success: true,
            data: {
                achievements,
                stats: {
                    total: achievements.length,
                    completed: completed.length,
                    inProgress: inProgress.length,
                    completionRate: Math.round((completed.length / achievements.length) * 100)
                }
            }
        });

    } catch (error) {
        console.error('업적 목록 조회 에러:', error);
        res.status(500).json({
            success: false,
            message: '업적 목록을 불러올 수 없습니다.'
        });
    }
});

// 수동 업적 체크 API (테스트용)
router.post('/check/:type', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const triggerType = req.params.type;
        const data = req.body;

        console.log(`🔧 수동 업적 체크 요청: ${triggerType}`, data);

        await checkAchievements(userId, triggerType, data);

        res.json({
            success: true,
            message: `${triggerType} 업적 체크 완료`
        });

    } catch (error) {
        console.error('수동 업적 체크 에러:', error);
        res.status(500).json({
            success: false,
            message: '업적 체크 중 오류가 발생했습니다.'
        });
    }
});

// 특정 업적 진행률 조회
router.get('/progress/:achievementId', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const achievementId = req.params.achievementId;

        const [result] = await pool.execute(`
            SELECT 
                a.name,
                a.description,
                a.target_value,
                a.rarity,
                a.icon,
                COALESCE(ua.current_progress, 0) as current_progress,
                COALESCE(ua.is_completed, 0) as is_completed,
                ua.completed_at,
                ROUND((COALESCE(ua.current_progress, 0) / a.target_value) * 100, 1) as progress_percentage
            FROM achievements a
            LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = ?
            WHERE a.id = ? AND a.is_active = 1
        `, [userId, achievementId]);

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: '업적을 찾을 수 없습니다.'
            });
        }

        res.json({
            success: true,
            data: result[0]
        });

    } catch (error) {
        console.error('업적 진행률 조회 에러:', error);
        res.status(500).json({
            success: false,
            message: '업적 진행률을 조회할 수 없습니다.'
        });
    }
});

module.exports = router;
module.exports.checkAchievements = checkAchievements;