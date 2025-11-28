import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './editProfile.css';
import NavBar from '../../components/navBar/navBar';
import profileIcon from '../../assets/imgHome/profile.png';

interface UserProfile {
  id: number;
  email: string;
  name?: string;
  profilePicture?: string;
  createdAt?: string;
}

const EditProfile: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [profileBlobData, setProfileBlobData] = useState<string | null>(null);
  const [profileMimeType, setProfileMimeType] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  // Load user ID from localStorage on mount
  useEffect(() => {
    const userIdString = localStorage.getItem('userId');
    if (userIdString) {
      setCurrentUserId(parseInt(userIdString, 10));
    } else {
      alert('Você precisa estar logado para editar seu perfil.');
      navigate('/login');
    }
  }, [navigate]);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!currentUserId) {
        setLoading(false);
        return;
      }

      try {
          const response = await fetch(`http://localhost:3000/api/auth/profile/${currentUserId}`);
        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const data: UserProfile = await response.json();

          setEmail(data.email);
          // Use `name` from backend when available
          setName(data.name || '');

        if (data.profilePicture) {
          setProfileBlobData(data.profilePicture);
          setSelectedFileName('Foto de perfil atual');
        }
      } catch (err: any) {
        console.error('Erro ao carregar perfil do usuário:', err);
        setError('Não foi possível carregar seu perfil. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [currentUserId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFileName(file.name);
      setProfileMimeType(file.type);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileBlobData(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFileName('');
      setProfileBlobData(null);
      setProfileMimeType(null);
    }
  };

  const handleCancel = () => {
    alert('Edição cancelada!');
    navigate(-1);
  };

  const handleSave = async () => {
    console.log('Tentando atualizar perfil...');

    if (!email || !name) {
      alert('Por favor, preencha Email e Nome.');
      return;
    }

    if (currentUserId === null) {
      alert('Não foi possível obter o ID do usuário logado. Por favor, faça login novamente.');
      return;
    }

    const profileData = {
      email: email,
      name: name,
      profilePicture: profileBlobData,
      profileMimeType: profileMimeType,
    };

    try {
      const response = await fetch(`http://localhost:3000/api/auth/profile/${currentUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert(`Perfil atualizado com sucesso!`);
        console.log('Perfil atualizado:', responseData);
        navigate(-1);
      } else {
        alert(
          `Erro ao atualizar perfil: ${responseData.message || 'Erro desconhecido'}`
        );
        console.error('Erro ao atualizar perfil:', responseData);
      }
    } catch (error) {
      console.error('Erro na requisição para atualizar perfil:', error);
      alert(
        'Não foi possível conectar ao servidor para atualizar o perfil. Verifique o console.'
      );
    }
  };

  if (loading) {
    return (
      <div className="edit-profile-container loading">
        <NavBar />
        <div className="edit-profile-content-wrapper">
          <p>Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="edit-profile-container error">
        <NavBar />
        <div className="edit-profile-content-wrapper">
          <p>Erro: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-profile-container">
      <NavBar />

      <div className="edit-profile-content-wrapper">
        <div className="edit-profile-form-header">
          <h2>Editar Perfil</h2>
          <div className="form-actions">
            <button className="btn-cancel" onClick={handleCancel}>
              Cancelar
            </button>
            <button className="btn-save" onClick={handleSave}>
              Salvar
            </button>
          </div>
        </div>

        <div className="edit-profile-form-grid">
          <div className="form-left-column">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="firstName">Nome</label>
              <input
                type="text"
                id="firstName"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>


            <div className="form-group">
              <label htmlFor="profilePicture">Foto de Perfil</label>
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
          </div>

          <div className="form-right-column">
            <div className="image-placeholder">
              {profileBlobData ? (
                <img src={profileBlobData} alt="Foto de perfil" className="image-preview" />
              ) : (
                <img src={profileIcon} alt="Foto de perfil padrão" className="image-icon" />
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditProfile;
