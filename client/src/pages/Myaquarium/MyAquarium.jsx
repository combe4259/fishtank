
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // 추가
import { Fish, Github, CheckCircle, Activity, Plus, Trash2, BarChart, Palette } from 'lucide-react';
import Card from '../../components/common/Card/Card.jsx';
import { styles } from './myAquarium-styles.js';
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');
import { deleteNotification, fetchNotifications } from '../Profile/Notificaitons.jsx';

import {
  acceptFriendRequest,
  rejectFriendRequest,
  fetchFriendRequests,
} from "../FriendsAquarium/FriendsUtil.jsx";

// 사용자 정보를 동적으로 가져오도록 수정
const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

const MyAquarium = () => {
  const location = useLocation(); // 추가
  const navigate = useNavigate(); // 추가
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newTodo, setNewTodo] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [githubData, setGithubData] = useState(null);
  const [weeklyStats, setWeeklyStats] = useState({ weeklyStats: [], totalWeekCommits: 0, streak: 0 });
  const [githubStats, setGithubStats] = useState({ issues: 0, prs: '0/0' });
  const [message, setMessage] = useState(''); // 추가: 메시지 상태
  const [todos, setTodos] = useState([
    { id: 1, name: 'React 컴포넌트 개발', status: 'completed' },
    { id: 2, name: 'API 연동 작업', status: 'completed' },
    { id: 3, name: 'UI 디자인 수정', status: 'pending' }
  ]);
  const [myFishes, setMyFishes] = useState([]);
  const [myDecorations, setMyDecorations] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // GitHub OAuth 토큰 처리 로직 추가
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const githubAuth = urlParams.get('github_auth');
    const githubConnected = urlParams.get('github_connected');
    const error = urlParams.get('error');

    if (error) {
      // 에러 처리
      switch (error) {
        case 'token_failed':
          setMessage('❌ GitHub 토큰 받기에 실패했습니다.');
          break;
        case 'user_not_found':
          setMessage('❌ 연동할 사용자를 찾을 수 없습니다.');
          break;
        case 'github_auth_failed':
          setMessage('❌ GitHub 인증에 실패했습니다.');
          break;
        default:
          setMessage('❌ 로그인 중 오류가 발생했습니다.');
      }

      // URL 파라미터 정리
      navigate('/aquarium', { replace: true });
      return;
    }

    if (token) {
      try {
        console.log('🎫 토큰 처리 시작:', token.substring(0, 50) + '...');

        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem('token', token);

        // 토큰에서 사용자 정보 추출 (JWT 디코딩)
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('🔓 토큰 디코딩 결과:', payload);

        // 사용자 정보 저장
        const userData = {
          id: payload.userId,
          githubId: payload.githubId,
          username: payload.username,
          loginType: payload.loginType
        };
        localStorage.setItem('user', JSON.stringify(userData));

        // 성공 메시지 표시
        if (githubAuth === 'success') {
          setMessage('✅ GitHub 로그인에 성공했습니다!');
        } else if (githubConnected === 'success') {
          setMessage('✅ GitHub 계정이 연동되었습니다!');
        }

        // URL 파라미터 정리 (토큰 노출 방지)
        navigate('/aquarium', { replace: true });

        // 사용자 프로필 정보 가져오기
        setTimeout(() => {
          fetchUserProfile();
          setMessage(''); // 메시지 제거
        }, 2000);

      } catch (error) {
        console.error('토큰 처리 에러:', error);
        setMessage('❌ 로그인 정보 처리 중 오류가 발생했습니다.');
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
      }
    }
  }, [location.search, navigate]);

  // 알림 조회
  const loadNotifications = async () => {
    try {
      const user = getUser();
      if (!user?.id) return;

      const data = await fetchNotifications(user.id);
      setNotifications(data);
    } catch (err) {
      console.error('알림 조회 실패:', err);
    }
  };

  // 알림 삭제
  const handleDeleteNotification = async (id) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error('알림 삭제 실패:', err);
    }
  };

  useEffect(() => {
    // 토큰 처리가 완료된 후에만 데이터 로드
    const token = localStorage.getItem('token');
    if (token) {
      // 친구 요청 및 알림 불러오기
      refreshFriendRequests();
      loadNotifications();
      // 기타 초기 데이터 로드
      fetchUserProfile();
      fetchAllData();
      fetchMyFishes();
      fetchMyDecorations();
    }
  }, []);

  // ✅ 받은 친구 요청 리스트를 다시 가져오는 함수
  const refreshFriendRequests = async () => {
    try {
      const user = getUser();
      if (!user?.id) return;

      const data = await fetchFriendRequests(user.id);
      setFriendRequests(data);
    } catch (err) {
      console.error('친구 요청 갱신 실패:', err);
    }
  };

  // 수락/거절 핸들러에서 호출 예시
  const handleAccept = async (reqId) => {
    const result = await acceptFriendRequest(reqId);
    if (result) {
      // 갱신
      await refreshFriendRequests();
    }
  };

  const handleReject = async (reqId) => {
    const result = await rejectFriendRequest(reqId);
    if (result) {
      // 갱신
      await refreshFriendRequests();
    }
  };

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

  // 사용자 프로필 API 호출
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('토큰이 없습니다.');
        return;
      }

      console.log('👤 프로필 조회 시작');
      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log('👤 프로필 응답:', data);

      if (data.success) {
        setUserProfile(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        console.error('프로필 조회 실패:', data.message);
      }
    } catch (error) {
      console.error('프로필 조회 에러:', error);
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
      const todayResponse = await fetch(`${API_BASE_URL}/api/github/commits/today`, {
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

      const weeklyResponse = await fetch(`${API_BASE_URL}/api/github/commits/week`, {
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

      const statsResponse = await fetch(`${API_BASE_URL}/api/github/stats`, {
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

      const response = await fetch(`${API_BASE_URL}/api/shop/my-fish`, {
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

      const response = await fetch(`${API_BASE_URL}/api/shop/my-decorations`, {
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
      const response = await fetch(`${API_BASE_URL}/api/shop/${fishId}/toggle-aquarium`, {
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
      const response = await fetch(`${API_BASE_URL}/api/shop/decorations/${decorationId}/toggle-aquarium`, {
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
      const user = getUser();
      if (!user?.id) {
        alert('사용자 정보를 찾을 수 없습니다.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          title: newTodo.trim(),
          description: '',
          is_completed: false
        })
      });

      const newItem = await response.json();
      console.log('🧾 newItem from server:', newItem);
      setTodos([...todos, {
        id: newItem.id,
        name: newItem.title,
        status: newItem.is_completed ? 'completed' : 'pending'
      }]);
      await getTodos(user.id);
      setNewTodo('');
    }
  };

  const toggleTodo = async (id) => {
    const targetTodo = todos.find(todo => todo.id === id);
    const newStatus = !targetTodo.is_completed;

    const response = await fetch(`${API_BASE_URL}/api/todos/${id}/complete`, {
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

    const user = getUser();
    if (user?.id) {
      await getTodos(user.id);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/api/todos/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error('할 일 삭제 실패:', err);
    }
    setTodos(todos.filter(todo => todo.id !== id));

    const user = getUser();
    if (user?.id) {
      await getTodos(user.id);
    }
  };

  const getTodos = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos/${userId}`);
      const data = await response.json();

      const formattedTodos = data.map(todo => ({
        id: todo.id,
        name: todo.title,
        status: todo.is_completed ? 'completed' : 'pending'
      }));

      setTodos(formattedTodos);
    } catch (error) {
      console.error('할 일 조회 실패:', error);
    }
  }

  useEffect(() => {
    const user = getUser();
    if (user?.id) {
      getTodos(user.id);
    }
  }, []);

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
        {/* 메시지 표시 */}
        {message && (
            <div style={{
              position: 'fixed',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '12px 24px',
              backgroundColor: message.includes('✅') ? '#10b981' : '#ef4444',
              color: 'white',
              borderRadius: '8px',
              fontSize: '14px',
              zIndex: 1000,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}>
              {message}
            </div>
        )}

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

            {/* 받은 친구 요청 목록 */}
            <Card style={styles.mainCard}>
              <h4>받은 친구 신청</h4>
              <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                {friendRequests.map(r => (
                    <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>요청 from {r.requester_id}</span>
                      <div>
                        <button onClick={() => handleAccept(r.id)}>수락</button>
                        <button onClick={() => handleReject(r.id)} style={{ marginLeft: 8 }}>거절</button>
                      </div>
                    </div>
                ))}
                {friendRequests.length === 0 && <p>신청이 없습니다.</p>}
              </div>
            </Card>

            <Card style={styles.mainCard}>
              <h4>알림</h4>
              <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                {notifications.length > 0 ? (
                    notifications.map((note) => (
                        <div key={note.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
                          <div>
                            <strong>{note.title}</strong><br />
                            <span style={{ fontSize: 12, color: '#555' }}>{note.message}</span>
                          </div>
                          <button onClick={() => handleDeleteNotification(note.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <Trash2 size={16} color="#999" />
                          </button>
                        </div>
                    ))
                ) : (
                    <p>알림이 없습니다.</p>
                )}
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