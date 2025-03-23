import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Importando o arquivo CSS
function Register({ onRegister, onBack }) {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    telefone: '',
    senha: '',
    cep: '',
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
    estado: ''
  });

  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setFormData({
      ...formData,
      email: newEmail
    });

    fetch(`http://localhost:5550/pessoas/check-email?email=${newEmail}`)
      .then(response => response.text().then(message => ({ status: response.status, message })))
      .then(({ status, message }) => {
        if (status === 409) {
          setEmailError(message);
        } else {
          setEmailError('');
        }
      })
      .catch(error => {
        console.error('Error checking email:', error);
      });
  };

  const handleCepSearch = () => {
    fetch(`http://localhost:5550/endereco/cep/${formData.cep}`)
      .then(response => response.json())
      .then(data => {
        setFormData({
          ...formData,
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf,
          estado: data.estado
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleBackClick = () => {
      navigate('/');
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5550/pessoas/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(pessoaData => {
        console.log('Pessoa cadastrada com sucesso:', pessoaData);
        const enderecoData = {
          cep: formData.cep,
          logradouro: formData.logradouro,
          bairro: formData.bairro,
          localidade: formData.localidade,
          uf: formData.uf,
          estado: formData.estado,
          pessoaId: pessoaData.id // Use the returned id from pessoa creation
        };

        return fetch('http://localhost:5550/endereco/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(enderecoData)
        });
      })
      .then(response => response.json())
      .then(data => {
        console.log('Endereço cadastrado com sucesso:', data);
        toast.success('Cadastro realizado com sucesso!');
        setTimeout(() => {
          navigate('/'); // Redirect to login page
        }, 2000); // Delay of 2 seconds before redirecting
      })
      .catch((error) => {
        console.error('Erro ao cadastrar:', error);
        toast.error('Erro ao realizar o cadastro.');
      });
  };

  return (
    <div className = "register-container">
      <h2 className = "register-title">Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input className="form-input" required type="text" name="nome" value={formData.nome} onChange={handleChange} minLength="3" />
        </div>
        <div className="form-group">
          <label>CPF:</label>
          <input className="form-input" required type="text" name="cpf" value={formData.cpf} onChange={handleChange} minLength="11" />
        </div>
        <div className="form-group">
          <label>Data de Nascimento:</label>
          <input className="form-input"  required type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input className="form-input"  type="email" name="email" value={formData.email} onChange={handleEmailChange} />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        </div>
        <div className="form-group">
          <label>Telefone:</label>
          <input className="form-input"  required type="text" name="telefone" value={formData.telefone} onChange={handleChange} minLength="10" />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input className="form-input"  required type="password" name="senha" value={formData.senha} onChange={handleChange} minLength="6" />
        </div>
        <div className="form-group">
          <label>Cep:</label>
          <input className="form-input"  type="text" name="cep" value={formData.cep} onChange={handleChange} minLength="8" />
          <button className="search-cep-button" type="button" onClick={handleCepSearch}>Buscar Cep</button>
        </div>
        <div className="form-group">
          <label>Logradouro:</label>
          <input className="form-input"  required type="text" name="logradouro" value={formData.logradouro} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Bairro:</label>
          <input className="form-input"  required type="text" name="bairro" value={formData.bairro} onChange={handleChange} readOnly/>
        </div>
        <div className="form-group">
          <label>Localidade:</label>
          <input className="form-input"  required type="text" name="localidade" value={formData.localidade} onChange={handleChange}  readOnly/>
        </div>
        <div className="form-group">
          <label>UF:</label>
          <input className="form-input"  required type="text" name="uf" value={formData.uf} onChange={handleChange} readOnly />
        </div>
        <div className="form-group">
          <label>Estado:</label>
          <input className="form-input"  required type="text" name="estado" value={formData.estado} onChange={handleChange} readOnly />
        </div>
        <button type="submit" className="register-button" >Cadastrar</button>
        <button type="button" className="back-button" onClick={handleBackClick}>Voltar</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;