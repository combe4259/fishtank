const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { pool } = require('../config/database');
// JWT 검증 미들웨어
const authenticateToken = (req, res, next) => {
    console.log('JWT 인증 미들웨어 시작...');
    console.log('요청 헤더 확인:', {
        authorization: req.headers['authorization'] ? '존재함' : '없음'
    });

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
            console.error('JWT 검증 실패:', err.message);
            return res.status(403).json({
                success: false,
                message: '유효하지 않은 토큰입니다.',
                error: err.message
            });
        }

        req.user = decoded;
        console.log('JWT 인증 성공, 사용자 ID:', decoded.userId);
        next();
    });
};

// ✅ 전체 유저 목록 조회 (인증 추가)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT id, username, profile_image_url FROM users');
        res.json(rows);
    } catch (err) {
        console.error('전체 유저 조회 에러:', err);
        res.status(500).json({ message: '전체 유저 조회 실패' });
    }
});

// ✅ 친구 신청 (인증 추가)
router.post('/add', authenticateToken, async (req, res) => {
    try {
        const requester_id = req.user.userId; // 토큰에서 추출
        const { addressee_id } = req.body;

        if (!addressee_id) {
            return res.status(400).json({ message: '요청 정보가 부족합니다.' });
        }

        // 중복 신청 방지
        const [dup] = await pool.execute(
            `SELECT id, status FROM friendships
             WHERE (requester_id=? AND addressee_id=?)
                OR (requester_id=? AND addressee_id=?)
             LIMIT 1`,
            [requester_id, addressee_id, addressee_id, requester_id]
        );

        if (dup.length) {
            return res.status(409).json({ message: `이미 '${dup[0].status}'된 내역이 있습니다.` });
        }

        // INSERT pending
        const [result] = await pool.execute(
            `INSERT INTO friendships
               (requester_id, addressee_id, status, created_at, updated_at)
             VALUES (?, ?, 'pending', NOW(), NOW())`,
            [requester_id, addressee_id]
        );

        const [[row]] = await pool.execute(
            'SELECT * FROM friendships WHERE id = ?',
            [result.insertId]
        );
        res.status(201).json(row);
    } catch (err) {
        console.error('친구 신청 에러:', err);
        res.status(500).json({ message: '친구 신청 실패' });
    }
});

// ✅ 친구 수락 (인증 추가)
router.put('/:id/accept', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const [found] = await pool.execute(
            'SELECT * FROM friendships WHERE id = ? AND addressee_id = ?',
            [id, userId]
        );

        if (!found.length) {
            return res.status(404).json({ message: '요청 없음' });
        }
        if (found[0].status !== 'pending') {
            return res.status(409).json({ message: '이미 처리된 요청입니다.' });
        }

        await pool.execute(
            `UPDATE friendships
               SET status='accepted', updated_at=NOW()
             WHERE id = ?`,
            [id]
        );

        const [[updated]] = await pool.execute(
            'SELECT * FROM friendships WHERE id = ?',
            [id]
        );
        res.json(updated);
    } catch (err) {
        console.error('친구 수락 에러:', err);
        res.status(500).json({ message: '수락 실패' });
    }
});

// ✅ 친구 거절 (인증 추가)
router.put('/:id/reject', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const [found] = await pool.execute(
            'SELECT * FROM friendships WHERE id = ? AND addressee_id = ?',
            [id, userId]
        );

        if (!found.length) {
            return res.status(404).json({ message: '요청 없음' });
        }
        if (found[0].status !== 'pending') {
            return res.status(409).json({ message: '이미 처리된 요청입니다.' });
        }

        await pool.execute(
            `UPDATE friendships
               SET status='rejected', updated_at=NOW()
             WHERE id = ?`,
            [id]
        );

        const [[updated]] = await pool.execute(
            'SELECT * FROM friendships WHERE id = ?',
            [id]
        );
        res.json(updated);
    } catch (err) {
        console.error('친구 거절 에러:', err);
        res.status(500).json({ message: '거절 실패' });
    }
});

// ✅ 친구 목록 조회 (라우터 경로 변경 + 인증 추가)
router.get('/list', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        const [rows] = await pool.execute(
            `SELECT * FROM friendships
             WHERE status='accepted'
               AND (requester_id=? OR addressee_id=?)`,
            [userId, userId]
        );
        res.json(rows);
    } catch (err) {
        console.error('친구 목록 조회 에러:', err);
        res.status(500).json({ message: '목록 조회 실패' });
    }
});

