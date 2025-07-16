//✅ 4) 친구 수락 함수
export async function acceptFriendRequest(requestId) {
    try {
      const res = await fetch(`http://localhost:3001/api/friends/${requestId}/accept`, {
        method: 'PUT',
      });
      if (!res.ok) throw new Error('친구 수락 실패');
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // ✅ 5) 친구 거절 함수
  export async function rejectFriendRequest(requestId) {
    try {
      const res = await fetch(`http://localhost:3001/api/friends/${requestId}/reject`, {
        method: 'PUT',
      });
      if (!res.ok) throw new Error('친구 거절 실패');
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // ✅ 6) 친구 요청 목록 조회 함수
  export async function fetchFriendRequests(userId) {
    try {
      const res = await fetch(`http://localhost:3001/api/friends/requests/${userId}`);
      if (!res.ok) throw new Error('친구 요청 목록 조회 실패');
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  // ✅ 6) 친구 신청 목록 조회 함수
  export async function fetchFriendSent(userId) {
    try {
      const res = await fetch(`http://localhost:3001/api/friends/sent/${userId}`);
      if (!res.ok) throw new Error('친구 요청 목록 조회 실패');
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }