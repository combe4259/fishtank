import './App.css'
import Register from './components/Register.jsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from "./components/Login.jsx";
function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {/*경로설정*/}
                    <Route path="/" element={<Login/>} />
                    <Route path="/user/signup" element={<Register />} />
                </Routes>
            </Router>

        </div>
    )
}

export default App