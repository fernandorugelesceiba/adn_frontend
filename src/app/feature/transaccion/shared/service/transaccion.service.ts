import { Injectable } from '@angular/core';
import { ClienteService } from '@cliente/shared/service/cliente.service';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Transaccion } from '../model/transaccion';


@Injectable()
export class TransaccionService {
  private URL_TRANSACCION: string;

  constructor(protected http: HttpService, protected clienteService: ClienteService) {
    this.URL_TRANSACCION = '/transacciones';
  }

  public crear(transaccion: Transaccion) {
    return this.http.doPost<any, boolean>(`${environment.endpoint}${this.URL_TRANSACCION}`, this.armarNuevoObjeto(transaccion),
      this.http.optsName('Crear Transaccion'));
  }

  private armarNuevoObjeto(transaccion: Transaccion) {
    const fecha = transaccion.fechaCreacion;
    const fechaObjeto = {
      anio: fecha.getFullYear(),
      mes: `${fecha.getMonth() + 1}`,
      dia: fecha.getDate(),
      hora: `${fecha.getHours()}`,
      minuto: `${fecha.getMinutes()}`,
      segundos: `${fecha.getSeconds()}`
    };
    if (fechaObjeto.mes.length >= 2) {
      fechaObjeto.mes = `0${fechaObjeto.mes}`;
    }
    if (fechaObjeto.hora.length >= 2) {
      fechaObjeto.hora = `0${fechaObjeto.hora}`;
    }
    if (fechaObjeto.minuto.length >= 2) {
      fechaObjeto.minuto = `0${fechaObjeto.minuto}`;
    }
    if (fechaObjeto.segundos.length >= 2) {
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
      id: transaccion.id.toString(),
      idCuentaOrigen: transaccion.idCuentaOrigen.toString(),
      idCuentaDestino: transaccion.idCuentaDestino.toString(),
      valorTransaccion: transaccion.valorTransaccion.toString(),
      porcentajeDescuento: transaccion.porcentajeDescuento.toString(),
      fechaCreacion: formatoFecha,
      estado: transaccion.estado.toString()
    };

    return objeto;
  }
}
