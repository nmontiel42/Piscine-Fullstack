// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './Home'; // Asegúrate de que este componente esté creado
import Sign from './Sign';

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

    return (
        <Router>
            <Routes>
                <Route path="/home" element={isAuthenticated ? <Home setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} />
                <Route path="/" element={
                    !isAuthenticated ? (
                        <Sign />
                    ) : (
                        <Navigate to="/home" />
                    )
                } />
            </Routes>
        </Router>
    );
}

export default App;
