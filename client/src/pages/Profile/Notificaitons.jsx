const API_URL = 'https://fishtank-2wr5.onrender.com'
export async function fetchNotifications() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn('🚫 로그인 정보 없음 (토큰 null)');
    return []; // 로그인 안 된 경우 빈 배열 반환
  }

  try {
    const res = await fetch(`${API_URL}/api/notifications`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const contentType = res.headers.get('content-type') || '';

    if (!res.ok) {
      if (contentType.includes('application/json')) {
        const err = await res.json();
        throw new Error(err.message || '알림 조회에 실패했습니다.');
      } else {
        const errText = await res.text();
        console.error('❗서버 응답이 HTML입니다:', errText);
        throw new Error('서버 오류 발생 (HTML 반환)');
      }
    }

    if (contentType.includes('application/json')) {
      const { notifications } = await res.json();
      return notifications ?? []; // notifications가 undefined/null이면 빈 배열 반환
    } else {
      console.warn('⚠️ JSON이 아닌 응답 받음');
      return [];
    }
  } catch (err) {
    console.error('⚠️ fetchNotifications 실패:', err.message);
    return [];
  }
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