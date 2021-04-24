import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearTransaccionComponent } from './components/crear-transaccion/crear-transaccion.component';


const routes: Routes = [
  {
    path: '',
    component: CrearTransaccionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransaccionRoutingModule { }
