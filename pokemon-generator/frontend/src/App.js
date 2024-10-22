// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './Home'; // Asegúrate de que este componente esté creado

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:5000/auth/status', { withCredentials: true });
                setIsAuthenticated(response.data.isAuthenticated);
            } catch (error) {
                console.error('Error checking authentication:', error);
            }
        };

        checkAuth();
    }, []);

    const handleLogin = () => {
        window.location.href = 'http://localhost:5000/auth/github';
    };

    return (
        <Router>
            <Routes>
                <Route path="/home" element={isAuthenticated ? <Home setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} />
                <Route path="/" element={
                    !isAuthenticated ? (
                        <div>
                            <h1>Generador de Pokémon</h1>
                            <button onClick={handleLogin}>Iniciar sesión con GitHub</button>
                        </div>
                    ) : (
                        <Navigate to="/home" />
                    )
                } />
            </Routes>
        </Router>
    );
}

export default App;
