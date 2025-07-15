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

  // 코인 표시
  coinDisplay: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    padding: '12px 24px',
    borderRadius: '24px',
    boxShadow: '0 4px 16px rgba(251, 191, 36, 0.2)'
  },
  coinAmount: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#92400e'
  },
  coinLabel: {
    fontSize: '14px',
    color: '#92400e'
  },

  // 카테고리 바
  categoryBar: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
  },
  categoryLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#374151'
  },
  categoryButtons: {
    display: 'flex',
    gap: '12px',
    flex: 1
  },
  categoryButton: {
    padding: '10px 20px',
    borderRadius: '16px',
    borderWidth: '2px', // 단축 속성을 분리
    borderStyle: 'solid',
    borderColor: '#e5e7eb',
    background: 'white',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  categoryButtonActive: {
    borderWidth: '2px', // 동일한 속성 유지
    borderStyle: 'solid',
    borderColor: '#3b82f6',
    color: '#1e40af',
    background: '#eff6ff'
  },
  categoryDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'currentColor'
  },

  // 상점 카드
  shopCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '28px',
    padding: '32px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    minHeight: '500px'
  },
  shopHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '28px',
    paddingBottom: '20px',
    borderBottom: '1px solid #e5e7eb'
  },
  shopTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  fishCount: {
    fontSize: '16px',
    fontWeight: 'normal',
    color: '#6b7280'
  },
  sortSelect: {
    backgroundColor: '#f3f4f6',
    borderWidth: '1px', // 단축 속성을 분리
    borderStyle: 'solid',
    borderColor: '#e5e7eb',
    borderRadius: '12px',
    padding: '10px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    outline: 'none'
  },

  // 물고기 그리드
  fishGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '20px',
    padding: '4px'
  },

  // 하단 정보
  bottomInfo: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginTop: '20px'
  },
  infoCard: {
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    borderRadius: '20px',
    padding: '24px',
    borderWidth: '1px', // 단축 속성을 분리
    borderStyle: 'solid',
    borderColor: 'rgba(59, 130, 246, 0.1)'
  },
  infoTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#1e40af'
  },
  infoText: {
    fontSize: '14px',
    color: '#64748b',
    lineHeight: '1.6'
  },
  ownedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(34, 197, 94, 0.9)',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '14px',
    fontWeight: 'bold',
    pointerEvents: 'none'
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '14px',
    fontWeight: 'bold',
    pointerEvents: 'none'
  }
};