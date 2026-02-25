const Empleado = require('../models/empleado');
const empleadoCtrl = {};

// Obtener todos los empleados
empleadoCtrl.getEmpleados = async (req, res) => {
    const empleados = await Empleado.find();
    res.json(empleados);
};

// Crear empleado
// Cambia esto en empleado.controller.js
empleadoCtrl.createEmpleado = async (req, res) => {
    const empleado = new Empleado(req.body); // Esto toma todos los campos automáticamente
    await empleado.save();
    res.json({ status: 'Empleado guardado' });
};

// Obtener UN solo empleado (necesario para cuando das clic en Editar)
empleadoCtrl.getEmpleado = async (req, res) => {
    const empleado = await Empleado.findById(req.params.id);
    res.json(empleado);
};

// Editar empleado
// Editar empleado corregido
empleadoCtrl.editEmpleado = async (req, res) => {
    const { id } = req.params;
    // IMPORTANTE: Los nombres de la izquierda deben ser IGUALES a tu Modelo de Mongoose
    const empleado = {
        nombre: req.body.nombre,
        puesto: req.body.puesto,
        oficina: req.body.oficina,
        salario: req.body.salario
    };
    await Empleado.findByIdAndUpdate(id, {$set: empleado}, {new: true});
    res.json({ status: 'Empleado actualizado' });
};

// Eliminar empleado
empleadoCtrl.deleteEmpleado = async (req, res) => {
    await Empleado.findByIdAndDelete(req.params.id);
    res.json({ status: 'Empleado eliminado' });
};

module.exports = empleadoCtrl;