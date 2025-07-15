import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        handleAuthentication();
    }, []);

    const handleAuthentication = async () => {
        try {
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
        } catch (error) {
            console.error('인증 처리 중 오류:', error);
            navigate('/', { replace: true });
            setLoading(false);
        }
    };

    const fetchUserProfile = async (token) => {
        try {
            console.log('👤 사용자 프로필 조회 시작');
            const response = await fetch('https://fishtank-2wr5.onrender.com/api/user/profile', {
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
            navigate('/', { replace: true });
        } finally {
            setLoading(false);
        }
    };

    // 로딩 상태 화면
    if (loading) {
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
                    <div style={{ color: '#6b7280' }}>아쿠아리움을 준비하는 중...</div>
                </div>
            </div>
        );
    }

    // 인증이 완료되면 children에 사용자 정보를 props로 전달
    return React.cloneElement(children, { user });
};

export default AuthGuard;