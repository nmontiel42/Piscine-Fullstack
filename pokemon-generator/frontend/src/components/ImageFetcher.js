// src/components/ImageFetcher.js
import React, { useState } from 'react';
import { fetchImage } from '../api/unsplash';

const ImageFetcher = () => {
    const [prompt, setPrompt] = useState({
        subject: '',
        style: '',
        color: '',
        mood: '',
    });
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrompt((prevPrompt) => ({
            ...prevPrompt,
            [name]: value,
        }));
    };

    const handleFetchImage = async () => {
        setError(''); // Reiniciar el error
        try {
            const url = await fetchImage(prompt); // Enviar el objeto prompt
            setImageUrl(url);
        } catch (error) {
            setError('Error fetching the image. Please try again.');
            setTimeout(() => {
                setError(null); // Esto eliminará el mensaje de error
            }, 2000);
        }
    };

    return (
        <div>
            <input
                type="text"
                name="subject"
                value={prompt.subject}
                onChange={handleChange}
                placeholder="Sujeto (ej: gato)"
            />
            <input
                type="text"
                name="style"
                value={prompt.style}
                onChange={handleChange}
                placeholder="Estilo (ej: fotografía)"
            />
            <input
                type="text"
                name="color"
                value={prompt.color}
                onChange={handleChange}
                placeholder="Color (ej: negro)"
            />
            <input
                type="text"
                name="mood"
                value={prompt.mood}
                onChange={handleChange}
                placeholder="Estado de ánimo (ej: feliz)"
            />
            <button onClick={handleFetchImage}>Obtener Imagen</button>
            {error && <p>{error}</p>}
            {imageUrl && <img src={imageUrl} alt={prompt.subject} style={{ marginTop: '20px', maxWidth: '100%' }} />}
        </div>
    );
};

export default ImageFetcher;
