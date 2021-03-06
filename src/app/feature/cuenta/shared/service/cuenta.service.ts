import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Cuenta } from '../model/cuenta';


@Injectable()
export class CuentaService {
  private URL_CUENTAS_POR_CLIENTE: string;
  private URL_CUENTAS: string;
  private MAXIMA_CANTIDAD_CARACTERES_UNA_SIFRA: number;

  constructor(protected http: HttpService) {
    this.URL_CUENTAS_POR_CLIENTE = '/cuentas';
    this.URL_CUENTAS = '/cuentas/';
    this.MAXIMA_CANTIDAD_CARACTERES_UNA_SIFRA = 2;
  }

  public obtenerListaCuentaSegunCliente(cuenta: Cuenta) {
    const parametros: HttpParams = new HttpParams()
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

  public crear(cuenta: Cuenta) {
    const objeto: object = this.armarNuevoObjeto(cuenta);
    return this.http.doPost<object, boolean>(`${environment.endpoint}${this.URL_CUENTAS}`, objeto,
      this.http.optsName('Crear cuenta'));
  }

  private armarNuevoObjeto(cuenta: Cuenta) {
    const fecha = cuenta.fechaCreacion;
    const fechaObjeto = {
      anio: fecha.getFullYear(),
      mes: `${fecha.getMonth() + 1}`,
      dia: fecha.getDate(),
      hora: `${fecha.getHours()}`,
      minuto: `${fecha.getMinutes()}`,
      segundos: `${fecha.getSeconds()}`
    };
    if (fechaObjeto.mes.length < this.MAXIMA_CANTIDAD_CARACTERES_UNA_SIFRA) {
      fechaObjeto.mes = `0${fechaObjeto.mes}`;
    }
    if (fechaObjeto.hora.length < this.MAXIMA_CANTIDAD_CARACTERES_UNA_SIFRA) {
      fechaObjeto.hora = `0${fechaObjeto.hora}`;
    }
    if (fechaObjeto.minuto.length < this.MAXIMA_CANTIDAD_CARACTERES_UNA_SIFRA) {
      fechaObjeto.minuto = `0${fechaObjeto.minuto}`;
    }
    if (fechaObjeto.segundos.length < this.MAXIMA_CANTIDAD_CARACTERES_UNA_SIFRA) {
      fechaObjeto.segundos = `0${fechaObjeto.segundos}`;
    }

    const formatoFecha = [
      fechaObjeto.anio,
      fechaObjeto.mes,
      fechaObjeto.dia
    ].join('-') + ' ' + [
      fechaObjeto.hora,
      fechaObjeto.minuto,
      fechaObjeto.segundos
    ].join(':');

    const objeto: object = {
      numeroCuenta: cuenta.numeroCuenta.toString(),
      montoMaximo: cuenta.montoMaximo.toString(),
      monto: cuenta.monto.toString(),
      idCliente: cuenta.idCliente.toString(),
      fechaCreacion: formatoFecha
    };

    return objeto;
  }
}
