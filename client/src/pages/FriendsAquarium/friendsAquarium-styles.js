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

  // 친구 통계 - 투명도 적용
  friendStats: {
    display: 'flex',
    gap: '16px'
  },
  statCard: {
    background: 'rgba(239, 246, 255, 0.4)', // 투명도 적용
    backdropFilter: 'blur(15px)', // 블러 효과 추가
    padding: '16px 24px',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    minWidth: '100px',
    border: '1px solid rgba(255, 255, 255, 0.3)' // 미묘한 테두리
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

  // 메인 카드 - 투명도 적용
  mainCard: {
    background: 'rgba(255, 255, 255, 0.3)', // 투명도 적용
    backdropFilter: 'blur(15px)', // 블러 효과 추가
    borderRadius: '28px',
    padding: '32px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.4)' // 미묘한 테두리
  },
  listHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '28px',
    paddingBottom: '20px',
    borderBottom: '1px solid rgba(229, 231, 235, 0.6)' // 테두리도 투명하게
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
    background: 'rgba(59, 130, 246, 0.8)', // 투명도 적용
    backdropFilter: 'blur(10px)',
    color: 'white',
    border: '1px solid rgba(59, 130, 246, 0.3)',
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
    background: 'rgba(255, 255, 255, 0.3)', // 투명도 적용
    backdropFilter: 'blur(10px)', // 블러 효과 추가
    borderRadius: '20px',
    transition: 'all 0.3s',
    cursor: 'pointer',
    border: '1px solid rgba(255, 255, 255, 0.4)' // 테두리도 투명하게
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
    background: 'rgba(254, 226, 226, 0.6)', // 투명도 적용
    backdropFilter: 'blur(5px)',
    borderRadius: '12px',
    fontSize: '14px',
    color: '#991b1b',
    border: '1px solid rgba(254, 226, 226, 0.8)'
  },

  // 어항 미리보기 - 투명도 적용
  aquariumPreview: {
    height: '120px',
    background: 'linear-gradient(180deg, rgba(191, 219, 254, 0.8) 0%, rgba(59, 130, 246, 0.8) 100%)', // 투명도 적용
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.3)'
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
    background: 'rgba(0, 0, 0, 0.3)', // 투명도 적용
    backdropFilter: 'blur(5px)',
    padding: '4px 12px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  aquariumTheme: {
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    fontSize: '12px',
    color: 'white',
    background: 'rgba(0, 0, 0, 0.4)', // 투명도 적용
    backdropFilter: 'blur(5px)',
    padding: '4px 8px',
    borderRadius: '8px',
    textTransform: 'capitalize',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },

  // 액션 버튼 - 투명도 적용
  actionButtons: {
    display: 'flex',
    gap: '8px'
  },
  visitButton: {
    flex: 1,
    padding: '10px',
    background: 'rgba(16, 185, 129, 0.8)', // 투명도 적용
    backdropFilter: 'blur(10px)',
    color: 'white',
    border: '1px solid rgba(16, 185, 129, 0.3)',
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
    background: 'rgba(243, 244, 246, 0.6)', // 투명도 적용
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(229, 231, 235, 0.6)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },

  // 검색창 스타일 - 투명도 적용
  searchInput: {
    width: '100%',
    padding: '8px 12px 8px 32px',
    borderRadius: '12px',
    border: '1px solid rgba(209, 213, 219, 0.6)',
    fontSize: '14px',
    background: 'rgba(255, 255, 255, 0.4)', // 투명도 적용
    backdropFilter: 'blur(5px)',
    transition: 'all 0.3s',
    outline: 'none'
  },

  // 친구 목록 아이템 - 투명도 적용
  friendListItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    padding: '12px',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    borderRadius: '12px',
    transition: 'all 0.3s',
    margin: '2px 0'
  },
  friendListItemActive: {
    background: 'rgba(219, 234, 254, 0.6)', // 활성 상태도 투명하게
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(59, 130, 246, 0.3)'
  },
  friendListItemHover: {
    background: 'rgba(249, 250, 251, 0.6)', // 호버 상태도 투명하게
    backdropFilter: 'blur(5px)'
  },

  // 사용자 검색 결과 - 투명도 적용
  userSearchResult: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    borderRadius: '8px',
    margin: '4px 0',
    background: 'rgba(249, 250, 251, 0.4)', // 투명도 적용
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(229, 231, 235, 0.4)',
    transition: 'all 0.3s'
  },

  // 친구 신청 버튼 - 투명도 적용
  friendRequestButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: '8px',
    background: 'rgba(59, 130, 246, 0.8)', // 투명도 적용
    backdropFilter: 'blur(5px)',
    color: 'white',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    border: '1px solid rgba(59, 130, 246, 0.3)'
  },

  // 프로필 카드 - 투명도 적용
  profileCard: {
    background: 'rgba(255, 255, 255, 0.3)', // 투명도 적용
    backdropFilter: 'blur(15px)',
    borderRadius: '24px',
    padding: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    width: '320px'
  },

  // 쪽지 보내기 영역 - 투명도 적용
  messageArea: {
    position: 'relative',
    width: '100%',
    height: '190px',
    background: 'rgba(255, 255, 255, 0.3)', // 투명도 적용
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    marginBottom: '16px'
  },
  messageTextarea: {
    position: 'absolute',
    width: 'calc(100% - 34px)',
    height: 'calc(100% - 22px)',
    top: '11px',
    left: '17px',
    fontFamily: '"눈누_기초고딕_Regular-Regular", Helvetica, sans-serif',
    fontWeight: 'normal',
    color: '#707070',
    fontSize: '16px',
    textAlign: 'center',
    resize: 'none',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    '::placeholder': {
      color: '#707070'
    }
  },

  // 댓글 영역 - 투명도 적용
  commentsArea: {
    width: '100%',
    height: '265px',
    background: 'rgba(255, 255, 255, 0.3)', // 투명도 적용
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    padding: '16px',
    position: 'relative'
  },
  sendMessageButton: {
    position: 'absolute',
    width: '203px',
    height: '33px',
    bottom: '16px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(194, 240, 247, 0.8)', // 투명도 적용
    backdropFilter: 'blur(5px)',
    borderRadius: '20px',
    border: '1px solid rgba(194, 240, 247, 0.6)',
    cursor: 'pointer',
    boxShadow: 'inset 0px -4px 4px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '15px',
    fontWeight: 'normal',
    color: 'black'
  },

  // 댓글 아이템 - 투명도 적용
  commentItem: {
    marginBottom: '12px',
    padding: '8px 12px',
    background: 'rgba(249, 250, 251, 0.4)', // 투명도 적용
    backdropFilter: 'blur(5px)',
    borderRadius: '8px',
    border: '1px solid rgba(229, 231, 235, 0.4)'
  },
  commentAuthor: {
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#374151',
    marginBottom: '4px'
  },
  commentContent: {
    margin: '4px 0',
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.4'
  },

  // 하단 정보 카드 - 투명도 적용
  bottomCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginTop: '20px'
  },
  infoCard: {
    padding: '24px',
    background: 'rgba(254, 243, 199, 0.4)', // 투명도 적용
    backdropFilter: 'blur(15px)',
    borderRadius: '20px',
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    border: '1px solid rgba(254, 243, 199, 0.6)'
  },
  infoIcon: {
    width: '48px',
    height: '48px',
    background: 'rgba(255, 255, 255, 0.8)', // 아이콘 배경도 투명하게
    backdropFilter: 'blur(5px)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    border: '1px solid rgba(255, 255, 255, 0.4)'
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
  },

  // 레벨 프로그레스 바 - 투명도 적용
  levelProgressBar: {
    width: '100%',
    height: '8px',
    background: 'rgba(229, 231, 235, 0.6)', // 투명도 적용
    backdropFilter: 'blur(5px)',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid rgba(229, 231, 235, 0.4)'
  },
  levelProgressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
    borderRadius: '8px',
    transition: 'width 0.5s ease-out'
  }
};

