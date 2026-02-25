const express = require('express');
const router = express.Router();

// Llamamos al controlador que acabas de crear
const empleadoCtrl = require('../controllers/empleado.controller');

// Definimos qué función del controlador se activa según lo que pidamos
router.get('/', empleadoCtrl.getEmpleados);          // Ver todos
router.post('/', empleadoCtrl.createEmpleado);       // Guardar nuevo
router.get('/:id', empleadoCtrl.getEmpleado);       // Ver uno solo
router.put('/:id', empleadoCtrl.editEmpleado);      // Editar
router.delete('/:id', empleadoCtrl.deleteEmpleado); // Borrar

module.exports = router;