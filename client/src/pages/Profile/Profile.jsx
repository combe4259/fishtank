// client/src/pages/Profile/Profile.jsx 수정

/* global process */

import React, { useState, useEffect } from 'react';
import { User, Trophy, Target, Calendar, TrendingUp, Award, Star, Activity } from 'lucide-react';
import Card from '../../components/common/Card/Card.jsx';
import { styles } from './profile-styles';
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [achievements, setAchievements] = useState([]); // 실제 업적 데이터
  const [achievementStats, setAchievementStats] = useState({ completed: 0, total: 0 }); // 업적 통계
  const [loading, setLoading] = useState(true);

  // API에서 프로필 데이터 가져오기
  useEffect(() => {
    fetchUserProfile();
    fetchUserAchievements(); // 업적 데이터도 함께 가져오기
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('토큰이 없습니다.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
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
    }
  };

  // 🎯 실제 업적 데이터 가져오기
  const fetchUserAchievements = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('토큰이 없습니다.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/achievements/list`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        console.log(' 실제 업적 데이터 로드됨:', data.data.stats);
        setAchievements(data.data.achievements);
        setAchievementStats(data.data.stats);
      } else {
        console.error('업적 조회 실패:', data.message);
        // 실패시 기본 데이터 사용
        setAchievements(getDefaultAchievements());
      }
    } catch (error) {
      console.error('업적 조회 에러:', error);
      // 에러시 기본 데이터 사용
      setAchievements(getDefaultAchievements());
    } finally {
      setLoading(false);
    }
  };

  // GitHub 통계 업데이트 및 업적 체크
  const refreshGitHubData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      console.log(' GitHub 데이터 새로고침 및 업적 체크 중...');

      // GitHub 통계 API 호출
      const response = await fetch(`${API_BASE_URL}/api/github/stats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log('✅ GitHub 데이터 업데이트 완료');
        // 업적 데이터 다시 가져오기
        await fetchUserAchievements();
      }
    } catch (error) {
      console.error('GitHub 데이터 새로고침 에러:', error);
    }
  };

  // 기본 업적 데이터
  const getDefaultAchievements = () => [
    { id: 1, name: '첫 물고기', icon: '🐠', completed_at: '2024.01.16', rarity: 'common', is_completed: 0 },
    { id: 2, name: '친구 만들기', icon: '👥', completed_at: '2024.01.20', rarity: 'common', is_completed: 0 },
    { id: 3, name: '일주일 연속', icon: '🔥', completed_at: '2024.02.01', rarity: 'rare', is_completed: 0 },
    { id: 4, name: '레벨 10 달성', icon: '⭐', completed_at: '2024.03.15', rarity: 'epic', is_completed: 0 },
    { id: 5, name: '전설의 시작', icon: '👑', completed_at: '2024.04.01', rarity: 'legendary', is_completed: 0 },
    { id: 6, name: '코딩 마스터', icon: '💻', completed_at: '2024.05.10', rarity: 'epic', is_completed: 0 },
  ];

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
          업적 데이터 로딩 중... 🏆
        </div>
    );
  }

  // API 데이터가 없을 때 기본값 설정
  const userStats = {
    level: userProfile?.level || 1,
    experience: userProfile?.experience_points || 0,
    experienceToNext: (userProfile?.level || 1) * 100, // 레벨 * 100을 다음 레벨 경험치로 계산
    totalFish: 12, // 이후 물고기 API에서 가져올 예정
    achievements: achievementStats.completed, // 실제 완료된 업적 수
    friendsCount: 23, // 이후 친구 API에서 가져올 예정
    commitStreak: 7, // 이후 GitHub API에서 가져올 예정
    todosCompleted: 156, // 이후 투두 API에서 가져올 예정
    joinDate: userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString('ko-KR').replace(/\. /g, '.').replace('.', '') : '2024.01.15'
  };

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
                <button
                    style={styles.shareButton}
                    onClick={refreshGitHubData}
                    title="GitHub 데이터 새로고침 및 업적 체크"
                >
                  업적 새로고침 🎯
                </button>
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
                      width: `${Math.min((userStats.experience / userStats.experienceToNext) * 100, 100)}%`
                    }}
                >
                  <div style={styles.experienceGlow}></div>
                </div>
              </div>
              <p style={styles.nextLevelText}>
                다음 레벨까지 {Math.max(userStats.experienceToNext - userStats.experience, 0).toLocaleString()} XP
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
              <p style={styles.statValue}>{userProfile?.fish_coins || 0}</p>
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

        {/* 업적 섹션 - 실제 데이터 사용 */}
        <Card style={styles.achievementsSection}>
          <div style={styles.achievementsHeader}>
            <h3 style={styles.achievementsTitle}>
              <Award style={{ width: '24px', height: '24px', color: '#f59e0b' }} />
              나의 업적
            </h3>
            <span style={styles.achievementCount}>
              {achievementStats.completed} / {achievementStats.total}
              <span style={{
                marginLeft: '8px',
                fontSize: '14px',
                color: '#10b981',
                fontWeight: 'normal'
              }}>
                ({achievementStats.completionRate}% 완료)
              </span>
            </span>
          </div>

          {/* 업적 필터 버튼 추가 */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            <button style={{
              padding: '6px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              background: 'white',
              fontSize: '12px',
              cursor: 'pointer'
            }}>
              전체 ({achievements.length})
            </button>
            <button style={{
              padding: '6px 12px',
              border: '1px solid #10b981',
              borderRadius: '8px',
              background: '#f0fdf4',
              color: '#10b981',
              fontSize: '12px',
              cursor: 'pointer'
            }}>
              완료됨 ({achievementStats.completed})
            </button>
            <button style={{
              padding: '6px 12px',
              border: '1px solid #6b7280',
              borderRadius: '8px',
              background: '#f9fafb',
              color: '#6b7280',
              fontSize: '12px',
              cursor: 'pointer'
            }}>
              미완료 ({achievementStats.inProgress})
            </button>
          </div>

          <div style={styles.achievementsGrid}>
            {achievements.map(achievement => (
                <div
                    key={achievement.id}
                    style={{
                      ...styles.achievementCard,
                      background: rarityColors[achievement.rarity].bg,
                      opacity: achievement.is_completed ? 1 : 0.6,
                      border: achievement.is_completed
                          ? `2px solid ${rarityColors[achievement.rarity].color}`
                          : '1px solid rgba(0, 0, 0, 0.1)'
                    }}
                >
                  {/* 완료 체크마크 */}
                  {achievement.is_completed && (
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        width: '20px',
                        height: '20px',
                        background: '#10b981',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ color: 'white', fontSize: '12px' }}>✓</span>
                      </div>
                  )}

                  <div style={styles.achievementIcon}>{achievement.icon}</div>

                  <h4 style={{
                    ...styles.achievementName,
                    color: rarityColors[achievement.rarity].color
                  }}>
                    {achievement.name}
                  </h4>

                  <p style={styles.achievementDate}>
                    {achievement.is_completed
                        ? new Date(achievement.completed_at).toLocaleDateString('ko-KR')
                        : '미완료'
                    }
                  </p>

                  {/* 진행도 표시 */}
                  {!achievement.is_completed && achievement.current_progress !== undefined && (
                      <div style={{
                        fontSize: '11px',
                        color: '#6b7280',
                        marginTop: '4px'
                      }}>
                        {achievement.current_progress} / {achievement.target_value}
                      </div>
                  )}

                  <div style={styles.rarityBadge}>
                    <Star style={{ width: '12px', height: '12px' }} />
                    {achievement.rarity}
                  </div>
                </div>
            ))}
          </div>

          {/* 디버그 정보 (개발용) */}
          {process.env.NODE_ENV === 'development' && (
              <div style={{
                marginTop: '20px',
                padding: '12px',
                background: '#f3f4f6',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#6b7280'
              }}>
                <strong>디버그 정보:</strong><br/>
                완료된 업적: {achievementStats.completed}개<br/>
                전체 업적: {achievementStats.total}개<br/>
                완료율: {achievementStats.completionRate}%<br/>
                <button
                    onClick={() => console.log('현재 업적 데이터:', achievements)}
                    style={{
                      marginTop: '8px',
                      padding: '4px 8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      background: 'white',
                      fontSize: '11px',
                      cursor: 'pointer'
                    }}
                >
                  콘솔에 업적 데이터 출력
                </button>
              </div>
          )}
        </Card>
      </div>
  );
};

export default Profile;