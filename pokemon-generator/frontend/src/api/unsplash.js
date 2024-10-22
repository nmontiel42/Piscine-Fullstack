// src/api/unsplash.js
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'ZO5ShxgU9kfHJRk-TANtX6KDpQMCT48CtwXrfUcUBcI'; // Reemplaza con tu Access Key

export const fetchImage = async (prompt) => {
    try {
        const response = await axios.get(`https://api.unsplash.com/photos/random`, {
            params: {
                query: prompt,
                client_id: UNSPLASH_ACCESS_KEY,
            },
        });
        return response.data.urls.regular; // Devuelve la URL de la imagen
    } catch (error) {
        console.error('Error fetching image:', error);
        throw error;
    }
};
