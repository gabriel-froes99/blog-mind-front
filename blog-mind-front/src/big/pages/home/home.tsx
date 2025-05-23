
import { useState, useEffect } from 'react'; 
import './home.css';
import CellImage from '../../assets/imgHome/cell.png';
import CodImage from '../../assets/imgHome/cod.png';
import TsImage from '../../assets/imgHome/ts.png';
import profilePic from '../../assets/imgHome/default-avatar.png'; 
import { Link, useNavigate } from 'react-router-dom'; 
import Logo from '../../assets/imgHome/logo.png';


const HomeScreen = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem('userEmail'); 
    localStorage.removeItem('userId'); 
    setUserEmail(null); 
    alert('Você foi desconectado.');
    navigate('/'); 
  };

  return (
    <div className="home-container">
      
      <header className="header"> 
        <img src={Logo} alt="Logo" className="logo" />
        <nav className="nav"> 
          <Link to="/home">Home</Link>
          <Link to="/artigos">Artigos</Link> 

          {userEmail ? (
            <>
           
              <span className="user-email">{userEmail}</span>

              <Link to="/artigo" className="profile-link">
                Publicar
                <img src={profilePic} alt="Profile" className="profile-pic" />
              </Link>
              
            
              <Link to="/meus-artigos" className="my-articles-link">Meus Artigos</Link>

           
              <button className="btn-logout" onClick={handleLogout}>Sair</button>
            </>
          ) : (
         
            <div className="auth-links"> 
              <Link to="/">Entrar</Link> 
              <Link to="/cadastro">Registrar</Link> 
            </div>
          )}
        </nav>
      </header>

      <div className="content">
  
        <aside className="sidebar">
          <h2 className="sidebar-title">New</h2>

          <div className="sidebar-article">
            <h3>Inteligência Artificial: O Futuro da Automação e da Transformação Digital</h3>
            <p>Neste artigo, exploramos como a inteligência artificial está mudando o futuro dos negócios e da teoria.</p>
          </div>

          <div className="sidebar-article">
            <h3>Computação Quantica: O Próximo Grande Saito para a Tecnologia</h3>
            <p>A computação quantica permite revalucizar a transparência processual na informação, aumentado as limitações dos computadores tradicionais.</p>
          </div>

          <div className="sidebar-article">
            <h3>Como a Internet das Coisas (IoT) Está Moldando o Futuro das Cidades Inteligentes</h3>
            <p>A Internet das Coisas (IoT) é um dos países das coisas inteligentes, conectando dispositivos de alta a alta a internet.</p>
          </div>
        </aside>

     
        <main className="main-content">
         
          <article className="featured-article">
            <img src={CodImage} alt="Artigo destaque" className="featured-image" />
            <div className="article-content">
              <h2>Desvendando o JavaScript: Dicas e Técnicas Essenciais para Desenvolvedores</h2>
              <div className="article-meta">
                <span>Por John Doe</span>
                <span>Março 20, 2025</span>
              </div>
            </div>
          </article>

       
          <div className="read-more">
          
            <button>LER MAIS</button> 
          </div>

          
          <div className="secondary-articles-grid">
            <article className="secondary-article" data-number="01">
              <img src={CellImage} alt="5G" className="article-thumbnail" />
              <div className="article-info">
                <h3>5 Gerações de Redes 5G: O Que Esperar da Próxima Revolução da Conectividade</h3>
                <div className="article-meta">
                  <span>Março 19, 2025</span>
                </div>
              </div>
            </article>

            <article className="secondary-article" data-number="02">
              <img src={CodImage} alt="Blockchain" className="article-thumbnail" />
              <div className="article-info">
                <h3>Blockchain Além das Criptomoedas: Como a Tecnologia Está Transformando Indústrias Trad...</h3>
                <div className="article-meta">
                  <span>Março 18, 2025</span>
                </div>
              </div>
            </article>

            <article className="secondary-article" data-number="03">
              <img src={TsImage} alt="TypeScript" className="article-thumbnail" />
              <div className="article-info">
                <h3>Dominando TypeScript: Por que a Tipagem Estática Está Transformando o Desenvolvimento</h3>
                <div className="article-meta">
                  <span>Março 16, 2025</span>
                </div>
              </div>
            </article>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeScreen;