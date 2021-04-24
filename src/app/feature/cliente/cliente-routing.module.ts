import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerificarCredencialesClienteComponent } from './components/verificar-credenciales-cliente/verificar-credenciales-cliente.component';


const routes: Routes = [
  {
    path: '',
    component: VerificarCredencialesClienteComponent,
    /*children: [
      {
        path: 'listar',
        component: ListarProductoComponent
      }
    ]*/
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
