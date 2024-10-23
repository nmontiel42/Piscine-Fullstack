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
        <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4 md:p-8">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                    Bienvenid@, {user?.name}
                </h1>
                <p className="text-gray-600 mb-6">
                    ¡Aquí puedes generar imagenes a partir de tus sugerencias!
                </p>
                <ImageFetcher />
                <button
                    onClick={handleLogout}
                    className="mt-4 bg-gray-800 text-white rounded-lg px-6 py-2 transition duration-300 hover:bg-gray-700"
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default Home;
