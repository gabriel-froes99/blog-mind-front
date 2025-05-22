import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './big/pages/login/login';
import Esqueci from './big/pages/login/esqueci';
import Cadastro from './big/pages/cadastro/cadastro';
import HomeScreen from './big/pages/home/home';
import Artigo from './big/pages/publicar/artigo';
import MeusArtigos from './big/pages/meus-artigos/meusArtigos';
import ArticleDetailScreen from './big/pages/meus-artigos/detalhesArtigos';






function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/esqueci' element={<Esqueci />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/home' element={<HomeScreen />} />
        <Route path='/artigo' element={<Artigo />} />
        <Route path='/meus-artigos' element={<MeusArtigos />} />
        <Route path='/articles/:id' element={<ArticleDetailScreen/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
