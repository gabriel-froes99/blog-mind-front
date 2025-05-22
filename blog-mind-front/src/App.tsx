import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './big/pages/login/login';
import Esqueci from './big/pages/login/esqueci';
import Cadastro from './big/pages/cadastro/cadastro';
import HomeScreen from './big/pages/home/home';
import Artigo from './big/pages/publicar/artigo';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/esqueci' element={<Esqueci />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/home' element={<HomeScreen />} />
        <Route path='/artigo' element={<Artigo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
