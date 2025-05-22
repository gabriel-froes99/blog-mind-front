// src/components/MeusArtigos.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './meusArtigos.css'; // O arquivo CSS que criaremos para esta tela
import profilePic from '../../assets/imgHome/profile.png'; // Imagem de perfil para o header

// Interface para definir a estrutura de dados de um artigo
interface Article {
    id: number;
    title: string;
    description: string; // Ou content, se você tiver um campo de conteúdo completo
    image_blob?: string; // Opcional, pois pode não ter imagem
    image_mime_type?: string; // Opcional
    date: string;
    author: string;
    user_id: number; // Garanta que este campo venha do backend
}

const MeusArtigos: React.FC = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    // Efeito para carregar o e-mail e ID do usuário para o header e para a busca
    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        const storedUserId = localStorage.getItem('userId');
        if (email) {
            setUserEmail(email);
        }
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            // Se não houver userId, o usuário não está logado, redireciona
            alert('Você precisa estar logado para ver seus artigos.');
            navigate('/login');
        }
    }, [navigate]);

    // Efeito para buscar os artigos do usuário
    useEffect(() => {
        const fetchMyArticles = async () => {
            if (!userId) return; // Não tenta buscar se o userId ainda não foi carregado

            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3000/articles/user/${userId}`);
                if (!response.ok) {
                    throw new Error(`Erro HTTP! Status: ${response.status}`);
                }
                const data = await response.json();
                setArticles(data);
            } catch (err: any) {
                console.error("Erro ao buscar meus artigos:", err);
                setError("Não foi possível carregar seus artigos. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchMyArticles();
    }, [userId]); // Re-busca se o userId mudar

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userId'); // Remove o userId também
        setUserEmail(null);
        setUserId(null);
        alert('Você foi desconectado.');
        navigate('/');
    };

    const handleDeleteArticle = async (articleId: number) => {
        if (!window.confirm('Tem certeza que deseja excluir este artigo?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/articles/${articleId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': userId || '', // Envia o userId no header para verificação no backend
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Erro HTTP! Status: ${response.status}`);
            }

            alert('Artigo excluído com sucesso!');
            // Atualiza a lista de artigos removendo o artigo excluído
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
            {/* Header (copiado da HomeScreen/ArticleDetailScreen para manter a consistência) */}
            <header className="header">
                <div className="logo">M.</div>
                <nav className="nav">
                    <Link to="/">Home</Link>
                    <Link to="/articles">Artigos</Link> {/* Link para a tela de todos os artigos, se tiver */}

                    {userEmail ? (
                        <>
                            <span className="user-email">{userEmail}</span>
                            <Link to="/artigo" className="profile-link">
                                Publicar
                                <img src={profilePic} alt="Profile" className="profile-pic" />
                            </Link>
                            {/* Link para Meus Artigos */}
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

            {/* Conteúdo principal da tela "Meus Artigos" */}
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
                                        <Link to={`/editar/${article.id}`} className="btn-edit">Editar</Link> {/* Rota para edição */}
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