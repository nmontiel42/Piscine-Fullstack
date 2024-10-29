// src/api/unsplash.js
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export const fetchImage = async (prompt) => {
    const query = `${prompt.subject} ${prompt.style} ${prompt.color} ${prompt.mood}`.trim();
    try {
        const response = await fetch(`http://localhost:5000/api/fetchImage?query=${encodeURIComponent(query)}`);
        const imageUrl = await response.json();
        return imageUrl;
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
