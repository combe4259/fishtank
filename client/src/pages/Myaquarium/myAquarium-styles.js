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
  statLabel: {
    fontSize: '12px',
    color: '#6b7280'
  },

  // 메인 아쿠아리움
  aquariumWrapper: {
    position: 'relative',
    height: '100%'
  },
  aquariumContainer: {
    height: '100%',
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
`;
document.head.appendChild(styleSheet);