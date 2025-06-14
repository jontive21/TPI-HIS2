// routes/enfermeria.js
const express = require('express');
const router = express.Router();
const enfermeriaController = require('../controllers/enfermeriaController'); // Importar el controlador
const { requireAuth } = require('../middleware/auth'); // Asumir autenticación requerida

// Proteger todas las rutas de enfermería
router.use(requireAuth);

// Ruta principal del módulo de enfermería
router.get('/', enfermeriaController.getIndex);

// Ruta para ver/registrar signos vitales y evoluciones de una admisión
router.get('/signos-vitales/:admisionId', enfermeriaController.showEvolucion);

// Ruta para guardar una nueva evolución/signos vitales
router.post('/signos-vitales/:admisionId', enfermeriaController.agregarEvolucion);

module.exports = router;