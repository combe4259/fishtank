// 보유한 물고기 목록 가져오기
export const fetchMyFishes = async (friendId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('토큰이 없습니다.');
        return;
      }

      const response = await fetch(`http://localhost:3001/api/friends/${friendId}/fishes`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || '물고기 목록 조회 실패');
      }
    
      // 성공하면 fish 배열만 반환
      return data.fish;
    } catch (error) {
      console.error('물고기 목록 조회 에러:', error);
    }
  };

// 보유한 장식품 목록 가져오기
  export const fetchMyDecorations = async (friendId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('토큰이 없습니다.');
        return;
      }

      const response = await fetch(`http://localhost:3001/api/friends/${friendId}/decorations`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || '장식품 목록 조회 실패');
      }
    
      // 성공하면 decorations 배열만 반환
      return data.decorations;
    } catch (error) {
      console.error('장식품 목록 조회 에러:', error);
    }
  };

// 친구 어항 좋아요 수 조회 함수
  export const fetchAquariumLikeCount = async (aquariumId) => {
    try {
      const response = await fetch(`/api/aquariums/${aquariumId}/likes/count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch like count: ${response.status}`);
      }
  
      const data = await response.json();
      return data.likeCount;
    } catch (error) {
      console.error('Error in fetchAquariumLikeCount:', error);
      // Return 0 as a safe default if the request fails
      return 0;
    }
  };
  