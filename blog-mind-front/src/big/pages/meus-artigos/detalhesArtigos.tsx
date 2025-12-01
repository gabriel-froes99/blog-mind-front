// src/components/ArticleDetailScreen.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; 
import './ArticleDetail.css'; 
import profilePic from '../../assets/imgHome/profile.png'; 
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
    content: string;
}

const ArticleDetailScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>();  
    const [article, setArticle] = useState<Article | null>(null);
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
        }
    }, []);

 
    useEffect(() => {
        const fetchArticle = async () => {
            if (!id) { 
                setError("ID do artigo não fornecido.");
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`http://localhost:3000/articles/${id}`);
                if (!response.ok) {
                    throw new Error(`Erro HTTP! Status: ${response.status}`);
                }
                const data = await response.json();
                setArticle(data);
            } catch (err: any) {
                console.error("Erro ao buscar artigo:", err);
                setError("Não foi possível carregar o artigo. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]); 

 

    if (loading) {
        return <div className="article-detail-container loading">Carregando artigo...</div>;
    }

    if (error) {
        return <div className="article-detail-container error">{error}</div>;
    }

    if (!article) {
        return <div className="article-detail-container not-found">Artigo não encontrado.</div>;
    }

    
    const articleDate = new Date(article.date).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="article-detail-container">
            
            <div className='nav-bar'>
                <NavBar />
            </div>

          
            <main className="article-content-wrapper">
                <h1 className="article-detail-title">{article.title}</h1>
                <p className="article-detail-description">{article.description}</p>
                <div className="article-detail-meta">
                    <span className="article-detail-author">Por {article.author}</span>
                    <span className="article-detail-date">{articleDate}</span>
                </div>

                {article.image_blob && article.image_mime_type && (
                    <div className="article-detail-image-container">
                        <img
                            src={`data:${article.image_mime_type};base64,${article.image_blob}`}
                            alt={article.title}
                            className="article-detail-image"
                        />
                    </div>
                )}

                <div className="article-detail-body">
                 
                <p className="article-detail-description">{article.content}</p>
                    <p>{article.description}</p>
                </div>

              
                <div className="back-button-container">
                    <Link to="/home" className="back-button">Voltar para a Home</Link>
                </div>
            </main>
        </div>
    );
};

export default ArticleDetailScreen;