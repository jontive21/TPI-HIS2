const express = require('express');
const router = express.Router();
// Assuming requireAuth will be created at this path later, as per subtask instructions
const { requireAuth } = require('../middleware/auth');
const dashboardController = require('../controllers/dashboardController');

// Ruta principal - redirigir según estado de autenticación
router.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/dashboard');
    } else {
        res.redirect('/login');
    }
});

// Dashboard principal (requiere autenticación)
// Ensure dashboardController.showDashboard is correctly implemented
router.get('/dashboard', requireAuth, dashboardController.showDashboard);

module.exports = router;