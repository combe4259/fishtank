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

// 알림 조회
router.get('/', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      const [rows] = await pool.execute(
        `SELECT id, type, title, message, is_read, read_at, action_url, created_at
         FROM notifications
         WHERE user_id = ?
         ORDER BY created_at DESC`,
        [userId]
      );
  
      res.json({ success: true, notifications: rows });
    } catch (err) {
      console.error('알림 조회 오류:', err);
      res.status(500).json({ success: false, message: '알림을 불러오는 중 오류가 발생했습니다.' });
    }
  });
  
// 알림 읽음 처리(삭제)
  router.delete('/:id', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      const notificationId = req.params.id;
  
      // Verify ownership
      const [match] = await pool.execute(
        'SELECT id FROM notifications WHERE id = ? AND user_id = ?',
        [notificationId, userId]
      );
      if (!match.length) {
        return res.status(404).json({ success: false, message: '알림을 찾을 수 없습니다.' });
      }
  
      await pool.execute(
        'DELETE FROM notifications WHERE id = ?',
        [notificationId]
      );
  
      res.json({ success: true, message: '알림이 삭제되었습니다.' });
    } catch (err) {
      console.error('알림 삭제 오류:', err);
      res.status(500).json({ success: false, message: '알림 삭제 중 오류가 발생했습니다.' });
    }
  });

module.exports = router;