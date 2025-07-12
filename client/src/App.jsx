import React, { useState } from 'react';
import './App.css'
import Register from './components/Register.jsx'
import Login from "./components/Login.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// 아쿠아리움 관련 컴포넌트들
import Navbar from './components/common/Navbar/Navbar';
import MyAquarium from './pages/Myaquarium/MyAquarium.jsx';
import Shop from './pages/Shop/shop.jsx';
import FriendsAquarium from './pages/FriendsAquarium/FriendsAquarium.jsx';
import Profile from './pages/Profile/Profile.jsx';

function App() {
    const [activeTab, setActiveTab] = useState('myAquarium');

    const renderAquariumContent = () => {
        switch (activeTab) {
            case 'myAquarium':
                return <MyAquarium />;
            case 'shop':
                return <Shop />;
            case 'friends':
                return <FriendsAquarium />;
            case 'profile':
                return <Profile />;
            default:
                return <MyAquarium />;
        }
    };

    // 아쿠아리움 페이지 컴포넌트
    const AquariumPage = () => {
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
            }
        };

        return (
            <div style={styles.container}>
                <div style={styles.backgroundOverlay}></div>

                <div style={styles.mainWrapper}>
                    <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
                    <main>{renderAquariumContent()}</main>
                </div>
            </div>
        );
    };

    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* 인증 관련 경로 */}
                    <Route path="/" element={<Login/>} />
                    <Route path="/user/signup" element={<Register />} />

                    {/* 아쿠아리움 앱 경로 */}
                    <Route path="/aquarium" element={<AquariumPage />} />

                    {/* 잘못된 경로는 로그인으로 리다이렉트 */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App