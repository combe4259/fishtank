export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '20px',
    minHeight: 'calc(100vh - 110px)'
  },
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

  // 프로필 카드
  profileCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '24px',
    padding: '24px',
    textAlign: 'center',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
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
    borderTop: '1px solid #e5e7eb'
  },
  statItem: {
    textAlign: 'center'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: '4px'
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
    height: '400px', // 높이를 줄여서 대시보드 공간 확보
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
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '16px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#1a1a1a',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
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
    background: 'rgba(255, 255, 255, 0.7)',
    animation: 'float 4s ease-in-out infinite',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
  },

  // 대시보드 카드 (새로 추가)
  dashboardCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '24px',
    padding: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    minHeight: '300px'
  },

  // 탭 네비게이션
  tabNavigation: {
    display: 'flex',
    background: '#f8fafc',
    borderRadius: '16px',
    padding: '4px',
    marginBottom: '20px',
    gap: '4px'
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
    background: 'white',
    color: '#1e293b',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  },

  // 탭 컨텐츠
  tabContent: {
    minHeight: '200px'
  },

  // 대시보드 전체 스타일
  dashboardHeader: {
    marginBottom: '24px',
    textAlign: 'center'
  },
  dashboardTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '8px'
  },
  dateInfo: {
    fontSize: '14px',
    color: '#6b7280'
  },
  metricsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  metricCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '20px',
    padding: '20px',
    color: 'white',
    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
  },
  metricHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px'
  },
  metricTitle: {
    fontSize: '16px',
    fontWeight: '600',
    flex: 1,
    marginLeft: '8px'
  },
  fireIcon: {
    fontSize: '12px',
    background: 'rgba(255, 255, 255, 0.2)',
    padding: '4px 8px',
    borderRadius: '12px'
  },
  progressBadge: {
    fontSize: '12px',
    background: 'rgba(16, 185, 129, 0.8)',
    padding: '4px 8px',
    borderRadius: '12px'
  },
  metricStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '16px'
  },
  metricStat: {
    textAlign: 'center'
  },
  metricNumber: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  metricLabel: {
    fontSize: '11px',
    opacity: 0.8
  },
  metricFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '12px',
    opacity: 0.9
  },
  commitBadges: {
    display: 'flex',
    gap: '4px'
  },
  commitBadge: {
    background: 'rgba(255, 255, 255, 0.2)',
    padding: '2px 6px',
    borderRadius: '6px',
    fontSize: '10px'
  },

  // 투두 진행률 스타일
  todoProgress: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  todoCircle: {
    position: 'relative',
    width: '80px',
    height: '80px'
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
    textAlign: 'center'
  },
  todoCompleted: {
    fontSize: '24px',
    fontWeight: 'bold'
  },
  todoTotal: {
    fontSize: '16px',
    opacity: 0.7
  },
  recentTodos: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  recentTodoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px'
  },
  completedTodoText: {
    textDecoration: 'line-through',
    opacity: 0.6
  },
  pendingTodoText: {
    opacity: 0.9
  },

  // 사용량 스타일
  usageMainStat: {
    textAlign: 'center'
  },
  usageTime: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '4px'
  },

  usageApps: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  usageApp: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px'
  },
  appDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%'
  },

  // GitHub 탭 스타일
  githubStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '20px'
  },
  statBox: {
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center',
    border: '1px solid rgba(59, 130, 246, 0.1)'
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '12px',
    color: '#64748b'
  },
  recentActivity: {
    background: '#f8fafc',
    borderRadius: '12px',
    padding: '16px'
  },
  activityTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '12px'
  },
  commitList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  commitItem: {
    fontSize: '13px',
    color: '#6b7280',
    padding: '8px 12px',
    background: 'white',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },

  // 투두리스트 탭 스타일
  progressSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '20px'
  },
  progressCircle: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20px'
  },
  progressText: {
    fontSize: '20px',
    fontWeight: 'bold'
  },
  progressInfo: {
    flex: 1
  },
  completedTasks: {
    fontSize: '16px',
    color: '#374151',
    fontWeight: '500',
    marginBottom: '8px'
  },
  progressBar: {
    height: '8px',
    background: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
    borderRadius: '4px',
    transition: 'width 0.5s ease-out'
  },
  addTodoSection: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px'
  },
  todoInput: {
    flex: 1,
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s'
  },
  addTodoButton: {
    width: '44px',
    height: '44px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s'
  },
  todoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  todoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    background: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
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
    color: '#9ca3af',
    flex: 1
  },
  pendingTodo: {
    color: '#374151',
    flex: 1
  },
  deleteTodoButton: {
    background: 'none',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    transition: 'all 0.3s'
  },

  // 컴퓨터 사용량 탭 스타일
  usageOverview: {
    marginBottom: '20px'
  },
  usageStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px'
  },
  usageStatItem: {
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center',
    border: '1px solid rgba(59, 130, 246, 0.1)'
  },
  usageLabel: {
    fontSize: '12px',
    color: '#64748b',
    marginBottom: '8px'
  },
  usageValue: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1e40af'
  },
  appUsageSection: {
    background: '#f8fafc',
    borderRadius: '12px',
    padding: '16px'
  },
  appUsageTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '12px'
  },
  appUsageList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  appUsageItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    background: 'white',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },
  appInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  appIcon: {
    width: '16px',
    height: '16px',
    borderRadius: '4px'
  },
  appName: {
    fontSize: '13px',
    color: '#374151',
    fontWeight: '500'
  },
  appTime: {
    fontSize: '13px',
    color: '#6b7280'
  },

  // 오른쪽 사이드바
  rightSidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  fishListCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '24px',
    padding: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
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
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    borderRadius: '16px',
    transition: 'all 0.3s',
    cursor: 'pointer',
    border: '1px solid rgba(59, 130, 246, 0.1)'
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

  // 수족관 상태
  aquariumStatus: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '24px',
    padding: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
  },
  statusTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#1a1a1a'
  },
  statusList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  statusItem: {
    marginBottom: '4px'
  },
  statusLabel: {
    fontSize: '13px',
    color: '#6b7280',
    marginBottom: '6px',
    fontWeight: '500'
  },
  statusBar: {
    height: '10px',
    background: '#e5e7eb',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '4px'
  },
  statusFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
    borderRadius: '10px',
    transition: 'width 0.5s ease-out'
  },
  statusValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'right'
  }
};

// CSS 애니메이션 추가
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes swim {
    0%, 100% { transform: translateX(0) translateY(0); }
    25% { transform: translateX(100px) translateY(-20px); }
    50% { transform: translateX(150px) translateY(20px); }
    75% { transform: translateX(50px) translateY(-10px); }
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
  
  /* 호버 효과 */
  .fishListItem:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.15);
  }
  
  .fish:hover .fishIcon {
    transform: scale(1.1);
  }
  
  /* 탭 버튼 호버 효과 */
  .tabButton:hover:not(.tabButtonActive) {
    background: rgba(255, 255, 255, 0.7);
    color: #374151;
  }
  
  /* 투두 관련 호버 효과 */
  .todoInput:focus {
    border-color: #3b82f6;
  }
  
  .addTodoButton:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
  
  .todoItem:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }
  
  .deleteTodoButton:hover {
    background: #fee2e2;
    color: #dc2626;
  }
  
  .todoCheckbox:hover {
    background: #f3f4f6;
    border-radius: 4px;
  }
`;
document.head.appendChild(styleSheet);