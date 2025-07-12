export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '20px',
    minHeight: 'calc(100vh - 110px)'
  },

  // 헤더 영역
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280'
  },

  // 친구 통계
  friendStats: {
    display: 'flex',
    gap: '16px'
  },
  statCard: {
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    padding: '16px 24px',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    minWidth: '100px'
  },
  statNumber: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1e40af'
  },
  statLabel: {
    fontSize: '14px',
    color: '#64748b'
  },

  // 메인 카드
  mainCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '28px',
    padding: '32px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
  },
  listHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '28px',
    paddingBottom: '20px',
    borderBottom: '1px solid #e5e7eb'
  },
  listTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a1a1a'
  },
  addFriendButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
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

  // 친구 그리드
  friendsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px'
  },
  friendCard: {
    padding: '20px',
    background: 'white',
    borderRadius: '20px',
    transition: 'all 0.3s',
    cursor: 'pointer',
    border: '1px solid #e5e7eb'
  },

  // 친구 카드 내부
  friendHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
    position: 'relative'
  },
  friendAvatar: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  },
  avatarEmoji: {
    fontSize: '28px'
  },
  friendInfo: {
    flex: 1
  },
  friendName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '2px'
  },
  friendLevel: {
    fontSize: '14px',
    color: '#6b7280'
  },
  likeButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 12px',
    background: '#fee2e2',
    borderRadius: '12px',
    fontSize: '14px',
    color: '#991b1b'
  },

  // 어항 미리보기
  aquariumPreview: {
    height: '120px',
    background: 'linear-gradient(180deg, #bfdbfe 0%, #3b82f6 100%)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    position: 'relative',
    overflow: 'hidden'
  },
  miniAquarium: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    zIndex: 1
  },
  fishCount: {
    color: 'white',
    fontSize: '14px',
    fontWeight: '500',
    background: 'rgba(0, 0, 0, 0.2)',
    padding: '4px 12px',
    borderRadius: '12px'
  },
  aquariumTheme: {
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    fontSize: '12px',
    color: 'white',
    background: 'rgba(0, 0, 0, 0.3)',
    padding: '4px 8px',
    borderRadius: '8px',
    textTransform: 'capitalize'
  },

  // 액션 버튼
  actionButtons: {
    display: 'flex',
    gap: '8px'
  },
  visitButton: {
    flex: 1,
    padding: '10px',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
  },
  messageButton: {
    width: '44px',
    height: '44px',
    background: '#f3f4f6',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },

  // 하단 정보 카드
  bottomCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginTop: '20px'
  },
  infoCard: {
    padding: '24px',
    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    borderRadius: '20px',
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  },
  infoIcon: {
    width: '48px',
    height: '48px',
    background: 'white',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  infoTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '4px',
    color: '#92400e'
  },
  infoText: {
    fontSize: '14px',
    color: '#78350f',
    lineHeight: '1.5'
  }
};

// 호버 효과 추가
const hoverStyles = `
  .friendCard:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  }
  
  .visitButton:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
  }
  
  .messageButton:hover {
    background: #e5e7eb;
  }
  
  .addFriendButton:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = hoverStyles;
document.head.appendChild(styleSheet);