import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { NgForm } from '@angular/forms';
import { Producto } from 'src/app/models/productos';

declare var M: any; // Para los Toasts de Materialize

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(public productoService: ProductoService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this.productoService.getProductos().subscribe(res => {
      this.productoService.productos = res;
    });
  }

addProducto(form: NgForm) {
  if (form.value._id) {
    // Si tiene ID, estamos EDITANDO
    this.productoService.putProducto(form.value).subscribe(
      (res: any) => {
        this.resetForm(form);
        this.getProductos();
        M.toast({html: 'Producto Actualizado'});
      }
    );
  } else {
    // Si NO tiene ID, estamos CREANDO
    // ESTA ES LA LÍNEA CLAVE:
    delete form.value._id; 

    this.productoService.postProducto(form.value).subscribe(
      (res: any) => {
        this.resetForm(form);
        this.getProductos();
        M.toast({html: 'Producto Guardado'});
      },
      (err: any) => {
        console.error(err);
        M.toast({html: 'Error al guardar'});
      }
    );
  }
}

  editProducto(producto: Producto) {
    this.productoService.selectedProducto = producto;
  }

  deleteProducto(_id: string) {
    if (confirm('¿Estás seguro de querer eliminarlo?')) {
      this.productoService.deleteProducto(_id).subscribe(res => {
        this.getProductos();
        M.toast({html: 'Producto Eliminado'});
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.productoService.selectedProducto = new Producto();
    }
  }
}
