import React, { useEffect, useState, useMemo } from "react";
import {
  Fish,
  User,
  Users,
  Heart,
  MessageCircle,
  Award,
  Search,
  UserPlus,
} from "lucide-react";
import Card from "../../components/common/Card/Card";
import { styles } from "./friendsAquarium-styles";
//import { get } from "../../../../server/routes";
import FriendsTank from "./FriendsTank";
import { fetchMyFishes, fetchMyDecorations, fetchAquariumLikeCount } from "./FriendsTankUtil";
const API_URL = 'https://fishtank-2wr5.onrender.com'
const user = JSON.parse(localStorage.getItem('user'));
const userId = user?.id;


/**
 * FriendsAquarium – 친구 어항 보기 페이지
 * --------------------------------------------------
 * ✨ 추가된 기능
 * 1. 친구 목록 Search (상단): 이미 친구인 유저만 실시간 필터
 * 2. 유저 전체 Search (하단): 서버의 모든 유저 대상으로 검색 → 친구신청 버튼
 * 3. sendFriendRequest(friendId)   – TODO: 실제 API 호출로 교체
 * 4. visitFriend(friend)           – 선택된 친구 어항 방문 (임시 alert)
 *
 * 📌 API 연동 포인트
 *  - `allUsers` : 서버에서 "모든 유저(내 친구 제외)" 검색 결과 받아오기 (검색어 파라미터)
 *  - `friends`  : 내 친구 목록 (likes, aquarium 테마 등 포함)
 */
