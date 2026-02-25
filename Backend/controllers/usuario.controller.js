const Usuario = require('../models/usuario');
const usuarioCtrl = {};

// Obtener todos los usuarios para la tabla
usuarioCtrl.getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
};

// Guardar usuario (con Nombre, Email y Password)
usuarioCtrl.createUsuario = async (req, res) => {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.json({ status: 'Usuario creado' });
};

// Login (Busca coincidencia exacta)
usuarioCtrl.login = async (req, res) => {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email, password });
    if (usuario) {
        res.json({ status: 'Bienvenido', nombre: usuario.nombre });
    } else {
        res.status(401).json({ message: 'Error de credenciales' });
    }
};

// Agregar al final de usuario.controller.js (antes del module.exports)
usuarioCtrl.editUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password
    };
    await Usuario.findByIdAndUpdate(id, {$set: usuario}, {new: true});
    res.json({ status: 'Usuario actualizado' });
};

usuarioCtrl.deleteUsuario = async (req, res) => {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ status: 'Usuario eliminado' });
};

module.exports = usuarioCtrl;