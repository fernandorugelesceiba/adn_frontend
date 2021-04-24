import { Injectable } from '@angular/core';
import { ClienteService } from '@cliente/shared/service/cliente.service';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Transaccion } from '../model/transaccion';


@Injectable()
export class TransaccionService {
  private URL_TRANSACCION: string;

  constructor(protected http: HttpService, protected clienteService: ClienteService) {
    this.URL_TRANSACCION = "/transacciones";
  }

  public crear(transaccion: Transaccion) {
    return this.http.doPost<any, boolean>(`${environment.endpoint}${this.URL_TRANSACCION}`, this.armarNuevoObjeto(transaccion),
      this.http.optsName('Crear Transaccion'));
  }

  private armarNuevoObjeto(transaccion: Transaccion){
    let anio = transaccion.fechaCreacion.getFullYear();
    let mes = `${transaccion.fechaCreacion.getMonth()+1}`;
    if(parseInt(mes) < 10){
      mes = `0${mes}`;
    }
    let dia = transaccion.fechaCreacion.getDate();

    let hora = `${transaccion.fechaCreacion.getHours()}`;
    if(parseInt(hora) < 10){
      hora = `0${hora}`;
    }

    let minuto = `${transaccion.fechaCreacion.getMinutes()}`;
    if(parseInt(minuto) < 10){
      minuto = `0${minuto}`;
    }

    let segundos = `${transaccion.fechaCreacion.getSeconds()}`;
    if(parseInt(segundos) < 10){
      segundos = `0${segundos}`;
    }

    let formatoFecha = [anio,mes,dia].join('-') + ' ' + [hora, minuto, segundos].join(':');

    let objeto: Object = {
      id: transaccion.id.toString(),
      idCuentaOrigen: transaccion.idCuentaOrigen.toString(),
      idCuentaDestino: transaccion.idCuentaDestino.toString(),
      valorTransaccion: transaccion.valorTransaccion.toString(),
      porcentajeDescuento: transaccion.porcentajeDescuento.toString(),
      fechaCreacion: formatoFecha,
      estado: transaccion.estado.toString()
    }
    return objeto;
  }
}
