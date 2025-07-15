export const styles = {
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr 300px',
    gap: '24px',
    height: '100%',
    minHeight: '600px'
  },

  // 왼쪽 사이드바
  leftSidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },

  // 프로필 카드 - 투명도 적용
  profileCard: {
    background: 'rgba(255, 255, 255, 0.2)', // 투명도 적용
    backdropFilter: 'blur(15px)', // 블러 효과 추가
    borderRadius: '24px',
    padding: '24px',
    textAlign: 'center',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.3)' // 미묘한 테두리
  },
  profileAvatar: {
    width: '90px',
    height: '90px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50%',
    margin: '0 auto 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
  },
  avatarEmoji: {
    fontSize: '48px'
  },
  profileName: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '4px',
    color: '#1a1a1a'
  },
  profileLevel: {
    color: '#6b7280',
    fontSize: '14px',
    marginBottom: '20px'
  },
  profileStats: {
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: '20px',
    borderTop: '1px solid rgba(229, 231, 235, 0.6)' // 테두리도 투명하게
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: '4px'
  },

  // 메인 카드들 - 투명도 적용
  mainCard: {
    background: 'rgba(255, 255, 255, 0.2)', // 투명도 적용
    backdropFilter: 'blur(15px)', // 블러 효과 추가
    borderRadius: '24px',
    padding: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.3)' // 미묘한 테두리
  },

  // 메인 아쿠아리움
  aquariumWrapper: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  aquariumContainer: {
    height: '500px',
    background: 'linear-gradient(180deg, #7dd3fc 0%, #0ea5e9 50%, #0284c7 100%)',
    borderRadius: '32px',
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
    width: '64px',
    height: '64px',
    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(251, 191, 36, 0.4)',
    transition: 'transform 0.3s'
  },
  fishName: {
    marginTop: '8px',
    padding: '6px 14px',
    background: 'rgba(255, 255, 255, 0.05)', // 약간 투명하게
    backdropFilter: 'blur(5px)', // 블러 효과
    borderRadius: '16px',
    fontSize: '13px',
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
    width: '40px',
    height: '120px',
    animation: 'sway 6s ease-in-out infinite'
  },
  bubbles: {
    position: 'absolute',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '12px'
  },
  bubble: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.2)',
    animation: 'float 4s ease-in-out infinite',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
  },

  // 대시보드 카드 - 투명도 적용
  dashboardCard: {
    background: 'rgba(255, 255, 255, 0.2)', // 투명도 적용
    backdropFilter: 'blur(15px)', // 블러 효과 추가
    borderRadius: '24px',
    padding: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    minHeight: '300px',
    border: '1px solid rgba(255, 255, 255, 0.3)' // 미묘한 테두리
  },

  // 탭 네비게이션 - 투명도 적용
  tabNavigation: {
    display: 'flex',
    background: 'rgba(248, 250, 252, 0.2)', // 투명도 적용
    backdropFilter: 'blur(10px)', // 블러 효과
    borderRadius: '16px',
    padding: '4px',
    marginBottom: '20px',
    gap: '4px',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  },
  tabButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 16px',
    borderRadius: '12px',
    border: 'none',
    background: 'transparent',
    color: '#64748b',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s',
    whiteSpace: 'nowrap'
  },
  tabButtonActive: {
    background: 'rgba(255, 255, 255, 0.15)', // 활성 상태도 투명하게
    backdropFilter: 'blur(10px)',
    color: '#1e293b',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.4)'
  },

  // 탭 컨텐츠
  tabContent: {
    minHeight: '200px',
    padding: '16px',
  },
  dashboardHeader: {
    marginBottom: '24px',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.0)', // 더 투명하게 변경
    backdropFilter: 'blur(15px)',
    borderRadius: '16px',
    padding: '12px',
    color: '#1e293b',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  dashboardTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  dateInfo: {
    fontSize: '14px',
    color: '#d1d5db',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  metricCard: {
    background: 'rgba(255, 255, 255, 0.0)', // 더 투명하게 변경
    backdropFilter: 'blur(15px)',
    borderRadius: '16px',
    padding: '20px',
    color: '#f0f0f0',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  metricHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  metricTitle: {
    fontSize: '16px',
    fontWeight: '600',
    flex: 1,
    marginLeft: '8px',
    color: '#f0f0f0',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
  },
  fireIcon: {
    fontSize: '12px',
    background: 'rgba(255, 255, 255, 0.0)', // 더 투명하게 변경
    backdropFilter: 'blur(5px)',
    padding: '4px 8px',
    borderRadius: '12px',
    border: '1px solid rgba(16, 185, 129, 0.3)'
  },
  progressBadge: {
    fontSize: '12px',
    background: 'rgba(255, 255, 255, 0.1)', // 더 투명하게 변경
    backdropFilter: 'blur(5px)',
    padding: '4px 8px',
    borderRadius: '12px',
    border: '1px solid rgba(16, 185, 129, 0.3)'
  },
  statBox: {
    background: 'rgba(255, 255, 255, 0.15)', // 더 투명하게 변경
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '12px',
    textAlign: 'center',
    margin: '8px 0',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  metricIcon: {
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#f0f0f0',
    marginBottom: '4px',
    transition: 'color 0.3s ease',
  },
  statLabel: {
    fontSize: '12px',
    color: '#d1d5db',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: '600',
  },
  metricFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '12px',
    opacity: 0.9,
    marginTop: '16px',
  },
  commitBadges: {
    display: 'flex',
    gap: '4px',
  },
  commitBadge: {
    background: 'rgba(255, 255, 255, 0.0)', // 더 투명하게 변경
    backdropFilter: 'blur(5px)',
    color: '#ffffff',
    padding: '2px 6px',
    borderRadius: '6px',
    fontSize: '10px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  todoProgress: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  todoCircle: {
    position: 'relative',
    width: '80px',
    height: '80px',
  },
  progressSvg: {
    width: '100%',
    height: '100%',
    transform: 'rotate(0deg)',
  },
  todoCount: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: '#f0f0f0',
  },
  todoCompleted: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  todoTotal: {
    fontSize: '16px',
    color: '#e0e0e0',
  },
  recentTodos: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  recentTodoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
  },
  completedTodoText: {
    textDecoration: 'line-through',
    opacity: 0.6,
    color: '#d1d5db',
  },
  pendingTodoText: {
    opacity: 0.9,
    color: '#f0f0f0',
  },
  streakSection: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    background: 'rgba(75, 85, 99, 0,2)', // 더 투명하게 변경 (0.8 → 0.4)
    backdropFilter: 'blur(15px)',
    padding: '12px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  streakIcon: {
    fontSize: '20px',
    marginRight: '5px',
  },
  streakText: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#f0f0f0',
  },
  // githubStats: {
  //   display: 'grid',
  //   gridTemplateColumns: 'repeat(4, 1fr)',
  //   gap: '16px',
  //   marginBottom: '20px',
  //   padding: '16px',
  //   background: 'rgba(255, 255, 255, 0.0)', // 더 투명하게 변경
  //   backdropFilter: 'blur(15px)',
  //   borderRadius: '16px',
  //   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  //   border: '1px solid rgba(255, 255, 255, 0.2)'
  // },
  statItem: {
    background: 'rgba(255, 255, 255, 0.15)', // 더 투명하게 변경
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '12px',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  weeklyActivitySection: {
    marginTop: '20px',
    background: 'rgba(255, 255, 255, 0.0)', // 더 투명하게 변경
    backdropFilter: 'blur(15px)',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  weeklyActivityTitle: {
    fontSize: '16px',
    color: '#f0f0f0',
    marginBottom: '10px',
  },
  weeklyActivityGraph: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  barContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bar: {
    width: '10px',
    borderRadius: '5px',
    transition: 'height 0.3s ease',
  },
  barLabel: {
    fontSize: '12px',
    color: '#d1d5db',
    marginTop: '5px',
  },
  recentActivity: {
    marginTop: '20px',
    background: 'rgba(255, 255, 255, 0.0)', // 더 투명하게 변경
    backdropFilter: 'blur(15px)',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  activityTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#f0f0f0',
    marginBottom: '12px',
  },
  commitList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  commitItem: {
    fontSize: '13px',
    color: '#d1d5db',
    padding: '8px 12px',
    background: 'rgba(255, 255, 255, 0.0)', // 더 투명하게 변경
    backdropFilter: 'blur(5px)', // 블러 효과 추가
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'transform 0.3s ease',
  },
  progressSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '20px',
    background: 'rgba(255, 255, 255, 0.0)', // 더 투명하게 변경
    backdropFilter: 'blur(15px)',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  progressCircle: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#f0f0f0',
    fontWeight: 'bold',
    fontSize: '20px',
  },
  progressText: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  progressInfo: {
    flex: 1,
  },
  completedTasks: {
    fontSize: '16px',
    color: '#f0f0f0',
    fontWeight: '500',
    marginBottom: '8px',
  },
  progressBar: {
    height: '8px',
    background: 'rgba(255, 255, 255, 0.0)', // 더 투명하게 변경
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
    borderRadius: '4px',
    transition: 'width 0.5s ease-out',
  },
  addTodoSection: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
  },
  todoInput: {
    flex: 1,
    padding: '12px 16px',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    fontSize: '14px',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.1)', // 더 투명하게 변경
    backdropFilter: 'blur(5px)',
    color: '#f0f0f0',
    transition: 'border-color 0.3s',
  },
  addTodoButton: {
    width: '44px',
    height: '44px',
    background: 'rgba(255, 255, 255, 0.0)', // 더 투명하게 변경
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '12px',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s',
  },
  todoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  todoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    background: 'rgba(255, 255, 255, 0.0)', // 더 투명하게 변경
    backdropFilter: 'blur(5px)', // 블러 효과 추가
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s',
  },
  todoCheckbox: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '2px',
  },
  completedTodo: {
    textDecoration: 'line-through',
    color: '#d1d5db',
    flex: 1,
  },
  pendingTodo: {
    color: '#f0f0f0',
    flex: 1,
  },
  deleteTodoButton: {
    background: 'none',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    transition: 'all 0.3s',
  },

  // 오른쪽 사이드바 - 투명도 적용
  rightSidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  fishListCard: {
    background: 'rgba(255, 255, 255, 0.4)', // 투명도 적용
    backdropFilter: 'blur(15px)', // 블러 효과 추가
    borderRadius: '24px',
    padding: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.3)' // 미묘한 테두리
  },
  fishListTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#1a1a1a'
  },
  fishList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  fishListItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px',
    background: 'rgba(240, 249, 255, 0.1)', // 투명도 적용
    backdropFilter: 'blur(10px)', // 블러 효과 추가
    borderRadius: '16px',
    transition: 'all 0.3s',
    cursor: 'pointer',
    border: '1px solid rgba(59, 130, 246, 0.2)' // 테두리도 투명하게
  },
  fishItemIcon: {
    width: '44px',
    height: '44px',
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
    fontSize: '15px',
    color: '#1a1a1a',
    marginBottom: '2px'
  },
  fishItemLevel: {
    fontSize: '13px',
    color: '#6b7280'
  },

  // 기타 스타일들
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '20px',
    minHeight: 'calc(100vh - 110px)'
  },

  // 로딩 화면 스타일
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px'
  },

  // 보상 정보 스타일 - 투명도 적용
  rewardInfo: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(5px)',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    marginTop: '12px',
    color: '#f0f0f0',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center'
  },

  // 레벨 정보 스타일
  levelInfo: {
    fontSize: '12px',
    color: '#d1d5db',
    marginTop: '16px',
    textAlign: 'center'
  },

  // 보상 섹션 스타일 - 투명도 적용
  rewardSection: {
    marginBottom: '20px',
    padding: '12px',
    background: 'rgba(75, 85, 99, 0.4)', // 더 투명하게 변경 (0.8 → 0.4)
    backdropFilter: 'blur(15px)',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    color: '#f0f0f0',
    fontSize: '14px',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },

  // 빈 상태 메시지 스타일
  emptyMessage: {
    textAlign: 'center',
    padding: '20px',
    color: '#9CA3AF',
    fontSize: '14px'
  },

  // 어항 빈 상태 메시지
  aquariumEmptyMessage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '16px',
    zIndex: 20
  },
  aquariumEmptyIcon: {
    fontSize: '48px',
    marginBottom: '10px'
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
    width: '28px',
    height: '28px'
  },
  decorationName: {
    fontSize: '10px',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: '2px',
    textShadow: '0 0 4px rgba(0,0,0,0.8)'
  }
};

