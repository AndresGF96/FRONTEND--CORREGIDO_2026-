const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmpleadoSchema = new Schema({
    nombre: { type: String, required: true },   // Antes: name
    puesto: { type: String, required: true },   // Antes: position
    oficina: { type: String, required: true },  // Antes: office
    salario: { type: Number, required: true }   // Antes: salary
});

// Agregamos 'empleados' como tercer parámetro para asegurar la colección correcta
module.exports = mongoose.model('Empleado', EmpleadoSchema, 'empleados');