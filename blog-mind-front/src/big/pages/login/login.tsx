import './login.css';
import { Link } from "react-router-dom";


function Login() {
  return (
     <div className="container">
      <div className="left">
        <div className="logo-box">
          <h1 className="logo">M.</h1>
          <p className="slogan">Innovation. Science. Excellence.</p>
        </div>
      </div>

      {/* Lado direito */}
      <div className="right">
        <div className="form-box">
          <h2>Conectar</h2>
          <form>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="email@email.com" />

            <label htmlFor="senha">Senha</label>
            <input type="password" id="senha" placeholder="****" />

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
