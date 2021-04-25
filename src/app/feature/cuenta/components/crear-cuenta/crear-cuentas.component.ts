import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '@cliente/shared/model/cliente';
import { ClienteService } from '@cliente/shared/service/cliente.service';
import { CuentaService } from '@cuenta/shared/service/cuenta.service';
import { ToastrService } from 'ngx-toastr';
import { Cuenta } from '../../shared/model/cuenta';

@Component({
  selector: 'app-crear-cuentas',
  templateUrl: './crear-cuentas.component.html',
  styleUrls: ['./crear-cuentas.component.css']
})
export class CrearCuentasComponent implements OnInit {
  private NO_SE_ECONTRARON_RESULTADOS = 'No se encontraron resultado';
  private CUENTA_CREADA = 'La cuenta fue creada con exito';
  private CUENTA_NO_CREADA = 'La cuenta no pudo ser creada';
  private LONGITUD_MINIMA_PERMITIDA_NUMERO_DOCUMENTO = 10;


  public listadoCuentas: Array<Cuenta>;
  public cuentasFormulario: FormGroup;
  public listadoClientes: Array<Cliente>;
  public notificacion;

  constructor(protected cuentaService: CuentaService, protected clienteService: ClienteService, public toastr: ToastrService) {
    this.listadoClientes = [];
    this.notificacion = toastr;
  }

  ngOnInit() {
    this.construirFormulario();
    this.obtenerListadoClientes();
  }

  obtenerListadoClientes() {
    this.clienteService.obtenerListadoClientes().subscribe(res => {
      if (res.length > 0) {
        this.listadoClientes = res;
      } else {
        this.notificacion.warning(this.NO_SE_ECONTRARON_RESULTADOS);
      }
    }, err => {
      this.notificacion.error(JSON.stringify(err));
    });
  }

  crearCuenta() {
    this.cuentaService.crear(this.cuentasFormulario.value).subscribe(res => {
      if (res) {
        this.notificacion.warning(this.CUENTA_CREADA);
      } else {
        this.notificacion.warning(this.CUENTA_NO_CREADA);
      }
    }, err => {
      this.notificacion.error(JSON.stringify(err));
    });
  }

  private construirFormulario() {
    this.cuentasFormulario = new FormGroup({
      numeroCuenta: new FormControl('', [Validators.required, Validators.minLength(this.LONGITUD_MINIMA_PERMITIDA_NUMERO_DOCUMENTO)]),
      idCliente: new FormControl('', [Validators.required]),
      monto: new FormControl('', [Validators.required]),
      montoMaximo: new FormControl('', [Validators.required])
    });
  }
}
