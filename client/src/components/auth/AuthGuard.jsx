import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authMessage, setAuthMessage] = useState('');

    useEffect(() => {
        handleAuthentication();
    }, [location]);

    const handleAuthentication = async () => {
        try {
            const urlParams = new URLSearchParams(location.search);
            const token = urlParams.get('token'); // 🔥 서버에서 보내는 token 파라미터
            const githubAuth = urlParams.get('github_auth');
            const githubConnected = urlParams.get('github_connected');
            const errorCode = urlParams.get('error');

            console.log('🔍 AuthGuard URL 파라미터:', {
                token: token ? '토큰 있음' : '토큰 없음',
                github_auth: githubAuth,
                github_connected: githubConnected,
                error: errorCode
            });

            // 에러 처리
            if (errorCode) {
                const errorMessages = {
                    'token_failed': '❌ GitHub 토큰 받기에 실패했습니다.',
                    'user_not_found': '❌ 연동할 사용자를 찾을 수 없습니다.',
                    'github_auth_failed': '❌ GitHub 인증에 실패했습니다.',
                    'no_code': '❌ GitHub 인증 코드가 없습니다.'
                };

                setAuthMessage(errorMessages[errorCode] || '❌ 로그인 중 오류가 발생했습니다.');

                setTimeout(() => {
                    navigate('/', { replace: true });
                }, 3000);
                setLoading(false);
                return;
            }

            // GitHub OAuth 성공 처리
            if (token && (githubAuth === 'success' || githubConnected === 'success')) {
                console.log('🎫 GitHub OAuth 토큰 처리 시작');

                try {
                    // 토큰을 로컬 스토리지에 저장
                    localStorage.setItem('token', token);

                    // JWT 토큰 디코딩하여 기본 사용자 정보 추출
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    console.log('🔓 토큰 디코딩 결과:', payload);

                    const basicUserData = {
                        id: payload.userId,
                        githubId: payload.githubId,
                        username: payload.username,
                        loginType: payload.loginType
                    };

                    localStorage.setItem('user', JSON.stringify(basicUserData));

                    // 성공 메시지 표시
                    if (githubAuth === 'success') {
                        setAuthMessage('✅ GitHub 로그인에 성공했습니다!');
                    } else if (githubConnected === 'success') {
                        setAuthMessage('✅ GitHub 계정이 연동되었습니다!');
                    }

                    // URL 파라미터 정리 (토큰 노출 방지)
                    navigate('/aquarium', { replace: true });

                    // 상세한 사용자 정보 가져오기
                    await fetchUserProfile(token);

                    // 메시지 제거
                    setTimeout(() => {
                        setAuthMessage('');
                    }, 2000);

                } catch (error) {
                    console.error('토큰 처리 에러:', error);
                    setAuthMessage('❌ 로그인 정보 처리 중 오류가 발생했습니다.');
                    setTimeout(() => {
                        navigate('/', { replace: true });
                    }, 3000);
                    setLoading(false);
                    return;
                }
            } else {
                // 기존 토큰 확인
                const existingToken = localStorage.getItem('token');
                if (existingToken) {
                    console.log('💾 기존 토큰으로 프로필 조회');
                    await fetchUserProfile(existingToken);
                } else {
                    // 인증되지 않은 사용자 - 로그인 페이지로
                    console.log('❌ 토큰 없음, 로그인 페이지로 이동');
                    navigate('/', { replace: true });
                    setLoading(false);
                    return;
                }
            }
        } catch (error) {
            console.error('인증 처리 중 오류:', error);
            setAuthMessage('❌ 인증 처리 중 오류가 발생했습니다.');
            setTimeout(() => {
                navigate('/', { replace: true });
            }, 3000);
            setLoading(false);
        }
    };

    const fetchUserProfile = async (token) => {
        try {
            console.log('👤 사용자 프로필 조회 시작');
            const response = await fetch('http://localhost:3001/api/user/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const userData = await response.json();
                console.log('✅ 사용자 프로필 조회 성공:', userData.user);
                setUser(userData.user);
                localStorage.setItem('user', JSON.stringify(userData.user));
                setAuthMessage('');
            } else if (response.status === 401 || response.status === 403) {
                // 토큰 만료 또는 무효화 처리
                console.log('❌ 토큰 만료 또는 무효');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/', { replace: true });
            } else {
                throw new Error('사용자 정보를 가져올 수 없습니다');
            }
        } catch (error) {
            console.error('사용자 정보 조회 실패:', error);
            setAuthMessage('❌ 사용자 정보를 불러오는 중 오류가 발생했습니다.');
            setTimeout(() => {
                navigate('/', { replace: true });
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    // 로딩 상태나 인증 메시지가 있을 때의 화면
    if (loading || authMessage) {
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
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    maxWidth: '400px'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>🐠</div>
                    <div style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 'bold' }}>
                        Fishtank
                    </div>

                    {loading && !authMessage && (
                        <div style={{ color: '#6b7280' }}>아쿠아리움을 준비하는 중...</div>
                    )}

                    {authMessage && (
                        <div style={{
                            padding: '15px',
                            backgroundColor: authMessage.includes('✅') ? '#d4edda' : '#f8d7da',
                            color: authMessage.includes('✅') ? '#155724' : '#721c24',
                            borderRadius: '10px',
                            margin: '10px 0',
                            fontSize: '14px'
                        }}>
                            {authMessage}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // 인증이 완료되면 children에 사용자 정보를 props로 전달
    return React.cloneElement(children, { user });
};

export default AuthGuard;