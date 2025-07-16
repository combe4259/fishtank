export const styles = {
    navbar: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '35px',
        height: '63px',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        minWidth: '800px', // 최소 너비 설정
        margin: '0 auto',
        boxShadow: 'inset 0px -4px 20px rgba(0, 72, 131, 0.25)',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 30px'
    },

    navButton: {
        color: '#707070',
        fontFamily: '"눈누 기초고딕 Regular-Regular", Helvetica',
        fontSize: '24px', // 크기 줄임
        fontWeight: '400',
        letterSpacing: '0',
        lineHeight: 'normal',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        transition: 'color 0.3s',
        padding: '10px 20px',
        whiteSpace: 'nowrap'
    },

    navButtonActive: {
        color: '#004883'
    },

    // 버튼 컨테이너
    navButtonsContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '40px',
        flex: 1,
        justifyContent: 'center'
    },

    coinDisplay: {
        backgroundColor: '#E0F7FA',
        borderRadius: '24px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexShrink: 0
    },

    coinText: {
        fontSize: '16px',
        color: '#374151',
        fontWeight: '500'
    }
};