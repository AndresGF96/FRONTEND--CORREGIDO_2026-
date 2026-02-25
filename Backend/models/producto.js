const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductoSchema = new Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true }
});

module.exports = mongoose.model('Producto', ProductoSchema, 'productos'); 
// El tercer parámetro 'productos' fuerza a Node a usar tu colección existente.