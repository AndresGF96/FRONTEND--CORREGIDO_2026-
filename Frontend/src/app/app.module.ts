import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// 1. IMPORTA ESTAS DOS LÍNEAS
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { ProductosComponent } from './components/productos/productos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

// 2. DEFINE EL ARREGLO DE RUTAS
const routes: Routes = [
  // Dejamos las rutas listas, pero no forzamos el redireccionamiento aquí
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'productos', component: ProductosComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EmpleadosComponent,
    ProductosComponent,
    UsuariosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // 3. AGREGA EL ROUTERMODULE AQUÍ
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }