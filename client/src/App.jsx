import React, { useEffect } from 'react';
import './App.css'
import Register from './components/Register.jsx'
import Login from "./components/Login.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import AquariumApp from './pages/AquariumApp.jsx'

// 루트 경로에서 토큰 처리하는 컴포넌트
function RootHandler() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('🔍 루트 핸들러 실행:', window.location.href);

        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token');
        const githubAuth = urlParams.get('github_auth');
        const githubConnected = urlParams.get('github_connected');
        const error = urlParams.get('error');

        if (token && (githubAuth === 'success' || githubConnected === 'success')) {
            console.log('✅ 토큰 발견, 아쿠아리움으로 이동');

            // 토큰 저장
            localStorage.setItem('token', token);

            try {
                // JWT 디코딩
                const payload = JSON.parse(atob(token.split('.')[1]));
                const userData = {
                    id: payload.userId,
                    githubId: payload.githubId,
                    username: payload.username,
                    loginType: payload.loginType
                };
                localStorage.setItem('user', JSON.stringify(userData));

                // 아쿠아리움으로 이동 (토큰 없이)
                navigate('/aquarium', {
                    replace: true,
                    state: {
                        message: githubAuth === 'success' ?
                            '✅ GitHub 로그인에 성공했습니다!' :
                            '✅ GitHub 계정이 연동되었습니다!'
                    }
                });

            } catch (error) {
                console.error('토큰 처리 에러:', error);
                navigate('/login', { replace: true });
            }
        } else if (error) {
            console.log('❌ 에러 발견, 로그인으로 이동:', error);
            navigate('/login', {
                replace: true,
                state: { error }
            });
        } else {
            // 기존 로그인 사용자인지 확인
            const existingToken = localStorage.getItem('token');
            if (existingToken) {
                try {
                    const payload = JSON.parse(atob(existingToken.split('.')[1]));
                    const currentTime = Date.now() / 1000;

                    if (payload.exp > currentTime) {
                        navigate('/aquarium', { replace: true });
                        return;
                    }
                } catch (error) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            }

            // 토큰이 없으면 로그인 페이지로
            navigate('/login', { replace: true });
        }
    }, [location.search, navigate]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontSize: '18px'
        }}>
            로그인 처리 중...
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<RootHandler />} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/user/signup" element={<Register />} />
                    <Route path="/aquarium" element={<AquariumApp />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App