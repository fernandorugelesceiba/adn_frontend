import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '@cliente/shared/model/cliente';
import { ClienteService } from '@cliente/shared/service/cliente.service';
import { Cuenta } from '@cuenta/shared/model/cuenta';
import { CuentaService } from '@cuenta/shared/service/cuenta.service';
import { Transaccion } from '@transaccion/shared/model/transaccion';
import { TransaccionService } from '@transaccion/shared/service/transaccion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-producto',
  templateUrl: './crear-transaccion.component.html',
  styleUrls: ['./crear-transaccion.component.css']
})
export class CrearTransaccionComponent implements OnInit {
  private NO_SE_ECONTRARON_RESULTADOS = "No se encontraron resultado";
  private BUSQUEDA_REALIZADA_CON_EXITO = "Busqueda realizada con exito";
  private TRANSACCION_CREADA = "La transacción fue creada con exito";
  private TRANSACCION_NO_CREADA = "La transacción no pudo ser creada";

  public listadoClientes: Array<Cliente>;
  public listadoCuentas: Array<Cuenta>;
  public listadoCuentasOrigen: Array<Cuenta>;
  public listadoCuentasDestino: Array<Cuenta>;
  public transaccionFormulario: FormGroup;
  public idClienteSeleccionado: number;
  public cuentaOrigenSeleccionada: Cuenta;
  public cuentaDestinoSeleccionada: Cuenta;
  public transaccion: Transaccion;
  public notificacion: ToastrService;

  constructor(protected transaccionService: TransaccionService,protected clienteService: ClienteService, protected cuentaService: CuentaService, public toastr: ToastrService) {
    this.listadoClientes = [];
    this.listadoCuentasOrigen = [];
    this.listadoCuentasDestino = [];
    this.listadoCuentas = [];
    this.notificacion = toastr;
  }

  ngOnInit() {
    this.obtenerListadoClientes();
    this.construirFormulario();
  }

  obtenerListadoClientes() {
    this.clienteService.obtenerListadoClientes().subscribe(res => {
      debugger;
      if (res.length > 0) {
        this.listadoClientes = res;
      } else {
        debugger;
        this.notificacion.warning(this.NO_SE_ECONTRARON_RESULTADOS);
      }
    }, err => {
      debugger;
      this.notificacion.error(JSON.stringify(err));
    });
  }

  consultarCuentas() {
    this.cuentaService.obtenerListaCuentas().subscribe(res => {
      if (res.length > 0) {
        this.listadoCuentas = res;
        this.notificacion.info(this.BUSQUEDA_REALIZADA_CON_EXITO);
        this.reconstruirListadoCuentas();
      } else {
        this.notificacion.warning(this.NO_SE_ECONTRARON_RESULTADOS);
      }
    }, err => {
      this.notificacion.error(JSON.stringify(err));
    });
  }

  seleccionarCuentaOrigen(cuenta: Cuenta) {
    this.cuentaDestinoSeleccionada = undefined;
    this.cuentaOrigenSeleccionada = cuenta;
  }

  seleccionarCuentaDestino(cuenta: Cuenta) {
    this.cuentaDestinoSeleccionada = cuenta;
    this.construirFormularioTransaccion();
  }

  crearTransaccion(){
    this.transaccionService.crear(this.transaccion).subscribe(res => {
      if (res) {
        this.notificacion.info(this.TRANSACCION_CREADA);
        this.cuentaDestinoSeleccionada = undefined;
      } else {
        this.notificacion.warning(this.TRANSACCION_NO_CREADA);
      }
    }, err => {
      this.notificacion.error(JSON.stringify(err));
    });
  }

  private construirFormulario() {
    this.transaccionFormulario = new FormGroup({
      idCliente: new FormControl('', [Validators.required])
    });
  }

  private construirFormularioTransaccion() {
    this.transaccionFormulario = new FormGroup({
      montoTransaccion: new FormControl('', [Validators.required])
    });

    this.transaccion = new Transaccion(
      1,this.cuentaOrigenSeleccionada.id,
      this.cuentaDestinoSeleccionada.id, 
      this.transaccionFormulario.value.montoTransaccion, 0.5,
      new Date(), 1, "",""
    );
  }

  private reconstruirListadoCuentas() {
    this.limpiarListas();
    for (let cuenta of this.listadoCuentas) {
      //armar cuentas de destino y origen
      if (cuenta.idCliente == this.idClienteSeleccionado) {
        this.listadoCuentasOrigen.push(cuenta);
      }
      this.listadoCuentasDestino.push(cuenta);
    }
  }

  private limpiarListas(){
    this.listadoCuentasDestino = [];
    this.listadoCuentasOrigen = [];
    this.cuentaOrigenSeleccionada = undefined;
    this.cuentaDestinoSeleccionada = undefined;
  }

}
