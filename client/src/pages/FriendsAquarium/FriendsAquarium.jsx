import React, { useState } from 'react';
import { Fish, User, Users, Heart, MessageCircle, Award } from 'lucide-react';
import Card from '../../components/common/Card/Card';
import { styles } from './friendsAquarium-styles';

const FriendsAquarium = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);

  const friends = [
    {
      id: 1,
      name: 'SpongeBob',
      fishCount: 5,
      level: 12,
      likes: 23,
      aquariumTheme: 'coral_reef',
      profileColor: '#fbbf24'
    },
    {
      id: 2,
      name: 'Patrick',
      fishCount: 3,
      level: 8,
      likes: 15,
      aquariumTheme: 'deep_sea',
      profileColor: '#ec4899'
    },
    {
      id: 3,
      name: 'Squidward',
      fishCount: 8,
      level: 15,
      likes: 34,
      aquariumTheme: 'tropical',
      profileColor: '#8b5cf6'
    },
    {
      id: 4,
      name: 'Sandy',
      fishCount: 12,
      level: 20,
      likes: 45,
      aquariumTheme: 'crystal_cave',
      profileColor: '#10b981'
    },
  ];

  const visitFriend = (friend) => {
    setSelectedFriend(friend);
    alert(`${friend.name}의 어항을 방문합니다!`);
  };

  return (
      <div style={styles.container}>
        {/* 헤더 영역 */}
        <div style={styles.header}>
          <div style={styles.titleSection}>
            <h2 style={styles.title}>
              <Users style={{ width: '32px', height: '32px', color: '#3b82f6' }} />
              친구 어항 보기
            </h2>
            <p style={styles.subtitle}>친구들의 아름다운 어항을 구경하고 좋아요를 눌러주세요!</p>
          </div>

          {/* 친구 통계 */}
          <div style={styles.friendStats}>
            <div style={styles.statCard}>
              <span style={styles.statNumber}>{friends.length}</span>
              <span style={styles.statLabel}>친구</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statNumber}>12</span>
              <span style={styles.statLabel}>방문</span>
            </div>
          </div>
        </div>

        <Card style={styles.mainCard}>
          {/* 친구 목록 헤더 */}
          <div style={styles.listHeader}>
            <h3 style={styles.listTitle}>친구 목록</h3>
            <button style={styles.addFriendButton}>
              <User style={{ width: '16px', height: '16px' }} />
              친구 추가
            </button>
          </div>

          {/* 친구 그리드 */}
          <div style={styles.friendsGrid}>
            {friends.map(friend => (
                <Card key={friend.id} style={styles.friendCard}>
                  {/* 프로필 섹션 */}
                  <div style={styles.friendHeader}>
                    <div style={{...styles.friendAvatar, background: `linear-gradient(135deg, ${friend.profileColor} 0%, ${friend.profileColor}dd 100%)`}}>
                      <span style={styles.avatarEmoji}>🐠</span>
                    </div>
                    <div style={styles.friendInfo}>
                      <h4 style={styles.friendName}>{friend.name}</h4>
                      <p style={styles.friendLevel}>Level {friend.level}</p>
                    </div>
                    <div style={styles.likeButton}>
                      <Heart style={{ width: '16px', height: '16px', color: '#ef4444' }} />
                      <span>{friend.likes}</span>
                    </div>
                  </div>

                  {/* 어항 미리보기 */}
                  <div style={styles.aquariumPreview}>
                    <div style={styles.miniAquarium}>
                      <Fish style={{ width: '24px', height: '24px', color: 'white' }} />
                      <span style={styles.fishCount}>{friend.fishCount} 마리</span>
                    </div>
                    <div style={styles.aquariumTheme}>{friend.aquariumTheme.replace('_', ' ')}</div>
                  </div>

                  {/* 액션 버튼 */}
                  <div style={styles.actionButtons}>
                    <button
                        style={styles.visitButton}
                        onClick={() => visitFriend(friend)}
                    >
                      어항 방문하기
                    </button>
                    <button style={styles.messageButton}>
                      <MessageCircle style={{ width: '16px', height: '16px' }} />
                    </button>
                  </div>
                </Card>
            ))}
          </div>
        </Card>

        {/* 하단 정보 카드 */}
        <div style={styles.bottomCards}>
          <Card style={styles.infoCard}>
            <div style={styles.infoIcon}>
              <Award style={{ width: '24px', height: '24px', color: '#f59e0b' }} />
            </div>
            <div>
              <h4 style={styles.infoTitle}>이번 주 인기 어항</h4>
              <p style={styles.infoText}>Sandy의 크리스탈 동굴 테마가 가장 많은 좋아요를 받았어요!</p>
            </div>
          </Card>

          <Card style={styles.infoCard}>
            <div style={styles.infoIcon}>
              <Heart style={{ width: '24px', height: '24px', color: '#ef4444' }} />
            </div>
            <div>
              <h4 style={styles.infoTitle}>친구에게 좋아요</h4>
              <p style={styles.infoText}>친구 어항에 좋아요를 누르면 친구가 보너스 코인을 받아요!</p>
            </div>
          </Card>
        </div>
      </div>
  );
};

export default FriendsAquarium;