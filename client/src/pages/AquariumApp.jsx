import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // 추가
import Navbar from '../components/common/Navbar/Navbar.jsx'
import MyAquarium from './Myaquarium/MyAquarium.jsx'
import Shop from './Shop/shop.jsx';
import FriendsAquarium from './FriendsAquarium/FriendsAquarium.jsx';
import Profile from './Profile/Profile.jsx';

const AquariumApp = ({ user }) => {
    const location = useLocation(); // 추가
    const navigate = useNavigate(); // 추가
    const [activeTab, setActiveTab] = useState('myAquarium');
    const [currentUser, setCurrentUser] = useState(user);
    const [message, setMessage] = useState(''); // 추가
    const [isLoading, setIsLoading] = useState(true); // 추가

    // GitHub OAuth 토큰 처리 로직 추가
    useEffect(() => {
        const handleOAuthCallback = async () => {
            console.log('🔍 AquariumApp 마운트됨');
            console.log('🔍 현재 URL:', window.location.href);

            const urlParams = new URLSearchParams(location.search);
            const token = urlParams.get('token');
            const githubAuth = urlParams.get('github_auth');
            const githubConnected = urlParams.get('github_connected');
            const error = urlParams.get('error');

            console.log('🔍 URL 파라미터:', {
                token: token ? '토큰 있음' : '토큰 없음',
                github_auth: githubAuth,
                github_connected: githubConnected,
                error: error
            });

            if (error) {
                // 에러 처리
                switch (error) {
                    case 'token_failed':
                        setMessage('❌ GitHub 토큰 받기에 실패했습니다.');
                        break;
                    case 'user_not_found':
                        setMessage('❌ 연동할 사용자를 찾을 수 없습니다.');
                        break;
                    case 'github_auth_failed':
                        setMessage('❌ GitHub 인증에 실패했습니다.');
                        break;
                    default:
                        setMessage('❌ 로그인 중 오류가 발생했습니다.');
                }

                setTimeout(() => {
                    navigate('/login', { replace: true });
                }, 2000);
                setIsLoading(false);
                return;
            }

            if (token) {
                try {
                    console.log('🎫 토큰 처리 시작:', token.substring(0, 50) + '...');

                    // 토큰을 로컬 스토리지에 저장
                    localStorage.setItem('token', token);

                    // 토큰에서 사용자 정보 추출 (JWT 디코딩)
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    console.log('🔓 토큰 디코딩 결과:', payload);

                    // 사용자 정보 저장
                    const userData = {
                        id: payload.userId,
                        githubId: payload.githubId,
                        username: payload.username,
                        loginType: payload.loginType
                    };
                    localStorage.setItem('user', JSON.stringify(userData));
                    setCurrentUser(userData);

                    // 성공 메시지 표시
                    if (githubAuth === 'success') {
                        setMessage('✅ GitHub 로그인에 성공했습니다!');
                    } else if (githubConnected === 'success') {
                        setMessage('✅ GitHub 계정이 연동되었습니다!');
                    }

                    // URL 파라미터 정리 (토큰 노출 방지)
                    navigate('/aquarium', { replace: true });

                    // 상세한 사용자 정보 가져오기
                    await fetchUserProfile(token, userData);

                    // 메시지 제거
                    setTimeout(() => {
                        setMessage('');
                    }, 3000);

                } catch (error) {
                    console.error('토큰 처리 에러:', error);
                    setMessage('❌ 로그인 정보 처리 중 오류가 발생했습니다.');
                    setTimeout(() => {
                        navigate('/login', { replace: true });
                    }, 2000);
                }
            }

            setIsLoading(false);
        };

        handleOAuthCallback();
    }, [location.search, navigate]);

    // 사용자 프로필 정보 가져오기
    const fetchUserProfile = async (token, basicUserData) => {
        try {
            const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');

            const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success && data.user) {
                    // 상세한 사용자 정보로 업데이트
                    const fullUserData = { ...basicUserData, ...data.user };
                    localStorage.setItem('user', JSON.stringify(fullUserData));
                    setCurrentUser(fullUserData);
                    console.log('✅ 사용자 프로필 업데이트 완료:', fullUserData);
                }
            }
        } catch (error) {
            console.error('프로필 조회 에러:', error);
        }
    };

    // ✅ user prop 변경 시 currentUser 업데이트
    useEffect(() => {
        if (user) {
            setCurrentUser(user);
            console.log('👤 AquariumApp에서 받은 사용자 정보:', user);
        }
    }, [user]);

    // ✅ localStorage에서 사용자 정보 백업 로드
    useEffect(() => {
        if (!currentUser && !isLoading) {
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
    }, [currentUser, isLoading]);

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
            setMessage('');

            console.log('👋 로그아웃 완료');

            // 로그인 페이지로 이동
            window.location.href = '/';
        }
    };

    // ✅ 로딩 중일 때
    if (isLoading) {
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
                        로그인 처리 중...
                    </div>
                </div>
            </div>
        );
    }

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
        messageOverlay: {
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '12px 24px',
            backgroundColor: message.includes('✅') ? '#10b981' : '#ef4444',
            color: 'white',
            borderRadius: '8px',
            fontSize: '14px',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.backgroundOverlay}></div>

            {/* 메시지 표시 */}
            {message && (
                <div style={styles.messageOverlay}>
                    {message}
                </div>
            )}

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