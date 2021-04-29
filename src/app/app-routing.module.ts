import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';
import { HomeComponent } from '@home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/cliente', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [SecurityGuard]  },
  { path: 'cliente', loadChildren: () => import('@cliente/cliente.module').then(mod => mod.ClienteModule) },
  { path: 'transacciones', loadChildren: () => import('@transaccion/transaccion.module').then(mod => mod.TransaccionModule) },
  { path: 'cuenta', loadChildren: () => import('@cuenta/cuenta.module').then(mod => mod.CuentaModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
