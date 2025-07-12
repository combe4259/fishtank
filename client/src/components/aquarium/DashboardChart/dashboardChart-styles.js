export const styles = {
  container: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '24px',
    padding: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    height: 'auto',
    width: '100%'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a1a',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  date: {
    fontSize: '14px',
    color: '#6b7280'
  },

  // 차트 섹션
  chartSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px'
  },
  chartWrapper: {
    position: 'relative',
    width: '140px',
    height: '140px'
  },
  svg: {
    width: '100%',
    height: '100%',
    transform: 'rotate(0deg)'
  },
  chartCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
  },
  percentage: {
    fontSize: '32px',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  label: {
    fontSize: '14px',
    color: '#6b7280',
    marginTop: '4px'
  },

  // 통계 정보
  statsInfo: {
    display: 'flex',
    gap: '20px',
    width: '100%',
    justifyContent: 'center'
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  statText: {
    fontSize: '14px',
    color: '#374151'
  },

  // 하단 섹션
  footer: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #e5e7eb'
  },
  progressBar: {
    height: '8px',
    background: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '12px'
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
    borderRadius: '4px',
    transition: 'width 0.5s ease-out',
    position: 'relative',
    overflow: 'hidden'
  },
  progressGlow: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '50px',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
    animation: 'shimmer 2s infinite'
  },
  motivationText: {
    fontSize: '14px',
    color: '#6b7280',
    textAlign: 'center',
    margin: 0
  }
};