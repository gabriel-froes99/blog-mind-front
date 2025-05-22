import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      

      if (response.ok) {
        const data = await response.json();
        console.log('Login bem-sucedido:', data);
        alert('Login realizado com sucesso!');
        navigate('/home'); 
      } else {
        
        const errorStatus = response.status;
        let errorMessage = response.statusText; 
        try {
          const errorData = await response.json(); 
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (jsonError) {
          console.warn('Não foi possível parsear a resposta de erro como JSON:', jsonError);
        }
        console.error(`Falha no login: Status ${errorStatus}`, errorMessage);
        alert(`Erro no login (Código: ${errorStatus}): ${errorMessage}`);
      }
    } catch (error: any) { // Captura erros de rede ou outros que impedem a requisição
      console.error('Erro ao conectar com o servidor:', error);
      let alertMessage = 'Não foi possível conectar ao servidor. Tente novamente mais tarde.';
      if (error && error.message) {
        alertMessage += ` Detalhe: ${error.message}`;
      }
      alert(alertMessage);
    };
  };

  return (
     <div className="container">
      <div className="left">
        <div className="logo-box">
          <h1 className="logo">M.</h1>
          <p className="slogan">Inovação ao seu alcance.</p>
        </div>
      </div>

      {/* Lado direito */}
      <div className="right">
        <div className="form-box">
          <h2>Conectar</h2>
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

            <div className="forgot-password">
              <Link to="/esqueci"><a href="#">Esqueceu a senha?</a></Link>
            
            </div>  

            <button type="submit">Entrar</button>
            <Link to="/cadastro">
              <p className="signup">
                Novo usuário? <a href="#">Clique aqui</a>
              </p>
            </Link>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;