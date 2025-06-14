// controllers/enfermeriaController.js
const Evolucion = require('../models/EvolucionEnfermeria');
const { pool } = require('../config/db');

exports.getIndex = async (req, res) => {
    try {
        const [admisiones] = await pool.query(`
            SELECT a.id as admision_id, p.nombre, p.apellido, h.numero as habitacion_numero, c.numero as cama_numero
            FROM admisiones a
            JOIN pacientes p ON a.paciente_id = p.id
            JOIN camas c ON a.cama_id = c.id
            JOIN habitaciones h ON c.habitacion_id = h.id
            WHERE a.fecha_alta IS NULL AND a.fecha_cancelacion IS NULL
            ORDER BY p.apellido, p.nombre
        `);
        res.render('enfermeria/index', {
            title: 'Portal de Enfermería',
            user: req.session.user,
            admisiones: admisiones
        });
    } catch (error) {
        console.error('Error al cargar el portal de enfermería:', error);
        res.status(500).render('error', { message: 'No se pudo cargar el portal de enfermería.', error: error });
    }
};

exports.showEvolucion = async (req, res) => {
    const admisionId = req.params.admisionId;
    try {
        const [admisionInfo] = await pool.query(`
            SELECT a.id as admision_id, p.nombre, p.apellido, p.dni, h.numero as habitacion_numero, c.numero as cama_numero
            FROM admisiones a
            JOIN pacientes p ON a.paciente_id = p.id
            JOIN camas c ON a.cama_id = c.id
            JOIN habitaciones h ON c.habitacion_id = h.id
            WHERE a.id = ?
        `, [admisionId]);

        if (!admisionInfo.length) {
            req.session.error = 'Admisión no encontrada.';
            return res.redirect('/enfermeria');
        }

        const evoluciones = await Evolucion.getEvolucionesByAdmision(admisionId);
        res.render('enfermeria/signos-vitales', {
            title: 'Signos Vitales y Evoluciones',
            user: req.session.user,
            evoluciones: evoluciones,
            admision: admisionInfo[0]
        });
    } catch (error) {
        console.error(`Error al mostrar evoluciones para admisión ${admisionId}:`, error);
        req.session.error = 'Error al cargar evoluciones.';
        res.redirect('/enfermeria');
    }
};

exports.agregarEvolucion = async (req, res) => {
    const admisionId = req.params.admisionId;
    const usuarioId = req.session.user.id;
    const { nota_evolucion, presion_arterial_sistolica, presion_arterial_diastolica, frecuencia_cardiaca, frecuencia_respiratoria, temperatura, saturacion_oxigeno, observaciones_generales } = req.body;
    const fecha = new Date();

    try {
        await Evolucion.agregarEvolucion({
            admision_id: admisionId,
            usuario_id: usuarioId,
            fecha_hora: fecha,
            nota_evolucion: nota_evolucion,
            presion_arterial_sistolica: presion_arterial_sistolica || null,
            presion_arterial_diastolica: presion_arterial_diastolica || null,
            frecuencia_cardiaca: frecuencia_cardiaca || null,
            frecuencia_respiratoria: frecuencia_respiratoria || null,
            temperatura: temperatura || null,
            saturacion_oxigeno: saturacion_oxigeno || null,
            observaciones_generales: observaciones_generales || null
        });
        req.session.success = 'Evolución agregada correctamente.';
        res.redirect(`/enfermeria/signos-vitales/${admisionId}`);
    } catch (error) {
        console.error(`Error al agregar evolución para admisión ${admisionId}:`, error);
        req.session.error = 'Error al guardar la evolución.';
        res.redirect(`/enfermeria/signos-vitales/${admisionId}`);
    }
};