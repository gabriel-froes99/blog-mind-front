import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './profile.css';
import NavBar from '../../components/navBar/navBar';
import profileIcon from '../../assets/imgHome/profile.png';

interface UserProfile {
	userId: number;
	email: string;
	name?: string;
	profilePicture?: string;
	
	
}

const ProfilePage: React.FC = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const userIdString = localStorage.getItem('userId');
		if (!userIdString) {
			navigate('/');
			return;
			
		}

		const fetchProfile = async () => {
			try {
				const id = parseInt(userIdString, 10);
				const res = await fetch(`http://localhost:3000/api/auth/profile/${id}`);
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const data: UserProfile = await res.json();
				setUser(data);
				console.log(user);	
				console.log('Dados do perfil carregados:', data);
			} catch (err: any) {
				console.error('Erro ao buscar perfil:', err);
				setError('Não foi possível carregar os dados do perfil.');
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, [navigate]);

	if (loading) return (<div className="profile-page"><NavBar /><div className="profile-card">Carregando...</div></div>);
	if (error) return (<div className="profile-page"><NavBar /><div className="profile-card error">{error}</div></div>);

	return (
		<div className="profile-page">
			<NavBar />
			<div className="profile-card">
				<div className="profile-header">
					<div className="avatar">
						{user?.profilePicture ? (
							<img src={user.profilePicture} alt="avatar" />
						) : (
							<img src={profileIcon} alt="avatar" />
						)}
					</div>
					<div className="profile-info">
						{/* <h2>{user?.name || 'Usuário'}</h2> */}
						<p className="email">{user?.email}</p>
						
					</div>
				</div>

				<div className="profile-actions">
					<Link to="/editar-perfil" className="btn-edit">Editar perfil</Link>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;

