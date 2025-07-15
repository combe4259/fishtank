import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_URL
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
            const authSuccess = urlParams.get('auth_success');
            const sessionToken = urlParams.get('session');
            const errorCode = urlParams.get('error');

            // 에러
            if (errorCode) {
                const errorMessages = {
                    'token_failed': 'GitHub 인증에 실패했습니다. 다시 시도해주세요.',
                    'auth_failed': '인증 처리 중 오류가 발생했습니다.'
                };

                setAuthMessage(errorMessages[errorCode] || '로그인 중 오류가 발생했습니다.');

                setTimeout(() => {
                    window.location.href = '/';
                }, 3000);
                return;
            }

            // GitHub 로그인 성공
            if (authSuccess === 'true' && sessionToken) {
                localStorage.setItem('token', sessionToken);
                setAuthMessage('GitHub 로그인 성공! 아쿠아리움을 준비하고 있습니다...');
                // URL 정리
                window.history.replaceState({}, document.title, '/aquarium');

                await fetchUserProfile(sessionToken);
            } else {
                // 기존 토큰 확인
                const existingToken = localStorage.getItem('token');
                if (existingToken) {
                    await fetchUserProfile(existingToken);
                } else {
                    // 인증되지 않은 사용자 처리
                    window.location.href = '/';
                    return;
                }
            }
        } catch (error) {
            console.error('인증 처리 중 오류:', error);
            setAuthMessage('인증 처리 중 오류가 발생했습니다.');
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        }
    };

    const fetchUserProfile = async (token) => {
        try {
            const response = await fetch(`${API_BASE_URL}api/user/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData.user);
                localStorage.setItem('user', JSON.stringify(userData.user));
                setAuthMessage('');
            } else if (response.status === 401 || response.status === 403) {
                // 토큰 만료 또는 무효화 처리
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/';
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

    // 인증이 완료되면 children에 사용자 정보를 props로 전달
    return React.cloneElement(children, { user });
};

export default AuthGuard;