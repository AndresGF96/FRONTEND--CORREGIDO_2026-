export class Usuario {
    _id: string;
    nombre: string; 
    email: string;
    password: string;

    constructor(_id = '', nombre = '', email = '', password = '') {
        this._id = _id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
    }
}
