import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');

const AuthGuard = ({ children }) => {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authMessage, setAuthMessage] = useState('');

    useEffect(() => {
        console.log('🚀 AuthGuard 시작');
        console.log('📍 현재 위치:', location.pathname);
        console.log('🔗 쿼리 스트링:', location.search);
        handleAuthentication();
    }, [location]);

    const handleAuthentication = async () => {
        try {
            console.log('🔍 인증 처리 시작...');

            // GitHub OAuth 콜백 처리
            const urlParams = new URLSearchParams(location.search);

            // 모든 파라미터 로깅
            console.log('📋 모든 URL 파라미터:');
            for (const [key, value] of urlParams.entries()) {
                console.log(`  ${key}: ${value}`);
            }

            // 파라미터 추출
            const githubAuth = urlParams.get('github_auth');
            const githubConnected = urlParams.get('github_connected');
            const token = urlParams.get('token');
            const errorCode = urlParams.get('error');

            console.log('🎯 추출된 파라미터:', {
                githubAuth,
                githubConnected,
                token: token ? `있음 (길이: ${token.length}, 시작: ${token.substring(0, 20)}...)` : '없음',
                errorCode,
                API_BASE_URL
            });

            // 에러 처리
            if (errorCode) {
                console.log('❌ 에러 코드 감지:', errorCode);
                const errorMessages = {
                    'token_failed': 'GitHub 인증에 실패했습니다. 다시 시도해주세요.',
                    'auth_failed': '인증 처리 중 오류가 발생했습니다.',
                    'github_auth_failed': 'GitHub 로그인에 실패했습니다.',
                    'user_not_found': '사용자를 찾을 수 없습니다.'
                };

                setAuthMessage(errorMessages[errorCode] || '로그인 중 오류가 발생했습니다.');
                setLoading(false);

                setTimeout(() => {
                    console.log('🔄 에러로 인한 리다이렉트...');
                    window.location.href = '/';
                }, 3000);
                return;
            }

            // GitHub 로그인 성공 처리
            if ((githubAuth === 'success' || githubConnected === 'success') && token) {
                console.log('✅ GitHub 로그인 성공 감지!');
                console.log('💾 토큰 저장 중...');

                localStorage.setItem('token', token);
                setAuthMessage('GitHub 로그인 성공! 아쿠아리움을 준비하고 있습니다...');

                console.log('🧹 URL 파라미터 정리 중...');
                window.history.replaceState({}, document.title, '/aquarium');

                console.log('👤 사용자 프로필 조회 시작...');
                await fetchUserProfile(token);
                return;
            }

            // 기존 토큰 확인
            const existingToken = localStorage.getItem('token');
            console.log('🔍 기존 토큰 확인:', existingToken ? '있음' : '없음');

            if (existingToken) {
                console.log('🔄 기존 토큰으로 인증 시도...');
                await fetchUserProfile(existingToken);
            } else {
                console.log('❌ 토큰이 없어서 로그인 페이지로 이동');
                setLoading(false);
                window.location.href = '/';
                return;
            }
        } catch (error) {
            console.error('💥 인증 처리 중 오류:', error);
            setAuthMessage('인증 처리 중 오류가 발생했습니다.');
            setLoading(false);
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        }
    };

    const fetchUserProfile = async (token) => {
        try {
            console.log('👤 사용자 프로필 조회 시작...');
            console.log('🌐 API URL:', `${API_BASE_URL}/api/user/profile`);

            const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('📡 프로필 API 응답:', {
                status: response.status,
                statusText: response.statusText,
                ok: response.ok
            });

            if (response.ok) {
                const userData = await response.json();
                console.log('✅ 사용자 정보 조회 성공:', userData);

                // gameStats 호환성 처리
                const processedUser = {
                    ...userData.user,
                    gameStats: {
                        fishCoins: userData.user.fish_coins || 0,
                        level: userData.user.level || 1,
                        experiencePoints: userData.user.experience_points || 0
                    }
                };

                console.log('🔄 처리된 사용자 정보:', processedUser);

                setUser(processedUser);
                localStorage.setItem('user', JSON.stringify(processedUser));
                setAuthMessage('');
                console.log('✅ 인증 완료!');
            } else if (response.status === 401 || response.status === 403) {
                console.log('❌ 토큰이 유효하지 않음 (401/403)');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setLoading(false);
                window.location.href = '/';
                return;
            } else {
                const errorText = await response.text();
                console.error('❌ API 에러 응답:', errorText);
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }
        } catch (error) {
            console.error('💥 사용자 정보 조회 실패:', error);
            setAuthMessage(`사용자 정보를 불러오는 중 오류가 발생했습니다: ${error.message}`);
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
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    maxWidth: '400px',
                    width: '90%'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>🐠</div>
                    <div style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 'bold' }}>
                        Fishtank
                    </div>
                    {loading && (
                        <div style={{ color: '#6b7280', marginBottom: '10px' }}>
                            아쿠아리움을 준비하는 중...
                        </div>
                    )}
                    {authMessage && (
                        <div style={{
                            padding: '15px',
                            backgroundColor: authMessage.includes('성공') ? '#d4edda' : '#f8d7da',
                            color: authMessage.includes('성공') ? '#155724' : '#721c24',
                            borderRadius: '8px',
                            margin: '10px 0',
                            fontSize: '14px',
                            lineHeight: '1.4'
                        }}>
                            {authMessage}
                        </div>
                    )}

                    {/* 디버깅용 정보 표시 */}
                    {process.env.NODE_ENV === 'development' && (
                        <div style={{
                            marginTop: '20px',
                            padding: '10px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '5px',
                            fontSize: '12px',
                            color: '#666',
                            textAlign: 'left'
                        }}>
                            <strong>디버그 정보:</strong><br/>
                            경로: {location.pathname}<br/>
                            쿼리: {location.search}<br/>
                            API: {API_BASE_URL}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // 사용자가 로드되지 않았으면 로딩 표시
    if (!user) {
        console.log('⚠️ 사용자 정보가 없음, 로딩 표시');
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

    console.log('🎉 AuthGuard 완료, 사용자 정보 전달:', user);
    // 인증이 완료되면 children에 사용자 정보를 props로 전달
    return React.cloneElement(children, { user });
};

export default AuthGuard;