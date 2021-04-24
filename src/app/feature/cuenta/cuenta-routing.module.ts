import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearCuentasComponent } from './components/crear-cuenta/crear-cuentas.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { ListadoCuentasComponent } from './components/listado-cuentas/listado-cuentas.component';


const routes: Routes = [
  {
    path: '',
    component: CuentaComponent,
    children: [
      {
        path: 'listar',
        component: ListadoCuentasComponent
      },
      {
        path: 'crear',
        component: CrearCuentasComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaRoutingModule { }
