// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './Home'; // Asegúrate de que este componente esté creado
import Sign from './Sign';
import './index.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); // Estado para guardar la info del usuario

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Verifica si el usuario está autenticado
                const authResponse = await axios.get('http://localhost:5000/auth/status', { withCredentials: true });
                setIsAuthenticated(authResponse.data.isAuthenticated);

                if (authResponse.data.isAuthenticated) {
                    // Si está autenticado, obtiene los datos del usuario
                    const userResponse = await axios.get('http://localhost:5000/auth/user', { withCredentials: true });
                    setUser(userResponse.data); // Guardar la info del usuario
                }
            } catch (error) {
                console.error('Error checking authentication or fetching user data:', error);
            }
        };

        checkAuth();
    }, []);

    return (
        <Router>
            <Routes>
                <Route 
                    path="/home" 
                    element={
                        isAuthenticated ? 
                        <Home user={user} setIsAuthenticated={setIsAuthenticated} /> 
                        : 
                        <Navigate to="/" />
                    } 
                />
                <Route 
                    path="/" 
                    element={
                        !isAuthenticated ? (
                            <Sign />
                        ) : (
                            <Navigate to="/home" />
                        )
                    } 
                />
            </Routes>
        </Router>
    );
}

export default App;
