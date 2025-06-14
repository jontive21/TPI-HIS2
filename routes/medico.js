// routes/medico.js
const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController'); // Importar el controlador
const { requireAuth } = require('../middleware/auth'); // Asumimos que esta sección requiere autenticación

// Ruta principal del módulo Médico
// Aplicar middleware requireAuth para asegurar que solo usuarios logueados accedan
router.get('/', requireAuth, medicoController.getIndex);

module.exports = router;