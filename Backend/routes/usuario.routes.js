const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuario.controller');

router.get('/', usuarioCtrl.getUsuarios);
router.post('/', usuarioCtrl.createUsuario);
router.post('/login', usuarioCtrl.login);
router.put('/:id', usuarioCtrl.editUsuario);    // <--- ¡Asegúrate de que esto esté!
router.delete('/:id', usuarioCtrl.deleteUsuario); // <--- ¡Asegúrate de que esto esté!

module.exports = router;