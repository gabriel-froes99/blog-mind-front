
import { useState, useEffect } from 'react'; // Importar useState e useEffect
import './home.css';
import CellImage from '../../assets/imgHome/cell.png';
import CodImage from '../../assets/imgHome/cod.png';
import TsImage from '../../assets/imgHome/ts.png';
import profilePic from '../../assets/imgHome/default-avatar.png'; // Importar a imagem de perfil
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate para redirecionamento no logout
import Logo from '../../assets/imgHome/logo.png';


const HomeScreen = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    // Ao carregar o componente, tenta obter o e-mail do localStorage
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
  }, []); // O array vazio [] garante que este efeito roda apenas uma vez, na montagem do componente

  const handleLogout = () => {
    localStorage.removeItem('userEmail'); // Remove o e-mail do localStorage
    localStorage.removeItem('userId'); // **Adicionado: Remover o userId também**
    setUserEmail(null); // Limpa o estado
    alert('Você foi desconectado.');
    navigate('/'); 
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header"> 
        <img src={Logo} alt="Logo" className="logo" />
        <nav className="nav"> 
          <Link to="/home">Home</Link>
          <Link to="/artigos">Artigos</Link> 

          {userEmail ? (
            // Se o e-mail existir (usuário logado)
            <>
              {/* Span para exibir o e-mail do usuário */}
              <span className="user-email">{userEmail}</span>

              {/* Link Publicar com imagem de perfil */}
              <Link to="/artigo" className="profile-link">
                Publicar
                <img src={profilePic} alt="Profile" className="profile-pic" />
              </Link>
              
              {/* BOTÃO/LINK "MEUS ARTIGOS" ADICIONADO AQUI */}
              <Link to="/meus-artigos" className="my-articles-link">Meus Artigos</Link>

              {/* Botão de Sair */}
              <button className="btn-logout" onClick={handleLogout}>Sair</button>
            </>
          ) : (
            // Se não houver e-mail (usuário não logado)
            <div className="auth-links"> {/* Mantendo sua classe 'auth-links' */}
              <Link to="/">Entrar</Link> {/* Ajustado para /login */}
              <Link to="/cadastro">Registrar</Link> {/* Ajustado para /cadastro */}
            </div>
          )}
        </nav>
      </header>

      <div className="content">
        {/* Sidebar */}
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

        {/* Main Content */}
        <main className="main-content">
          {/* Featured Article */}
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

          {/* Read More Button */}
          <div className="read-more">
            {/* Você pode ajustar este botão "LER MAIS" para ir para o ArticleDetailScreen com um ID real */}
            <button>LER MAIS</button> 
          </div>

          {/* Secondary Articles - CONTAINER CORRETO */}
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