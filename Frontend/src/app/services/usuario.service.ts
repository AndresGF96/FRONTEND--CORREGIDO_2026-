import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Asegúrate de que el nombre del archivo en models coincida (usuario o usuarios)
import { Usuario } from '../models/usuarios'; 

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // Esta URL solo sirve para el CRUD de USUARIOS
  readonly URL_API = 'http://localhost:3000/api/usuarios';
  
  selectedUsuario: Usuario = new Usuario();
  usuarios: Usuario[] = [];

  constructor(private http: HttpClient) { }

  login(credenciales: any) {
    // Si tu backend maneja el login en /api/usuarios/login
    return this.http.post(`${this.URL_API}/login`, credenciales);
  }

  getUsuarios() {
    return this.http.get<Usuario[]>(this.URL_API);
  }

  postUsuario(usuario: Usuario) {
    return this.http.post(this.URL_API, usuario);
  }

  putUsuario(usuario: Usuario) {
    // IMPORTANTE: Asegúrate de que usuario._id no sea undefined
    return this.http.put(`${this.URL_API}/${usuario._id}`, usuario);
  }

  deleteUsuario(_id: string) {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}