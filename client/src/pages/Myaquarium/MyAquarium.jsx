import React, { useState, useEffect } from 'react';
import { Fish, Github, CheckCircle, Activity, Plus, Trash2, BarChart } from 'lucide-react';
import Card from '../../components/common/Card/Card.jsx';
import DashboardChart from '../../components/aquarium/DashboardChart/DashboardChart';
import { styles } from './MyAquarium-styles';

const MyAquarium = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newTodo, setNewTodo] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [githubData, setGithubData] = useState(null); // 오늘의 커밋 데이터
  const [weeklyStats, setWeeklyStats] = useState({ weeklyStats: [], totalWeekCommits: 0, streak: 0 }); // 주간 통계 데이터
  const [githubStats, setGithubStats] = useState({ issues: 0, prs: '0/0' }); // 이슈와 PR 통계
  const [todos, setTodos] = useState([
    { id: 1, name: 'React 컴포넌트 개발', status: 'completed' },
    { id: 2, name: 'API 연동 작업', status: 'completed' },
    { id: 3, name: 'UI 디자인 수정', status: 'pending' }
  ]);

  // 프로필 및 GitHub 데이터 조회
  useEffect(() => {
    fetchUserProfile();
    fetchAllData();
  }, []);

  // 사용자 프로필 API 호출
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

  // 모든 GitHub 데이터 가져오기
  const fetchAllData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('토큰이 없습니다!');
        return;
      }

      // 오늘의 커밋 데이터 가져오기
      const todayResponse = await fetch('http://localhost:3001/api/github/commits/today', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const todayData = await todayResponse.json();
      if (todayData.success) {
        setGithubData(todayData.data);
      }

      // 주간 통계 데이터 가져오기
      const weeklyResponse = await fetch('http://localhost:3001/api/github/commits/week', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const weeklyData = await weeklyResponse.json();
      if (weeklyData.success) {
        setWeeklyStats(weeklyData.data);
      }

      // 이슈와 PR 통계 데이터 가져오기
      const statsResponse = await fetch('http://localhost:3001/api/github/stats', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const statsData = await statsResponse.json();
      if (statsData.success) {
        setGithubStats(statsData.data);
      }
    } catch (error) {
      console.error('GitHub 데이터 조회 에러:', error);
    }
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        name: newTodo.trim(),
        status: 'pending'
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
        todo.id === id
            ? { ...todo, status: todo.status === 'completed' ? 'pending' : 'completed' }
            : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const myFishes = [
    { id: 1, name: '코딩이', species: 'JavaScript 문어', level: 5 },
    { id: 2, name: '파이썬이', species: 'Python 뱀물고기', level: 3 },
  ];

  // 대시보드 탭 데이터 (GitHub 실제 데이터 반영)
  const dashboardTabs = [
    {
      id: 'dashboard',
      label: '대시보드',
      icon: BarChart,
      data: {}
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: Github,
      data: {
        commits: userProfile?.githubStats?.publicRepos || 0,
        todayCommits: githubData?.totalCommitsToday || 0,
        recentCommits: githubData?.commits || [],
        streak: weeklyStats.streak,
        issues: githubStats.issues, // 동적으로 가져옴
        prs: githubStats.prs // 동적으로 가져옴
      }
    },
    {
      id: 'todos',
      label: '투두',
      icon: CheckCircle,
      data: {
        completed: 67,
        total: 100,
        recent: [
          { id: 1, name: 'React 컴포� component 개발', status: 'completed' },
          { id: 2, name: 'API 연동 작업', status: 'completed' },
          { id: 3, name: 'UI 디자인 수정', status: 'pending' }
        ]
      }
    }
  ];

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

  const completedCount = todos.filter(todo => todo.status === 'completed').length;
  const completionPercentage = Math.round((completedCount / todos.length) * 100) || 0;

  const renderTabContent = () => {
    //const currentTab = dashboardTabs.find(tab => tab.id === activeTab);

    switch (activeTab) {
      case 'dashboard': {
        return (
            <div style={styles.tabContent}>
              {/* 오늘의 활동 헤더 */}
              <div style={styles.dashboardHeader}>
                <h3 style={styles.dashboardTitle}>오늘의 활동</h3>
                <div style={styles.dateInfo}>
                  {new Date().toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long'
                  })}
                </div>
              </div>

              {/* 주요 지표 카드 */}
              <div style={styles.metricsGrid}>
                {/* GitHub 카드 */}
                <div style={styles.metricCard}>
                  <div style={styles.metricHeader}>
                    <Github style={{ width: '20px', height: '20px', color: '#10b981' }} />
                    <span style={styles.metricTitle}>GitHub 활동</span>
                    <span style={styles.fireIcon}>
                    🔥 오늘 {githubData?.totalCommitsToday || 0}개 커밋
                  </span>
                  </div>
                  <div style={styles.statBox}>
                    <div style={styles.metricIcon}><Activity size={24} color="#3b82f6" /></div>
                    <div style={styles.statNumber}>{userProfile?.githubStats?.publicRepos || 0}</div>
                    <div style={styles.statLabel}>공개 레포지토리</div>
                  </div>
                  <div style={styles.statBox}>
                    <div style={styles.metricIcon}><CheckCircle size={24} color="#f59e0b" /></div>
                    <div style={styles.statNumber}>{userProfile?.githubStats?.followers || 0}</div>
                    <div style={styles.statLabel}>팔로워</div>
                  </div>
                  <div style={styles.statBox}>
                    <div style={styles.metricIcon}><Github size={24} color="#8b5cf6" /></div>
                    <div style={styles.statNumber}>{userProfile?.githubStats?.following || 0}</div>
                    <div style={styles.statLabel}>팔로잉</div>
                  </div>
                  <div style={styles.metricFooter}>
                    <span>오늘 커밋</span>
                    <div style={styles.commitBadges}>
                      {githubData?.commits?.slice(0, 3).map((commit, index) => (
                          <span key={index} style={styles.commitBadge}>{commit.time}</span>
                      )) || [
                        <span key="default" style={styles.commitBadge}>없음</span>
                      ]}
                    </div>
                  </div>
                </div>

                {/* 투두리스트 카드 */}
                <div style={styles.metricCard}>
                  <div style={styles.metricHeader}>
                    <CheckCircle style={{ width: '20px', height: '20px', color: '#10b981' }} />
                    <span style={styles.metricTitle}>투두리스트</span>
                    <span style={styles.progressBadge}>{completionPercentage}% 완료</span>
                  </div>
                  <div style={styles.todoProgress}>
                    <div style={styles.todoCircle}>
                      <svg style={styles.progressSvg} viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.2)"
                            strokeWidth="8"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="8"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - completionPercentage / 100)}`}
                            strokeLinecap="round"
                            transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div style={styles.todoCount}>
                        <span style={styles.todoCompleted}>{completedCount}</span>
                        <span style={styles.todoTotal}>/{todos.length}</span>
                      </div>
                    </div>
                    <div style={styles.recentTodos}>
                      {todos.slice(0, 3).map((todo) => (
                          <div key={todo.id} style={styles.recentTodoItem}>
                            <CheckCircle
                                style={{
                                  width: '14px',
                                  height: '14px',
                                  color: todo.status === 'completed' ? '#10b981' : 'rgba(255, 255, 255, 0.4)',
                                }}
                            />
                            <span style={todo.status === 'completed' ? styles.completedTodoText : styles.pendingTodoText}>
                          {todo.name}
                        </span>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
      }
      case 'github': {
        return (
            <div style={styles.tabContent}>
              {/* 스트릭 표시 */}
              <div style={styles.streakSection}>
                <span style={styles.streakIcon}>🔥</span>
                <span style={styles.streakText}>{weeklyStats.streak}일 연속</span>
              </div>

              {/* GitHub 통계 */}
              <div style={styles.githubStats}>
                <div style={styles.statItem}>
                  <div style={styles.metricIcon}><Github size={24} color="#10b981" /></div>
                  <div style={styles.statNumber}>{githubData?.totalCommitsToday || 0}</div>
                  <div style={styles.statLabel}>오늘 커밋</div>
                </div>
                <div style={styles.statBox}>
                  <div style={styles.metricIcon}><Activity size={24} color="#3b82f6" /></div>
                  <div style={styles.statNumber}>{userProfile?.githubStats?.publicRepos || 0}</div>
                  <div style={styles.statLabel}>총 레포지토리</div>
                </div>
                <div style={styles.statBox}>
                  <div style={styles.metricIcon}><CheckCircle size={24} color="#f59e0b" /></div>
                  <div style={styles.statNumber}>{githubStats.issues}</div>
                  <div style={styles.statLabel}>오픈 이슈</div>
                </div>
                <div style={styles.statBox}>
                  <div style={styles.metricIcon}><Github size={24} color="#8b5cf6" /></div>
                  <div style={styles.statNumber}>{githubStats.prs}</div>
                  <div style={styles.statLabel}>PR 현황</div>
                </div>
              </div>

              {/* 주간 활동 그래프 */}
              <div style={styles.weeklyActivitySection}>
                <h4 style={styles.weeklyActivityTitle}>주간 활동 내역</h4>
                <div style={styles.weeklyActivityGraph}>
                  {weeklyStats.weeklyStats.map((day, index) => (
                      <div key={index} style={styles.barContainer}>
                        <div
                            style={{
                              ...styles.bar,
                              height: `${day.commits * 10}px`,
                              backgroundColor: day.commits > 0 ? '#10b981' : '#e5e7eb',
                            }}
                        />
                        <span style={styles.barLabel}>{day.date}</span>
                      </div>
                  ))}
                </div>
              </div>

              {/* 최근 커밋 */}
              <div style={styles.recentActivity}>
                <h4 style={styles.activityTitle}>
                  오늘의 커밋 ({githubData?.date || new Date().toLocaleDateString('ko-KR')})
                </h4>
                <div style={styles.commitList}>
                  {githubData?.commits?.length > 0 ? (
                      githubData.commits.map((commit, index) => (
                          <div key={index} style={styles.commitItem}>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                              <div>
                                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                                  {commit.message}
                                </div>
                                <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                                  {commit.repository} • {commit.sha}
                                </div>
                              </div>
                              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                                {commit.time}
                              </div>
                            </div>
                          </div>
                      ))
                  ) : (
                      <div style={styles.commitItem}>
                        오늘은 아직 커밋이 없습니다. 🐠
                      </div>
                  )}
                </div>
              </div>
            </div>
        );
      }
      case 'todos': {
        return (
            <div style={styles.tabContent}>
              <div style={styles.progressSection}>
                <div style={styles.progressCircle}>
                  <div style={styles.progressText}>{completionPercentage}%</div>
                </div>
                <div style={styles.progressInfo}>
                  <div style={styles.completedTasks}>
                    완료: {completedCount}/{todos.length}
                  </div>
                  <div style={styles.progressBar}>
                    <div style={{
                      ...styles.progressFill,
                      width: `${completionPercentage}%`,
                    }}></div>
                  </div>
                </div>
              </div>

              {/* 할일 추가 */}
              <div style={styles.addTodoSection}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="새로운 할일을 입력하세요..."
                    style={styles.todoInput}
                />
                <button onClick={addTodo} style={styles.addTodoButton}>
                  <Plus style={{ width: '16px', height: '16px' }} />
                </button>
              </div>

              <div style={styles.todoList}>
                {todos.map((todo) => (
                    <div key={todo.id} style={styles.todoItem}>
                      <button
                          onClick={() => toggleTodo(todo.id)}
                          style={styles.todoCheckbox}
                      >
                        <CheckCircle
                            style={{
                              width: '16px',
                              height: '16px',
                              color: todo.status === 'completed' ? '#10b981' : '#e5e7eb',
                            }}
                        />
                      </button>
                      <span style={todo.status === 'completed' ? styles.completedTodo : styles.pendingTodo}>
                    {todo.name}
                  </span>
                      <button
                          onClick={() => deleteTodo(todo.id)}
                          style={styles.deleteTodoButton}
                      >
                        <Trash2 style={{ width: '14px', height: '14px' }} />
                      </button>
                    </div>
                ))}
              </div>
            </div>
        );
      }
      default:
        return null;
    }
  };

  return (
      <div style={styles.container}>
        <div style={styles.mainGrid}>
          {/* 왼쪽 사이드바 */}
          <div style={styles.leftSidebar}>
            {/* 프로필 카드 */}
            <Card style={styles.profileCard}>
              <div style={styles.profileAvatar}>
                {userProfile?.profileImageUrl ? (
                    <img
                        src={userProfile.profileImageUrl}
                        alt="프로필"
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }}
                    />
                ) : (
                    <span style={styles.avatarEmoji}>🐠</span>
                )}
              </div>
              <h3 style={styles.profileName}>
                {userProfile?.username || '사용자'}
              </h3>
              <p style={styles.profileLevel}>
                Level {userProfile?.gameStats?.level || 1}
              </p>
              <div style={styles.profileStats}>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>{userProfile?.gameStats?.fishCoins || 0}</div>
                  <div style={styles.statLabel}>코인</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>{userProfile?.gameStats?.experiencePoints || 0}</div>
                  <div style={styles.statLabel}>경험치</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>{githubData?.totalCommitsToday || 0}</div>
                  <div style={styles.statLabel}>오늘 커밋</div>
                </div>
              </div>
            </Card>
          </div>

          {/* 메인 아쿠아리움 */}
          <div style={styles.aquariumWrapper}>
            <div style={styles.aquariumContainer}>
              <div style={styles.aquariumOverlay}></div>
              <div style={styles.waterEffect}></div>

              {/* 물고기들 */}
              <div style={styles.fishContainer}>
                <div style={{ ...styles.fish, top: '30%', left: '20%' }}>
                  <div style={styles.fishIcon}>
                    <Fish style={{ width: '32px', height: '32px', color: 'white' }} />
                  </div>
                  <div style={styles.fishName}>코딩이</div>
                </div>

                <div style={{ ...styles.fish, top: '50%', left: '60%', animationDelay: '2s' }}>
                  <div style={{ ...styles.fishIcon, background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
                    <Fish style={{ width: '32px', height: '32px', color: 'white' }} />
                  </div>
                  <div style={styles.fishName}>파이썬이</div>
                </div>
              </div>

              {/* 해초 */}
              <div style={{ ...styles.seaweed, left: '10%' }}></div>
              <div style={{ ...styles.seaweed, right: '15%', height: '80px' }}></div>
              <div style={{ ...styles.seaweed, left: '40%', height: '100px', opacity: 0.6 }}></div>

              {/* 물방울 효과 */}
              <div style={styles.bubbles}>
                <div style={{ ...styles.bubble, animationDelay: '0s' }}></div>
                <div style={{ ...styles.bubble, animationDelay: '1s' }}></div>
                <div style={{ ...styles.bubble, animationDelay: '2s' }}></div>
              </div>
            </div>

            {/* 하단 대시보드 */}
            <Card style={styles.dashboardCard}>
              <div style={styles.tabNavigation}>
                {dashboardTabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                      <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          style={{
                            ...styles.tabButton,
                            ...(activeTab === tab.id ? styles.tabButtonActive : {})
                          }}
                      >
                        {IconComponent && <IconComponent style={{ width: '18px', height: '18px' }} />}
                        <span>{tab.label}</span>
                      </button>
                  );
                })}
              </div>

              {/* 탭 컨텐츠 */}
              {renderTabContent()}
            </Card>
          </div>

          {/* 오른쪽 사이드바 */}
          <div style={styles.rightSidebar}>
            {/* 나의 물고기 목록 */}
            <Card style={styles.fishListCard}>
              <h3 style={styles.fishListTitle}>
                <Fish style={{ width: '20px', height: '20px', color: '#3B82F6' }} />
                나의 물고기
              </h3>
              <div style={styles.fishList}>
                {myFishes.map(fish => (
                    <div key={fish.id} style={styles.fishListItem}>
                      <div style={styles.fishItemIcon}>
                        <Fish style={{ width: '24px', height: '24px', color: 'white' }} />
                      </div>
                      <div style={styles.fishItemInfo}>
                        <div style={styles.fishItemName}>{fish.name}</div>
                        <div style={styles.fishItemLevel}>Lv.{fish.level} • {fish.species}</div>
                      </div>
                    </div>
                ))}
              </div>
            </Card>

            {/* GitHub 활동 요약 카드 */}
            <Card style={{ marginTop: '20px', padding: '15px' }}>
              <h3 style={{
                color: '#ffffff',
                marginBottom: '15px',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Github style={{ width: '18px', height: '18px', color: '#3B82F6' }} />
                GitHub 요약
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '14px'
                }}>
                  <span style={{ color: '#94a3b8' }}>오늘 커밋</span>
                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>
                  {githubData?.totalCommitsToday || 0}개
                </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '14px'
                }}>
                  <span style={{ color: '#94a3b8' }}>총 레포</span>
                  <span style={{ color: '#3B82F6', fontWeight: 'bold' }}>
                  {userProfile?.githubStats?.publicRepos || 0}개
                </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '14px'
                }}>
                  <span style={{ color: '#94a3b8' }}>팔로워</span>
                  <span style={{ color: '#8B5CF6', fontWeight: 'bold' }}>
                  {userProfile?.githubStats?.followers || 0}명
                </span>
                </div>
                {githubData?.commits?.length > 0 && (
                    <div style={{
                      marginTop: '10px',
                      padding: '8px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: '#10b981'
                    }}>
                      최근: {githubData.commits[0].message.substring(0, 30)}
                      {githubData.commits[0].message.length > 30 ? '...' : ''}
                    </div>
                )}
              </div>
            </Card>

            <DashboardChart />
          </div>
        </div>
      </div>
  );
};

export default MyAquarium;