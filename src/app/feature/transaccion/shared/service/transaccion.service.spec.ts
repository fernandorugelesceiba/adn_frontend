import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { TransaccionService } from './transaccion.service';
import { Transaccion } from '../model/transaccion';
import { HttpResponse } from '@angular/common/http';
import { ClienteService } from '@cliente/shared/service/cliente.service';

describe('TransaccionService', () => {
  let httpMock: HttpTestingController;
  let service: TransaccionService;
  const URL_TRANSACCION = environment.endpoint + '/transacciones';
  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransaccionService, ClienteService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(TransaccionService);
  });

  it('should be created', () => {
    const transaccionService: TransaccionService = TestBed.inject(TransaccionService);
    expect(transaccionService).toBeTruthy();
  });

  it('deberia crear una transaccion', () => {
    const dummyTransaccion = new Transaccion(1, 1, 2, 11200, 0.5, new Date(), 1, '', '');
    service.crear(dummyTransaccion).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(URL_TRANSACCION);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({ body: true }));
  });

  it('deberia crear una cuenta con fechas de un digito', () => {
    var fecha = new Date(1962, 6, 7, 2, 8, 3);
    const dummyTransaccion = new Transaccion(1, 1, 2, 11200, 0.5, fecha, 1, '', '');
    service.crear(dummyTransaccion).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(URL_TRANSACCION);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({ body: true }));
  });
});
