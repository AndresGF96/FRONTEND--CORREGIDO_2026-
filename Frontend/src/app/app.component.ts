import { Component } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Cambia a 'true' si quieres saltarte el login para probar el CRUD
  isLoggedIn = true; 

  constructor(public usuarioService: UsuarioService) {}

  login(form: NgForm) {
    this.usuarioService.login(form.value).subscribe(
      res => {
        this.isLoggedIn = true; 
        console.log("Ingreso exitoso");
      },
      err => {
        alert("Credenciales incorrectas o el servidor está apagado");
      }
    );
  }

  logout() {
    this.isLoggedIn = false;
  }
}