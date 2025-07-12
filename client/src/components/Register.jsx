import React, { useState } from "react";
import "./Register.css";

export default function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // 입력값 변경 처리
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // 회원가입 처리
    const handleSubmit = async () => {
        if (!formData.email || !formData.password) {
            setMessage('모든 필드를 입력해주세요.');
            return;
        }
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:3001/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setMessage(data.message);
                setFormData({ email: '', password: '' });
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('회원가입 에러:', error);
            setMessage('서버 연결에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="screen">
            <div className="overlap-wrapper">
                <div className="overlap">
                    <div className="frame">
                        <div className="text-wrapper">🐠 Fishtank 회원가입</div>


                        {/* 이메일 입력 */}
                        <div className="input-section">
                            <div className="label">이메일</div>
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="이메일을 입력하세요"
                                    className="input-field"
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
                                    placeholder="비밀번호를 입력하세요"
                                    className="input-field"
                                />
                            </div>
                        </div>

                        {/* 회원가입 버튼 */}
                        <div
                            className="submit-button"
                            onClick={handleSubmit}
                            style={{
                                opacity: loading ? 0.7 : 1,
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            <div className="button-text">
                                {loading ? '가입 중...' : '회원가입'}
                            </div>
                        </div>

                        {/* 로그인 페이지로 이동 링크 */}
                        <div style={{
                            textAlign: 'center',
                            marginTop: '15px'
                        }}>
                            <span style={{ color: '#666', fontSize: '14px' }}>
                        이미 계정이 있으신가요?{' '}
                            <span onClick={() => window.location.href = '/'}>
                            로그인하기
                            </span>
                        </span>
                        </div>




                         {/*메시지 표시 */}
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