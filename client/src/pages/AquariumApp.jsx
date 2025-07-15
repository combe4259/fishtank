import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar/Navbar.jsx'
import MyAquarium from './Myaquarium/MyAquarium.jsx'
import Shop from './Shop/shop.jsx';
import FriendsAquarium from './FriendsAquarium/FriendsAquarium.jsx';
import Profile from './Profile/Profile.jsx';

const AquariumApp = ({ user }) => {
    const [activeTab, setActiveTab] = useState('myAquarium');
    const [currentUser, setCurrentUser] = useState(user);

    // ✅ user prop 변경 시 currentUser 업데이트
    useEffect(() => {
        if (user) {
            setCurrentUser(user);
            console.log('👤 AquariumApp에서 받은 사용자 정보:', user);
        }
    }, [user]);

    // ✅ localStorage에서 사용자 정보 백업 로드
    useEffect(() => {
        if (!currentUser) {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setCurrentUser(parsedUser);
                    console.log('💾 localStorage에서 사용자 정보 복원:', parsedUser);
                } catch (error) {
                    console.error('사용자 정보 파싱 에러:', error);
                }
            }
        }
    }, [currentUser]);

    // 각 탭에 따른 컴포넌트 렌더링
    const renderAquariumContent = () => {
        const commonProps = { user: currentUser }; // 현재 사용자 정보 전달

        switch (activeTab) {
            case 'myAquarium':
                return <MyAquarium {...commonProps} />;
            case 'shop':
                return <Shop {...commonProps} />;
            case 'friends':
                return <FriendsAquarium {...commonProps} />;
            case 'profile':
                return <Profile {...commonProps} />;
            default:
                return <MyAquarium {...commonProps} />;
        }
    };

    // ✅ 개선된 로그아웃 처리
    const handleLogout = () => {
        const confirmLogout = window.confirm('정말 로그아웃 하시겠습니까?');

        if (confirmLogout) {
            // 로컬 스토리지 정리
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // 상태 초기화
            setCurrentUser(null);
            setActiveTab('myAquarium');

            console.log('👋 로그아웃 완료');

            // 로그인 페이지로 이동
            window.location.href = '/';
        }
    };

    // ✅ 사용자 정보가 없으면 로딩 표시
    if (!currentUser) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
                background: 'url("/image-1.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '20px',
                    padding: '40px',
                    textAlign: 'center',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>🐠</div>
                    <div style={{ fontSize: '18px', color: '#6b7280' }}>
                        사용자 정보를 불러오는 중...
                    </div>
                </div>
            </div>
        );
    }

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'url("/image-1.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
        },
        backgroundOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to top, rgba(30, 58, 138, 0.2), transparent)',
            zIndex: 1
        },
        mainWrapper: {
            position: 'relative',
            zIndex: 10,
            padding: '24px',
            maxWidth: '1280px',
            margin: '0 auto'
        },
        logoutButton: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: 20,
            transition: 'background-color 0.2s',
        },
        logoutButtonHover: {
            backgroundColor: '#c82333'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.backgroundOverlay}></div>

            <button
                onClick={handleLogout}
                style={styles.logoutButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
            >
                로그아웃
            </button>

            <div style={styles.mainWrapper}>
                <Navbar
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    userCoins={currentUser?.fish_coins || currentUser?.gameStats?.fishCoins || 0}
                />

                <main>
                    {renderAquariumContent()}
                </main>
            </div>
        </div>
    );
};

export default AquariumApp;