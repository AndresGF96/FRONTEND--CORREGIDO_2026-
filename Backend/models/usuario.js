const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs'); // Importamos la librería

const UsuarioSchema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Este código corre JUSTO ANTES de guardar en la DB
UsuarioSchema.pre('save', async function (next) {
    const user = this;
    // Solo encripta si la contraseña es nueva o fue modificada
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);