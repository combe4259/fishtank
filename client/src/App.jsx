
import React from 'react';
import './App.css'
import Register from './components/Register.jsx'
import Login from "./components/Login.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AuthGuard from './components/auth/AuthGuard.jsx';
import AquariumApp from './pages/AquariumApp.jsx'

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/user/signup" element={<Register />} />

                    <Route
                        path="/aquarium"
                        element={
                            <AuthGuard>
                                <AquariumApp />
                            </AuthGuard>
                        }
                    />

                    {/* 잘못된 경로 처리 */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App