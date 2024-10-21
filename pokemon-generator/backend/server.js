// server.js
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').config();

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
    secret: 'tu_secreto',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Cambia a true si usas HTTPS
        httpOnly: true,
        sameSite: 'lax',
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

// Usar las rutas definidas en router.js
app.use('/', router);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
