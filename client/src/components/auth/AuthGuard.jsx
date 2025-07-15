import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');

const AuthGuard = ({ children }) => {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authMessage, setAuthMessage] = useState('');

    useEffect(() => {
        handleAuthentication();
    }, [location]);

    const handleAuthentication = async () => {
        try {
            // GitHub OAuth 콜백 처리
            const urlParams = new URLSearchParams(location.search);

            // ✅ 수정: 올바른 파라미터 이름 사용
            const githubAuth = urlParams.get('github_auth');
            const githubConnected = urlParams.get('github_connected');
            const token = urlParams.get('token');  // 'session'이 아닌 'token'
            const errorCode = urlParams.get('error');

            console.log('🔍 URL 파라미터 확인:', {
                githubAuth,
                githubConnected,
                token: token ? `있음 (길이: ${token.length})` : '없음',
                errorCode,
                fullUrl: location.search
            });

            // 에러 처리
            if (errorCode) {
                const errorMessages = {
                    'token_failed': 'GitHub 인증에 실패했습니다. 다시 시도해주세요.',
                    'auth_failed': '인증 처리 중 오류가 발생했습니다.',
                    'github_auth_failed': 'GitHub 로그인에 실패했습니다.',
                    'user_not_found': '사용자를 찾을 수 없습니다.'
                };

                setAuthMessage(errorMessages[errorCode] || '로그인 중 오류가 발생했습니다.');
                setLoading(false);

                setTimeout(() => {
                    window.location.href = '/';
                }, 3000);
                return;
            }

            // ✅ GitHub 로그인 성공 처리 (두 가지 경우 모두 처리)
            if ((githubAuth === 'success' || githubConnected === 'success') && token) {
                console.log('✅ GitHub 로그인 성공 감지');

                localStorage.setItem('token', token);
                setAuthMessage('GitHub 로그인 성공! 아쿠아리움을 준비하고 있습니다...');

                // URL 정리 (파라미터 제거)
                window.history.replaceState({}, document.title, '/aquarium');

                await fetchUserProfile(token);
                return;
            }

            // 기존 토큰 확인
            const existingToken = localStorage.getItem('token');
            if (existingToken) {
                console.log('🔍 기존 토큰으로 인증 시도');
                await fetchUserProfile(existingToken);
            } else {
                // 인증되지 않은 사용자 처리
                console.log('❌ 토큰이 없어서 로그인 페이지로 이동');
                setLoading(false);
                window.location.href = '/';
                return;
            }
        } catch (error) {
            console.error('인증 처리 중 오류:', error);
            setAuthMessage('인증 처리 중 오류가 발생했습니다.');
            setLoading(false);
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        }
    };

    const fetchUserProfile = async (token) => {
        try {
            console.log('👤 사용자 프로필 조회 시작');

            const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('👤 프로필 응답 상태:', response.status);

            if (response.ok) {
                const userData = await response.json();
                console.log('✅ 사용자 정보 조회 성공:', userData.user);

                setUser(userData.user);
                localStorage.setItem('user', JSON.stringify(userData.user));
                setAuthMessage('');
            } else if (response.status === 401 || response.status === 403) {
                // 토큰 만료 또는 무효화 처리
                console.log('❌ 토큰이 유효하지 않음');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setLoading(false);
                window.location.href = '/';
                return;
            } else {
                throw new Error('사용자 정보를 가져올 수 없습니다');
            }
        } catch (error) {
            console.error('사용자 정보 조회 실패:', error);
            setAuthMessage('사용자 정보를 불러오는 중 오류가 발생했습니다.');
            setTimeout(() => {
                window.location.href = '/';
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
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>🐠</div>
                    <div style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 'bold' }}>
                        Fishtank
                    </div>
                    {loading && <div style={{ color: '#6b7280' }}>아쿠아리움을 준비하는 중...</div>}
                    {authMessage && (
                        <div style={{
                            padding: '20px',
                            backgroundColor: authMessage.includes('성공') ? '#d4edda' : '#f8d7da',
                            color: authMessage.includes('성공') ? '#155724' : '#721c24',
                            borderRadius: '10px',
                            margin: '10px 0'
                        }}>
                            {authMessage}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // 사용자가 로드되지 않았으면 로딩 표시
    if (!user) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '18px'
            }}>
                사용자 정보를 불러오는 중...
            </div>
        );
    }

    // 인증이 완료되면 children에 사용자 정보를 props로 전달
    return React.cloneElement(children, { user });
};

export default AuthGuard;