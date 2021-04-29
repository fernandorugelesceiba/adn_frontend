import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CuentaService } from './cuenta.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Cuenta } from '../model/cuenta';
import { ClienteService } from '@cliente/shared/service/cliente.service';
import { HttpResponse } from '@angular/common/http';

describe('CuentaService', () => {
  let httpMock: HttpTestingController;
  let service: CuentaService;
  const URL_CUENTAS = environment.endpoint + '/cuentas/';

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CuentaService, ClienteService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(CuentaService);
  });

  it('should be created', () => {
    const cuentaService: CuentaService = TestBed.inject(CuentaService);
    expect(cuentaService).toBeTruthy();

    const clienteService: ClienteService = TestBed.inject(ClienteService);
    expect(clienteService).toBeTruthy();
  });

  it('deberia obtener una lista de cuentas segun un cliente', () => {
    const cuenta = new Cuenta(1, '1234567890', 1200000, 500000, 1, new Date());
    const dummyCuentas = [
      new Cuenta(1, '1234567890', 1200000, 500000, 1, new Date()),
      new Cuenta(3, '1234567891', 1300000, 600000, 1, new Date()),
    ];
    service.obtenerListaCuentaSegunCliente(cuenta).subscribe(cuentas => {
      expect(cuentas.length).toBe(2);
      expect(cuentas).toEqual(dummyCuentas);
    });
    const req = httpMock.expectOne(`${environment.endpoint}/cuentas?idCliente=1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCuentas);
  });

  it('deberia obtener una lista de cuentas', () => {
    const dummyCuentas = [
      new Cuenta(1, '1234567890', 1200000, 500000, 1, new Date()),
      new Cuenta(3, '1234567891', 1300000, 600000, 1, new Date()),
    ];
    service.obtenerListaCuentas().subscribe(cuentas => {
      expect(cuentas.length).toBe(2);
      expect(cuentas).toEqual(dummyCuentas);
    });
    const req = httpMock.expectOne(URL_CUENTAS);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCuentas);
  });

  it('deberia eliminar una cuenta segun su id', () => {
    const dummyIdCuenta = 1;
    service.eliminar(dummyIdCuenta).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${URL_CUENTAS}${dummyIdCuenta}`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({ body: true }));
  });


  it('deberia crear una cuenta con fechas de un digito', () => {
    const fecha = new Date(2013, 6, 7, 2, 8, 3);
    const dummyCuenta = new Cuenta(1, '1234567890', 1200000, 500000, 1, fecha);
    service.crear(dummyCuenta).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(URL_CUENTAS);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({ body: true }));
  });

  it('deberia crear una cuenta con fechas de dos', () => {
    const fecha = new Date(2013, 12, 12, 17, 15, 20);
    const dummyCuenta = new Cuenta(1, '1234567890', 1200000, 500000, 1, fecha);
    service.crear(dummyCuenta).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(URL_CUENTAS);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({ body: true }));
  });
});
