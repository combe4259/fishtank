export const styles = {
  // 컨테이너 크기 조정
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px', // 24px → 16px
    padding: '16px', // 20px → 16px
    minHeight: 'calc(100vh - 110px)',
    maxWidth: '1200px', // 전체 너비 제한
    margin: '0 auto',
    width: '100%'
  },


  // 메인 그리드 크기 축소
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '250px 1fr 250px', // 300px → 250px
    gap: '16px', // 24px → 16px
    height: '100%',
    minHeight: '500px' // 600px → 500px
  },

  // 왼쪽 사이드바 크기 조정
  leftSidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px' // 20px → 16px
  },

  // 프로필 카드 크기 축소
  profileCard: {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(15px)',
    borderRadius: '20px', // 24px → 20px
    padding: '20px', // 24px → 20px
    textAlign: 'center',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  },

  profileAvatar: {
    width: '70px', // 90px → 70px
    height: '70px', // 90px → 70px
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50%',
    margin: '0 auto 12px', // 16px → 12px
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
  },

  avatarEmoji: {
    fontSize: '36px' // 48px → 36px
  },

  profileName: {
    fontSize: '18px', // 20px → 18px
    fontWeight: 'bold',
    marginBottom: '4px',
    color: '#1a1a1a'
  },

  profileLevel: {
    color: '#6b7280',
    fontSize: '13px', // 14px → 13px
    marginBottom: '16px' // 20px → 16px
  },

  profileStats: {
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: '16px', // 20px → 16px
    borderTop: '1px solid rgba(229, 231, 235, 0.6)'
  },

  statValue: {
    fontSize: '20px', // 24px → 20px
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: '4px'
  },

  // 메인 카드들 크기 축소
  mainCard: {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(15px)',
    borderRadius: '20px', // 24px → 20px
    padding: '20px', // 24px → 20px
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  },

  // 메인 아쿠아리움 크기 조정
  aquariumWrapper: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px' // 20px → 16px
  },

  aquariumContainer: {
    height: '380px', // 500px → 380px
    background: 'linear-gradient(180deg, #7dd3fc 0%, #0ea5e9 50%, #0284c7 100%)',
    borderRadius: '24px', // 32px → 24px
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(59, 130, 246, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.1)'
  },

  aquariumOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at center top, rgba(255, 255, 255, 0.2) 0%, transparent 60%)'
  },

  waterEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.05) 100%)',
    animation: 'waterWave 10s ease-in-out infinite'
  },

  fishContainer: {
    position: 'relative',
    height: '100%',
    zIndex: 10
  },

  fish: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    animation: 'swim 8s ease-in-out infinite',
    cursor: 'pointer',
    transition: 'transform 0.3s'
  },

  fishIcon: {
    width: '48px', // 64px → 48px
    height: '48px', // 64px → 48px
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s'
  },

  fishName: {
    marginTop: '6px', // 8px → 6px
    padding: '4px 10px', // 6px 14px → 4px 10px
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(5px)',
    borderRadius: '12px', // 16px → 12px
    fontSize: '11px', // 13px → 11px
    fontWeight: '600',
    color: '#1a1a1a',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.4)'
  },

  seaweed: {
    position: 'absolute',
    bottom: 0,
    background: 'linear-gradient(180deg, #10b981 0%, #059669 100%)',
    borderRadius: '50px 50px 0 0',
    opacity: 0.8,
    width: '30px', // 40px → 30px
    height: '90px', // 120px → 90px
    animation: 'sway 6s ease-in-out infinite'
  },

  bubbles: {
    position: 'absolute',
    bottom: '20px', // 30px → 20px
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '8px' // 12px → 8px
  },

  bubble: {
    width: '8px', // 10px → 8px
    height: '8px', // 10px → 8px
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.2)',
    animation: 'float 4s ease-in-out infinite',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
  },

  // 대시보드 카드 크기 축소
  dashboardCard: {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(15px)',
    borderRadius: '20px', // 24px → 20px
    padding: '20px', // 24px → 20px
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    minHeight: '250px', // 300px → 250px
    border: '1px solid rgba(255, 255, 255, 0.3)'
  },

  // 탭 네비게이션 크기 축소
  tabNavigation: {
    display: 'flex',
    background: 'rgba(248, 250, 252, 0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px', // 16px → 12px
    padding: '3px', // 4px → 3px
    marginBottom: '16px', // 20px → 16px
    gap: '3px', // 4px → 3px
    border: '1px solid rgba(255, 255, 255, 0.3)'
  },

  tabButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px', // 8px → 6px
    padding: '10px 12px', // 12px 16px → 10px 12px
    borderRadius: '8px', // 12px → 8px
    border: 'none',
    background: 'transparent',
    color: '#64748b',
    fontSize: '13px', // 14px → 13px
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s',
    whiteSpace: 'nowrap'
  },

  tabButtonActive: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    color: '#1e293b',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.4)'
  },

  // 탭 컨텐츠 크기 축소
  tabContent: {
    minHeight: '180px', // 200px → 180px
    padding: '12px' // 16px → 12px
  },

  dashboardHeader: {
    marginBottom: '20px', // 24px → 20px
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.0)',
    backdropFilter: 'blur(15px)',
    borderRadius: '12px', // 16px → 12px
    padding: '10px', // 12px → 10px
    color: '#1e293b',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },

  dashboardTitle: {
    fontSize: '20px', // 24px → 20px
    fontWeight: 'bold',
    marginBottom: '6px' // 8px → 6px
  },

  dateInfo: {
    fontSize: '12px', // 14px → 12px
    color: '#1a1a1a'
  },

  // 메트릭 그리드 크기 축소
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px' // 16px → 12px
  },

  metricCard: {
    background: 'rgba(255, 255, 255, 0.0)',
    backdropFilter: 'blur(15px)',
    borderRadius: '12px', // 16px → 12px
    padding: '16px', // 20px → 16px
    color: '#f0f0f0',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },

  metricHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px' // 16px → 12px
  },

  metricTitle: {
    fontSize: '14px', // 16px → 14px
    fontWeight: '600',
    flex: 1,
    marginLeft: '6px', // 8px → 6px
    color: '#1a1a1a',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
  },

  fireIcon: {
    fontSize: '11px', // 12px → 11px
    background: 'rgba(255, 255, 255, 0.0)',
    backdropFilter: 'blur(5px)',
    padding: '3px 6px', // 4px 8px → 3px 6px
    borderRadius: '10px', // 12px → 10px
    border: '1px solid rgba(16, 185, 129, 0.3)'
  },

  progressBadge: {
    fontSize: '11px', // 12px → 11px
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(5px)',
    padding: '3px 6px', // 4px 8px → 3px 6px
    borderRadius: '10px', // 12px → 10px
    border: '1px solid rgba(16, 185, 129, 0.3)'
  },

  statBox: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px', // 12px → 10px
    padding: '10px', // 12px → 10px
    textAlign: 'center',
    margin: '6px 0', // 8px → 6px
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },

  metricIcon: {
    marginBottom: '6px', // 8px → 6px
    display: 'flex',
    justifyContent: 'center'
  },

  statNumber: {
    fontSize: '20px', // 24px → 20px
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '3px', // 4px → 3px
    transition: 'color 0.3s ease'
  },

  statLabel: {
    fontSize: '10px', // 12px → 10px
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: '600'
  },

  metricFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '11px', // 12px → 11px
    opacity: 0.9,
    marginTop: '12px' // 16px → 12px
  },

  commitBadges: {
    display: 'flex',
    gap: '3px' // 4px → 3px
  },

  commitBadge: {
    background: 'rgba(255, 255, 255, 0.0)',
    backdropFilter: 'blur(5px)',
    color: '#1a1a1a',
    padding: '2px 5px', // 2px 6px → 2px 5px
    borderRadius: '5px', // 6px → 5px
    fontSize: '9px', // 10px → 9px
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },

  todoProgress: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px' // 16px → 12px
  },

  todoCircle: {
    position: 'relative',
    width: '60px', // 80px → 60px
    height: '60px' // 80px → 60px
  },

  progressSvg: {
    width: '100%',
    height: '100%',
    transform: 'rotate(0deg)'
  },

  todoCount: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: '#f0f0f0'
  },

  todoCompleted: {
    fontSize: '20px', // 24px → 20px
    fontWeight: 'bold'
  },

  todoTotal: {
    fontSize: '14px', // 16px → 14px
    color: '#1a1a1a',
  },

  recentTodos: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px' // 8px → 6px
  },

  recentTodoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px', // 8px → 6px
    fontSize: '11px' // 12px → 11px
  },

  completedTodoText: {
    textDecoration: 'line-through',
    opacity: 0.6,
    color: '#1a1a1a',
  },

  pendingTodoText: {
    opacity: 0.9,
    color: '#1a1a1a',
  },

  streakSection: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px', // 20px → 16px
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(15px)',
    color: '#000000',
    padding: '10px', // 12px → 10px
    borderRadius: '10px', // 12px → 10px
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },

  streakIcon: {
    fontSize: '18px', // 20px → 18px
    marginRight: '4px' // 5px → 4px
  },

  streakText: {
    fontSize: '14px', // 16px → 14px
    fontWeight: 'bold',
    color: '#000000'
  },

  githubStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px', // 16px → 12px
    marginBottom: '16px', // 20px → 16px
    padding: '12px', // 16px → 12px
    background: 'rgba(255, 255, 255, 0.0)',
    backdropFilter: 'blur(15px)',
    borderRadius: '12px', // 16px → 12px
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },

  statItem: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px', // 12px → 10px
    padding: '10px', // 12px → 10px
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },

  weeklyActivitySection: {
    marginTop: '16px', // 20px → 16px
    background: 'rgba(255, 255, 255, 0.0)',
    backdropFilter: 'blur(15px)',
    padding: '12px', // 16px → 12px
    borderRadius: '10px', // 12px → 10px
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },

  weeklyActivityTitle: {
    fontSize: '14px', // 16px → 14px
    color: '#000000',
    marginBottom: '8px' // 10px → 8px
  },

  weeklyActivityGraph: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  barContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  bar: {
    width: '8px', // 10px → 8px
    borderRadius: '4px', // 5px → 4px
    transition: 'height 0.3s ease'
  },

  barLabel: {
    fontSize: '10px', // 12px → 10px
    color: '#d1d5db',
    marginTop: '4px' // 5px → 4px
  },

  recentActivity: {
    marginTop: '16px', // 20px → 16px
    background: 'rgba(255, 255, 255, 0.0)',
    backdropFilter: 'blur(15px)',
    padding: '12px', // 16px → 12px
    borderRadius: '10px', // 12px → 10px
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },

  activityTitle: {
    fontSize: '13px', // 14px → 13px
    fontWeight: '600',
    color: '#000000',
    marginBottom: '10px' // 12px → 10px
  },

  commitList: {
    display: 'flex',
    flexDirection: 'column',
    color: '#000000',
    gap: '6px' // 8px → 6px
  },

  commitItem: {
    fontSize: '12px', // 13px → 12px
    padding: '6px 10px', // 8px 12px → 6px 10px
    background: 'rgba(255, 255, 255, 0.0)',
    color: '#000000',
    backdropFilter: 'blur(5px)',
    borderRadius: '6px', // 8px → 6px
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'transform 0.3s ease'
  },

  progressSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px', // 20px → 16px
    marginBottom: '16px', // 20px → 16px
    background: 'rgba(255, 255, 255, 0.0)',
    backdropFilter: 'blur(15px)',
    padding: '12px', // 16px → 12px
    borderRadius: '10px', // 12px → 10px
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },

  progressCircle: {
    width: '60px', // 80px → 60px
    height: '60px', // 80px → 60px
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#f0f0f0',
    fontWeight: 'bold',
    fontSize: '16px' // 20px → 16px
  },

  progressText: {
    fontSize: '16px', // 20px → 16px
    fontWeight: 'bold'
  },

  progressInfo: {
    flex: 1
  },

  completedTasks: {
    fontSize: '14px', // 16px → 14px
    color: '#f0f0f0',
    fontWeight: '500',
    marginBottom: '6px' // 8px → 6px
  },

  progressBar: {
    height: '6px', // 8px → 6px
    background: 'rgba(255, 255, 255, 0.0)',
    borderRadius: '3px', // 4px → 3px
    overflow: 'hidden'
  },

  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
    borderRadius: '3px', // 4px → 3px
    transition: 'width 0.5s ease-out'
  },

  addTodoSection: {
    display: 'flex',
    gap: '6px', // 8px → 6px
    marginBottom: '16px' // 20px → 16px
  },

  todoInput: {
    flex: 1,
    padding: '10px 12px', // 12px 16px → 10px 12px
    border: '2px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px', // 12px → 10px
    fontSize: '13px', // 14px → 13px
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(5px)',
    color: '#f0f0f0',
    transition: 'border-color 0.3s'
  },

  addTodoButton: {
    width: '38px', // 44px → 38px
    height: '38px', // 44px → 38px
    background: 'rgba(255, 255, 255, 0.0)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '10px', // 12px → 10px
    color: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s'
  },

  todoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px' // 8px → 6px
  },

  todoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px', // 12px → 10px
    padding: '10px', // 12px → 10px
    background: 'rgba(255, 255, 255, 0.0)',
    backdropFilter: 'blur(5px)',
    borderRadius: '6px', // 8px → 6px
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s'
  },

  todoCheckbox: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '2px'
  },

  completedTodo: {
    textDecoration: 'line-through',
    color: '#d1d5db',
    flex: 1
  },

  pendingTodo: {
    color: '#f0f0f0',
    flex: 1
  },

  deleteTodoButton: {
    background: 'none',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    padding: '3px', // 4px → 3px
    borderRadius: '3px', // 4px → 3px
    transition: 'all 0.3s'
  },

  // 오른쪽 사이드바 크기 조정
  rightSidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px' // 20px → 16px
  },

  fishListCard: {
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(15px)',
    borderRadius: '20px', // 24px → 20px
    padding: '20px', // 24px → 20px
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  },

  fishListTitle: {
    fontSize: '16px', // 18px → 16px
    fontWeight: 'bold',
    marginBottom: '16px', // 20px → 16px
    display: 'flex',
    alignItems: 'center',
    gap: '6px', // 8px → 6px
    color: '#1a1a1a'
  },

  fishList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px' // 12px → 10px
  },

  fishListItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px', // 14px → 10px
    padding: '10px', // 14px → 10px
    background: 'rgba(240, 249, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px', // 16px → 12px
    transition: 'all 0.3s',
    cursor: 'pointer',
    border: '1px solid rgba(59, 130, 246, 0.2)'
  },

  fishItemIcon: {
    width: '36px', // 44px → 36px
    height: '36px', // 44px → 36px
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
  },

  fishItemInfo: {
    flex: 1
  },

  fishItemName: {
    fontWeight: '600',
    fontSize: '13px', // 15px → 13px
    color: '#1a1a1a',
    marginBottom: '2px'
  },

  fishItemLevel: {
    fontSize: '11px', // 13px → 11px
    color: '#6b7280'
  },

  // 로딩 화면 스타일
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '16px' // 18px → 16px
  },

  // 보상 정보 스타일
  rewardInfo: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(5px)',
    padding: '6px 10px', // 8px 12px → 6px 10px
    borderRadius: '6px', // 8px → 6px
    fontSize: '11px', // 12px → 11px
    marginTop: '10px', // 12px → 10px
    color: '#1a1a1a',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center'
  },

  // 레벨 정보 스타일
  levelInfo: {
    fontSize: '11px', // 12px → 11px
    color: '#d1d5db',
    marginTop: '12px', // 16px → 12px
    textAlign: 'center'
  },

  // 보상 섹션 스타일
  rewardSection: {
    marginBottom: '16px', // 20px → 16px
    padding: '10px', // 12px → 10px
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(15px)',
    borderRadius: '10px', // 12px → 10px
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    color: '#000000',
    fontSize: '13px', // 14px → 13px
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },

  // 빈 상태 메시지 스타일
  emptyMessage: {
    textAlign: 'center',
    padding: '16px', // 20px → 16px
    color: '#9CA3AF',
    fontSize: '13px' // 14px → 13px
  },

  // 어항 빈 상태 메시지
  aquariumEmptyMessage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '14px', // 16px → 14px
    zIndex: 20
  },

  aquariumEmptyIcon: {
    fontSize: '36px', // 48px → 36px
    marginBottom: '8px' // 10px → 8px
  },

  // 장식품 컨테이너 스타일
  decorationContainer: {
    position: 'absolute',
    zIndex: 5
  },

  decorationWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.3))'
  },

  decorationImage: {
    width: '24px', // 28px → 24px
    height: '24px' // 28px → 24px
  },

  decorationName: {
    fontSize: '9px', // 10px → 9px
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: '2px',
    textShadow: '0 0 4px rgba(0,0,0,0.8)'
  }
};

