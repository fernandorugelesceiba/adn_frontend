import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { Cuenta } from '@cuenta/shared/model/cuenta';
import { Transaccion } from 'src/app/feature/transaccion/shared/model/transaccion';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente';


@Injectable()
export class ClienteService {
  private URL_CLIENTE_POR_TIPO_NUMERO_DOCUMENTO: string;
  private URL_CUENTAS_SEGUN_CLIENTE: string;
  private URL_TRANSACCIONES_SEGUN_CUENTA: string;
  private URL_LISTADO_CLIENTES: string;

  constructor(protected http: HttpService) {
    this.URL_CLIENTE_POR_TIPO_NUMERO_DOCUMENTO = '/clientes/id?';
    this.URL_CUENTAS_SEGUN_CLIENTE = '/cuentas/id?';
    this.URL_TRANSACCIONES_SEGUN_CUENTA = '/transacciones/transaccion?';
    this.URL_LISTADO_CLIENTES = '/clientes';
  }

  public verificarClienteSegunNumeroYTipoDocumento(cliente: Cliente) {
    const parametros: HttpParams = new HttpParams()
      .set('tipoDocumento', cliente.tipoDocumento.toString())
      .set('numeroDocumento', cliente.numeroDocumento);

    return this.http.doGetParameters<Cliente[]>(`${environment.endpoint}${this.URL_CLIENTE_POR_TIPO_NUMERO_DOCUMENTO}`,
      parametros,
      this.http.optsName('Verificar las credencias del cliente'));

  }

  public obtenerListaCuentaSegunCliente(cliente: Cliente) {
    const parametros: HttpParams = new HttpParams()
      .set('idCliente', cliente.id.toString());

    return this.http.doGetParameters<Cuenta[]>(`${environment.endpoint}${this.URL_CUENTAS_SEGUN_CLIENTE}`,
      parametros,
      this.http.optsName('Listar cuentas segun el cliente'));
  }

  public obtenerListaTransaccionPorCuenta(idCuenta: number) {
    const parametros: HttpParams = new HttpParams()
      .set('idCuenta', idCuenta.toString());

    return this.http.doGetParameters<Transaccion[]>(`${environment.endpoint}${this.URL_TRANSACCIONES_SEGUN_CUENTA}`,
      parametros,
      this.http.optsName('Listar Transaccion'));
  }

  public obtenerListadoClientes() {
    return this.http.doGet<Cliente[]>(`${environment.endpoint}${this.URL_LISTADO_CLIENTES}`,
      this.http.optsName('Listar clientes'));
  }
}
