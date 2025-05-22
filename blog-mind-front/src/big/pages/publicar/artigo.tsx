import React, { useState, useEffect } from 'react'; // <-- Adicione useEffect aqui
import './Artigo.css';

// Importe os ícones/imagens necessários.
import profilePic from '../../assets/imgHome/cod.png';
import imageIcon from '../../assets/imgHome/cod.png';

const Artigo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [imageBlobData, setImageBlobData] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);
  const [articleContent, setArticleContent] = useState('');
  const [currentUserId, setCurrentUserId] = useState<number | null>(null); // <-- Novo estado para o ID do usuário logado

  // <-- NOVO: useEffect para carregar o userId do localStorage quando o componente montar
  useEffect(() => {
    const userIdString = localStorage.getItem('userId');
    if (userIdString) {
      setCurrentUserId(parseInt(userIdString, 10));
    } else {
      // Opcional: Redirecionar para a página de login se não houver userId
      // ou exibir uma mensagem de erro.
      alert('Você precisa estar logado para publicar um artigo.');
      // window.location.href = '/login'; // Exemplo de redirecionamento
    }
  }, []); // O array vazio garante que isso rode apenas uma vez ao montar

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
    console.log('Operação Cancelada!');
    alert('Operação Cancelada!');
    setTitle('');
    setDescription('');
    setAuthor('');
    setSelectedFileName('');
    setImageBlobData(null);
    setImageMimeType(null);
    setArticleContent('');
  };

  const handleSave = async () => {
    console.log('Tentando salvar artigo...');

    // Validação básica no frontend
    if (!title || !description || !author || !articleContent) {
      alert('Por favor, preencha Título, Descrição, Autor e Conteúdo do artigo.');
      return;
    }

    // <-- NOVO: Validação do userId
    if (currentUserId === null) {
      alert('Não foi possível obter o ID do usuário logado. Por favor, faça login novamente.');
      return;
    }

    const articleData = {
      title: title,
      description: description,
      author: author,
      imageBlob: imageBlobData,
      imageMimeType: imageMimeType,
      content: articleContent,
      userId: currentUserId, // <-- NOVO: Enviando o userId
    };

    try {
      const response = await fetch('http://localhost:3000/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Opcional: Você pode enviar o userId também em um cabeçalho para maior segurança
          // 'X-User-Id': currentUserId.toString(),
        },
        body: JSON.stringify(articleData),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert(`Artigo salvo com sucesso! ID: ${responseData.articleId}`);
        console.log('Artigo salvo:', responseData);
        // Limpar o formulário após salvar com sucesso
        setTitle('');
        setDescription('');
        setAuthor('');
        setSelectedFileName('');
        setImageBlobData(null);
        setImageMimeType(null);
        setArticleContent('');
      } else {
        alert(`Erro ao salvar artigo: ${responseData.message || 'Erro desconhecido'}`);
        console.error('Erro ao salvar artigo:', responseData);
      }
    } catch (error) {
      console.error('Erro na requisição para salvar artigo:', error);
      alert('Não foi possível conectar ao servidor para salvar o artigo. Verifique o console.');
    }
  };

  return (
    <div className="artigo-container">
      <header className="artigo-header">
        <div className="artigo-logo">M.</div>
        <nav className="artigo-nav">
          <a href="/">Home</a>
          <a href="/articles">Artigos</a>
          <span className="separator">|</span>
          <a href="/publish" className="profile-link">
            Publicar
            <img src={profilePic} alt="Profile" className="profile-pic" />
          </a>
        </nav>
      </header>

      <div className="artigo-content-wrapper">
        <div className="artigo-form-header">
          <h2>Novo Artigo</h2>
          <div className="form-actions">
            <button className="btn-cancel" onClick={handleCancel}>Cancelar</button>
            <button className="btn-save" onClick={handleSave}>Salvar</button>
          </div>
        </div>

        <div className="artigo-form-grid">
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

export default Artigo;