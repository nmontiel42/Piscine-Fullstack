// router.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Estrategia de GitHub
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        console.log('Usuario autenticado:', req.user);
        req.session.user = req.user; // Guardar el usuario en la sesión
        res.redirect('http://localhost:3000/home'); // Redirigir a la página de inicio
    }
);

// Ruta para verificar la autenticación
router.get('/auth/status', (req, res) => {
    console.log('Estado de autenticación:', req.isAuthenticated());
    res.json({ isAuthenticated: req.isAuthenticated() });
});

module.exports = router;
