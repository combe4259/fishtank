require('dotenv').config();
const express = require('express');
const { pool } = require('../config/database');
const router = express.Router();
const jwt = require('jsonwebtoken');

// JWT 검증 미들웨어
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
            console.log('JWT 검증 실패:');
            console.log('- 에러 타입:', err.name);
            console.log('- 에러 메시지:', err.message);
            return res.status(403).json({
                success: false,
                message: '유효하지 않은 토큰입니다.',
                error: err.message
            });
        }

        console.log('JWT 검증 성공!');
        console.log('- 디코딩된 정보:', {
            userId: decoded.userId,
            loginType: decoded.loginType,
            exp: new Date(decoded.exp * 1000).toISOString()
        });

        req.user = decoded;
        console.log('req.user 설정 완료');
        next();
    });
};

// 구매 가능한 물고기 목록 조회
router.get('/fish/list', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId; // authenticateToken에서 설정된 userId 사용

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: '사용자 ID가 유효하지 않습니다.'
            });
        }

        // 사용자 레벨 조회
        const [userInfo] = await pool.query(
            'SELECT level FROM users WHERE id = ?',
            [userId]
        );

        if (!userInfo.length) {
            return res.status(404).json({
                success: false,
                message: '사용자를 찾을 수 없습니다.'
            });
        }

        const userLevel = userInfo[0].level;

        // 구매 가능한 물고기 목록 조회
        const [fishTypes] = await pool.query(
            `
                SELECT
                    ft.id,
                    ft.name,
                    ft.species,
                    ft.price,
                    ft.image_url,
                    ft.description,
                    ft.unlock_level,
                    CASE
                        WHEN ft.unlock_level <= ? THEN true
                        ELSE false
                        END as is_unlocked,
                    CASE
                        WHEN f.id IS NOT NULL THEN true
                        ELSE false
                        END as is_owned
                FROM fish_types ft
                         LEFT JOIN fish f ON ft.id = f.fish_type_id AND f.user_id = ?
                WHERE ft.unlock_condition = 1
                ORDER BY ft.price ASC
            `,
            [userLevel, userId]
        );

        res.json({
            success: true,
            fishTypes: fishTypes
        });

    } catch (error) {
        console.error('물고기 목록 조회 에러:', error);
        res.status(500).json({
            success: false,
            message: '물고기 목록을 불러오는데 실패했습니다.'
        });
    }
});

// 물고기 구매
router.post('/fish/buy', authenticateToken, async (req, res) => {
    const connection = await pool.getConnection();

    try {
        const userId = req.user.userId;

        if (!userId) {
            await connection.rollback();
            return res.status(401).json({
                success: false,
                message: '사용자 인증이 필요합니다.'
            });
        }

        const { fishTypeId } = req.body;

        if (!fishTypeId) {
            await connection.rollback();
            return res.status(400).json({
                success: false,
                message: '구매할 물고기를 선택해주세요.'
            });
        }

        await connection.beginTransaction();

        // 사용자 정보 조회
        const [userInfo] = await connection.query(
            'SELECT fish_coins, level FROM users WHERE id = ? FOR UPDATE',
            [userId]
        );

        if (!userInfo.length) {
            await connection.rollback();
            return res.status(404).json({
                success: false,
                message: '사용자를 찾을 수 없습니다.'
            });
        }

        const userCoins = userInfo[0].fish_coins;
        const userLevel = userInfo[0].level;

        // 물고기 정보 조회
        const [fishType] = await connection.query(
            'SELECT * FROM fish_types WHERE id = ?',
            [fishTypeId]
        );

        if (!fishType.length) {
            await connection.rollback();
            return res.status(404).json({
                success: false,
                message: '해당 물고기를 찾을 수 없습니다.'
            });
        }

        const fish = fishType[0];

        // 보유 확인
        const [existingFish] = await connection.query(
            'SELECT id FROM fish WHERE user_id = ? AND fish_type_id = ?',
            [userId, fishTypeId]
        );

        if (existingFish.length > 0) {
            await connection.rollback();
            return res.status(400).json({
                success: false,
                message: '이미 보유하고 있는 물고기입니다.'
            });
        }

        // 레벨 확인
        if (fish.unlock_level > userLevel) {
            await connection.rollback();
            return res.status(400).json({
                success: false,
                message: `레벨 ${fish.unlock_level} 이상이 되어야 구매할 수 있습니다.`
            });
        }

        // 코인 확인
        if (userCoins < fish.price) {
            await connection.rollback();
            return res.status(400).json({
                success: false,
                message: '코인이 부족합니다.',
                required: fish.price,
                current: userCoins
            });
        }

        // 코인 차감
        await connection.query(
            'UPDATE users SET fish_coins = fish_coins - ? WHERE id = ?',
            [fish.price, userId]
        );

        // 물고기 추가
        const [result] = await connection.query(
            'INSERT INTO fish (user_id, fish_type_id, nickname, is_in_aquarium) VALUES (?, ?, ?, 1)',
            [userId, fishTypeId, fish.name]
        );

        await connection.commit();

        res.json({
            success: true,
            message: `${fish.name}을(를) 구매했습니다!`,
            purchasedFish: {
                id: result.insertId,
                name: fish.name,
                species: fish.species,
                image_url: fish.image_url
            },
            remainingCoins: userCoins - fish.price,
        });

    } catch (error) {
        await connection.rollback();
        console.error('물고기 구매 에러:', error);
        res.status(500).json({
            success: false,
            message: '물고기 구매 중 오류가 발생했습니다.'
        });
    } finally {
        connection.release();
    }
});