// CSS 애니메이션 및 미디어 쿼리 추가 (크기 조정된 버전)
const styleSheet = document.createElement("style");
styleSheet.textContent = `
/* 컴팩트한 애니메이션 */
@keyframes swim {
  0%, 100% { transform: translateX(0) translateY(0) scaleX(1); }
  25% { transform: translateX(80px) translateY(-20px) scaleX(-1); }
  50% { transform: translateX(140px) translateY(20px) scaleX(1); }
  75% { transform: translateX(60px) translateY(-10px) scaleX(-1); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); opacity: 0.7; }
  50% { transform: translateY(-30px); opacity: 1; }
}

@keyframes sway {
  0%, 100% { transform: rotate(-2deg); }
  50% { transform: rotate(2deg); }
}

@keyframes waterWave {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.1; }
}

/* 호버 효과 */
.fishListItem:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.15);
  background: rgba(240, 249, 255, 0.6) !important;
}

.fish:hover .fishIcon {
  transform: scale(1.1);
}

.tabButton:hover:not(.tabButtonActive) {
  background: rgba(255, 255, 255, 0.5) !important;
  backdropFilter: blur(8px) !important;
  color: #374151;
}

.todoInput:focus {
  border-color: #3b82f6;
  background: rgba(255, 255, 255, 0.15) !important;
}

.addTodoButton:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  background: rgba(59, 130, 246, 0.9) !important;
}

.todoItem:hover {
  background: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(203, 213, 225, 0.4);
}

.deleteTodoButton:hover {
  background: rgba(254, 226, 226, 0.8);
  color: #dc2626;
}

.todoCheckbox:hover {
  background: rgba(243, 244, 246, 0.6);
  border-radius: 4px;
}

.metricCard:hover {
  transform: translateY(-2px);
  background: rgba(75, 85, 99, 0.9) !important;
}

.statBox:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.15) !important;
}

.commitItem:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.15) !important;
}

/* 반응형 디자인 (컴팩트 버전) */
@media (max-width: 1200px) {
  .mainGrid {
    grid-template-columns: 220px 1fr 220px !important;
    gap: 12px !important;
  }
  
  .aquariumContainer {
    height: 340px !important;
  }
  
  .fishIcon {
    width: 42px !important;
    height: 42px !important;
  }
}

@media (max-width: 992px) {
  .mainGrid {
    grid-template-columns: 1fr !important;
    grid-template-rows: auto auto auto !important;
    gap: 12px !important;
  }
  
  .aquariumContainer {
    height: 320px !important;
  }
  
  .metricsGrid {
    grid-template-columns: 1fr !important;
  }
  
  .githubStats {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 12px !important;
    gap: 12px !important;
  }
  
  .profileCard, .mainCard, .dashboardCard, .fishListCard {
    padding: 16px !important;
    border-radius: 16px !important;
  }
  
  .aquariumContainer {
    height: 280px !important;
    border-radius: 20px !important;
  }
  
  .fishIcon {
    width: 36px !important;
    height: 36px !important;
  }
  
  .githubStats {
    grid-template-columns: 1fr !important;
  }
  
  .todoProgress {
    flex-direction: column !important;
    align-items: center !important;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 8px !important;
    gap: 8px !important;
  }
  
  .profileCard, .mainCard, .dashboardCard, .fishListCard {
    padding: 12px !important;
    border-radius: 12px !important;
  }
  
  .aquariumContainer {
    height: 240px !important;
    border-radius: 16px !important;
  }
  
  .fishIcon {
    width: 32px !important;
    height: 32px !important;
  }
  
  .tabButton {
    padding: 8px 10px !important;
    font-size: 11px !important;
  }
  
  .todoCircle {
    width: 50px !important;
    height: 50px !important;
  }
  
  .progressCircle {
    width: 50px !important;
    height: 50px !important;
    font-size: 14px !important;
  }
}

/* 작은 화면에서 물고기 애니메이션 조정 */
@media (max-width: 768px) {
  @keyframes swim {
    0%, 100% { transform: translateX(0) translateY(0) scaleX(1); }
    25% { transform: translateX(50px) translateY(-15px) scaleX(-1); }
    50% { transform: translateX(80px) translateY(15px) scaleX(1); }
    75% { transform: translateX(30px) translateY(-8px) scaleX(-1); }
  }
}

@media (max-width: 480px) {
  @keyframes swim {
    0%, 100% { transform: translateX(0) translateY(0) scaleX(1); }
    25% { transform: translateX(25px) translateY(-10px) scaleX(-1); }
    50% { transform: translateX(50px) translateY(10px) scaleX(1); }
    75% { transform: translateX(20px) translateY(-5px) scaleX(-1); }
  }
}

/* 스크롤바 스타일링 */
.weeklyActivityGraph::-webkit-scrollbar {
  height: 3px;
}

.weeklyActivityGraph::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.weeklyActivityGraph::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.weeklyActivityGraph::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
`;

document.head.appendChild(styleSheet);