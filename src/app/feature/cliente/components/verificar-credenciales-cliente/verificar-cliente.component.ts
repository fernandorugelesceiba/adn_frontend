import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Transaccion } from '@transaccion/shared/model/transaccion';
import { Cuenta } from '@cuenta/shared/model/cuenta';
import { Cliente } from '../../shared/model/cliente';
import { ClienteService } from '../../shared/service/cliente.service';

@Component({
  selector: 'app-verificar-cliente',
  templateUrl: './verificar-cliente.component.html',
  styleUrls: ['./verificar-cliente.component.css']
})
export class VerificarCredencialesClienteComponent implements OnInit {
  private NO_SE_ECONTRARON_RESULTADOS = 'No se encontraron resultado';
  private BUSQUEDA_REALIZADA_CON_EXITO = 'Busqueda realizada con exito';
  private TRANSACCIONES_CARGADAS = 'Transacciones cargadas';

  public clienteFormulario: FormGroup;
  public cliente: Cliente;
  public usuarioEncontrado: boolean;
  public listadoDeTransacciones: Array<Transaccion> = [];
  public listadoDeCuentasDeCliente: Array<Cuenta> = [];
  public notificacion;

  constructor(protected clienteService: ClienteService, public toastr: ToastrService) {
    this.notificacion = toastr;
    this.usuarioEncontrado = false;
  }

  ngOnInit() {
    this.construirFormularioProducto();
  }

  consultarPorTipoYNumeroDocumento() {
    this.usuairoNoEncontrado();
    this.clienteService.verificarClienteSegunNumeroYTipoDocumento(this.clienteFormulario.value).subscribe(res => {
      if (res.length > 0) {
        const clienteRes = res[0];
        this.cliente = new Cliente(
          clienteRes.id,
          clienteRes.nombre,
          clienteRes.apellido,
          clienteRes.tipoDocumento,
          clienteRes.numeroDocumento,
          clienteRes.fechaCreacion,
          clienteRes.idUsuarioCreacion
        );
        this.usuarioEncontrado = true;
        this.notificacion.info(this.BUSQUEDA_REALIZADA_CON_EXITO);
      } else {
        this.notificacion.warning(this.NO_SE_ECONTRARON_RESULTADOS);
      }
    }, err => {
      this.notificacion.error(JSON.stringify(err));
    });
  }

  consultarCuentasSegunCliente() {
    this.clienteService.obtenerListaCuentaSegunCliente(this.cliente).subscribe(res => {
      if (res.length > 0) {
        this.cliente.construirListadoCuenta(res);
        this.notificacion.info(this.BUSQUEDA_REALIZADA_CON_EXITO);
      } else {
        this.notificacion.warning(this.NO_SE_ECONTRARON_RESULTADOS);
      }
    }, err => {
      this.notificacion.error(JSON.stringify(err));
    });
  }

  consultarTrancaccion(cuenta: Cuenta) {
    this.clienteService.obtenerListaTransaccionPorCuenta(cuenta.id).subscribe(res => {
      if (res.length > 0) {
        cuenta.construirListadoTransaccion(res);
        this.listadoDeTransacciones = cuenta.listaTransacciones;
        this.notificacion.info(this.TRANSACCIONES_CARGADAS);
      } else {
        this.notificacion.warning(this.NO_SE_ECONTRARON_RESULTADOS);
      }
    }, err => {
      this.notificacion.error(JSON.stringify(err));
    });
  }

  nuevaBusqueda() {
    this.cliente.listadoCuentas = [];
    this.usuairoNoEncontrado();
  }

  private construirFormularioProducto() {
    this.clienteFormulario = new FormGroup({
      tipoDocumento: new FormControl('', [Validators.required]),
      numeroDocumento: new FormControl('', [Validators.required])
    });
  }

  private usuairoNoEncontrado() {
    this.usuarioEncontrado = false;
    this.listadoDeCuentasDeCliente = [];
    this.listadoDeTransacciones = [];
    this.cliente = undefined;
  }
}
