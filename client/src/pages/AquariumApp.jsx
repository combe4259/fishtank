import React, { useState } from 'react';
import Navbar from '../components/common/Navbar/Navbar.jsx'
import MyAquarium from './Myaquarium/MyAquarium.jsx'
import Shop from './Shop/shop.jsx';
import FriendsAquarium from './FriendsAquarium/FriendsAquarium.jsx';
import Profile from './Profile/Profile.jsx';

const AquariumApp = ({ user }) => {
    const [activeTab, setActiveTab] = useState('myAquarium');

    console.log('🐠 AquariumApp 렌더링, 사용자:', user);

    // 각 탭에 따른 컴포넌트 렌더링
    const renderAquariumContent = () => {
        const commonProps = { user }; // 모든 컴포넌트에 사용자 정보 전달

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

    // 로그아웃 처리
    const handleLogout = () => {
        const confirmLogout = window.confirm('정말 로그아웃 하시겠습니까?');

        if (confirmLogout) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/';
        }
    };

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
            transition: 'background-color 0.2s'
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
                    userCoins={user?.fish_coins || 0}
                />

                <main>
                    {renderAquariumContent()}
                </main>
            </div>
        </div>
    );
};

export default AquariumApp;