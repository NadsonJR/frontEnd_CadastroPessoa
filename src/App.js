import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Register from './Components/Cadastro/Register';
import Home from './Components/Home/Home';

function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = (loginData) => {
    console.log('Login data:', loginData);
  };

  const handleRegister = () => {
    setIsRegistering(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} onSwitchToRegister={() => setIsRegistering(true)} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} onBack={() => setIsRegistering(false)} />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;