import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuarios'; // Verifica si es 'usuario' o 'usuarios'

declare var M: any; 

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      (res: any) => { // Agregado : any
        this.usuarioService.usuarios = res;
      },
      (err: any) => console.error(err)
    );
  }

addUsuario(form: NgForm) {
  // Verificamos si existe el ID para decidir si editar o crear
  if (form.value._id) {
    this.usuarioService.putUsuario(form.value).subscribe(
      (res: any) => {
        this.resetForm(form);
        this.getUsuarios();
        M.toast({html: 'Usuario Actualizado'});
      },
      (err: any) => {
        console.error("Error al actualizar:", err);
        M.toast({html: 'Error al actualizar'});
      }
    );
  } else {
    // IMPORTANTE: Eliminamos el _id antes de enviar para que el Backend no se confunda
    delete form.value._id; 
    
    this.usuarioService.postUsuario(form.value).subscribe(
      (res: any) => {
        this.resetForm(form);
        this.getUsuarios();
        M.toast({html: 'Usuario Guardado'});
      },
      (err: any) => {
        console.error("Error al guardar:", err);
        M.toast({html: 'Error al guardar'});
      }
    );
  }
}

  editUsuario(usuario: Usuario) {
    this.usuarioService.selectedUsuario = usuario;
  }

  deleteUsuario(_id: string) {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.usuarioService.deleteUsuario(_id).subscribe(
        (res: any) => {
          this.getUsuarios();
          M.toast({html: 'Usuario Eliminado'});
        },
        (err: any) => console.error(err)
      );
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.usuarioService.selectedUsuario = new Usuario();
    }
  }
}
