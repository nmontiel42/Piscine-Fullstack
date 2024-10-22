// src/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost:5000/auth/logout', { withCredentials: true });
            if (response.status === 200) {
                setIsAuthenticated(false);  // Actualiza el estado de autenticación en App.js
                navigate('/');  // Redirige a la página de inicio de sesión
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div>
            <h1>Bienvenido a la Generador de Pokémon</h1>
            <p>¡Aquí puedes generar Pokémon a partir de tus sugerencias!</p>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};

export default Home;
