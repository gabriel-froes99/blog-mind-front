// src/App.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './big/pages/login/login';
import Esqueci from './big/pages/login/esqueci';
import Cadastro from './big/pages/cadastro/cadastro';
import HomeScreen from './big/pages/home/home';
import MeusArtigos from './big/pages/meus-artigos/meusArtigos';
import ArticleDetailScreen from './big/pages/meus-artigos/detalhesArtigos';
import EditarArtigo from './big/pages/meus-artigos/editar'; 
import ArticlesPage from './big/pages/paginaArtigos/articlesPage';
import Artigo from './big/pages/publicar/artigo';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/esqueci' element={<Esqueci />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/home' element={<HomeScreen />} />
        <Route path='/artigos' element={<ArticlesPage />} /> 
        <Route path='/meus-artigos' element={<MeusArtigos />} />
        <Route path='/articles/:id' element={<ArticleDetailScreen/>} /> 
        <Route path='/editar/:id' element={<EditarArtigo />} /> 
        <Route path='artigo' element={<Artigo />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
