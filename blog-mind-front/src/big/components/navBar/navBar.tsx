import { useState, useEffect } from 'react'; 
import './navBar.css';
import profilePic from '../../assets/imgHome/default-avatar.png'; 
import { Link, useNavigate } from 'react-router-dom'; 
import profilePicHeader from '../../assets/imgHome/profile.png';



export default function NavBar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate(); 
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
     const userIdString = localStorage.getItem('userId');
    if (userIdString) {
      setCurrentUserId(parseInt(userIdString, 10));
    } else {
      alert('Você precisa estar logado para editar seu perfil.');
      navigate('/login');
    }
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem('email'); 
    localStorage.removeItem('userId'); 
    setUserEmail(null); 
    alert('Você foi desconectado.');
    navigate('/'); 
  };

  return (

    
 <header className="articles-header">
                <div className="articles-logo">M.</div>
                <nav className="articles-nav">
                    <Link to="/home">Home</Link>
                    <Link to="/artigos">Artigos</Link>
                    <Link to="/meus-artigos">Meus Artigos</Link>
                    <Link to={`/perfil/${currentUserId}`}>Perfil</Link>
                    <Link to="/artigo" className="profile-link">
                        Publicar
                        <img src={profilePicHeader} alt="Profile" className="profile-pic" />
                    </Link>
                    <button className="btn-logout" onClick={handleLogout}>Sair</button>
                </nav>
            </header>
    
  );};

 
