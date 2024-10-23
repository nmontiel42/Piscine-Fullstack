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
        <div className="bg-white shadow-lg rounded-lg p-6 mt-4 w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Generador de Imágenes</h2>
            <div className="flex flex-col space-y-4">
                {['subject', 'style', 'color', 'mood'].map((field) => (
                    <input
                        key={field}
                        type="text"
                        name={field}
                        value={prompt[field]}
                        onChange={handleChange}
                        placeholder={`Ingrese ${field} (ej: ${field === 'subject' ? 'gato' : field})`}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                    />
                ))}
            </div>
            <button
                onClick={handleFetchImage}
                className="mt-4 bg-gray-800 text-white rounded-md px-6 py-2 transition duration-300 hover:bg-gray-700"
            >
                Obtener Imagen
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={prompt.subject}
                    className="mt-4 max-w-full rounded-md shadow-md"
                />
            )}
        </div>
    );
};

export default ImageFetcher;
