import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Cuenta } from '../model/cuenta';


@Injectable()
export class CuentaService {
  private URL_CUENTAS_POR_CLIENTE: string;
  private URL_CUENTAS: string;

  constructor(protected http: HttpService) {
    this.URL_CUENTAS_POR_CLIENTE = "/cuentas";
    this.URL_CUENTAS = "/cuentas/";
  }

  public obtenerListaCuentaSegunCliente(cuenta: Cuenta) {
    let parametros: HttpParams = new HttpParams()
      .set('idCliente', cuenta.id.toString());

    return this.http.doGetParameters<Cuenta[]>(`${environment.endpoint}${this.URL_CUENTAS_POR_CLIENTE}`,
      parametros,
      this.http.optsName('Listar cuentas segun el cliente'));
  }

  public obtenerListaCuentas() {
    return this.http.doGet<Cuenta[]>(`${environment.endpoint}${this.URL_CUENTAS}`,
      this.http.optsName('Listar cuentas'));
  }

  public eliminar(id: number) {
    return this.http.doDelete<boolean>(`${environment.endpoint}${this.URL_CUENTAS}${id}`,
      this.http.optsName('Eliminar Cuenta'));
  }

  public crear(cuenta: Cuenta){
    let objeto = this.armarNuevoObjeto(cuenta);
    return this.http.doPost<any, boolean>(`${environment.endpoint}${this.URL_CUENTAS}`, objeto,
      this.http.optsName('Crear cuenta'));
  }

  private armarNuevoObjeto(cuenta: Cuenta){
    let fecha = new Date();
    let anio = fecha.getFullYear();
    let mes = `${fecha.getMonth()+1}`;
    if(parseInt(mes) < 10){
      mes = `0${mes}`;
    }
    let dia = fecha.getDate();

    let hora = `${fecha.getHours()}`;
    if(parseInt(hora) < 10){
      hora = `0${hora}`;
    }

    let minuto = `${fecha.getMinutes()}`;
    if(parseInt(minuto) < 10){
      minuto = `0${minuto}`;
    }

    let segundos = `${fecha.getSeconds()}`;
    if(parseInt(segundos) < 10){
      segundos = `0${segundos}`;
    }

    let formatoFecha = [anio,mes,dia].join('-') + ' ' + [hora, minuto, segundos].join(':');
        
    let objeto: Object = {
      numeroCuenta: cuenta.numeroCuenta.toString(),
      montoMaximo: cuenta.montoMaximo.toString(),
      monto: cuenta.monto.toString(),
      idCliente: cuenta.idCliente.toString(),
      fechaCreacion: formatoFecha
    }
    return objeto;
  }
}
