import { Component, OnInit } from '@angular/core';
import { ClienteService } from '@cliente/shared/service/cliente.service';
import { CuentaService } from '@cuenta/shared/service/cuenta.service';
import { Cuenta } from '../../shared/model/cuenta';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listado-cuentas',
  templateUrl: './listado-cuentas.component.html',
  styleUrls: ['./listado-cuentas.component.css']
})
export class ListadoCuentasComponent implements OnInit {
  public listadoCuentas: Array<Cuenta>;
  private NO_SE_ECONTRARON_RESULTADOS = "No se encontraron resultado";
  private BUSQUEDA_REALIZADA_CON_EXITO = "Busqueda realizada con exito";
  private ERROR_EN_PROCEO = "Error en el proceso";
  private REGISTRO_ELIMINADO_SATISFACTORIAMENTE = "Registro eliminado satisfactoriamente";
  public mapaClientes = new Map();
  public notificacion: ToastrService;

  constructor(protected clienteService: ClienteService,protected cuentaService: CuentaService, public toastr: ToastrService) {
    this.listadoCuentas = [];
    this.notificacion = toastr;
  }

  ngOnInit() {
    this.obtenerListadoClientes();
    this.consultarCuentas();
  }

  obtenerListadoClientes() {
    this.clienteService.obtenerListadoClientes().subscribe(res => {
      if (res.length > 0) {
          for(let cliente of res){
            this.mapaClientes.set(cliente.id, `${cliente.nombre} ${cliente.apellido}`);
          }
      }
    }, err => {
      this.notificacion.error(JSON.stringify(err));
    });
  }

  consultarCuentas() {
    this.cuentaService.obtenerListaCuentas().subscribe(res => {
      if (res.length > 0) {
        this.listadoCuentas = res;
        this.notificacion.info(this.BUSQUEDA_REALIZADA_CON_EXITO);
      } else {
        this.notificacion.warning(this.NO_SE_ECONTRARON_RESULTADOS);
      }
    }, err => {
      this.notificacion.error(JSON.stringify(err));
    });
  }

  eliminar(id: number, ind: number) {
    this.cuentaService.eliminar(id).subscribe(res => {
      if (res) {
        this.listadoCuentas = this.listadoCuentas.filter((_cuenta, index) => index !== ind);
        this.notificacion.info(this.REGISTRO_ELIMINADO_SATISFACTORIAMENTE);
      } else {
        this.notificacion.warning(this.ERROR_EN_PROCEO);
      }
    }, err => {
      this.notificacion.error(JSON.stringify(err));
    });
  }
}
