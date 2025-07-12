export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '20px',
    minHeight: 'calc(100vh - 110px)'
  },

  // 프로필 헤더
  profileHeader: {
    marginBottom: '24px'
  },
  mainProfileCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(249, 250, 251, 0.98) 100%)',
    borderRadius: '28px',
    padding: '32px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
  },
  profileTop: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    gap: '32px',
    alignItems: 'center',
    marginBottom: '32px'
  },
  profileAvatar: {
    width: '120px',
    height: '120px',
    background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxShadow: '0 12px 32px rgba(139, 92, 246, 0.3)'
  },
  avatarEmoji: {
    fontSize: '56px'
  },
  levelBadge: {
    position: 'absolute',
    bottom: '-5px',
    right: '-5px',
    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)'
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  userName: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    margin: 0
  },
  userTitle: {
    fontSize: '18px',
    color: '#6b7280',
    margin: 0
  },
  joinInfo: {
    fontSize: '14px',
    color: '#9ca3af',
    margin: 0
  },
  profileActions: {
    display: 'flex',
    gap: '12px'
  },
  editButton: {
    padding: '12px 24px',
    background: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '16px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  shareButton: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
  },

  // 경험치 섹션
  experienceSection: {
    background: '#f9fafb',
    borderRadius: '20px',
    padding: '24px'
  },
  experienceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  experienceLabel: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#374151'
  },
  experienceText: {
    fontSize: '14px',
    color: '#6b7280'
  },
  experienceBar: {
    height: '20px',
    background: '#e5e7eb',
    borderRadius: '10px',
    overflow: 'hidden',
    position: 'relative'
  },
  experienceFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%)',
    borderRadius: '10px',
    transition: 'width 0.5s ease-out',
    position: 'relative',
    overflow: 'hidden'
  },
  experienceGlow: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100px',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
    animation: 'shimmer 2s infinite'
  },
  nextLevelText: {
    fontSize: '13px',
    color: '#9ca3af',
    marginTop: '8px',
    textAlign: 'center'
  },

  // 통계 그리드
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px'
  },
  statCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    transition: 'all 0.3s',
    border: '1px solid #e5e7eb'
  },
  statIcon: {
    width: '56px',
    height: '56px',
    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  statTitle: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500'
  },
  statValue: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    margin: 0
  },
  statSubtext: {
    fontSize: '13px',
    color: '#9ca3af'
  },

  // 업적 섹션
  achievementsSection: {
    background: 'white',
    borderRadius: '28px',
    padding: '32px'
  },
  achievementsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
    paddingBottom: '20px',
    borderBottom: '1px solid #e5e7eb'
  },
  achievementsTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  achievementCount: {
    fontSize: '16px',
    color: '#6b7280',
    fontWeight: '500'
  },
  achievementsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '16px'
  },
  achievementCard: {
    padding: '20px',
    borderRadius: '16px',
    textAlign: 'center',
    transition: 'all 0.3s',
    cursor: 'pointer',
    position: 'relative',
    border: '1px solid rgba(0, 0, 0, 0.05)'
  },
  achievementIcon: {
    fontSize: '48px',
    marginBottom: '12px'
  },
  achievementName: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '4px'
  },
  achievementDate: {
    fontSize: '12px',
    color: '#6b7280'
  },
  rarityBadge: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11px',
    fontWeight: '500',
    textTransform: 'capitalize',
    opacity: 0.8
  }
};

// 애니메이션 및 호버 효과
const animationStyles = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
  }
  
  .statCard:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
  
  .achievementCard:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
  
  .editButton:hover {
    background: #f3f4f6;
    border-color: #d1d5db;
  }
  
  .shareButton:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);