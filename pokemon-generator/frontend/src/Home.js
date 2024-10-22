// src/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageFetcher from './components/ImageFetcher';

const Home = ({ user, setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost:5000/auth/logout', { withCredentials: true });
            if (response.status === 200) {
                console.log(response.data.message);
                setIsAuthenticated(false);  // Actualiza el estado de autenticación en App.js
                navigate('/');  // Redirige a la página de inicio de sesión
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div>
            <h1>Bienvenido, {user?.name} @{user?.username}</h1>
            <img src={user?.photo} alt="Foto de perfil" width={50} height={50} />
            <p>¡Aquí puedes generar Pokémon a partir de tus sugerencias!</p>
            <ImageFetcher />
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};

export default Home;
