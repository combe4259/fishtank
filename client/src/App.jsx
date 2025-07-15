import React from 'react';
import './App.css'
import Register from './components/Register.jsx'
import Login from "./components/Login.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// import AuthGuard from './components/auth/AuthGuard.jsx'; // 임시 주석
import AquariumApp from './pages/AquariumApp.jsx'

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/user/signup" element={<Register />} />

                    {/* AuthGuard 임시 제거 */}
                    <Route
                        path="/aquarium"
                        element={<AquariumApp />}
                    />

                    {/* 잘못된 경로 처리 */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App