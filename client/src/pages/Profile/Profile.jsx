import React, { useState, useEffect } from 'react';
import { User, Trophy, Target, Calendar, TrendingUp, Award, Star, Activity } from 'lucide-react';
import Card from '../../components/common/Card/Card.jsx';
import { styles } from './profile-styles';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // API에서 프로필 데이터 가져오기
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('토큰이 없습니다.');
        return;
      }

      const response = await fetch('http://localhost:3001/api/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        setUserProfile(data.user);
      } else {
        console.error('프로필 조회 실패:', data.message);
      }
    } catch (error) {
      console.error('프로필 조회 에러:', error);
    } finally {
      setLoading(false);
    }
  };

  // 로딩 중일 때
  if (loading) {
    return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '18px'
        }}>
          로딩 중...
        </div>
    );
  }

  // API 데이터가 없을 때 기본값 설정
  const userStats = {
    level: userProfile?.gameStats?.level || 1,
    experience: userProfile?.gameStats?.experiencePoints || 0,
    experienceToNext: (userProfile?.gameStats?.level || 1) * 1000, // 레벨 * 1000을 다음 레벨 경험치로 계산
    totalFish: 12, // 이후 물고기 API에서 가져올 예정
    achievements: 8, // 이후 업적 API에서 가져올 예정
    friendsCount: 23, // 이후 친구 API에서 가져올 예정
    commitStreak: 7, // 이후 GitHub API에서 가져올 예정
    todosCompleted: 156, // 이후 투두 API에서 가져올 예정
    joinDate: userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString('ko-KR').replace(/\. /g, '.').replace('.', '') : '2024.01.15'
  };

  const achievements = [
    { id: 1, name: '첫 물고기', icon: '🐠', date: '2024.01.16', rarity: 'common' },
    { id: 2, name: '친구 만들기', icon: '👥', date: '2024.01.20', rarity: 'common' },
    { id: 3, name: '일주일 연속', icon: '🔥', date: '2024.02.01', rarity: 'rare' },
    { id: 4, name: '레벨 10 달성', icon: '⭐', date: '2024.03.15', rarity: 'epic' },
    { id: 5, name: '전설의 시작', icon: '👑', date: '2024.04.01', rarity: 'legendary' },
    { id: 6, name: '코딩 마스터', icon: '💻', date: '2024.05.10', rarity: 'epic' },
  ];

  const rarityColors = {
    common: { bg: '#e5e7eb', color: '#6b7280' },
    rare: { bg: '#dbeafe', color: '#1e40af' },
    epic: { bg: '#e9d5ff', color: '#6b21a8' },
    legendary: { bg: '#fef3c7', color: '#92400e' }
  };

  return (
      <div style={styles.container}>
        {/* 프로필 헤더 */}
        <div style={styles.profileHeader}>
          <Card style={styles.mainProfileCard}>
            <div style={styles.profileTop}>
              <div style={styles.profileAvatar}>
                {userProfile?.profileImageUrl ? (
                    <img
                        src={userProfile.profileImageUrl}
                        alt="프로필"
                        style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }}
                    />
                ) : (
                    <span style={styles.avatarEmoji}>🐙</span>
                )}
                <div style={styles.levelBadge}>Lv.{userStats.level}</div>
              </div>

              <div style={styles.profileInfo}>
                <h2 style={styles.userName}>
                  {userProfile?.username || '사용자'}
                </h2>
                <p style={styles.userTitle}>해양 탐험가</p>
                <p style={styles.joinInfo}>🗓️ {userStats.joinDate}부터 함께하는 중</p>
              </div>

              <div style={styles.profileActions}>
                <button style={styles.editButton}>프로필 편집</button>
                <button style={styles.shareButton}>공유하기</button>
              </div>
            </div>

            {/* 경험치 바 */}
            <div style={styles.experienceSection}>
              <div style={styles.experienceHeader}>
                <span style={styles.experienceLabel}>경험치</span>
                <span style={styles.experienceText}>
                {userStats.experience.toLocaleString()} / {userStats.experienceToNext.toLocaleString()} XP
              </span>
              </div>
              <div style={styles.experienceBar}>
                <div
                    style={{
                      ...styles.experienceFill,
                      width: `${(userStats.experience / userStats.experienceToNext) * 100}%`
                    }}
                >
                  <div style={styles.experienceGlow}></div>
                </div>
              </div>
              <p style={styles.nextLevelText}>
                다음 레벨까지 {(userStats.experienceToNext - userStats.experience).toLocaleString()} XP
              </p>
            </div>
          </Card>
        </div>

        {/* 통계 카드들 */}
        <div style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <div style={styles.statIcon}>
              <Trophy style={{ width: '24px', height: '24px', color: '#f59e0b' }} />
            </div>
            <div style={styles.statContent}>
              <h3 style={styles.statTitle}>보유 물고기</h3>
              <p style={styles.statValue}>{userStats.totalFish}</p>
              <p style={styles.statSubtext}>총 {userStats.totalFish}종 수집</p>
            </div>
          </Card>

          <Card style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: 'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)' }}>
              <Activity style={{ width: '24px', height: '24px', color: '#dc2626' }} />
            </div>
            <div style={styles.statContent}>
              <h3 style={styles.statTitle}>GitHub 레포</h3>
              <p style={styles.statValue}>{userProfile?.githubStats?.publicRepos || 0}</p>
              <p style={styles.statSubtext}>팔로워: {userProfile?.githubStats?.followers || 0}명</p>
            </div>
          </Card>

          <Card style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)' }}>
              <Target style={{ width: '24px', height: '24px', color: '#2563eb' }} />
            </div>
            <div style={styles.statContent}>
              <h3 style={styles.statTitle}>보유 코인</h3>
              <p style={styles.statValue}>{userProfile?.gameStats?.fishCoins || 0}</p>
              <p style={styles.statSubtext}>게임 내 화폐</p>
            </div>
          </Card>

          <Card style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: 'linear-gradient(135deg, #d9f99d 0%, #bef264 100%)' }}>
              <User style={{ width: '24px', height: '24px', color: '#65a30d' }} />
            </div>
            <div style={styles.statContent}>
              <h3 style={styles.statTitle}>GitHub 팔로잉</h3>
              <p style={styles.statValue}>{userProfile?.githubStats?.following || 0}</p>
              <p style={styles.statSubtext}>팔로우 중인 사용자</p>
            </div>
          </Card>
        </div>

        {/* 업적 섹션 */}
        <Card style={styles.achievementsSection}>
          <div style={styles.achievementsHeader}>
            <h3 style={styles.achievementsTitle}>
              <Award style={{ width: '24px', height: '24px', color: '#f59e0b' }} />
              나의 업적
            </h3>
            <span style={styles.achievementCount}>{achievements.length} / 50</span>
          </div>

          <div style={styles.achievementsGrid}>
            {achievements.map(achievement => (
                <div
                    key={achievement.id}
                    style={{
                      ...styles.achievementCard,
                      background: rarityColors[achievement.rarity].bg
                    }}
                >
                  <div style={styles.achievementIcon}>{achievement.icon}</div>
                  <h4 style={{ ...styles.achievementName, color: rarityColors[achievement.rarity].color }}>
                    {achievement.name}
                  </h4>
                  <p style={styles.achievementDate}>{achievement.date}</p>
                  <div style={styles.rarityBadge}>
                    <Star style={{ width: '12px', height: '12px' }} />
                    {achievement.rarity}
                  </div>
                </div>
            ))}
          </div>
        </Card>
      </div>
  );
};

export default Profile;