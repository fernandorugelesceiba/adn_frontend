import { NgModule } from '@angular/core';

import { CuentaRoutingModule } from './cuenta-routing.module';
import { ListadoCuentasComponent } from './components/listado-cuentas/listado-cuentas.component';
import { SharedModule } from '@shared/shared.module';
import { CuentaService } from './shared/service/cuenta.service';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { CrearCuentasComponent } from './components/crear-cuenta/crear-cuentas.component';

@NgModule({
  declarations: [
    ListadoCuentasComponent,
    CuentaComponent,
    CrearCuentasComponent
  ],
  imports: [
    CuentaRoutingModule,
    SharedModule
  ],
  providers: [CuentaService]
})
export class CuentaModule { }
