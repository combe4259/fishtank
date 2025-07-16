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
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(249, 250, 251, 0.92) 100%)', // Reduced opacity
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
    background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)', // Slightly transparent
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
    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.8) 100%)', // Slightly transparent
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
    background: 'rgba(255, 255, 255, 0.5)', // Slightly transparent
    border: '2px solid #e5e7eb',
    borderRadius: '16px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  shareButton: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(37, 99, 235, 0.6) 100%)', // Slightly transparent
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
    background: 'rgba(249, 250, 251, 0.3)', // Slightly transparent
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
    background: 'rgba(229, 231, 235, 0.5)', // Slightly transparent
    borderRadius: '10px',
    overflow: 'hidden',
    position: 'relative'
  },
  experienceFill: {
    height: '100%',
    background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.5) 0%, rgba(167, 139, 250, 0.9) 100%)', // Slightly transparent
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
    background: 'rgba(255, 255, 255, 0.35)', // Slightly transparent
    borderRadius: '20px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    transition: 'all 0.3s',
    border: '1px solid rgba(229, 231, 235, 0.9)' // Slightly transparent border
  },
  statIcon: {
    width: '56px',
    height: '56px',
    background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.9) 0%, rgba(253, 230, 138, 0.9) 100%)', // Slightly transparent
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
    background: 'rgba(255, 255, 255, 0.2)', // Slightly transparent
    borderRadius: '28px',
    padding: '32px'
  },
  achievementsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
    paddingBottom: '20px',
    borderBottom: '1px solid rgba(229, 231, 235, 0.3)' // Slightly transparent
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

const rarityColors = {
  common: { bg: 'rgba(229, 231, 235, 0.4)', color: '#6b7280' }, // Slightly transparent
  rare: { bg: 'rgba(219, 234, 254, 0.4)', color: '#1e40af' },
  epic: { bg: 'rgba(233, 213, 255, 0.4)', color: '#6b21a8' },
  legendary: { bg: 'rgba(254, 243, 199, 0.4)', color: '#92400e' }
};