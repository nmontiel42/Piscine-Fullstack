// src/components/ImageFetcher.js
import React, { useState } from 'react';
import { fetchImage } from '../api/unsplash';

const ImageFetcher = () => {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');

    const handleFetchImage = async () => {
        setError(''); // Reiniciar el error
        try {
            const url = await fetchImage(prompt);
            setImageUrl(url);
        } catch (error) {
            setError('Error fetching the image. Please try again.');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Escribe un prompt (ej: gato persa saltando)"
            />
            <button onClick={handleFetchImage}>Obtener Imagen</button>
            {error && <p>{error}</p>}
            {imageUrl && <img src={imageUrl} alt={prompt} style={{ marginTop: '20px', maxWidth: '100%' }} />}
        </div>
    );
};

export default ImageFetcher;