// 보유 물고기 목록 조회
router.get('/my-fish', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: '사용자 인증이 필요합니다.'
            });
        }

        const [myFish] = await pool.query(
            `
                SELECT
                    f.id,
                    f.nickname,
                    f.acquired_at,
                    f.is_in_aquarium,
                    ft.name as original_name,
                    ft.species,
                    ft.image_url,
                    ft.animation_type,
                    ft.description
                FROM fish f
                         JOIN fish_types ft ON f.fish_type_id = ft.id
                WHERE f.user_id = ?
                ORDER BY f.acquired_at DESC
            `,
            [userId]
        );

        res.json({
            success: true,
            fish: myFish
        });

    } catch (error) {
        console.error('보유 물고기 조회 에러:', error);
        res.status(500).json({
            success: false,
            message: '보유 물고기를 불러오는데 실패했습니다.'
        });
    }
});

// 물고기를 어항에 추가/제거
router.patch('/:id/toggle-aquarium', authenticateToken, async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const userId = req.user.userId;
        const fishId = req.params.id;

        await connection.beginTransaction();

        // 물고기 소유권 확인
        const [fish] = await connection.query(
            'SELECT is_in_aquarium FROM fish WHERE id = ? AND user_id = ?',
            [fishId, userId]
        );

        if (!fish.length) {
            await connection.rollback();
            return res.status(404).json({
                success: false,
                message: '물고기를 찾을 수 없습니다.'
            });
        }

        const currentStatus = fish[0].is_in_aquarium;
        const newStatus = currentStatus ? 0 : 1;

        // 상태 업데이트
        await connection.query(
            'UPDATE fish SET is_in_aquarium = ? WHERE id = ?',
            [newStatus, fishId]
        );

        await connection.commit();

        res.json({
            success: true,
            message: newStatus ? '어항에 추가되었습니다.' : '어항에서 제거되었습니다.',
            is_in_aquarium: newStatus
        });
    } catch (error) {
        await connection.rollback();
        console.error('어항 상태 변경 에러:', error);
        res.status(500).json({
            success: false,
            message: '어항 상태 변경 중 오류가 발생했습니다.'
        });
    } finally {
        connection.release();
    }
});

// 구매 가능한 장식품 목록 조회
router.get('/decorations/list', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const [userInfo] = await pool.query('SELECT level FROM users WHERE id = ?', [userId]);
        if (!userInfo.length) {
            return res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
        }
        const userLevel = userInfo[0].level;
        const [decorationTypes] = await pool.query(
            `
                SELECT
                    dt.id,
                    dt.name,
                    dt.price,
                    dt.image_url,
                    dt.unlock_level,
                    dt.description,
                    CASE WHEN dt.unlock_level <= ? THEN true ELSE false END as is_unlocked,
                    CASE WHEN ud.id IS NOT NULL THEN true ELSE false END as is_owned
                FROM decoration_types dt
                LEFT JOIN user_decorations ud ON dt.id = ud.decoration_type_id AND ud.user_id = ?
                WHERE dt.unlock_condition = 1
                ORDER BY dt.price ASC
            `,
            [userLevel, userId]
        );
        res.json({ success: true, decorationTypes });
    } catch (error) {
        console.error('장식품 목록 조회 에러:', error);
        res.status(500).json({ success: false, message: '장식품 목록을 불러오는데 실패했습니다.' });
    }
});


