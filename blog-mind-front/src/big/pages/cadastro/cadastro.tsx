import React, { useState } from 'react';
import './cadastro.css'; 
import { Link } from 'react-router-dom'; 

const Registrar = () => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); 
    // A lógica de backend
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    console.log('Formulário de registro enviado. Dados:', { email, password, confirmPassword });
  
    alert('Conta criada com sucesso!');
  };

  return (
    <div className="container">
      <div className="left">
        <div className="logo-box">
          <h1 className="logo">M.</h1>
          <p className="slogan">Inovação ao Seu Alcance.</p>
        </div>
      </div>

    
      <div className="right">
        <div className="form-box">
          <h2>Registrar</h2>
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

            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              placeholder="****"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label htmlFor="confirmar">Confirmar senha</label>
            <input
              type="password"
              id="confirmar"
              placeholder="****"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit">Criar conta</button>
        <Link to="/">
            <p className="login-link">
              Já tem cadastro? <a>Clique aqui</a>
            </p>
        </Link>
"
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registrar;