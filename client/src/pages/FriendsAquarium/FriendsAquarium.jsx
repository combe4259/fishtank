import React, { useState, useMemo } from "react";
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

  /* ------------------------------------------------------------------
   * MOCK DATA (🧪 샘플)
   * 실제 서비스에서는 useEffect + fetch 로 교체해주세요.
   * ----------------------------------------------------------------*/
  const friends = [
    {
      id: 1,
      name: "SpongeBob",
      fishCount: 5,
      level: 12,
      likes: 23,
      aquariumTheme: "coral_reef",
      profileColor: "#fbbf24",
    },
    {
      id: 2,
      name: "Patrick",
      fishCount: 3,
      level: 8,
      likes: 15,
      aquariumTheme: "deep_sea",
      profileColor: "#ec4899",
    },
    {
      id: 3,
      name: "Squidward",
      fishCount: 8,
      level: 15,
      likes: 34,
      aquariumTheme: "tropical",
      profileColor: "#8b5cf6",
    },
    {
      id: 4,
      name: "Sandy",
      fishCount: 12,
      level: 20,
      likes: 45,
      aquariumTheme: "crystal_cave",
      profileColor: "#10b981",
    },
  ];

  const allUsers = [
    { id: 5, name: "Mr. Krabs" },
    { id: 6, name: "Larry" },
    { id: 7, name: "Plankton" },
    { id: 8, name: "Gary" },
  ];

  /* ------------------------------------------------------------------
   * 메모이제이션 (검색 필터)
   * ----------------------------------------------------------------*/
  const filteredFriends = useMemo(() => {
    if (!friendQuery.trim()) return friends;
    return friends.filter((f) => f.name.toLowerCase().includes(friendQuery.trim().toLowerCase()));
  }, [friendQuery, friends]);

  const filteredGlobal = useMemo(() => {
    const withoutMyFriends = allUsers.filter((u) => !friends.find((f) => f.id === u.id));
    if (!globalQuery.trim()) return withoutMyFriends;
    return withoutMyFriends.filter((u) => u.name.toLowerCase().includes(globalQuery.trim().toLowerCase()));
  }, [globalQuery, friends, allUsers]);

  /* ------------------------------------------------------------------
   * 핸들러
   * ----------------------------------------------------------------*/
  const visitFriend = (friend) => {
    setSelectedFriend(friend);
    alert(`${friend.name}의 어항을 방문합니다!`);
  };

  const sendFriendRequest = async (user) => {
    if (!user) return;

    try {
      // ① 현재 로그인한 사용자
      const requesterId = userId;      // e.g. JWT decode
      if (!requesterId) throw new Error("로그인 정보를 찾을 수 없습니다.");

      // ② POST /api/friendships  (body: requester·addressee)
      const res = await fetch("http://localhost:3001/api/friendships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requesterId,
          addresseeId: user.id,        // ← 친구가 될 상대
        }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "친구 신청 실패");
      }

      alert(`${user.name}에게 친구 신청을 보냈어요! 📨`);
      // ★ 필요하면 local state 에 pending 친구 목록 추가하기
    } catch (err) {
      console.error(err);
      alert(err.message || "에러가 발생했습니다 😢");
    }
  };


  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    // Handle message sending functionality
    console.log("Send message clicked");
  };

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  /* ------------------------------------------------------------------
   * 렌더링
   * ----------------------------------------------------------------*/
  return (
    <div style={styles.container}>
      {/* 헤더 */}
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <h2 style={styles.title}>
            <Users style={{ width: 32, height: 32, color: "#3b82f6" }} />
            친구 어항 보기
          </h2>
          <p style={styles.subtitle}>친구들의 아름다운 어항을 구경하고 좋아요를 눌러주세요!</p>
        </div>
      </div>

      {/* 메인 그리드 */}
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr 320px", gap: 24 }}>
        {/* ----------------------------------------------------------------
         * ❶ 왼쪽 – 친구 목록 + 검색 UI
         * --------------------------------------------------------------*/}
        <Card style={{ ...styles.mainCard, padding: 0, height: "fit-content" }}>
          {/* 상단 친구 검색 */}
          <div style={{ padding: "16px", borderBottom: "1px solid #e5e7eb" }}>
            <div style={{ position: "relative" }}>
              <Search
                style={{ position: "absolute", top: 10, left: 12, width: 16, height: 16, color: "#9CA3AF" }}
              />
              <input
                type="text"
                placeholder="친구 검색..."
                value={friendQuery}
                onChange={(e) => setFriendQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px 8px 32px",
                  borderRadius: 12,
                  border: "1px solid #D1D5DB",
                  fontSize: 14,
                }}
              />
            </div>
          </div>

          {/* 친구 리스트 */}
          <div style={{ maxHeight: 320, overflowY: "auto" }}>
            {filteredFriends.map((friend) => (
              <button
                key={friend.id}
                onClick={() => visitFriend(friend)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  padding: 12,
                  cursor: "pointer",
                  background: selectedFriend?.id === friend.id ? "#DBEAFE" : "transparent",
                  border: "none",
                }}
              >
                <span style={{ width: 24, height: 24, fontSize: 20 }}>🐠</span>
                <span style={{ fontSize: 14, color: "#111827", flex: 1, textAlign: "left" }}>{friend.name}</span>
              </button>
            ))}
          </div>

          {/* 하단 – 새 친구 검색 / 추가 */}
          <div style={{ padding: 16, borderTop: "1px solid #e5e7eb" }}>
            <div style={{ position: "relative", marginBottom: 12 }}>
              <Search
                style={{ position: "absolute", top: 10, left: 12, width: 16, height: 16, color: "#9CA3AF" }}
              />
              <input
                type="text"
                placeholder="사용자 검색..."
                value={globalQuery}
                onChange={(e) => setGlobalQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px 8px 32px",
                  borderRadius: 12,
                  border: "1px solid #D1D5DB",
                  fontSize: 14,
                }}
              />
            </div>
            {/* 검색 결과 */}
            <div style={{ maxHeight: 180, overflowY: "auto", display: filteredGlobal.length ? "block" : "none" }}>
              {filteredGlobal.map((user) => (
                <div
                  key={user.id}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0" }}
                >
                  <span style={{ fontSize: 14 }}>{user.name}</span>
                  <button
                    onClick={() => sendFriendRequest(user)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "4px 8px",
                      borderRadius: 8,
                      border: "none",
                      background: "linear-gradient(135deg,#3b82f6 0%,#2563eb 100%)",
                      color: "white",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    <UserPlus style={{ width: 14, height: 14 }} /> 친구 신청
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* ----------------------------------------------------------------
         * ❷ 가운데 – 선택된 친구 어항 (미리보기 → 실제 AquariumView 삽입 가능)
         * --------------------------------------------------------------*/}
        <div style={{ position: "relative" }}>
          {/* 어항 배경 */}
          <div
            style={{
              width: "100%",
              height: 460,
              borderRadius: 24,
              background: "url('/images/bikini_bottom_bg.jpg') center/cover",
              filter: "blur(0.5px)",
            }}
          />
          {selectedFriend ? (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 32,
                fontWeight: 600,
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {selectedFriend.name} 의 어항 🌊
            </div>
          ) : null}
        </div>

        {/* ----------------------------------------------------------------
         * ❸ 오른쪽 – 친구 상세 카드 (프로필)
         * --------------------------------------------------------------*/}
        {selectedFriend && (
          <Card style={{ ...styles.mainCard, width: 320 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: selectedFriend.profileColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 48,
                }}
              >
                🐠
              </div>
              <h3 style={{ fontSize: 20, fontWeight: "600", marginBottom: 2 }}>{selectedFriend.name}</h3>
              <p style={{ fontSize: 14, color: "#6B7280", marginTop: -10 }}>Lv.{selectedFriend.level}</p>
              {/* 레벨 프로그레스 바 */}
              <div style={{ width: "100%"}}>
                <div style={{ height: 8, background: "#E5E7EB", borderRadius: 8, overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${Math.min(selectedFriend.level * 5, 100)}%`,
                      height: "100%",
                      background: "#10b981",
                    }}
                  />
                </div>
                <span style={{ fontSize: 12, color: "#6B7280" }}>
                  {Math.min(selectedFriend.level * 5, 100)}%
                </span>
              </div>
              {/* 좋아요 */}
              <div style={{ display: "flex", alignItems: "center", marginTop: -15  }}>
                <button onClick={() => {alert("조아요"), setLiked(!liked)}} 
                  style={{ background: "transparent", border: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Heart 
                   width = {16}
                   height = {16}
                   color = "#ef4444"
                   fill= {liked? "#ef4444" : "none"} 
                   />
                  <span style={{ fontWeight: 600, marginLeft: 4 }}>{selectedFriend.likes}</span>
                </button>
              </div>

              {/* 쪽지보내기 */}
              <div className="relative w-[363px] h-[190px] bg-[#ffffff80] rounded-[20px] overflow-hidden">
                <label htmlFor="message-input" className="sr-only">
                ? `${selectedFriend.name} 님께 하고 싶은 말을 적어 보세요!
                </label>
                <textarea
                  id="message-input"
                  value={message}
                  onChange={handleInputChange}
                  placeholder={`${selectedFriend.name} 님께 하고 싶은 말을 적어 보세요!`}
                  className="absolute w-[265px] top-[11px] left-[17px] [font-family:'눈누_기초고딕_Regular-Regular',Helvetica] font-normal text-[#707070] text-base text-center tracking-[0] leading-[normal] resize-none h-[168px] placeholder:text-[#707070] focus:outline-none"
                  aria-label={`${selectedFriend.name}님에게 보낼 메시지를 입력하세요`}
                />
              </div>
              <div className="w-[415px] h-[265px] bg-[#ffffff80] rounded-[20px] overflow-hidden">
                <button
                  className={`relative w-[203px] h-[33px] top-[218px] left-[107px] bg-[#c2f0f7d2] rounded-[20px] overflow-hidden shadow-[inset_0px_-4px_4px_#00000026] transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 ${
                    isPressed ? "transform scale-95" : ""
                  } ${isHovered ? "bg-[#b8edf5d2]" : ""}`}
                  onClick={handleClick}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onMouseDown={() => setIsPressed(true)}
                  onMouseUp={() => setIsPressed(false)}
                  aria-label="쪽지 보내기"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleClick();
                    }
                  }}
                >
                  <span className="absolute w-[104px] top-[5px] left-[50px] [font-family:'눈누_기초고딕_Regular-Regular',Helvetica] font-normal text-black text-[15px] text-center tracking-[0] leading-[normal] pointer-events-none">
                    쪽지 보내기 ✉
                  </span>
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>

      
    </div>
  );
};

export default FriendsAquarium;
