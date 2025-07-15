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
    background: 'rgba(254, 243, 199, 0.4)', // 투명도 적용
    backdropFilter: 'blur(15px)', // 블러 효과 추가
    padding: '12px 24px',
    borderRadius: '24px',
    boxShadow: '0 4px 16px rgba(251, 191, 36, 0.1)',
    border: '1px solid rgba(251, 191, 36, 0.3)' // 미묘한 테두리 추가

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

  // 카테고리 바 - 투명도 조정 및 텍스트 색상 개선
  categoryBar: {
    background: 'rgba(255, 255, 255, 0.4)', // 더 투명하게 변경 (0.95 → 0.7)
    backdropFilter: 'blur(10px)', // 블러 효과 추가
    borderRadius: '20px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.3)' // 미묘한 테두리 추가
  },
  categoryLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 'px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937' // 더 진한 색상으로 변경하여 가독성 향상
  },
  categoryButtons: {
    display: 'flex',
    gap: '12px',
    flex: 1
  },
  categoryButton: {
    padding: '10px 20px',
    borderRadius: '16px',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#d1d5db', // 테두리 색상을 더 진하게
    background: 'rgba(255, 255, 255, 0.1)', // 버튼 배경도 약간 투명하게
    backdropFilter: 'blur(2px)', // 버튼에도 블러 효과
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151', // 텍스트 색상을 진하게 설정
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  categoryButtonActive: {
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#3b82f6',
    color: '#1e40af', // 활성 상태 텍스트 색상
    background: 'rgba(239, 246, 255, 0.4)' // 활성 상태 배경도 약간 투명하게
  },
  categoryDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'currentColor'
  },

  // 상점 카드 - 투명도 조정
  shopCard: {
    background: 'rgba(255, 255, 255, 0.3)', // 더 투명하게 변경 (0.95 → 0.7)
    backdropFilter: 'blur(15px)', // 블러 효과 추가
    borderRadius: '28px',
    padding: '32px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    minHeight: '500px',
    border: '1px solid rgba(255, 255, 255, 0.3)' // 미묘한 테두리 추가
  },
  shopHeader: {

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '28px',
    paddingBottom: '20px',
    borderBottom: '1px solid rgba(229, 231, 235, 0.8)' // 테두리도 약간 투명하게
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
    backgroundColor: 'rgba(243, 244, 246, 0.4' +
        ')', // 선택박스도 약간 투명하게
    backdropFilter: 'blur(5px)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#e5e7eb',
    borderRadius: '12px',
    padding: '10px 16px',
    fontSize: '14px',
    color: '#374151', // 텍스트 색상 명시
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

  // 하단 정보 - 투명도 조정
  bottomInfo: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginTop: '20px'
  },
  infoCard: {
    background: 'rgba(240, 249, 255, 0.2)', // 더 투명하게 변경
    backdropFilter: 'blur(10px)', // 블러 효과 추가
    borderRadius: '20px',
    padding: '24px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(59, 130, 246, 0.2)' // 테두리도 약간 더 진하게
  },
  infoTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#1e40af'
  },
  infoText: {
    fontSize: '14px',
    color: '#475569', // 약간 더 진한 색상으로 가독성 향상
    lineHeight: '1.6'
  },
  ownedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    top: -5,
    left: -10,
    right: 0,
    bottom: 10,
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