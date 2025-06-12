// routes/pacientes.js
const express = require('express');
const router = express.Router();
const pacientesController = require('../controllers/pacientesController');

// Listar pacientes - Assuming this uses showPacientes correctly (not a direct render)
// Based on controller, showPacientes is a full function, so this route should be:
router.get('/', pacientesController.showPacientes); // Corrected: use controller method

// Formulario para crear paciente
router.get('/crear', pacientesController.showNewPaciente); // Corrected: use controller method

// Guardar o Actualizar paciente (based on DNI for new, or if an ID system was used for updates)
// The upsertPaciente is designed to be called from POST /crear
router.post('/crear', pacientesController.upsertPaciente); // Corrected: use renamed controller method

// Detalle de paciente
router.get('/:id', pacientesController.detallePaciente);

// Mostrar formulario de edición de paciente
router.get('/:id/edit', pacientesController.showEditPaciente); // Added

// Procesar actualización de paciente
router.post('/:id/edit', pacientesController.updatePaciente); // Added

// Mostrar formulario de evaluación de enfermería
router.get('/:id/evaluacion', pacientesController.showEvaluacion);

// Guardar evaluación de enfermería
router.post('/:id/evaluacion', pacientesController.guardarEvaluacion);

module.exports = router;