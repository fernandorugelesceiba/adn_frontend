import { NgModule } from '@angular/core';
import { ClienteRoutingModule } from './cliente-routing.module';
import { VerificarCredencialesClienteComponent } from './components/verificar-credenciales-cliente/verificar-cliente.component';
import { SharedModule } from '@shared/shared.module';
import { ClienteService } from './shared/service/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '@core/services/http.service';

@NgModule({
  declarations: [
    VerificarCredencialesClienteComponent
  ],
  imports: [
    ClienteRoutingModule,
    SharedModule
  ],
  providers: [ClienteService, ToastrService, HttpService]
})
export class ClienteModule { }