// CSS 애니메이션 추가
const styleSheet = document.createElement("style");
styleSheet.textContent = `
@keyframes swim {
  0%, 100% { transform: translateX(0) translateY(0) scaleX(1); }
  25% { transform: translateX(120px) translateY(-30px) scaleX(-1); }
  50% { transform: translateX(200px) translateY(30px) scaleX(1); }
  75% { transform: translateX(80px) translateY(-15px) scaleX(-1); }
}
  
  @keyframes float {
    0%, 100% { transform: translateY(0); opacity: 0.7; }
    50% { transform: translateY(-40px); opacity: 1; }
  }
  
  @keyframes sway {
    0%, 100% { transform: rotate(-2deg); }
    50% { transform: rotate(2deg); }
  }
  
  @keyframes waterWave {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.1; }
  }
  
  /* 호버 효과 - 투명도 스타일에 맞게 조정 */
  .fishListItem:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.15);
    background: rgba(240, 249, 255, 0.6) !important; /* 호버 시 약간 더 불투명하게 */
  }
  
  .fish:hover .fishIcon {
    transform: scale(1.1);
  }
  
  /* 탭 버튼 호버 효과 - 투명도 스타일 적용 */
  .tabButton:hover:not(.tabButtonActive) {
    background: rgba(255, 255, 255, 0.5) !important;
    backdropFilter: blur(8px) !important;
    color: #374151;
  }
  
  /* 투두 관련 호버 효과 - 투명도 스타일 적용 */
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
    borderRadius: 4px;
  }
  
  /* 메트릭 카드 호버 효과 */
  .metricCard:hover {
    transform: translateY(-2px);
    background: rgba(75, 85, 99, 0.9) !important;
  }
  
  /* 스탯 박스 호버 효과 */
  .statBox:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.15) !important;
  }
  
  /* 커밋 아이템 호버 효과 */
  .commitItem:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.15) !important;
  }
`;

document.head.appendChild(styleSheet);