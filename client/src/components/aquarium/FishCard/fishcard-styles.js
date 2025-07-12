export const styles = {
  card: {
    width: '160px',
    background: 'white',
    borderRadius: '20px',
    padding: '16px',
    position: 'relative',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: '1px solid #e5e7eb',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },

  // 희귀도 뱃지
  rarityBadge: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    padding: '4px 8px',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'capitalize',
    zIndex: 2
  },

  // 좋아요 버튼
  likeButton: {
    position: 'absolute',
    top: '8px',
    left: '8px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s',
    zIndex: 2
  },

  // 이미지 섹션
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '8px'
  },
  imageBackground: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)'
  },
  fishImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },

  // 정보 섹션
  infoSection: {
    textAlign: 'center',
    position: 'relative'
  },
  fishName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: '0 0 4px 0'
  },
  fishSpecies: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0
  },
  levelBadge: {
    position: 'absolute',
    top: '-8px',
    right: '50%',
    transform: 'translateX(50%)',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: '600'
  },

  // 액션 버튼
  actionButton: {
    width: '100%',
    padding: '10px',
    borderRadius: '14px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontWeight: '500',
    fontSize: '14px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  },
  priceContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px'
  },
  priceText: {
    color: '#92400e',
    fontWeight: '600'
  },
  addContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px'
  },
  addText: {
    color: '#1e40af',
    fontWeight: '500'
  }
};

// 호버 효과 스타일
const hoverStyles = `
  .fishCard:hover .likeButton {
    transform: scale(1.1);
  }
  
  .fishCard:hover .actionButton {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .likeButton:hover {
    background: #fee2e2;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = hoverStyles;
document.head.appendChild(styleSheet);