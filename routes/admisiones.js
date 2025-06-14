// routes/admisiones.js
const express = require('express');
const router = express.Router();
const admisionesController = require('../controllers/admisionesController');
const { requireAuth } = require('../middleware/auth'); // Asumir autenticación requerida

// Proteger todas las rutas de admisiones
router.use(requireAuth);

// Listar admisiones (ruta principal del módulo)
router.get('/', admisionesController.listarAdmisiones);

// Mostrar formulario para nueva admisión
router.get('/crear', admisionesController.showNuevaAdmision);

// Procesar nueva admisión
router.post('/crear', admisionesController.processAdmision);

// Ver detalle de una admisión
router.get('/:id', admisionesController.detalleAdmision);

// Cancelar una admisión
// Usamos POST para la cancelación ya que modifica el estado del recurso.
// Podría ser también un GET si se usa un enlace simple, pero POST es más correcto.
router.post('/:id/cancelar', admisionesController.cancelarAdmision);
// Si se prefiere un GET para un botón/enlace simple de cancelación:
// router.get('/:id/cancelar', admisionesController.cancelarAdmision);
// Para esto, el controlador debería tomar el id de req.params.id en cancelarAdmision.
// La función cancelarAdmision ya está preparada para tomar el id de req.params.id o req.body.admision_id.

module.exports = router;