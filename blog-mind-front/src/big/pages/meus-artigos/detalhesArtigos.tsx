// src/components/ArticleDetailScreen.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Importa useParams e useNavigate
import './ArticleDetail.css'; // O arquivo CSS para esta tela
import profilePic from '../../assets/imgHome/profile.png'; // Importa a imagem de perfil para o header

// Interface para definir a estrutura de dados de um artigo (reflete o que vem do backend)
interface Article {
    id: number;
    title: string;
    description: string; // Lembre-se que em seu backend atual, 'description' é o conteúdo completo
    image_blob?: string; // Base64 da imagem, opcional
    image_mime_type?: string; // Tipo MIME da imagem (ex: 'image/jpeg'), opcional
    date: string;
    author: string;
    user_id: number; // Adicionado user_id para consistência, embora não usado diretamente aqui
}

const ArticleDetailScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Pega o ID do artigo da URL
    const navigate = useNavigate(); // Hook para navegação
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null); // Para o header e verificação

    // Efeito para carregar o e-mail e ID do usuário no header
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

    // Efeito para buscar os detalhes do artigo
    useEffect(() => {
        const fetchArticle = async () => {
            if (!id) { // Evita buscar se o ID não estiver presente na URL
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
    }, [id]); // Dependência do ID, para re-buscar se o ID na URL mudar

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userId'); // Remove o userId também
        setUserEmail(null);
        setUserId(null);
        alert('Você foi desconectado.');
        navigate('/login'); // Redireciona para a página de login após o logout
    };

    if (loading) {
        return <div className="article-detail-container loading">Carregando artigo...</div>;
    }

    if (error) {
        return <div className="article-detail-container error">{error}</div>;
    }

    if (!article) {
        return <div className="article-detail-container not-found">Artigo não encontrado.</div>;
    }

    // Formatar a data
    const articleDate = new Date(article.date).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="article-detail-container">
             {/* Header (copiado da HomeScreen para manter a consistência) */}
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

            {/* Conteúdo do Artigo */}
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
                    {/* Aqui vai o CONTEÚDO PRINCIPAL do artigo.
                        Conforme discutido, estou usando 'description' como o corpo completo
                        com base no seu backend atual. Se você tiver um campo 'content'
                        dedicado para o corpo completo, substitua 'article.description' por ele.
                    */}
                    <p>{article.description}</p>
                </div>

                {/* Botão de Voltar para a lista de artigos (ou Home) */}
                <div className="back-button-container">
                    <Link to="/" className="back-button">Voltar para a Home</Link>
                </div>
            </main>
        </div>
    );
};

export default ArticleDetailScreen;