const FriendsAquarium = () => {
  /* ------------------------------------------------------------------
   * 상태 정의
   * ----------------------------------------------------------------*/
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friendQuery, setFriendQuery] = useState("");
  const [globalQuery, setGlobalQuery] = useState("");
  const [liked, setLiked] = useState(false);
  const [friends, setFriends] = useState([
    {id: 1, github_username: '뚱이', status: 'accepted'},
    {id: 2, github_username: '징징이', status: 'accepted'},
    {id: 3, github_username: '집게 사장', status: 'accepted'}
  ]);
  const [allUsers, setAllUsers] = useState([
    {id: 1, github_username: '0000'},
    {id: 2, github_username: '1111'},
    {id: 3, github_username: '2222'}
  ]);
  const [allFriendships, setAllFriendships] = useState([]);
  const [comments, setComments] = useState([]);
  const [fishes, setFishes] = useState([]);
  const [decorations, setDecorations] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [sentRequests, setSentRequests] = useState([
    { id: 1, requester_id: 6, addressee_id: 1, status: 'pending' },
    { id: 2, requester_id: 6, addressee_id: 2, status: 'pending' },
    { id: 3, requester_id: 6, addressee_id: 3, status: 'pending' }
  ]);

  useEffect(() => {
    if (!userId) return;
    fetchFriends();
    fetchAllUsers();
    fetchSentRequests(); // 새로 추가
  }, [userId]);

  // 4) 보낸 친구 요청 목록 조회
  const fetchSentRequests = async () => {
    try {
      const res = await fetch(`${API_URL}/api/friends/sent/${userId}`);
      if (!res.ok) throw new Error('보낸 친구 요청 목록 조회 실패');
      const data = await res.json();
      setSentRequests(data);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    if (!selectedFriend) return;
    fetchMyFishes(selectedFriend.aquarium_id)
        .then(fishes => setFishes(fishes))
        .catch(err => console.error(err));
    fetchMyDecorations(selectedFriend.aquarium_id)
        .then(decorations => setDecorations(decorations))
        .catch(err => console.error(err));
  }, [selectedFriend]);

  useEffect(() => {
    if (!selectedFriend || !selectedFriend.aquarium_id) return;
    fetchAquariumLikeCount(selectedFriend.aquarium_id)
        .then(setLikeCount)
        .catch(console.error);
  }, [selectedFriend]);


  useEffect(() => {
    fetch(`/api/friendships/all/${userId}`)  // 모든 관계(pending·accepted·rejected)를 가져오는 엔드포인트
        .then(res => res.json())
        .then(data => setAllFriendships(data))
        .catch(console.error);
  }, [userId]);

  /* ------------------------------------------------------------------
   * MOCK DATA (🧪 샘플)
   * 실제 서비스에서는 useEffect + fetch 로 교체해주세요.
   * ----------------------------------------------------------------*/

  /* ------------------------------------------------------------------
   * 메모이제이션 (검색 필터)
   * ----------------------------------------------------------------*/
  const filteredFriends = useMemo(() => {
    if (!friendQuery.trim()) return friends;
    return friends.filter((f) => f.github_username.toLowerCase().includes(friendQuery.trim().toLowerCase()));
  }, [friendQuery, friends]);

  const filteredGlobal = useMemo(() => {
    const withoutMyFriends = allUsers.filter((u) => !friends.find((f) => f.id === u.id));
    if (!globalQuery.trim()) return withoutMyFriends;
    return withoutMyFriends.filter((u) => u.github_username.toLowerCase().includes(globalQuery.trim().toLowerCase()));
  }, [globalQuery, friends, allUsers]);

  const displayGlobal = useMemo(() => {
    return filteredGlobal.filter(u => {
      // ① GitHub 아이디가 있어야 하고
      if (!u.github_username) return false;

      // ② allFriendships 에 requester_id 또는 addressee_id 로
      //     나와 해당 유저(u.id) 간의 레코드가 있으면 제외
      const hasRelation = allFriendships.some(f =>
          (f.requester_id === userId && f.addressee_id === u.id) ||
          (f.requester_id === u.id && f.addressee_id === userId)
      );
      return !hasRelation;
    });
  }, [filteredGlobal, allFriendships, userId]);
  /* ------------------------------------------------------------------
   * 핸들러
   * ----------------------------------------------------------------*/
  const visitFriend = (friend) => {
    setSelectedFriend(friend);
    alert(`${friend.github_username}의 어항을 방문합니다!`);
  };

  // 1) 내 친구 목록 (status='accepted') 불러오기
  const fetchFriends = async () => {
    try {
      const res = await fetch(`${API_URL}/api/friends/${userId}`);
      console.log("친구 목록 조회 API 호출:", `${API_URL}/api/friends/${userId}`);
      if (!res.ok) throw new Error('친구 목록 조회 실패');
      const data = await res.json();
      setFriends(data);
    } catch (err) {
      console.error(err);
      // 필요시 UI에 오류 표시
    }
  };

  // 2) 전체 유저 목록 불러오기
  const fetchAllUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/friends/`);
      if (!res.ok) throw new Error('전체 유저 조회 실패');
      const data = await res.json();
      setAllUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ 3) 친구 신청 함수
  const sendFriendRequest = async (addresseeId) => {
    try {
      const res = await fetch(`${API_URL}/api/friends/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requester_id: userId,
          addressee_id: addresseeId,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "친구 신청 실패");

      alert(`${data.github_username || "상대"}님에게 친구 신청을 보냈어요! 📨`);

      // UI 업데이트: allUsers에서 해당 유저 제거
      setAllUsers((prev) => prev.filter((u) => u.id !== addresseeId));
      // (선택) 친구 요청 목록을 다시 불러오고 싶으면 fetchRequests() 호출
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };


  // ✅ 7) 어항 좋아요 함수
  const likeAquarium = async (userId, aquariumId) => {
    try {
      const res = await fetch(`${API_URL}/api/friends/like`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId, aquarium_id: aquariumId}),
      });
      if (!res.ok) throw new Error('어항 좋아요 실패');
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // ✅ 8) 어항에 댓글 작성 함수
  const postAquariumComment = async (userId, aquariumId, content, parentCommentId = null) => {
    try {
      const res = await fetch(`${API_URL}/api/friends/comment`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId, aquarium_id: aquariumId, content, parentCommentId}),
      });
      if (!res.ok) throw new Error('쪽지 작성 실패');
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // ✅ 9) 어항 댓글 리스트 조회 함수
  const fetchAquariumComments = async (aquariumId) => {
    try {
      const res = await fetch(`${API_URL}/api/friends/comments/${aquariumId}`);
      if (!res.ok) throw new Error('댓글 리스트 조회 실패');
      const data = await res.json();
      setComments(data);  // 댓글 상태 업데이트
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  // 컴포넌트 마운트 시 한 번만 실행
  useEffect(() => {
    if (!userId) return;           // userId 없으면 스킵
    fetchFriends();
    fetchAllUsers();
  }, [userId]);


  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // 선택된 친구가 바뀔 때마다 댓글을 불러옵니다
  useEffect(() => {
    if (!selectedFriend) return;           // 친구가 선택되지 않았으면 스킵
    fetchAquariumComments(selectedFriend.id)
        .then(data => setComments(data))
        .catch(err => console.error('댓글 로드 실패', err));
  }, [selectedFriend]);

// 댓글이 등록될 때(setComments로 배열이 바뀔 때)도 다시 불러옵니다
  useEffect(() => {
    if (!selectedFriend) return;
    fetchAquariumComments(selectedFriend.id)
        .then(data => setComments(data))
        .catch(err => console.error('댓글 재로드 실패', err));
  }, [comments.length]);


  /* ------------------------------------------------------------------
   * 렌더링
   * ----------------------------------------------------------------*/

  return (
      <div style={styles.container}>
        {/* 헤더 */}
        <div style={styles.header}>
          <div style={styles.titleSection}>
            <h2 style={styles.title}>
              <Users style={{width: 32, height: 32, color: "#3b82f6"}}/>
              친구 어항 보기
            </h2>
            <p style={styles.subtitle}>친구들의 아름다운 어항을 구경하고 좋아요를 눌러주세요!</p>
          </div>
        </div>

        {/* 메인 그리드 - 중복 제거 */}
        <div style={{display: "grid", gridTemplateColumns: "260px 1fr 320px", gap: 24}}>
          {/* ❶ 왼쪽 사이드바 - 친구 목록 */}
          <div style={{display: "flex", flexDirection: "column", gap: 16}}>
            {/* 친구 목록 카드 */}
            <Card style={{...styles.mainCard, padding: 0, height: "fit-content"}}>
              {/* 상단 친구 검색 */}
              <div style={{padding: "16px", borderBottom: "1px solid #e5e7eb"}}>
                <div style={{position: "relative"}}>
                  <Search
                      style={{position: "absolute", top: 10, left: 12, width: 16, height: 16, color: "#9CA3AF"}}
                  />
                  <input
                      type="text"
                      placeholder="친구 검색..."
                      value={friendQuery}
                      onChange={(e) => setFriendQuery(e.target.value)}
                      style={styles.searchInput}
                  />
                </div>
              </div>

              {/* 친구 리스트 */}
              <div style={{maxHeight: 320, overflowY: "auto"}}>
                {filteredFriends.map((friend) => (
                    <button
                        key={friend.id}
                        onClick={() => visitFriend(friend)}
                        style={{
                          ...styles.friendListItem,
                          ...(selectedFriend?.id === friend.id ? styles.friendListItemActive : {})
                        }}
                    >
                      <span style={{width: 24, height: 24, fontSize: 20}}>🐠</span>
                      <span style={{fontSize: 14, color: "#111827", flex: 1, textAlign: "left"}}>
                  {friend.github_username}
                </span>
                    </button>
                ))}
              </div>

              {/* 하단 – 새 친구 검색 / 추가 */}
              <div style={{padding: 16, borderTop: "1px solid #e5e7eb"}}>
                <div style={{position: "relative", marginBottom: 12}}>
                  <Search
                      style={{position: "absolute", top: 10, left: 12, width: 16, height: 16, color: "#9CA3AF"}}
                  />
                  <input
                      type="text"
                      placeholder="사용자 검색..."
                      value={globalQuery}
                      onChange={(e) => setGlobalQuery(e.target.value)}
                      style={styles.searchInput}
                  />
                </div>

                {/* 검색 결과 */}
                {displayGlobal.length > 0 && (
                    <div style={{maxHeight: 180, overflowY: "auto"}}>
                      {displayGlobal.map((user) => (
                          <div key={user.id} style={styles.userSearchResult}>
                            <span style={{fontSize: 14}}>{user.github_username}</span>
                            <button
                                onClick={() => sendFriendRequest(user.id)}
                                style={styles.friendRequestButton}
                            >
                              <UserPlus style={{width: 14, height: 14}}/>
                              친구 신청
                            </button>
                          </div>
                      ))}
                    </div>
                )}
              </div>
            </Card>

            {/* 보낸 친구 요청 카드 - 독립적으로 분리 */}
            <Card style={{...styles.mainCard, padding: 0, height: "fit-content"}}>
              <div style={{padding: "16px", borderBottom: "1px solid #e5e7eb"}}>
                <h4 style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#374151",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                }}>
                  <span style={{fontSize: 20}}>📤</span>
                  보낸 친구 요청
                  {sentRequests.length > 0 && (
                      <span style={{
                        background: "#3b82f6",
                        color: "white",
                        borderRadius: "50%",
                        width: 20,
                        height: 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12
                      }}>
                  {sentRequests.length}
                </span>
                  )}
                </h4>
              </div>

              <div style={{maxHeight: 250, overflowY: "auto"}}>
                {sentRequests.length === 0 ? (
                    <div style={{
                      padding: "24px",
                      textAlign: "center",
                      color: "#6B7280",
                      fontSize: 14
                    }}>
                      보낸 친구 요청이 없습니다
                    </div>
                ) : (
                    sentRequests.map((request) => (
                        <div key={request.id} style={styles.commentItem}>
                          <div style={{display: "flex", alignItems: "center", gap: 10}}>
                            <span style={{width: 24, height: 24, fontSize: 20}}>👤</span>
                            <div style={{display: "flex", flexDirection: "column"}}>
                      <span style={{fontSize: 14, color: "#111827", fontWeight: "500"}}>
                        {request.addressee?.github_username || `사용자 ${request.addressee_id}`}
                      </span>
                              <span style={{
                                fontSize: 12,
                                color: request.status === 'pending' ? '#f59e0b' :
                                    request.status === 'accepted' ? '#10b981' : '#ef4444'
                              }}>
                        {request.status === 'pending' && '⏳ 대기중'}
                                {request.status === 'accepted' && '✅ 수락됨'}
                                {request.status === 'rejected' && '❌ 거절됨'}
                      </span>
                            </div>
                          </div>
                        </div>
                    ))
                )}
              </div>
            </Card>
          </div>

          {/* ❷ 가운데 – 선택된 친구 어항 */}
          <Card style={styles.mainCard}>
            {selectedFriend ? (
                <>
                  <h3 style={{marginBottom: 20}}>{selectedFriend.github_username}님의 어항</h3>
                  <FriendsTank fishes={fishes} decorations={decorations}/>
                </>
            ) : (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '300px',
                  flexDirection: 'column',
                  gap: 16
                }}>
                  <span style={{fontSize: 48}}>🐠</span>
                  <p style={{color: '#6B7280', fontSize: 18}}>친구를 선택하면 어항을 볼 수 있어요!</p>
                </div>
            )}
          </Card>

          {/* ❸ 오른쪽 – 친구 상세 프로필 */}
          {selectedFriend && (
              <Card style={styles.profileCard}>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 16}}>
                  {/* 프로필 정보 */}
                  <div style={styles.friendAvatar}>
                    <span style={styles.avatarEmoji}>🐠</span>
                  </div>

                  <div style={{textAlign: 'center'}}>
                    <h3 style={{fontSize: 20, fontWeight: "600", marginBottom: 4}}>
                      {selectedFriend.github_username}
                    </h3>
                    <p style={{fontSize: 14, color: "#6B7280"}}>Lv.{selectedFriend.level}</p>
                  </div>

                  {/* 레벨 프로그레스 바 */}
                  <div style={{width: "100%", marginBottom: 8}}>
                    <div style={styles.levelProgressBar}>
                      <div
                          style={{
                            ...styles.levelProgressFill,
                            width: `${Math.min(selectedFriend.level * 5, 100)}%`
                          }}
                      />
                    </div>
                    <span style={{fontSize: 12, color: "#6B7280", marginTop: 4, display: 'block'}}>
                {Math.min(selectedFriend.level * 5, 100)}%
              </span>
                  </div>

                  {/* 좋아요 */}
                  <button
                      onClick={async () => {
                        await likeAquarium(selectedFriend.id, selectedFriend.aquarium_id);
                        const newCount = await fetchAquariumLikeCount(selectedFriend.aquarium_id);
                        setLikeCount(newCount);
                        setLiked(!liked);
                      }}
                      style={styles.likeButton}
                  >
              <span style={{fontWeight: 600, marginRight: 8}}>
                {likeCount}
              </span>
                    <Heart
                        width={16}
                        height={16}
                        color="#ef4444"
                        fill={liked ? "#ef4444" : "none"}
                    />
                  </button>

                  {/* 쪽지 보내기 영역 - 인라인 스타일로 통일 */}
                  <div style={styles.messageArea}>
              <textarea
                  value={message}
                  onChange={handleMessageChange}
                  placeholder={`${selectedFriend.github_username} 님께 하고 싶은 말을 적어 보세요!`}
                  style={styles.messageTextarea}
              />
                  </div>

                  {/* 댓글 영역 */}
                  <div style={styles.commentsArea}>
                    <h4 style={{marginBottom: 12}}>댓글 ({comments.length})</h4>
                    <div style={{
                      maxHeight: 180,
                      overflowY: 'auto',
                      marginBottom: 50
                    }}>
                      {comments.map(c => (
                          <div key={c.id} style={styles.commentItem}>
                            <div style={styles.commentAuthor}>
                              {c.author.github_username}
                            </div>
                            <div style={styles.commentContent}>
                              {c.content}
                            </div>
                          </div>
                      ))}
                      {comments.length === 0 && (
                          <p style={{color: '#6B7280', textAlign: 'center', marginTop: 40}}>
                            아직 작성된 댓글이 없습니다.
                          </p>
                      )}
                    </div>

                    {/* 쪽지 보내기 버튼 */}
                    <button
                        onClick={() => postAquariumComment(userId, selectedFriend.aquarium_id, message)}
                        style={styles.sendMessageButton}
                    >
                      쪽지 보내기 ✉
                    </button>
                  </div>
                </div>
              </Card>
          )}
        </div>
      </div>
  );
}

export default FriendsAquarium;

  
