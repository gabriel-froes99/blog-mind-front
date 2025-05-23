import React, { useState } from 'react';
import './cadastro.css'; 
import { Link } from 'react-router-dom'; 
import Logo from '../../assets/imgHome/logo.png';

const Registrar = () => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      try {
        const response = await fetch('http://localhost:3000/cadastro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password,confirmPassword }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('cadastro bem-sucedido:', data);
          alert('cadastro realizado com sucesso!');
          // Aqui você pode redirecionar o usuário ou salvar o token de autenticação, por exemplo.
        } else {
          // A requisição foi feita, mas o servidor respondeu com um erro (4xx, 5xx)
          const errorStatus = response.status;
          let errorMessage = response.statusText; // Fallback inicial
          try {
            const errorData = await response.json(); // Tenta ler o corpo do erro como JSON
            if (errorData && errorData.message) {
              errorMessage = errorData.message;
            }
          } catch (jsonError) {
            // O corpo do erro não era JSON ou houve outro erro ao parsear.
            // errorMessage já é response.statusText, o que é um bom fallback.
            console.warn('Não foi possível parsear a resposta de erro como JSON:', jsonError);
          }
          console.error(`Falha no cadastro: Status ${errorStatus}`, errorMessage);
          alert(`Erro no cadastro (Código: ${errorStatus}): ${errorMessage}`);
        }
      } catch (error: any) { // Captura erros de rede ou outros que impedem a requisição
        console.error('Erro ao conectar com o servidor:', error);
        let alertMessage = 'Não foi possível conectar ao servidor. Tente novamente mais tarde.';
        if (error && error.message) {
          alertMessage += ` Detalhe: ${error.message}`;
        }
        alert(alertMessage);
      }
    };

  return (
    <div className="container">
      <div className="left">
        <div className="logo-box">
          <img src={Logo} alt="Logo" className="logo-img" />
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