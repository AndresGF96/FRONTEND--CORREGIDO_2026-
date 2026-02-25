export class Producto {
    constructor(_id = '', nombre = '', precio = 0, stock = 0) {
        this._id = _id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    _id: string;
    nombre: string;
    precio: number;
    stock: number;
}