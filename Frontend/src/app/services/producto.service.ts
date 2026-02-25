import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  readonly URL_API = 'http://localhost:3000/api/productos';
  selectedProducto: Producto = new Producto();
  productos: Producto[] = [];

  constructor(private http: HttpClient) { }

  getProductos() {
    return this.http.get<Producto[]>(this.URL_API);
  }

  postProducto(producto: Producto) {
    return this.http.post(this.URL_API, producto);
  }

  putProducto(producto: Producto) {
    return this.http.put(this.URL_API + `/${producto._id}`, producto);
  }

  deleteProducto(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