// ✅ 받은 친구 요청 목록 (⭐ 가장 중요한 수정!)
router.get('/requests', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId; // 토큰에서 사용자 ID 추출
        console.log('받은 친구 요청 조회, 사용자 ID:', userId);

        const [rows] = await pool.execute(
            `SELECT f.*, u.username as requester_name, u.profile_image_url 
             FROM friendships f
             LEFT JOIN users u ON f.requester_id = u.id
             WHERE f.status='pending' AND f.addressee_id=?`,
            [userId]
        );

        console.log('조회된 친구 요청:', rows.length, '개');
        res.json(rows);
    } catch (err) {
        console.error('요청 목록 조회 에러:', err);
        res.status(500).json({ message: '요청 목록 조회 실패' });
    }
});

// ✅ 어항 좋아요 (인증 추가)
router.post('/like', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId; // 토큰에서 추출
        const { aquarium_id } = req.body;

        if (!aquarium_id) {
            return res.status(400).json({ message: 'aquarium_id 누락' });
        }

        // 중복 좋아요 방지
        const [dup] = await pool.execute(
            'SELECT id FROM aquarium_likes WHERE user_id = ? AND aquarium_id = ?',
            [userId, aquarium_id]
        );

        if (dup.length) {
            return res.status(409).json({ message: '이미 좋아요를 했습니다.' });
        }

        // 좋아요 저장
        await pool.execute(
            'INSERT INTO aquarium_likes (user_id, aquarium_id, created_at) VALUES (?, ?, NOW())',
            [userId, aquarium_id]
        );

        // 전체 좋아요 수 조회
        const [[{ cnt }]] = await pool.execute(
            'SELECT COUNT(*) AS cnt FROM aquarium_likes WHERE aquarium_id = ?',
            [aquarium_id]
        );

        res.status(201).json({ message: '좋아요 완료', totalLikes: cnt });
    } catch (err) {
        console.error('좋아요 에러:', err);
        res.status(500).json({ message: '좋아요 실패' });
    }
});

// ✅ 어항 댓글 작성 (인증 추가)
router.post('/comment', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId; // 토큰에서 추출
        const { aquarium_id, content, parentCommentId = null } = req.body;

        if (!aquarium_id || !content || !content.trim()) {
            return res.status(400).json({ message: '필수 값 누락' });
        }

        const [r] = await pool.execute(
            `INSERT INTO aquarium_comments
               (user_id,aquarium_id,content,parent_comment_id,created_at,updated_at)
             VALUES (?, ?, ?, ?, NOW(), NOW())`,
            [userId, aquarium_id, content.trim(), parentCommentId]
        );

        const [[row]] = await pool.execute(
            'SELECT * FROM aquarium_comments WHERE id = ?',
            [r.insertId]
        );
        res.status(201).json(row);
    } catch (err) {
        console.error('댓글 작성 에러:', err);
        res.status(500).json({ message: '댓글 작성 실패' });
    }
});

// ✅ 어항 댓글 리스트 조회 (인증 추가)
router.get('/comments/:aquarium_id', authenticateToken, async (req, res) => {
    try {
        const { aquarium_id } = req.params;
        const [rows] = await pool.execute(
            'SELECT * FROM aquarium_comments WHERE aquarium_id=? ORDER BY created_at ASC',
            [aquarium_id]
        );
        res.json(rows);
    } catch (err) {
        console.error('댓글 조회 에러:', err);
        res.status(500).json({ message: '댓글 조회 실패' });
    }
});

// ✅ 친구의 물고기 조회 (매개변수 수정)
router.get('/:friendId/fishes', authenticateToken, async (req, res) => {
    const friendId = req.params.friendId; // 매개변수 이름 수정

    try {
        const [fishes] = await pool.execute(
            `SELECT
                f.id,
                f.nickname,
                f.acquired_at,
                f.is_in_aquarium,
                ft.name AS original_name,
                ft.species,
                ft.image_url,
                ft.animation_type,
                ft.description
            FROM fish f
            JOIN fish_types ft ON f.fish_type_id = ft.id
            WHERE f.user_id = ?
            ORDER BY f.acquired_at DESC`,
            [friendId]
        );

        res.json({
            success: true,
            fish: fishes
        });
    } catch (err) {
        console.error('다른 유저 물고기 조회 에러:', err);
        res.status(500).json({ success: false, message: '조회 실패' });
    }
});

// ✅ 친구의 장식품 조회 (매개변수 수정)
router.get('/:friendId/decorations', authenticateToken, async (req, res) => {
    const friendId = req.params.friendId; // 매개변수 이름 수정

    try {
        const [decorations] = await pool.execute(
            `SELECT
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
            ORDER BY ud.acquired_at DESC`,
            [friendId]
        );
        res.json({ success: true, decorations: decorations });
    } catch (error) {
        console.error('보유 장식품 조회 에러:', error);
        res.status(500).json({ success: false, message: '보유 장식품을 불러오는데 실패했습니다.' });
    }
});

module.exports = router;