// controllers/medicoController.js

/**
 * Muestra la página principal del módulo Médico.
 */
exports.getIndex = (req, res) => {
    try {
        // Aquí se podría cargar información específica para el dashboard médico si fuera necesario.
        // Por ahora, solo renderiza la vista con un título.
        res.render('medico/index', {
            title: 'Portal Médico',
            user: req.session.user // Aseguramos que la información del usuario esté disponible para la vista
        });
    } catch (error) {
        console.error('Error al cargar el portal médico:', error);
        res.status(500).render('error', {
            message: 'No se pudo cargar el portal médico.',
            error: error // Pasar el objeto de error solo en desarrollo o si se maneja adecuadamente en la vista de error
        });
    }
};

// Aquí se podrían añadir más funciones para el módulo médico en el futuro,
// como listar pacientes asignados al médico, gestionar estudios, etc.
