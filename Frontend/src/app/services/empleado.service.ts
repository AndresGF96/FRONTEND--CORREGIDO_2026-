import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  
  readonly URL_API = 'http://localhost:3000/api/empleados';
  
  // Aquí guardaremos el empleado que se está escribiendo en el formulario
  selectedEmpleado: Empleado = new Empleado();
  
  // Aquí se guardará la lista completa de empleados que viene de MongoDB
  empleados: Empleado[] = [];

  constructor(private http: HttpClient) { }

  // 1. Obtener todos los empleados (READ)
  getEmpleados() {
    return this.http.get<Empleado[]>(this.URL_API);
  }

  // 2. Crear un nuevo empleado (CREATE)
  postEmpleado(empleado: Empleado) {
    return this.http.post(this.URL_API, empleado);
  }

  // 3. Actualizar un empleado existente (UPDATE)
  putEmpleado(empleado: Empleado) {
    // IMPORTANTE: Aquí enviamos el ID en la URL como configuramos en el Backend
    return this.http.put(this.URL_API + `/${empleado._id}`, empleado);
  }

  // 4. Eliminar un empleado (DELETE)
  deleteEmpleado(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}