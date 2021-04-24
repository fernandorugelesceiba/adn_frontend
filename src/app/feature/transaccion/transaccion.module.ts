import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
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
  providers: [TransaccionService]
})
export class TransaccionModule { }
