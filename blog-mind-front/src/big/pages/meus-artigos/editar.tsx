// src/big/pages/publicar/EditarArtigo.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './editar.css'; 

// Importe os ícones/imagens necessários.
import profilePic from '../../assets/imgHome/profile.png'; 
import imageIcon from '../../assets/imgHome/placeholder.png';

interface Article {
    id: number;
    title: string;
    description: string;
    content: string; 
    author: string;
    date: string;
    image_blob?: string; 
    image_mime_type?: string; 
    user_id: number;
}

const EditarArtigo: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [selectedFileName, setSelectedFileName] = useState('');
    const [imageBlobData, setImageBlobData] = useState<string | null>(null);
    const [imageMimeType, setImageMimeType] = useState<string | null>(null);
    const [articleContent, setArticleContent] = useState('');
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    
    useEffect(() => {
        const userIdString = localStorage.getItem('userId');
        if (userIdString) {
            setCurrentUserId(parseInt(userIdString, 10));
        } else {
            alert('Você precisa estar logado para editar um artigo.');
            navigate('/login');
        }
    }, [navigate]);

   
    useEffect(() => {
        const fetchArticle = async () => {
            if (!id) {
                setError("ID do artigo não fornecido para edição.");
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`http://localhost:3000/articles/${id}`);
                if (!response.ok) {
                    throw new Error(`Erro HTTP! Status: ${response.status}`);
                }
                const data: Article = await response.json();

               
                const loggedInUserId = parseInt(localStorage.getItem('userId') || '0', 10);
                if (data.user_id !== loggedInUserId) {
                    alert('Você não tem permissão para editar este artigo.');
                    navigate('/meus-artigos'); 
                    return;
                }

                
                setTitle(data.title);
                setDescription(data.description);
                setAuthor(data.author);
                setArticleContent(data.content);
                if (data.image_blob && data.image_mime_type) {
                    
                    setImageBlobData(`data:${data.image_mime_type};base64,${data.image_blob}`);
                    setImageMimeType(data.image_mime_type);
                    
                    setSelectedFileName('imagem_atual.png'); 
                } else {
                    setSelectedFileName('');
                    setImageBlobData(null);
                    setImageMimeType(null);
                }
            } catch (err: any) {
                console.error("Erro ao carregar artigo para edição:", err);
                setError("Não foi possível carregar o artigo para edição. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchArticle();
        }
    }, [id, navigate]); 

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFileName(file.name);
            setImageMimeType(file.type);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBlobData(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedFileName('');
            setImageBlobData(null);
            setImageMimeType(null);
        }
    };

    const handleCancel = () => {
        console.log('Edição Cancelada!');
        alert('Edição Cancelada!');
        navigate('/meus-artigos'); 
    };

    const handleSave = async () => {
        console.log('Tentando atualizar artigo...');

        if (!title || !description || !author || !articleContent) {
            alert('Por favor, preencha Título, Descrição, Autor e Conteúdo do artigo.');
            return;
        }

        if (currentUserId === null) {
            alert('Não foi possível obter o ID do usuário logado. Por favor, faça login novamente.');
            return;
        }

        if (!id) {
            alert('ID do artigo para edição não encontrado.');
            return;
        }

        const articleData = {
            title: title,
            description: description,
            author: author,
            imageBlob: imageBlobData,
            imageMimeType: imageMimeType,
            content: articleContent,
            userId: currentUserId, 
        };

        try {
            
            const response = await fetch(`http://localhost:3000/articles/${id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(articleData),
            });

            const responseData = await response.json();

            if (response.ok) {
                alert(`Artigo "${title}" atualizado com sucesso!`);
                console.log('Artigo atualizado:', responseData);
                navigate('/meus-artigos'); 
            } else {
                alert(`Erro ao atualizar artigo: ${responseData.message || 'Erro desconhecido'}`);
                console.error('Erro ao atualizar artigo:', responseData);
            }
        } catch (error) {
            console.error('Erro na requisição para atualizar artigo:', error);
            alert('Não foi possível conectar ao servidor para atualizar o artigo. Verifique o console.');
        }
    };

    if (loading) {
        return <div className="editar-artigo-container loading">Carregando artigo para edição...</div>;
    }

    if (error) {
        return <div className="editar-artigo-container error">Erro: {error}</div>;
    }

    return (
        <div className="editar-artigo-container">
           
            <header className="editar-artigo-header">
                <div className="editar-artigo-logo">M.</div>
                <nav className="editar-artigo-nav">
                    <a href="/">Home</a>
                    <a href="/articles">Artigos</a>
                    <span className="separator">|</span>
                    
                    <a href="/artigo" className="profile-link">
                        Publicar
                        <img src={profilePic} alt="Profile" className="profile-pic" />
                    </a>
                </nav>
            </header>

            <div className="editar-artigo-content-wrapper">
                <div className="editar-artigo-form-header">
                    <h2>Editar Artigo</h2> 
                    <div className="form-actions">
                        <button className="btn-cancel" onClick={handleCancel}>Cancelar</button>
                        <button className="btn-save" onClick={handleSave}>Salvar</button> 
                    </div>
                </div>

                <div className="editar-artigo-form-grid">
                    <div className="form-left-column">
                        <div className="form-group">
                            <label htmlFor="title">Título</label>
                            <input
                                type="text"
                                id="title"
                                placeholder="Adicione um título"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        
                        <div className="form-group">
                            <label htmlFor="description">Descrição</label>
                            <input
                                type="text"
                                id="description"
                                placeholder="Adicione uma breve descrição"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="image">Inserir imagem</label>
                            <div className="image-input-group vertical-layout">
                                <input
                                    type="text"
                                    id="image-display"
                                    placeholder="Nenhuma imagem selecionada"
                                    value={selectedFileName}
                                    readOnly
                                />
                                <input
                                    type="file"
                                    id="image-upload"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                                <button
                                    className="btn-select-image"
                                    onClick={() => document.getElementById('image-upload')?.click()}
                                >
                                    SELECIONAR
                                </button>
                            </div>
                        </div>

                       
                        <div className="form-group">
                            <label htmlFor="author">Autor</label>
                            <input
                                type="text"
                                id="author"
                                placeholder="Nome do autor"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-right-column">
                        <div className="image-placeholder">
                            {imageBlobData && imageMimeType ? (
                                <img src={imageBlobData} alt="Preview" className="image-preview" />
                            ) : (
                                <img src={imageIcon} alt="Image Icon" className="image-icon" />
                            )}
                        </div>
                    </div>
                </div>

                <div className="form-group full-width">
                    <label htmlFor="article-text">Conteúdo do Artigo</label>
                    <textarea
                        id="article-text"
                        placeholder="Escreva o conteúdo completo do seu artigo"
                        value={articleContent}
                        onChange={(e) => setArticleContent(e.target.value)}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default EditarArtigo;