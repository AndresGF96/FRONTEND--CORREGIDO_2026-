import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { NgForm } from '@angular/forms';
import { Empleado } from '../../models/empleado';

declare var M: any;

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  constructor(public empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados() {
    this.empleadoService.getEmpleados().subscribe(
      (res: any) => {
        this.empleadoService.empleados = res;
      },
      (err: any) => console.error(err)
    );
  }

  addEmpleado(form: NgForm) {
    if (form.value._id) {
      this.empleadoService.putEmpleado(form.value).subscribe(
        (res: any) => {
          this.resetForm(form);
          this.getEmpleados();
          M.toast({html: 'Empleado Actualizado'});
        },
        (err: any) => console.error(err)
      );
    } else {
      // IMPORTANTE: Limpiamos el ID vacío para evitar el error 500 que vimos antes
      delete form.value._id;
      this.empleadoService.postEmpleado(form.value).subscribe(
        (res: any) => {
          this.resetForm(form);
          this.getEmpleados();
          M.toast({html: 'Empleado Guardado'});
        },
        (err: any) => {
          console.error(err);
          M.toast({html: 'Error al guardar'});
        }
      );
    }
  }

  editEmpleado(empleado: Empleado) {
    this.empleadoService.selectedEmpleado = empleado;
  }

  deleteEmpleado(_id: string) {
    if (confirm('¿Seguro que deseas eliminar este empleado?')) {
      this.empleadoService.deleteEmpleado(_id).subscribe(
        (res: any) => {
          this.getEmpleados();
          M.toast({html: 'Empleado Eliminado'});
        },
        (err: any) => console.error(err)
      );
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.empleadoService.selectedEmpleado = new Empleado();
    }
  }
}
