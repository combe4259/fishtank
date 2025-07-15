export async function fetchNotifications() {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('로그인 정보가 없습니다.');
  
    const res = await fetch('http://localhost:3001/api/notifications', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || '알림 조회에 실패했습니다.');
    }
  
    const { notifications } = await res.json();
    return notifications; // [{ id, type, title, message, is_read, ... }, …]
  }
  
  /**
   * 특정 알림 삭제
   * DELETE /api/notifications/:id
   * @param {number|string} notificationId
   */
  export async function deleteNotification(notificationId) {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('로그인 정보가 없습니다.');
  
    const res = await fetch(`http://localhost:3001/api/notifications/${notificationId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || '알림 삭제에 실패했습니다.');
    }
  
    return true; // 삭제 성공
  }