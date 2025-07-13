import React, { useState } from 'react';
import { Fish, Droplets, Sparkles, Github, CheckCircle, Calendar, Archive, Activity, Plus, Trash2, BarChart3 } from 'lucide-react';
import Card from '../../components/common/Card/Card';
import DashboardChart from '../../components/aquarium/DashboardChart/DashboardChart';
import { styles } from './MyAquarium-styles';

const MyAquarium = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([
    { id: 1, name: 'React 컴포넌트 개발', status: 'completed' },
    { id: 2, name: 'API 연동 작업', status: 'completed' },
    { id: 3, name: 'UI 디자인 수정', status: 'pending' }
  ]);

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

  // 대시보드 탭 데이터
  const dashboardTabs = [
    {
      id: 'dashboard',
      label: '대시보드',
      icon: BarChart3,
      data: {}
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: Github,
      data: {
        commits: 85,
        streak: 120,
        issues: 3,
        prs: '4/6'
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
          { id: 1, name: 'React 컴포넌트 개발', status: 'completed' },
          { id: 2, name: 'API 연동 작업', status: 'completed' },
          { id: 3, name: 'UI 디자인 수정', status: 'pending' }
        ]
      }
    },
    {
      id: 'usage',
      label: '컴퓨터 사용량',
      icon: Activity,
      data: {
        todayUsage: '6시간 24분',
        weeklyAverage: '7시간 18분',
        mostUsedApp: 'VS Code',
        productivity: 67,
        applications: [
          { name: 'VS Code', time: '3시간 12분', color: '#007ACC' },
          { name: 'Chrome', time: '2시간 45분', color: '#4285F4' },
          { name: 'Figma', time: '1시간 8분', color: '#F24E1E' }
        ]
      }
    }
  ];

  // 전역 변수로 선언하여 중복 방지
  const completedCount = todos.filter(todo => todo.status === 'completed').length;
  const completionPercentage = Math.round((completedCount / todos.length) * 100) || 0;

  const renderTabContent = () => {
    const currentTab = dashboardTabs.find(tab => tab.id === activeTab);

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
                    <Github style={{ width: '20px', height: '20px', color: '#ffffff' }} />
                    <span style={styles.metricTitle}>GitHub 활동</span>
                    <span style={styles.fireIcon}>🔥 7일 연속</span>
                  </div>
                  <div style={styles.metricStats}>
                    <div style={styles.metricStat}>
                      <div style={styles.metricNumber}>85</div>
                      <div style={styles.metricLabel}>월별 커밋</div>
                    </div>
                    <div style={styles.metricStat}>
                      <div style={styles.metricNumber}>120</div>
                      <div style={styles.metricLabel}>최고 연속</div>
                    </div>
                    <div style={styles.metricStat}>
                      <div style={styles.metricNumber}>4/6</div>
                      <div style={styles.metricLabel}>PR 현황</div>
                    </div>
                  </div>
                  <div style={styles.metricFooter}>
                    <span>오늘 커밋</span>
                    <div style={styles.commitBadges}>
                      <span style={styles.commitBadge}>08:30</span>
                      <span style={styles.commitBadge}>14:20</span>
                      <span style={styles.commitBadge}>18:45</span>
                    </div>
                  </div>
                </div>

                {/* 투두리스트 카드 */}
                <div style={styles.metricCard}>
                  <div style={styles.metricHeader}>
                    <CheckCircle style={{ width: '20px', height: '20px', color: '#ffffff' }} />
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
                            stroke="rgba(255,255,255,0.2)"
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
                                  color: todo.status === 'completed' ? '#10b981' : 'rgba(255,255,255,0.4)'
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

                {/* 컴퓨터 사용량 카드 */}
                <div style={styles.metricCard}>
                  <div style={styles.metricHeader}>
                    <Activity style={{ width: '20px', height: '20px', color: '#ffffff' }} />
                    <span style={styles.metricTitle}>컴퓨터 사용량</span>
                  </div>
                  <div style={styles.usageOverview}>
                    <div style={styles.usageMainStat}>
                      <div style={styles.usageTime}>6시간 24분</div>
                      <div style={styles.usageLabel}>오늘 사용량</div>
                    </div>
                    <div style={styles.usageApps}>
                      <div style={styles.usageApp}>
                        <div style={{...styles.appDot, background: '#007ACC'}}></div>
                        <span>VS Code 3h 12m</span>
                      </div>
                      <div style={styles.usageApp}>
                        <div style={{...styles.appDot, background: '#4285F4'}}></div>
                        <span>Chrome 2h 45m</span>
                      </div>
                      <div style={styles.usageApp}>
                        <div style={{...styles.appDot, background: '#F24E1E'}}></div>
                        <span>Figma 1h 8m</span>
                      </div>
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
              <div style={styles.githubStats}>
                <div style={styles.statBox}>
                  <div style={styles.statNumber}>{currentTab.data.commits}</div>
                  <div style={styles.statLabel}>월별 커밋</div>
                </div>
                <div style={styles.statBox}>
                  <div style={styles.statNumber}>{currentTab.data.streak}</div>
                  <div style={styles.statLabel}>최고 연속</div>
                </div>
                <div style={styles.statBox}>
                  <div style={styles.statNumber}>{currentTab.data.issues}</div>
                  <div style={styles.statLabel}>오픈 이슈</div>
                </div>
                <div style={styles.statBox}>
                  <div style={styles.statNumber}>{currentTab.data.prs}</div>
                  <div style={styles.statLabel}>PR 현황</div>
                </div>
              </div>
              <div style={styles.recentActivity}>
                <h4 style={styles.activityTitle}>최근 커밋</h4>
                <div style={styles.commitList}>
                  <div style={styles.commitItem}>feat: GitHub OAuth 로그인 구현</div>
                  <div style={styles.commitItem}>fix: 카드 스타일 수정</div>
                  <div style={styles.commitItem}>docs: API 엔드포인트 업데이트</div>
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
                      width: `${completionPercentage}%`
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
                              color: todo.status === 'completed' ? '#10b981' : '#e5e7eb'
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
      case 'usage': {
        return (
            <div style={styles.tabContent}>
              <div style={styles.usageOverview}>
                <div style={styles.usageStats}>
                  <div style={styles.usageStatItem}>
                    <div style={styles.usageLabel}>오늘 사용량</div>
                    <div style={styles.usageValue}>{currentTab.data.todayUsage}</div>
                  </div>
                  <div style={styles.usageStatItem}>
                    <div style={styles.usageLabel}>주간 평균</div>
                    <div style={styles.usageValue}>{currentTab.data.weeklyAverage}</div>
                  </div>
                  <div style={styles.usageStatItem}>
                    <div style={styles.usageLabel}>생산성</div>
                    <div style={styles.usageValue}>{currentTab.data.productivity}%</div>
                  </div>
                </div>
              </div>

              <div style={styles.appUsageSection}>
                <h4 style={styles.appUsageTitle}>앱별 사용 시간</h4>
                <div style={styles.appUsageList}>
                  {currentTab.data.applications.map((app) => (
                      <div key={app.name} style={styles.appUsageItem}>
                        <div style={styles.appInfo}>
                          <div
                              style={{
                                ...styles.appIcon,
                                background: app.color
                              }}
                          ></div>
                          <span style={styles.appName}>{app.name}</span>
                        </div>
                        <span style={styles.appTime}>{app.time}</span>
                      </div>
                  ))}
                </div>
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
                <span style={styles.avatarEmoji}>🐠</span>
              </div>
              <h3 style={styles.profileName}>SpongeBob</h3>
              <p style={styles.profileLevel}>Level 15</p>
              <div style={styles.profileStats}>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>12</div>
                  <div style={styles.statLabel}>물고기</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>5</div>
                  <div style={styles.statLabel}>친구</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>8</div>
                  <div style={styles.statLabel}>업적</div>
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
              {/* 대시보드 탭 네비게이션 */}
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
                        <IconComponent style={{ width: '18px', height: '18px' }} />
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

            {/* 오늘의 할일 차트 */}
            <DashboardChart />
          </div>
        </div>
      </div>
  );
};

export default MyAquarium;