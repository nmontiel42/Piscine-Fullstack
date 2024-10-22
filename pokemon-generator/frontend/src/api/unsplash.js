// src/api/unsplash.js
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'ZO5ShxgU9kfHJRk-TANtX6KDpQMCT48CtwXrfUcUBcI'; // Reemplaza con tu Access Key

export const fetchImage = async (prompt) => {
    try {
        // Crear un string del prompt basado en las propiedades del objeto
        const query = `${prompt.subject} ${prompt.style} ${prompt.color} ${prompt.mood}`.trim();

        const response = await axios.get(`https://api.unsplash.com/photos/random`, {
            params: {
                query: query,
                client_id: UNSPLASH_ACCESS_KEY,
            },
        });
        return response.data.urls.regular; // Devuelve la URL de la imagen
    } catch (error) {
        console.error('Error fetching image:', error);
        throw error;
    }
};

// Ejemplo de uso
const examplePrompt = {
    subject: 'perro',
    style: 'fotografía',
    color: 'negro',
    mood: 'feliz',
};

// Llamar a la función
fetchImage(examplePrompt)
    .then(url => console.log(url))
    .catch(error => console.error(error));
