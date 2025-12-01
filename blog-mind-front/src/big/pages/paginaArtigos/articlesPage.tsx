// frontend/src/pages/Articles/ArticlesPage.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './articlesPage.css';
import defaultArticleImage from '../../assets/imgHome/cod.png';
import NavBar from '../../components/navBar/navBar';

interface Article {
    id: number;
    title: string;
    description: string;
    image_blob?: string;
    image_mime_type?: string;
    date: string;
    author: string;
    user_id: number;
    content?: string;
}

const ArticlesPage: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('http://localhost:3000/articles');
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
    }, []);


    if (loading) {
        return <div className="articles-container loading">Carregando artigos...</div>;
    }

    if (error) {
        return <div className="articles-container error">Erro: {error}</div>;
    }

    return (
        <div className="articles-container">
            
            <NavBar />

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
                                    <Link to={`/articles/${article.id}`} className="read-more-button">Leia Mais</Link>
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