// frontend/src/pages/Articles/ArticlesPage.tsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './articlesPage.css'; // Importe o CSS para esta página

// Importe as imagens que você usa no seu header
import profilePicHeader from '../../assets/imgHome/profile.png';
import defaultArticleImage from '../../assets/imgHome/cod.png'; // Um placeholder caso o artigo não tenha imagem

// Interface para um artigo (correspondente ao que o backend retorna)
interface Article {
    id: number;
    title: string;
    description: string;
    image_blob?: string; // Virá como base64 string (Data URL)
    image_mime_type?: string; // Pode ser útil se você precisar construir a Data URL, mas image_blob já deve ser uma Data URL
    date: string; // Virá como string, pode formatar
    author: string;
    user_id: number;
    content?: string;
}

const ArticlesPage: React.FC = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('http://localhost:3000/articles'); // Sua rota do backend
                if (response.ok) {
                    const data: Article[] = await response.json();
                    setArticles(data);
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || 'Erro ao carregar artigos.');
                }
            } catch (err) {
                console.error('Erro de rede ao buscar artigos:', err);
                setError('Erro de rede. Verifique sua conexão.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []); // Array de dependências vazio para rodar apenas uma vez ao montar o componente

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userAvatarBlobBase64'); // Remover o avatar também
        navigate('/'); // Redirecionar para a página de login
    };

    if (loading) {
        return <div className="articles-container loading">Carregando artigos...</div>;
    }

    if (error) {
        return <div className="articles-container error">Erro: {error}</div>;
    }

    return (
        <div className="articles-container">
            <header className="articles-header">
                <div className="articles-logo">M.</div>
                <nav className="articles-nav">
                    <Link to="/home">Home</Link>
                    <Link to="/articles">Artigos</Link> {/* Link para esta própria página */}
                    <span className="separator">|</span>
                    <Link to="/artigo" className="profile-link">
                        Publicar
                        <img src={profilePicHeader} alt="Profile" className="profile-pic" />
                    </Link>
                    <button className="btn-logout" onClick={handleLogout}>Sair</button>
                </nav>
            </header>

            <main className="articles-main-content">
                <h1 className="articles-page-title">Todos os Artigos</h1>
                <div className="articles-grid">
                    {articles.length === 0 ? (
                        <p>Nenhum artigo publicado ainda.</p>
                    ) : (
                        articles.map(article => (
                            <div key={article.id} className="article-card">
                                {article.image_blob ? (
                                    <img src={`data:${article.image_mime_type};base64,${article.image_blob}`} alt={article.title} className="article-card-image" />
                                ) : (
                                    <img src={defaultArticleImage} alt="Imagem Padrão" className="article-card-image" />
                                )}
                                <div className="article-card-content">
                                    <h2 className="article-card-title">{article.title}</h2>
                                    <p className="article-card-description">{article.description}</p>
                                    <div className="article-card-meta">
                                        <span>Por: {article.author}</span>
                                        <span>Em: {new Date(article.date).toLocaleDateString()}</span>
                                    </div>
                                    <Link to={`/artigo${article.id}`} className="read-more-button">Leia Mais</Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default ArticlesPage;