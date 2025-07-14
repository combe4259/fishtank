const express = require('express');
const router = express.Router();
const { pool, createConnection } = require('../config/database');

// ✅ 1. 할 일 추가
router.post('/', async (req, res) => {
  try {
    const {
      user_id,
      title,
      description = '',
      is_completed = false
    } = req.body;

      const target_date = req.body.target_date || new Date().toISOString().split('T')[0]; // 기본값은 오늘 날짜

      const [result] = await pool.execute(
        `INSERT INTO todos (
          user_id,
          title,
          description,
          is_completed,
          target_date,
          completed_at,
          created_at,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          user_id,
          title,
          description,
          is_completed,
          target_date,
          is_completed ? new Date() : null
        ]
      );
    const [newTodo] = await pool.execute('SELECT * FROM todos WHERE id = ?', [result.insertId]);
    res.status(201).json(newTodo[0]);

  } catch (err) {
    console.error('addTodo 에러:', err);
    res.status(500).json({ message: '할 일 추가 실패', error: err.message });
  }
});

// ✅ 2. 할 일 완료 상태 토글
function formatDateForMySQL(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }

router.put('/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    const { is_completed } = req.body;
    let completed_at = req.body.completed_at ?? null;
    
    if (is_completed) {
        completed_at = formatDateForMySQL(new Date());
      }

    await pool.execute(
      `UPDATE todos
       SET is_completed = ?, completed_at = ?, updated_at = NOW()
       WHERE id = ?`,
      [is_completed, completed_at, id]
    );

    const [updated] = await pool.execute('SELECT * FROM todos WHERE id = ?', [id]);
    res.json(updated[0]);

  } catch (err) {
    console.error('toggleTodo 에러:', err);
    res.status(500).json({ message: '상태 업데이트 실패', error: err.message });
  }
});

// ✅ 3. 할 일 삭제
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.execute('DELETE FROM todos WHERE id = ?', [id]);
    res.json({ success: true, id });
  } catch (err) {
    console.error('deleteTodo 에러:', err);
    res.status(500).json({ message: '할 일 삭제 실패', error: err.message });
  }
});

// ✅ (옵션) 유저별, 당일 전체 할 일 조회
  router.get('/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const { date } = req.query; // ?date=YYYY-MM-DD
  
      let rows;
  
      if (date) {
        const [result] = await pool.execute(
          'SELECT * FROM todos WHERE user_id = ? AND target_date = ? ORDER BY created_at DESC',
          [userId, date]
        );
        rows = result;
      } else {
        const [result] = await pool.execute(
          'SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC',
          [userId]
        );
        rows = result;
      }
  
      res.json(rows);
    } catch (err) {
      console.error('getTodos 에러:', err);
      res.status(500).json({ message: '할 일 조회 실패', error: err.message });
    }
  });
  

module.exports = router;
