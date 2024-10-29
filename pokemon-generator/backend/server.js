// server.js
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').config();
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Importar el router
const router = require('./router');

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// Configuración de sesión
app.use(session({
    secret: process.env.SESSION_SECRET || 'tu_secreto',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Cambia a true si usas HTTPS
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1 * 60 * 1000 // 1 minuto de duración para la cookie de sesión
    }
}));
app.use(passport.initialize());
app.use(passport.session());

// Estrategia de GitHub
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/github/callback"
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Ruta para obtener los datos del usuario autenticado
app.get('/auth/user', (req, res) => {
    if (req.isAuthenticated()) {
        // Devuelve la información del usuario si está autenticado
        const { displayName, username, photos } = req.user;
        res.status(200).json({
            name: displayName,
            username: username,
            photo: photos[0].value // Fotos es un array, tomamos la primera
        });
    } else {
        // Si no está autenticado, responde con un error
        res.status(401).json({ error: 'Usuario no autenticado' });
    }
});

// Usar las rutas definidas en router.js
app.use('/', router);

app.get('/api/fetchImage', async (req, res) => {
    const { query } = req.query; // Obtener la consulta desde el parámetro de consulta
    try {
        const response = await axios.get(`https://api.unsplash.com/photos/random`, {
            params: {
                query: query,
                client_id: process.env.UNSPLASH_ACCESS_KEY // Usar la API key desde el archivo .env
            },
        });
        res.json(response.data.urls.regular); // Devolver solo la URL de la imagen
    } catch (error) {
        console.error('Error fetching image from Unsplash:', error);
        res.status(500).json({ error: 'Error fetching image from Unsplash' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

