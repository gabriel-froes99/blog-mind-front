
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './meusArtigos.css'; 
 
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
}

const MeusArtigos: React.FC = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

   
    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        const storedUserId = localStorage.getItem('userId');
        if (email) {
            setUserEmail(email);
        }
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            
            alert('Você precisa estar logado para ver seus artigos.');
            navigate('/');
        }
    }, [navigate]);

   
    useEffect(() => {
        const fetchMyArticles = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) return; 

            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3000/api/auth/UserArticles/${userId}`);
                if (!response.ok) {
                    throw new Error(`Erro HTTP! Status: ${response.status}`);
                }
                const data: any = await response.json();
                // Extract articles array from the API response
                let parsedArticles: Article[] = [];
                if (Array.isArray(data)) {
                    parsedArticles = data;
                } else if (data?.data && Array.isArray(data.data)) {
                    parsedArticles = data.data;
                } else if (data?.articles && Array.isArray(data.articles)) {
                    parsedArticles = data.articles;
                } else {
                    console.warn('Unexpected response shape for UserArticles:', data);
                }
                setArticles(parsedArticles);
            } catch (err: any) {
                console.error("Erro ao buscar meus artigos:", err);
                setError("Não foi possível carregar seus artigos. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchMyArticles();
    }, [userId]); 

    const handleDeleteArticle = async (articleId: number) => {
        if (!window.confirm('Tem certeza que deseja excluir este artigo?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/articles/${articleId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': userId || '', 
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Erro HTTP! Status: ${response.status}`);
            }

            alert('Artigo excluído com sucesso!');
          
            setArticles(prevArticles => prevArticles.filter(article => article.id !== articleId));
        } catch (err: any) {
            console.error('Erro ao excluir artigo:', err);
            alert(`Erro ao excluir artigo: ${err.message}`);
        }
    };

    if (loading) {
        return <div className="meus-artigos-container loading">Carregando seus artigos...</div>;
    }

    if (error) {
        return <div className="meus-artigos-container error">{error}</div>;
    }

    return (
        <div className="meus-artigos-container">
            
            <NavBar />

           
            <main className="meus-artigos-main-content">
                <h1 className="meus-artigos-title">Meus Artigos</h1>

                {articles.length === 0 ? (
                    <p className="no-articles-message">Você ainda não publicou nenhum artigo.</p>
                ) : (
                    <div className="articles-grid">
                        {articles.map((article) => (
                            <div key={article.id} className="article-card">
                                {article.image_blob && article.image_mime_type && (
                                    <img
                                        src={`data:${article.image_mime_type};base64,${article.image_blob}`}
                                        alt={article.title}
                                        className="article-card-image"
                                    />
                                )}
                                <div className="article-card-content">
                                    <h2 className="article-card-title">{article.title}</h2>
                                    <p className="article-card-description">{article.description.substring(0, 150)}...</p>
                                    <div className="article-card-meta">
                                        <span>Por {article.author}</span>
                                        <span>{new Date(article.date).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                    <div className="article-card-actions">
                                        <Link to={`/articles/${article.id}`} className="btn-view">Ver</Link>
                                        <Link to={`/editar/${article.id}`} className="btn-edit">Editar</Link> 
                                        <button onClick={() => handleDeleteArticle(article.id)} className="btn-delete">Excluir</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default MeusArtigos;