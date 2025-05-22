
import './home.css';
import CellImage from '../../assets/imgHome/cell.png'; // Usado para 5G
import CodImage from '../../assets/imgHome/cod.png';   // Usado para Artigo Destaque e Blockchain
import TsImage from '../../assets/imgHome/ts.png';     // Usado para TypeScript
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="logo">M.</div>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/articles">Artigos</a>
          <Link to="/artigo">
            <a >publicar</a>
          </Link>
          <div className="auth-links">
            <a href="/login">Entrar</a>
            <a href="/register">Registrar</a>
          </div>
        </nav>
      </header>

      <div className="content">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2 className="sidebar-title">New</h2> {/* Título "New" ou "Novo" */}

          <div className="sidebar-article">
            {/* Imagem oculta via CSS, se quiser que ela apareça, remova o display: none do CSS */}
            {/* <img src={CellImage} alt="Celular" className="article-image" /> */}
            <h3>Inteligência Artificial: O Futuro da Automação e da Transformação Digital</h3>
            <p>Neste artigo, exploramos como a inteligência artificial está mudando o futuro dos negócios e da teoria.</p>
          </div>

          <div className="sidebar-article">
            {/* <img src={CodImage} alt="Código" className="article-image" /> */}
            <h3>Computação Quantica: O Próximo Grande Saito para a Tecnologia</h3>
            <p>A computação quantica permite revalucizar a transparência processual na informação, aumentado as limitações dos computadores tradicionais.</p>
          </div>

          <div className="sidebar-article">
            {/* <img src={TsImage} alt="TypeScript" className="article-image" /> */}
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
                {/* As estatísticas (visualizações/comentários) não aparecem na imagem principal, 
                    então removi para ser fiel ao design. Se precisar, descomente. */}
                {/* <span>56 visualizações</span>
                <span>01 comentário</span> */}
              </div>
            </div>
          </article>

          {/* Read More Button */}
          <div className="read-more">
            <button>LER MAIS</button>
          </div>

           {/* Secondary Articles - CONTAINER CORRETO */}
          <div className="secondary-articles-grid"> {/* <-- ESTE DIV É CRUCIAL */}
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
          </div> {/* <-- Feche este div */}
        </main>
      </div>
    </div>
  );
};

export default HomeScreen;