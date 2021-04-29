import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ClienteService } from './cliente.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Cliente } from '../model/cliente';
import { Cuenta } from '@cuenta/shared/model/cuenta';
import { Transaccion } from '@transaccion/shared/model/transaccion';

describe('ClienteService', () => {
  let httpMock: HttpTestingController;
  let service: ClienteService;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClienteService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ClienteService);
  });

  it('should be created', () => {
    const clienteService: ClienteService = TestBed.inject(ClienteService);
    expect(clienteService).toBeTruthy();
  });

  it('deberia obtener un cliente segun numero y tipo de docuento', () => {
    const dummyClientes = [
      new Cliente(1, 'fernando', 'rugeles', 1, '1098744056', '2021-04-15 19:50:51', 1)
    ];
    service.verificarClienteSegunNumeroYTipoDocumento(dummyClientes[0]).subscribe(clientes => {
      expect(clientes.length).toBe(1);
      expect(clientes).toEqual(dummyClientes);
    });
    const req = httpMock.expectOne(`${environment.endpoint}/clientes/id?tipoDocumento=1&numeroDocumento=1098744056`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyClientes);
  });


  it('deberia obtener una lista de cuentas segun un cliente', () => {
    const cliente = new Cliente(1, 'fernando', 'rugeles', 1, '1098744056', '2021-04-15 19:50:51', 1);
    const dummyCuentas = [
      new Cuenta(1, '1234567890', 1200000, 500000, 1, new Date()),
      new Cuenta(3, '1234567891', 1300000, 600000, 1, new Date()),
    ];
    service.obtenerListaCuentaSegunCliente(cliente).subscribe(clientes => {
      expect(clientes.length).toBe(2);
      expect(clientes).toEqual(dummyCuentas);
    });
    const req = httpMock.expectOne(`${environment.endpoint}/cuentas/id?idCliente=1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCuentas);
  });


  it('deberia obtener una lista de transacciones segun la cuenta', () => {
    const cliente = new Cliente(1, 'fernando', 'rugeles', 1, '1098744056', '2021-04-15 19:50:51', 1);
    const dummyTransacciones = [
      new Transaccion(1, 1, 2, 11200, 0.5, new Date(), 1, '', ''),
      new Transaccion(2, 1, 2, 200, 0.5, new Date(), 1, '', '')
    ];
    service.obtenerListaTransaccionPorCuenta(cliente.id).subscribe(transacciones => {
      expect(transacciones.length).toBe(2);
      expect(transacciones).toEqual(dummyTransacciones);
    });
    const req = httpMock.expectOne(`${environment.endpoint}/transacciones/transaccion?idCuenta=1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTransacciones);
  });


  it('deberia obtener una lista de clientes', () => {
    const cliente = new Cliente(1, 'fernando', 'rugeles', 1, '1098744056', '2021-04-15 19:50:51', 1);
    const dummyTransacciones = [
      new Transaccion(1, 1, 2, 11200, 0.5, new Date(), 1, '', ''),
      new Transaccion(2, 1, 2, 200, 0.5, new Date(), 1, '', '')
    ];
    service.obtenerListaTransaccionPorCuenta(cliente.id).subscribe(transacciones => {
      expect(transacciones.length).toBe(2);
      expect(transacciones).toEqual(dummyTransacciones);
    });
    const req = httpMock.expectOne(`${environment.endpoint}/transacciones/transaccion?idCuenta=1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTransacciones);
  });
});
