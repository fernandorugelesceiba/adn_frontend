import { NgModule } from '@angular/core';

import { CuentaRoutingModule } from './cuenta-routing.module';
import { ListadoCuentasComponent } from './components/listado-cuentas/listado-cuentas.component';
import { SharedModule } from '@shared/shared.module';
import { CuentaService } from './shared/service/cuenta.service';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { CrearCuentasComponent } from './components/crear-cuenta/crear-cuentas.component';
import { HttpService } from '@core/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '@cliente/shared/service/cliente.service';
import { ManejadorError } from '@core/interceptor/manejador-error';

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
  providers: [CuentaService, HttpService, ToastrService, ClienteService, ManejadorError]
})
export class CuentaModule { }
