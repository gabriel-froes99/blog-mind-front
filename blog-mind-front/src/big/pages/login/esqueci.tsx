import React, { useState } from 'react';
import './esqueci.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/imgHome/logo.png';

const Esqueci = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); 


    console.log('Email:', email);
    console.log('Nova Senha:', newPassword);
    console.log('Confirmar Senha:', confirmPassword);

    if (newPassword !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    
    alert('');
  };

  return (
    <div className="container">
      <div className="left">
        <div className="logo-box">
          <img src={Logo} alt="Logo" className="logo" />
          <p className="slogan">Inovação ao Seu Alcance.</p>
        </div>
      </div>

      <div className="right">
        <div className="form-box">
          <h2>Esqueci a senha</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="newPassword">Senha</label>
            <input
              type="password"
              id="newPassword"
              placeholder="****"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <label htmlFor="confirmPassword">Confirmar senha</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="****"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit">Alterar</button>
          <Link to="/">
            <p className="login-link">
              Já tem cadastro? <a href="#">Clique aqui</a>
            </p>
          </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Esqueci;