import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Register.css"; // register랑 같은 css
const API_URL = 'https://fishtank-2wr5.onrender.com'
console.log("*********************"+API_URL);

export default function Login() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();  // 🔥 추가
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // 🔥 추가: GitHub 로그인 완료 후 토큰 처리
    useEffect(() => {
        const token = searchParams.get('token');
        const gitAuth = searchParams.get('git_auth');

        console.log('🔍 URL 파라미터 확인:', { token: !!token, gitAuth });

        if (token && gitAuth === 'success') {
            console.log('✅ GitHub 토큰 발견, localStorage에 저장');
            // 토큰 저장
            localStorage.setItem('token', token);

            // 사용자 정보 가져오기
            fetchUserProfile(token);
        }
    }, [searchParams, navigate]);

    // 🔥 추가: 사용자 프로필 가져오기
    const fetchUserProfile = async (token) => {
        try {
            console.log('📡 사용자 프로필 요청 시작');
            const response = await fetch(`${API_URL}/api/user/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data.success) {
                console.log('✅ 프로필 가져오기 성공:', data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                setMessage('✅ GitHub 로그인 성공!');

                // URL 파라미터 제거하고 /aquarium으로 이동
                window.history.replaceState({}, '', '/login');
                setTimeout(() => {
                    navigate('/aquarium');
                }, 1000);
            } else {
                console.error('❌ 프로필 가져오기 실패:', data);
                setMessage('❌ 사용자 정보를 가져올 수 없습니다.');
            }
        } catch (error) {
            console.error('💥 프로필 가져오기 에러:', error);
            setMessage('❌ 로그인 처리 중 오류가 발생했습니다.');
        }
    };

    // 입력값 변경 처리
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // GitHub 로그인 처리
    const handleGitHubLogin = () => {
        const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;

        if (!clientId) {
            console.error('GitHub Client ID가 설정되지 않았습니다.');
            setMessage('❌ GitHub 로그인 설정이 올바르지 않습니다.');
            return;
        }

        console.log('🔗 GitHub 로그인 시작, Client ID:', clientId);

        const redirectUri = encodeURIComponent(`${API_URL}/api/user/oauth/github/callback`);
        const scope = encodeURIComponent('user:email repo');

        const githubAuthUrl = `https://github.com/login/oauth/authorize?` +
            `client_id=${clientId}&` +
            `redirect_uri=${redirectUri}&` +
            `scope=${scope}`;

        console.log('🌐 GitHub OAuth URL:', githubAuthUrl);

        // GitHub 페이지로 이동
        window.location.href = githubAuthUrl;
    };

    // 일반 로그인 처리
    const handleSubmit = async () => {
        if (!formData.email || !formData.password) {
            setMessage('❌ 이메일과 비밀번호를 입력해주세요.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(`${API_URL}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setMessage('✅ ' + data.message);

                // 토큰과 사용자 정보 저장
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                }

                // 대시보드로 이동
                setTimeout(() => {
                    navigate('/aquarium');
                }, 1000);
            } else {
                setMessage('❌ ' + data.message);
            }
        } catch (error) {
            console.error('로그인 에러:', error);
            setMessage('❌ 서버 연결에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // Enter 키 입력 처리
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    // 회원가입 페이지로 이동
    const goToSignup = () => {
        navigate('/user/signup');
    };

    return (
        <div className="screen">
            <div className="overlap-wrapper">
                <div className="overlap">
                    <div className="frame">
                        <div className="text-wrapper">🐠 Fishtank 로그인</div>

                        {/* 이메일 입력 */}
                        <div className="input-section">
                            <div className="label">이메일</div>
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onKeyPress={handleKeyPress}
                                    placeholder="이메일을 입력하세요"
                                    className="input-field"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* 비밀번호 입력 */}
                        <div className="input-section">
                            <div className="label">비밀번호</div>
                            <div className="input-wrapper">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onKeyPress={handleKeyPress}
                                    placeholder="비밀번호를 입력하세요"
                                    className="input-field"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* GitHub 로그인 버튼 */}
                        <div
                            className="github-login-container"
                            onClick={handleGitHubLogin}
                            style={{
                                cursor: 'pointer',
                                marginBottom: '15px'
                            }}
                        >
                            <div className="github-login-button">
                                <div className="github-icon-wrapper">
                                    <svg
                                        height="18"
                                        viewBox="0 0 16 16"
                                        width="18"
                                        fill="currentColor"
                                        style={{
                                            color: 'darkgray'
                                        }}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                                        />
                                    </svg>
                                </div>
                                <div className="github-login-text">GitHub로 로그인</div>
                            </div>
                        </div>

                        {/* 일반 로그인 버튼 */}
                        <div
                            className="submit-button"
                            onClick={handleSubmit}
                            style={{
                                opacity: loading ? 0.7 : 1,
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            <div className="button-text">
                                {loading ? '로그인 중...' : '이메일로 로그인'}
                            </div>
                        </div>

                        {/* 회원가입 링크 */}
                        <div style={{
                            textAlign: 'center',
                            marginTop: '15px'
                        }}>
                            <span style={{ color: '#666', fontSize: '14px' }}>
                                계정이 없으신가요?{' '}
                                <span
                                    onClick={goToSignup}
                                    style={{
                                        color: '#3498db',
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                        fontWeight: '500'
                                    }}
                                >
                                    회원가입하기
                                </span>
                            </span>
                        </div>

                        {/* 메시지 표시 */}
                        {message && (
                            <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}