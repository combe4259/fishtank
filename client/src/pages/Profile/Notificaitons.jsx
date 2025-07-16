const API_URL = 'https://fishtank-2wr5.onrender.com'
export async function fetchNotifications() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('로그인 정보가 없습니다.');

  const res = await fetch(`${API_URL}/api/notifications`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    let errorText;
    try {
      const err = await res.json();
      errorText = err.message || '알림 조회에 실패했습니다.';
    } catch {
      errorText = '알림 응답이 올바르지 않습니다.';
    }
    throw new Error(errorText);
  }

  const json = await res.json();
  const notifications = json?.notifications;

  // 여기서 null, undefined, 비배열 대응
  if (!Array.isArray(notifications)) {
    return []; // 안전하게 빈 배열로 반환
  }

  return notifications;
}
  
  /**
   * 특정 알림 삭제
   * DELETE /api/notifications/:id
   * @param {number|string} notificationId
   */
  export async function deleteNotification(notificationId) {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('로그인 정보가 없습니다.');
  
    const res = await fetch(`${API_URL}/api/notifications/${notificationId}`, {
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