import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importando o arquivo CSS

function Login({ onSwitchToRegister }) {
  const [loginData, setLoginData] = useState({
    email: '',
    senha: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5550/pessoas/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
      .then(response => {
        if (response.ok) {
          toast.success('Login realizado com sucesso');
          setTimeout(() => {
            navigate('/home');
          }, 2000);
        } else {
          throw new Error('Verifique se o login e a senha estão corretos');
        }
      })
      .catch(error => {
        toast.error('Erro ao realizar login: ' + error.message);
      });
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>E-mail:</label>
          <input type="text" name="email" value={loginData.email} onChange={handleChange} className="form-input" />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input type="password" name="senha" value={loginData.senha} onChange={handleChange} className="form-input" />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="register-prompt">Não tem uma conta?</p>
      <button onClick={handleRegisterClick} className="register-button">Cadastrar</button>
      <ToastContainer />
    </div>
  );
}

export default Login;