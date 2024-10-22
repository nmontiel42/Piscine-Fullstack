import React from 'react';

const Sign = () => {
    const handleLogin = () => {
        window.location.href = 'http://localhost:5000/auth/github';
    };

    return (
        <div>
            <h1>Generador de Pokémon</h1>
            <button onClick={handleLogin}>Iniciar sesión con GitHub</button>
        </div>
    );
}

export default Sign;