import React, { useState } from 'react';
import './artigo.css';
// Se você tiver um componente de cabeçalho global, pode importá-lo aqui.
// Por simplicidade, vou replicar o header básico da imagem.

const Artigo = () => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [articleContent, setArticleContent] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Aqui você lidaria com o upload da imagem,
    // por exemplo, exibindo uma prévia ou enviando para um servidor.
    // Por enquanto, apenas um placeholder para o nome do arquivo.
    if (event.target.files && event.target.files[0]) {
      setImageUrl(event.target.files[0].name); // Apenas para simular o nome do arquivo
    }
  };

  const handleCancel = () => {
    console.log('Cancelar');
    // Lógica para cancelar: redirecionar, limpar formulário, etc.
  };

  const handleSave = () => {
    console.log('Salvar');
    // Lógica para salvar o artigo: enviar para API, etc.
    console.log({ title, imageUrl, articleContent });
  };

  return (
    <div className="artigo-container">
      <header className="artigo-header">
        <div className="artigo-logo">M.</div>
        <nav className="artigo-nav">
          <a href="/">Home</a>
          <a href="/articles">Artigos</a>
          <span className="separator">|</span> {/* Separador visual */}
          <a href="/publish" className="profile-link">
            Publicar
            <img src="/path/to/your/profile-pic.jpg" alt="Profile" className="profile-pic" />
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
              <label htmlFor="image">Inserir imagem</label>
              <div className="image-input-group">
                <input
                  type="text" // Usamos text para simular o nome do arquivo para demonstração
                  id="image"
                  placeholder="Adicione uma imagem"
                  value={imageUrl}
                  readOnly // Torna o campo somente leitura já que o "Selecionar" faz o trabalho
                />
                <input
                  type="file"
                  id="image-upload"
                  style={{ display: 'none' }} // Oculta o input de arquivo padrão
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
          </div>

          <div className="form-right-column">
            <div className="image-placeholder">
              <img src="/path/to/your/image-icon.svg" alt="Image Icon" className="image-icon" />
            </div>
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="article-text">Texto</label>
          <textarea
            id="article-text"
            placeholder="Escreva seu artigo"
            value={articleContent}
            onChange={(e) => setArticleContent(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Artigo;