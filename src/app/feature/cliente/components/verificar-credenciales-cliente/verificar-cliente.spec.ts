import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  RouterTestingModule
} from '@angular/router/testing';
import { VerificarCredencialesClienteComponent } from './verificar-cliente.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from '@cliente/shared/service/cliente.service';
import { HttpService } from '@core/services/http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Cliente } from '@cliente/shared/model/cliente';
import { of } from 'rxjs';
import { Cuenta } from '@cuenta/shared/model/cuenta';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Transaccion } from '@transaccion/shared/model/transaccion';

describe('VerificarCredencialesClienteComponent', () => {
  let component: VerificarCredencialesClienteComponent;
  let fixture: ComponentFixture<VerificarCredencialesClienteComponent>;
  let clienteService: ClienteService;
  let notificacionService: ToastrService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VerificarCredencialesClienteComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
      ],
      providers: [ClienteService, HttpService, ToastrService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificarCredencialesClienteComponent);
    clienteService = TestBed.inject(ClienteService);
    notificacionService = TestBed.inject(ToastrService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('cuando el metodo obtenerListadoClientes es llamado', () => {
    it('debe retornar un cliente', () => {
      // arrange
      const cliente = new Cliente(1, 'fernando', 'rugeles', 1, '1098744055', '2021-04-15 09:55:43', 1);
      const listaClientes = [cliente];
      component.clienteFormulario.controls.tipoDocumento.setValue(cliente.tipoDocumento);
      component.clienteFormulario.controls.numeroDocumento.setValue(cliente.numeroDocumento);
      spyOn(clienteService, 'verificarClienteSegunNumeroYTipoDocumento').and.returnValue(of(listaClientes));
      component.notificacion = notificacionService;

      //  act
      component.consultarPorTipoYNumeroDocumento();

      // assert
      expect(component.cliente).toEqual(cliente);
      expect(component.usuarioEncontrado).toEqual(true);
    });
  });


  describe('cuando el metodo consultarCuentasSegunCliente es llamado', () => {
    it('debe retornar un cliente', () => {
      // arrange
      const cliente = new Cliente(1, 'fernando', 'rugeles', 1, '1098744055', '2021-04-15 09:55:43', 1);
      const cuenta = new Cuenta(1, '1234567890', 1200000, 500000, 1, new Date());
      const listadoCuentas = [cuenta];
      component.notificacion = notificacionService;
      spyOn(clienteService, 'obtenerListaCuentaSegunCliente').and.returnValue(of(listadoCuentas));

      // act
      component.consultarPorTipoYNumeroDocumento();
      component.cliente = cliente;

      // assert
      expect(component.cliente).toEqual(cliente);
    });

    it('debe retornar cuentas para la reocnstruccion', () => {
      // arrange
      const cuenta = new Cuenta(1, '1234567890', 1200000, 500000, 1, new Date());
      const cuenta2 = new Cuenta(2, '1234567891', 1200000, 500000, 1, new Date());
      const cliente = new Cliente(1, 'fernando', 'rugeles', 1, '1098744055', '2021-04-15 09:55:43', 1);
      const listadoCuentas = [cuenta, cuenta2];
      component.notificacion = notificacionService;
      component.cliente = cliente;
      spyOn(clienteService, 'obtenerListaCuentaSegunCliente').and.returnValue(of(listadoCuentas));

      // act
      component.consultarCuentasSegunCliente();

      // assert
      expect(component.cliente.listadoCuentas.length).toBeGreaterThan(0);
    });
  });

  describe('cuando el metodo consultarCuentasSegunCliente es llamado', () => {
    it('debe retornar una lista de clientes', () => {
      // arrange
      const cliente = new Cliente(1, 'fernando', 'rugeles', 1, '1098744055', '2021-04-15 09:55:43', 1);
      const cuenta = new Cuenta(1, '1234567890', 1200000, 500000, 1, new Date());
      const listadoCuentas = [cuenta];
      component.notificacion = notificacionService;
      spyOn(clienteService, 'obtenerListaCuentaSegunCliente').and.returnValue(of(listadoCuentas));

      // act
      component.consultarPorTipoYNumeroDocumento();
      component.cliente = cliente;
      component.cliente.listadoCuentas = listadoCuentas;

      // assert
      expect(component.cliente.listadoCuentas.length).toBeGreaterThan(0);
    });
  });


  describe('cuando el metodo consultarTrancaccion es llamado', () => {
    it('debe retornar una lista de transacciones', () => {
      // arrange
      const cuenta = new Cuenta(1, '1234567890', 1200000, 500000, 1, new Date());
      const listaTransacciones = [
        new Transaccion(1, 1, 2, 11200, 0.5, new Date(), 1, '', ''),
        new Transaccion(2, 1, 2, 200, 0.5, new Date(), 1, '', '')
      ];
      component.notificacion = notificacionService;
      spyOn(clienteService, 'obtenerListaTransaccionPorCuenta').and.returnValue(of(listaTransacciones));

      // act
      component.consultarTrancaccion(cuenta);

      // assert
      expect(component.listadoDeTransacciones .length).toBeGreaterThan(0);
    });

    it('no debe retornar una lista de transacciones', () => {
      // arrange
      const cuenta = new Cuenta(1, '1234567890', 1200000, 500000, 1, new Date());
      const listaTransacciones = [];
      component.notificacion = notificacionService;
      spyOn(clienteService, 'obtenerListaTransaccionPorCuenta').and.returnValue(of(listaTransacciones));

      // act
      component.consultarTrancaccion(cuenta);

      // assert
      expect(component.listadoDeTransacciones.length).toBe(0);
    });
  });


  describe('cuando el metodo nuevaBusqueda es llamado', () => {
    it('debe limpiar la variables', () => {
      // arrange
      const cliente = new Cliente(1, 'fernando', 'rugeles', 1, '1098744055', '2021-04-15 09:55:43', 1);
      component.cliente = cliente;

      // act
      component.nuevaBusqueda();

      // assert
      expect(component.cliente).toBeUndefined();
      expect(component.usuarioEncontrado).toBeFalsy();
      expect(component.listadoDeCuentasDeCliente.length).toBe(0);
      expect(component.listadoDeTransacciones.length).toBe(0);
    });
  });
});
