const Producto = require('../models/producto');
const productoCtrl = {};

// 1. Obtener todos los productos
productoCtrl.getProductos = async (req, res) => {
    const productos = await Producto.find();
    res.json(productos);
};

// 2. Crear un producto
productoCtrl.createProducto = async (req, res) => {
    const producto = new Producto(req.body);
    await producto.save();
    res.json({ status: 'Producto guardado' });
};

// 3. Obtener un solo producto
productoCtrl.getProducto = async (req, res) => {
    const producto = await Producto.findById(req.params.id);
    res.json(producto);
};

// 4. Editar un producto
productoCtrl.editProducto = async (req, res) => {
    const { id } = req.params;
    const producto = {
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        precio: req.body.precio,
        stock: req.body.stock
    };
    await Producto.findByIdAndUpdate(id, { $set: producto }, { new: true });
    res.json({ status: 'Producto actualizado' });
};

// 5. Eliminar un producto
productoCtrl.deleteProducto = async (req, res) => {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ status: 'Producto eliminado' });
};

module.exports = productoCtrl;