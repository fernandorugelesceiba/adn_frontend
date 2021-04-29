import { NgModule } from '@angular/core';
import { ClienteService } from '@cliente/shared/service/cliente.service';
import { HttpService } from '@core/services/http.service';
import { CuentaService } from '@cuenta/shared/service/cuenta.service';

import { SharedModule } from '@shared/shared.module';
import { ToastrService } from 'ngx-toastr';
import { CrearTransaccionComponent } from './components/crear-transaccion/crear-transaccion.component';
import { TransaccionService } from './shared/service/transaccion.service';
import { TransaccionRoutingModule } from './transaccion-routing.module';


@NgModule({
  declarations: [
    CrearTransaccionComponent
  ],
  imports: [
    TransaccionRoutingModule,
    SharedModule
  ],
  providers: [TransaccionService, HttpService, ToastrService, ClienteService, CuentaService]
})
export class TransaccionModule { }
