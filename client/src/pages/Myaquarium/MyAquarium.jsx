import React, { useState, useEffect } from 'react';
import { Fish, Github, CheckCircle, Activity, Plus, Trash2, BarChart, Palette } from 'lucide-react';
import Card from '../../components/common/Card/Card.jsx';
import { styles } from './myAquarium-styles.js';
const API_BASE_URL = import.meta.env.VITE_API_URL


const user = JSON.parse(localStorage.getItem('user'));
const userId = user?.id;


const MyAquarium = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newTodo, setNewTodo] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [githubData, setGithubData] = useState(null);
  const [weeklyStats, setWeeklyStats] = useState({ weeklyStats: [], totalWeekCommits: 0, streak: 0 });
  const [githubStats, setGithubStats] = useState({ issues: 0, prs: '0/0' });
  const [todos, setTodos] = useState([
    { id: 1, name: 'React 컴포넌트 개발', status: 'completed' },
    { id: 2, name: 'API 연동 작업', status: 'completed' },
    { id: 3, name: 'UI 디자인 수정', status: 'pending' }
  ]);
  const [myFishes, setMyFishes] = useState([]);
  const [myDecorations, setMyDecorations] = useState([]);

  // 물고기 위치 계산 함수
  const getFishPosition = (index) => {
    const positions = [
      { top: 20, left: 15 },
      { top: 40, left: 45 },
      { top: 25, left: 75 },
      { top: 55, left: 25 },
      { top: 35, left: 55 },
      { top: 60, left: 10 },
      { top: 15, left: 65 },
      { top: 45, left: 35 },
      { top: 30, left: 80 },
      { top: 50, left: 60 }
    ];

    return positions[index] || {
      top: 20 + (Math.random() * 40),
      left: 10 + (Math.random() * 70)
    };
  };

  // 장식품 위치 계산 함수
  const getDecorationPosition = (index) => {
    const positions = [
      { top: 70, left: 20 },
      { top: 75, left: 50 },
      { top: 80, left: 15 },
      { top: 65, left: 75 },
      { top: 70, left: 40 }
    ];

    return positions[index] || {
      top: 65 + (Math.random() * 15),
      left: 15 + (Math.random() * 60)
    };
  };

  // 데이터 조회
  useEffect(() => {
    fetchUserProfile();
    fetchAllData();
    fetchMyFishes();
    fetchMyDecorations();
  }, []);

  // 사용자 프로필 API 호출
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('토큰이 없습니다.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}api/user/profile`, {
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

  // GitHub 데이터 가져오기
  const fetchAllData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('토큰이 없습니다!');
        return;
      }

      // GitHub 데이터 호출
      const todayResponse = await fetch(`${API_BASE_URL}api/github/commits/today`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const todayData = await todayResponse.json();
      if (todayData.success) {
        console.log("GitHub 데이터 성공:", todayData);
        setGithubData(todayData.data);

        // GitHub 데이터 호출 후 사용자 프로필 다시 조회 (레벨, 경험치, 코인 업데이트)
        await fetchUserProfile();
      }

      const weeklyResponse = await fetch(`${API_BASE_URL}api/github/commits/week`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const weeklyData = await weeklyResponse.json();
      if (weeklyData.success) {
        console.log("주간 데이터 성공");
        setWeeklyStats(weeklyData.data);
      }

      const statsResponse = await fetch(`${API_BASE_URL}api/github/stats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const statsData = await statsResponse.json();
      if (statsData.success) {
        console.log("통계 데이터 성공")
        setGithubStats(statsData.data);
      }
    } catch (error) {
      console.error('GitHub 데이터 조회 에러:', error);
    }
  };

  // 보유한 물고기 목록 가져오기
  const fetchMyFishes = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('토큰이 없습니다.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}api/shop/my-fish`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        console.log('🐠 물고기 데이터:', data.fish);
        setMyFishes(data.fish);
      } else {
        console.error('물고기 목록 조회 실패:', data.message);
      }
    } catch (error) {
      console.error('물고기 목록 조회 에러:', error);
    }
  };

  // 보유한 장식품 목록 가져오기
  const fetchMyDecorations = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('토큰이 없습니다.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}api/shop/my-decorations`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        console.log('🎨 장식품 데이터:', data.decorations);
        setMyDecorations(data.decorations);
      } else {
        console.error('장식품 목록 조회 실패:', data.message);
      }
    } catch (error) {
      console.error('장식품 목록 조회 에러:', error);
    }
  };

  // 물고기를 어항에 추가/제거
  const toggleFishInAquarium = async (fishId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}api/shop/${fishId}/toggle-aquarium`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setMyFishes(myFishes.map(fish =>
            fish.id === fishId ? { ...fish, is_in_aquarium: data.is_in_aquarium } : fish
        ));
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('어항 상태 변경 에러:', error);
      alert('어항 상태 변경 중 오류가 발생했습니다.');
    }
  };

  // 장식품을 어항에 추가/제거
  const toggleDecorationInAquarium = async (decorationId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}api/shop/decorations/${decorationId}/toggle-aquarium`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setMyDecorations(myDecorations.map(decoration =>
            decoration.id === decorationId ? { ...decoration, is_placed: data.is_placed } : decoration
        ));
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('장식품 배치 상태 변경 에러:', error);
      alert('장식품 배치 상태 변경 중 오류가 발생했습니다.');
    }
  };

  const addTodo = async () => {
    if (newTodo.trim()) {
      const response = await fetch(`${API_BASE_URL}api/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,                        // ⚠️ 나중에 로그인 유저 정보로 바꿔야 함
          title: newTodo.trim(),            // 🟢 제목으로 사용
          description: '',                  // ✏️ 일단 빈 문자열로 기본값
          is_completed: false              // 기본은 미완료
        })
      });
  
      const newItem = await response.json();
      console.log('🧾 newItem from server:', newItem);
      setTodos([...todos, {
        id: newItem.id,
        name: newItem.title,
        status: newItem.is_completed ? 'completed' : 'pending'
      }]);
      await getTodos(userId);
      setNewTodo('');
    }

  };

  const toggleTodo = async (id) => {
    const targetTodo = todos.find(todo => todo.id === id);
    const newStatus = !targetTodo.is_completed;
  
    const response = await fetch(`${API_BASE_URL}api/todos/${id}/complete`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        is_completed: newStatus,
        completed_at: newStatus ? new Date().toISOString() : null
      })
    });
  
    const updated = await response.json();
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, ...updated } : todo
    ));
    await getTodos(userId);
  };



  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_BASE_URL}api/todos/${id}`, {
        method: 'DELETE'
      });
      // 삭제 후 다시 할 일 목록 불러오기 등
    } catch (err) {
      console.error('할 일 삭제 실패:', err);
    }
    setTodos(todos.filter(todo => todo.id !== id));
    await getTodos(userId);
  };

  const getTodos = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}api/todos/${userId}`);
      const data = await response.json();

      const formattedTodos = data.map(todo => ({
        id: todo.id,
        name: todo.title,
        status: todo.is_completed ? 'completed' : 'pending'
      }));

      setTodos(formattedTodos);
      await getTodos(userId);
    } catch (error) {
      console.error('할 일 조회 실패:', error);
    }
  }

  useEffect(() => {
    if (userId) {
      getTodos(userId);
    }
  }, [userId]);


  const dashboardTabs = [
    { id: 'dashboard', label: '대시보드', icon: BarChart, data: {} },
    {
      id: 'github',
      label: 'GitHub',
      icon: Github,
      data: {
        commits: userProfile?.githubStats?.publicRepos || 0,
        todayCommits: githubData?.totalCommitsToday || 0,
        recentCommits: githubData?.commits || [],
        streak: weeklyStats.streak,
        issues: githubStats.issues,
        prs: githubStats.prs,
        coinsEarned: githubData?.coinsEarned || 0,
        experienceGained: githubData?.experienceGained || 0
      }
    },
    {
      id: 'todos',
      label: '투두',
      icon: CheckCircle,
      data: {
        completed: 67,
        total: 100,
        recent: todos.slice(0, 3)
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

    switch (activeTab) {
      case 'dashboard': {
        return (
            <div style={styles.tabContent}>
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

              {/* 보상 상태 표시 */}
              {githubData?.rewardMessage && (
                  <div style={{
                    padding: '10px',
                    marginBottom: '20px',
                    backgroundColor: githubData.alreadyRewarded ? '#f59e0b' : '#10b981',
                    color: 'white',
                    borderRadius: '8px',
                    fontSize: '14px',
                    textAlign: 'center'
                  }}>
                    {githubData.rewardMessage}
                  </div>
              )}

              <div style={styles.metricsGrid}>
                <div style={styles.metricCard}>
                  <div style={styles.metricHeader}>
                    <Github style={{ width: '20px', height: '20px', color: '#10b981' }} />
                    <span style={styles.metricTitle}>GitHub 활동</span>
                    <span style={styles.fireIcon}>
                                    🔥 오늘 {githubData?.totalCommitsToday || 0}개 커밋
                                </span>
                  </div>
                  <div style={styles.githubStats}>
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
                  </div>
                  <div style={styles.metricFooter}>
                    <span>최근 커밋</span>
                    <div style={styles.commitBadges}>
                      {githubData?.commits?.slice(0, 3).map((commit, index) => (
                          <span key={index} style={styles.commitBadge}>{commit.time}</span>
                      )) || [
                        <span key="default" style={styles.commitBadge}>없음</span>
                      ]}
                    </div>
                  </div>
                  <div style={styles.rewardInfo}>
                                <span>
                                    오늘의 보상: {githubData?.coinsEarned || 0} 코인, {githubData?.experienceGained || 0} 경험치
                                </span>
                    {githubData?.alreadyRewarded && (
                        <div style={{ fontSize: '12px', color: '#f59e0b', marginTop: '5px' }}>
                          (이미 오늘 보상을 받았습니다)
                        </div>
                    )}
                  </div>
                </div>

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
                  <div style={styles.levelInfo}>
                                <span>
                                    레벨: {githubData?.currentLevel || userProfile?.level || 1}
                                  (경험치: {githubData?.currentExperience || userProfile?.experience_points || 0}/100)
                                </span>
                  </div>
                </div>
              </div>
            </div>
        );
      }

      case 'github': {
        return (
            <div style={styles.tabContent}>
              <div style={styles.streakSection}>
                <span style={styles.streakIcon}>🔥</span>
                <span style={styles.streakText}>{weeklyStats.streak}일 연속</span>
              </div>

              {/* 보상 상태 표시 */}
              {githubData?.rewardMessage && (
                  <div style={{
                    padding: '10px',
                    marginBottom: '20px',
                    backgroundColor: githubData.alreadyRewarded ? '#f59e0b' : '#10b981',
                    color: 'white',
                    borderRadius: '8px',
                    fontSize: '14px',
                    textAlign: 'center'
                  }}>
                    {githubData.rewardMessage}
                  </div>
              )}

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

              <div style={styles.rewardSection}>
                        <span>
                            오늘의 활동 보상: {githubData?.coinsEarned || 0} 코인, {githubData?.experienceGained || 0} 경험치
                        </span>
                {githubData?.alreadyRewarded && (
                    <div style={{ fontSize: '12px', color: '#f59e0b', marginTop: '5px' }}>
                      (이미 오늘 보상을 받았습니다)
                    </div>
                )}
              </div>

              <div style={styles.weeklyActivitySection}>
                <h4 style={styles.weeklyActivityTitle}>요일 활동 내역</h4>
                <div style={styles.weeklyActivityGraph}>
                  {weeklyStats.weeklyStats.map((day, index) => (
                      <div key={index} style={styles.barContainer}>
                        <div
                            style={{
                              ...styles.bar,
                              height: `${Math.max(day.commits * 10, 5)}px`, // 최소 높이 5px
                              backgroundColor: day.commits > 0 ? '#10b981' : '#374151',
                            }}
                        />
                        <span style={styles.barLabel}>{day.date}</span>
                        <span style={{...styles.barLabel, fontSize: '10px', color: '#9ca3af'}}>
                                        {day.commits}
                                    </span>
                      </div>
                  ))}
                </div>
              </div>

              <div style={styles.recentActivity}>
                <h4 style={styles.activityTitle}>
                  오늘의 커밋 ({githubData?.date || new Date().toLocaleDateString('ko-KR')})
                </h4>
                <div style={styles.commitList}>
                  {githubData?.commits?.length > 0 ? (
                      githubData.commits.map((commit, index) => (
                          <div key={index} style={styles.commitItem}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{commit.message}</div>
                                <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                                  {commit.repository} • {commit.sha}
                                </div>
                              </div>
                              <div style={{ fontSize: '12px', color: '#94a3b8' }}>{commit.time}</div>
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

        // todos 케이스는 동일하게 유지
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
                    <div style={{ ...styles.progressFill, width: `${completionPercentage}%` }}></div>
                  </div>
                </div>
              </div>
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
                  <Plus style={{ width: '25px', height: '25px' }} />
                </button>
              </div>
              <div style={styles.todoList}>
                {todos.map((todo) => (
                    <div key={todo.id} style={styles.todoItem}>
                      <button onClick={() => toggleTodo(todo.id)} style={styles.todoCheckbox}>
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
                      <button onClick={() => deleteTodo(todo.id)} style={styles.deleteTodoButton}>
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

  const aquariumFishes = myFishes.filter(fish => fish.is_in_aquarium);
  const aquariumDecorations = myDecorations.filter(decoration => decoration.is_placed);

  console.log('🐠 전체 물고기:', myFishes);
  console.log('🐠 어항에 있는 물고기:', aquariumFishes);
  console.log('🎨 어항에 있는 장식품:', aquariumDecorations);

  return (
      <div style={styles.container}>
        <div style={styles.mainGrid}>
          {/* 왼쪽 사이드바 */}
          <div style={styles.leftSidebar}>
            <Card style={styles.profileCard}>
              <div style={styles.profileAvatar}>
                {userProfile?.profileImageUrl ? (
                    <img
                        src={userProfile.profileImageUrl}
                        alt="프로필"
                        style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                ) : (
                    <span style={styles.avatarEmoji}>🐠</span>
                )}
              </div>
              <h3 style={styles.profileName}>{userProfile?.username || '사용자'}</h3>
              <p style={styles.profileLevel}>Level {userProfile?.level || 1} (경험치: {userProfile?.experience_points || 0}/100)</p>
              <div style={styles.profileStats}>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>{userProfile?.fish_coins || 0}</div>
                  <div style={styles.statLabel}>코인</div>
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
              <div style={styles.fishContainer}>
                {/* 물고기 렌더링 - 수정된 위치 계산 */}
                {aquariumFishes.map((fish, index) => {
                  const position = getFishPosition(index);
                  return (
                      <div key={fish.id} style={{
                        ...styles.fish,
                        top: `${position.top}%`,
                        left: `${position.left}%`,
                        zIndex: 10
                      }}>
                        <div style={styles.fishIcon}>
                          {fish.image_url ? (
                              <img
                                  src={fish.image_url}
                                  alt={fish.nickname || fish.original_name}
                                  style={{ width: '32px', height: '32px' }}
                                  onError={(e) => {
                                    console.log('이미지 로드 실패:', fish.image_url);
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                  }}
                              />
                          ) : (
                              <span style={{ fontSize: '32px' }}>🐠</span>
                          )}
                          <span style={{ fontSize: '32px', display: fish.image_url ? 'none' : 'block' }}>🐠</span>
                        </div>
                        <div style={styles.fishName}>
                          {fish.nickname || fish.original_name}
                        </div>
                      </div>
                  );
                })}

                {/* 장식품 렌더링 - 수정된 위치 계산 */}
                {aquariumDecorations.map((decoration, index) => {
                  const position = getDecorationPosition(index);
                  return (
                      <div key={decoration.id} style={{
                        position: 'absolute',
                        top: `${position.top}%`,
                        left: `${position.left}%`,
                        zIndex: 5
                      }}>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.3))'
                        }}>
                          {decoration.image_url ? (
                              <img
                                  src={decoration.image_url}
                                  alt={decoration.name}
                                  style={{ width: '28px', height: '28px' }}
                                  onError={(e) => {
                                    console.log('장식품 이미지 로드 실패:', decoration.image_url);
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                  }}
                              />
                          ) : (
                              <span style={{ fontSize: '28px' }}>🪸</span>
                          )}
                          <span style={{ fontSize: '28px', display: decoration.image_url ? 'none' : 'block' }}>🪸</span>
                          <div style={{
                            fontSize: '10px',
                            color: 'rgba(255, 255, 255, 0.8)',
                            marginTop: '2px',
                            textShadow: '0 0 4px rgba(0,0,0,0.8)'
                          }}>
                            {decoration.name}
                          </div>
                        </div>
                      </div>
                  );
                })}

                {/* 어항에 물고기가 없을 때 메시지 */}
                {aquariumFishes.length === 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '16px',
                      zIndex: 20
                    }}>
                      <div style={{ fontSize: '48px', marginBottom: '10px' }}>🐠</div>
                      <div>물고기를 추가해보세요!</div>
                    </div>
                )}
              </div>

              {/* 해초와 기포 */}
              <div style={{ ...styles.seaweed, left: '10%' }}></div>
              <div style={{ ...styles.seaweed, right: '15%', height: '80px' }}></div>
              <div style={{ ...styles.seaweed, left: '40%', height: '100px', opacity: 0.6 }}></div>
              <div style={styles.bubbles}>
                <div style={{ ...styles.bubble, animationDelay: '0s' }}></div>
                <div style={{ ...styles.bubble, animationDelay: '1s' }}></div>
                <div style={{ ...styles.bubble, animationDelay: '2s' }}></div>
              </div>
            </div>

            <Card style={styles.dashboardCard}>
              <div style={styles.tabNavigation}>
                {dashboardTabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                      <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          style={{ ...styles.tabButton, ...(activeTab === tab.id ? styles.tabButtonActive : {}) }}
                      >
                        {IconComponent && <IconComponent style={{ width: '18px', height: '18px' }} />}
                        <span>{tab.label}</span>
                      </button>
                  );
                })}
              </div>
              {renderTabContent()}
            </Card>
          </div>

          {/* 오른쪽 사이드바 */}
          <div style={styles.rightSidebar}>
            <Card style={styles.fishListCard}>
              <h3 style={styles.fishListTitle}>
                <Fish style={{ width: '20px', height: '20px', color: '#3B82F6' }} />
                나의 물고기 ({myFishes.length}마리)
              </h3>
              <div style={styles.fishList}>
                {myFishes.map(fish => (
                    <div key={fish.id} style={styles.fishListItem}>
                      <div style={styles.fishItemIcon}>
                        {fish.image_url ? (
                            <img
                                src={fish.image_url}
                                alt={fish.original_name}
                                style={{ width: '24px', height: '24px' }}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'block';
                                }}
                            />
                        ) : (
                            <span style={{ fontSize: '24px' }}>🐠</span>
                        )}
                        <span style={{ fontSize: '24px', display: fish.image_url ? 'none' : 'block' }}>🐠</span>
                      </div>
                      <div style={styles.fishItemInfo}>
                        <div style={styles.fishItemName}>{fish.nickname || fish.original_name}</div>
                        <div style={styles.fishItemLevel}>{fish.species}</div>
                      </div>
                      <button
                          onClick={() => toggleFishInAquarium(fish.id)}
                          style={{
                            padding: '5px 10px',
                            backgroundColor: fish.is_in_aquarium ? '#ef4444' : '#3B82F6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                      >
                        {fish.is_in_aquarium ? '제거' : '추가'}
                      </button>
                    </div>
                ))}
                {myFishes.length === 0 && (
                    <div style={{
                      textAlign: 'center',
                      padding: '20px',
                      color: '#9CA3AF',
                      fontSize: '14px'
                    }}>
                      보유한 물고기가 없습니다.
                      <br />
                      상점에서 물고기를 구매해보세요! 🐠
                    </div>
                )}
              </div>
            </Card>

            {/* 나의 장식품 섹션 */}
            <Card style={styles.fishListCard}>
              <h3 style={styles.fishListTitle}>
                <Palette style={{ width: '20px', height: '20px', color: '#8B5CF6' }} />
                나의 장식품 ({myDecorations.length}개)
              </h3>
              <div style={styles.fishList}>
                {myDecorations.map(decoration => (
                    <div key={decoration.id} style={styles.fishListItem}>
                      <div style={styles.fishItemIcon}>
                        {decoration.image_url ? (
                            <img
                                src={decoration.image_url}
                                alt={decoration.name}
                                style={{ width: '24px', height: '24px' }}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'block';
                                }}
                            />
                        ) : (
                            <span style={{ fontSize: '24px' }}>🪸</span>
                        )}
                        <span style={{ fontSize: '24px', display: decoration.image_url ? 'none' : 'block' }}>🪸</span>
                      </div>
                      <div style={styles.fishItemInfo}>
                        <div style={styles.fishItemName}>{decoration.name}</div>
                        <div style={styles.fishItemLevel}>
                          {new Date(decoration.acquired_at).toLocaleDateString('ko-KR')} 획득
                        </div>
                      </div>
                      <button
                          onClick={() => toggleDecorationInAquarium(decoration.id)}
                          style={{
                            padding: '5px 10px',
                            backgroundColor: decoration.is_placed ? '#ef4444' : '#8B5CF6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                      >
                        {decoration.is_placed ? '제거' : '배치'}
                      </button>
                    </div>
                ))}
                {myDecorations.length === 0 && (
                    <div style={{
                      textAlign: 'center',
                      padding: '20px',
                      color: '#9CA3AF',
                      fontSize: '14px'
                    }}>
                      보유한 장식품이 없습니다.
                      <br />
                      상점에서 장식품을 구매해보세요! 🎨
                    </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
  );
};

export default MyAquarium;