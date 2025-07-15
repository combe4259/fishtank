const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

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

// ✅ 0. 전체 유저 목록 조회
//    GET /api/friendships/:userId
router.get('/', async (req, res) => {
    try {
        // users 테이블에서 모든 컬럼을 가져옵니다.
        // 필요하다면 SELECT id, username, profileImageUrl 등으로 컬럼을 제한하세요.
        const [rows] = await pool.execute('SELECT * FROM users');
        res.json(rows);
      } catch (err) {
        console.error('전체 유저 조회 에러:', err);
        res.status(500).json({ message: '전체 유저 조회 실패' });
      }
    });
    
  
// ✅ 1. 친구 신청
//    POST /api/friendships/add
router.post('/add', async (req, res) => {
  try {
    const { requester_id, addressee_id } = req.body;
    if (!requester_id || !addressee_id) {
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

    // 생성된 레코드 반환
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

// ✅ 2. 친구 수락
//    PUT /api/friendships/:id/accept
router.put('/:id/accept', async (req, res) => {
    try {
      const { id } = req.params;
      const [found] = await pool.execute(
        'SELECT * FROM friendships WHERE id = ?',
        [id]
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
  
  // ✅ 3. 친구 거절
  //    PUT /api/friendships/:id/reject
  router.put('/:id/reject', async (req, res) => {
    try {
      const { id } = req.params;
      const [found] = await pool.execute(
        'SELECT * FROM friendships WHERE id = ?',
        [id]
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
  
  
  

// ✅ 4. 친구 목록 조회
//    GET /api/friendships/:userId
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: 'userId 누락' });
    }
    try {
      const { userId } = req.params;
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

// ✅ 5. 받은 친구 요청 목록
//    GET /api/friendships/requests/:userId
router.get('/requests', async (req, res) => {
    try {
      const { userId } = req.params;
      const [rows] = await pool.execute(
        `SELECT * FROM friendships
         WHERE status='pending' AND addressee_id=?`,
        [userId]
      );
      res.json(rows);
    } catch (err) {
      console.error('요청 목록 조회 에러:', err);
      res.status(500).json({ message: '요청 목록 조회 실패' });
    }
  });
  
  // ✅ 6. 어항 좋아요
  //    POST /api/friendships/like
  router.post('/like', async (req, res) => {
    try {
      const { userId, aquarium_id } = req.body;
      if (!userId || !aquarium_id) {
        return res.status(400).json({ message: 'userId/aquarium_id 누락' });
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
  
      // 어항 소유자 조회
      const [[ownerRow]] = await pool.execute(
        'SELECT user_id FROM aquariums WHERE id = ?',
        [aquarium_id]
      );
      const ownerId = ownerRow && ownerRow.user_id;
  
      // 본인이 아니면 알림 생성
      if (ownerId && ownerId !== userId) {
        const title = '새로운 좋아요';
        const message = `사용자(ID: ${userId})님이 당신의 어항을 좋아합니다.`;
        const action_url = `/aquariums/${aquarium_id}`;
  
        await pool.execute(
          `INSERT INTO notifications
             (user_id, type, title, message, is_read, action_url, created_at)
           VALUES (?, 'like', ?, ?, false, ?, NOW())`,
          [ownerId, title, message, action_url]
        );
      }
  
      res.status(201).json({ message: '좋아요 완료', totalLikes: cnt });
    } catch (err) {
      console.error('좋아요 에러:', err);
      res.status(500).json({ message: '좋아요 실패' });
    }
  });
  
  // ✅ 7. 어항 쪽지(댓글) 작성
  //    POST /api/friendships/comment
  router.post('/comment', async (req, res) => {
    try {
      const { userId, aquarium_id, content, parentCommentId = null } = req.body;
      if (!userId || !aquarium_id || !content || !content.trim()) {
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
  
  // ✅ 8. 어항 댓글 리스트 조회
  //    GET /api/friendships/comments/:aquarium_id
  router.get('/comments/:aquarium_id', async (req, res) => {
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

  // ✅ 9. 어항 좋아요 수 조회
  router.get('/:aquariumId/likes/count', async (req, res) => {
    const { aquariumId } = req.params;
  
    try {
      // aquarium_likes 테이블에서 aquarium_id에 해당하는 레코드 수를 센다
      const { rows } = await db.query(
        `SELECT COUNT(*) AS likecount
           FROM aquarium_likes
          WHERE aquarium_id = $1`,
        [aquariumId]
      );
  
      const count = parseInt(rows[0].likecount, 10);
      res.json({ aquariumId, likeCount: count });
    } catch (err) {
      console.error('좋아요 수 조회 오류', err);
      res.status(500).json({ error: '좋아요 수를 불러오는 중에 오류가 발생했습니다.' });
    }
  });

  // ✅ 10. 친구의 물고기 조회
  router.get('/:friendId/fishes', authenticateToken, async (req, res) => {
    const targetUserId = req.params.targetUserId;
  
    try {
      const [fishes] = await pool.query(
        `
        SELECT
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
        ORDER BY f.acquired_at DESC
        `,
        [targetUserId]
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


  // ✅ 11. 친구의 장식품 조회
  router.get('/:friendId/decorations', authenticateToken, async (req, res) => {
    const targetUserId = req.params.targetUserId;  
    try {
          const [decorations] = await pool.query(
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
              [targetUserId]
          );
          res.json({ success: true, decorations: decorations });
      } catch (error) {
          console.error('보유 장식품 조회 에러:', error);
          res.status(500).json({ success: false, message: '보유 장식품을 불러오는데 실패했습니다.' });
      }
  });




module.exports = router;