router.post('/decorations/buy', authenticateToken, async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const userId = req.user.userId;
        const { decorationTypeId } = req.body;
        if (!decorationTypeId) {
            return res.status(400).json({ success: false, message: '구매할 장식품을 선택해주세요.' });
        }
        await connection.beginTransaction();
        const [userInfo] = await connection.query('SELECT fish_coins, level FROM users WHERE id = ? FOR UPDATE', [userId]);
        if (!userInfo.length) {
            await connection.rollback();
            return res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
        }
        const userCoins = userInfo[0].fish_coins;
        const userLevel = userInfo[0].level;
        const [decorationType] = await connection.query('SELECT * FROM decoration_types WHERE id = ?', [decorationTypeId]);
        if (!decorationType.length) {
            await connection.rollback();
            return res.status(404).json({ success: false, message: '해당 장식품을 찾을 수 없습니다.' });
        }
        const decoration = decorationType[0];
        const [existingDecoration] = await connection.query(
            'SELECT id FROM user_decorations WHERE user_id = ? AND decoration_type_id = ?',
            [userId, decorationTypeId]
        );
        if (existingDecoration.length > 0) {
            await connection.rollback();
            return res.status(400).json({ success: false, message: '이미 보유하고 있는 장식품입니다.' });
        }
        if (decoration.unlock_level > userLevel) {
            await connection.rollback();
            return res.status(400).json({ success: false, message: `레벨 ${decoration.unlock_level} 이상이 되어야 구매할 수 있습니다.` });
        }
        if (userCoins < decoration.price) {
            await connection.rollback();
            return res.status(400).json({ success: false, message: '코인이 부족합니다.' });
        }
        await connection.query('UPDATE users SET fish_coins = fish_coins - ? WHERE id = ?', [decoration.price, userId]);
        const [result] = await connection.query(
            'INSERT INTO user_decorations (user_id, decoration_type_id, is_placed) VALUES (?, ?, 0)',
            [userId, decorationTypeId]
        );
        await connection.commit();
        res.json({
            success: true,
            message: `${decoration.name}을(를) 구매했습니다!`,
            purchasedDecoration: { id: result.insertId, name: decoration.name, image_url: decoration.image_url },
            remainingCoins: userCoins - decoration.price
        });
    } catch (error) {
        await connection.rollback();
        console.error('장식품 구매 에러:', error);
        res.status(500).json({ success: false, message: '장식품 구매 중 오류가 발생했습니다.' });
    } finally {
        connection.release();
    }
});

// 보유 장식품 목록 조회
router.get('/my-decorations', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const [myDecorations] = await pool.query(
            `
                SELECT
                    ud.id,
                    ud.position_x,
                    ud.position_y,
                    ud.acquired_at,
                    ud.is_placed,
                    dt.name,
                    dt.image_url,
                    dt.description
                FROM user_decorations ud
                JOIN decoration_types dt ON ud.decoration_type_id = dt.id
                WHERE ud.user_id = ?
                ORDER BY ud.acquired_at DESC
            `,
            [userId]
        );
        res.json({ success: true, decorations: myDecorations });
    } catch (error) {
        console.error('보유 장식품 조회 에러:', error);
        res.status(500).json({ success: false, message: '보유 장식품을 불러오는데 실패했습니다.' });
    }
});
// 장식품을 어항에 배치/제거
router.patch('/decorations/:id/toggle-aquarium', authenticateToken, async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const userId = req.user.userId;
        const decorationId = req.params.id;

        await connection.beginTransaction();

        // 장식품 소유권 확인
        const [decoration] = await connection.query(
            'SELECT is_placed FROM user_decorations WHERE id = ? AND user_id = ?',
            [decorationId, userId]
        );

        if (!decoration.length) {
            await connection.rollback();
            return res.status(404).json({
                success: false,
                message: '장식품을 찾을 수 없습니다.'
            });
        }

        const currentStatus = decoration[0].is_placed;
        const newStatus = currentStatus ? 0 : 1;

        // 상태 업데이트
        await connection.query(
            'UPDATE user_decorations SET is_placed = ? WHERE id = ?',
            [newStatus, decorationId]
        );

        await connection.commit();

        res.json({
            success: true,
            message: newStatus ? '어항에 배치되었습니다.' : '어항에서 제거되었습니다.',
            is_placed: newStatus
        });
    } catch (error) {
        await connection.rollback();
        console.error('장식품 배치 상태 변경 에러:', error);
        res.status(500).json({
            success: false,
            message: '장식품 배치 상태 변경 중 오류가 발생했습니다.'
        });
    } finally {
        connection.release();
    }
});

module.exports = router;