// 호버 효과 추가 - 투명도 스타일에 맞게 조정
const hoverStyles = `
  .friendCard:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    background: rgba(255, 255, 255, 0.5) !important;
  }
  
  .visitButton:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
    background: rgba(16, 185, 129, 0.9) !important;
  }
  
  .messageButton:hover {
    background: rgba(229, 231, 235, 0.8) !important;
    transform: translateY(-1px);
  }
  
  .addFriendButton:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
    background: rgba(59, 130, 246, 0.9) !important;
  }
  
  .friendListItem:hover:not(.active) {
    background: rgba(249, 250, 251, 0.6) !important;
    backdrop-filter: blur(5px) !important;
  }
  
  .userSearchResult:hover {
    background: rgba(249, 250, 251, 0.6) !important;
    transform: translateY(-1px);
  }
  
  .friendRequestButton:hover {
    background: rgba(59, 130, 246, 0.9) !important;
    transform: translateY(-1px);
  }
  
  .searchInput:focus {
    border-color: rgba(59, 130, 246, 0.6);
    background: rgba(255, 255, 255, 0.6) !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .sendMessageButton:hover {
    background: rgba(194, 240, 247, 0.9) !important;
    transform: translateX(-50%) translateY(-2px);
  }
  
  .commentItem:hover {
    background: rgba(249, 250, 251, 0.6) !important;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = hoverStyles;
document.head.appendChild(styleSheet);