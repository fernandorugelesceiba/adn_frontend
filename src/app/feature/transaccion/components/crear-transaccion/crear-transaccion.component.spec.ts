import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTransaccionComponent } from './crear-transaccion.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '@core/services/http.service';
import { TransaccionService } from '@transaccion/shared/service/transaccion.service';
import { ClienteService } from '@cliente/shared/service/cliente.service';
import { CuentaService } from '@cuenta/shared/service/cuenta.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Cliente } from '@cliente/shared/model/cliente';
import { of, throwError } from 'rxjs';
import { Cuenta } from '@cuenta/shared/model/cuenta';
import { Transaccion } from '@transaccion/shared/model/transaccion';

describe('CrearTransaccionComponent', () => {
  let component: CrearTransaccionComponent;
  let fixture: ComponentFixture<CrearTransaccionComponent>;
  let clienteService: ClienteService;
  let cuentaService: CuentaService;
  let notificacionService: ToastrService;
  let transaccionService: TransaccionService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CrearTransaccionComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot()
      ],
      providers: [HttpService, TransaccionService, ClienteService, CuentaService, ToastrService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearTransaccionComponent);
    clienteService = TestBed.inject(ClienteService);
    cuentaService = TestBed.inject(CuentaService);
    notificacionService = TestBed.inject(ToastrService);
    transaccionService = TestBed.inject(TransaccionService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('cuando el metodo obtenerListadoClientes es llamado', () => {
    it('no debe retornar nada', () => {
      // arrange
      const listaClientes = [];
      spyOn(clienteService, 'obtenerListadoClientes').and.returnValue(of(listaClientes));
      component.notificacion = notificacionService;

      // act
      component.obtenerListadoClientes();

      // assert
      expect(component.listadoClientes.length).toBe(0);
    });

    it('debe retornar un cliente', () => {
      // arrange
      const listaClientes = [new Cliente(1, 'fernando', 'rugeles', 1, '1098744055', '2021-04-15 09:55:43', 1)];
      spyOn(clienteService, 'obtenerListadoClientes').and.returnValue(of(listaClientes));

      // act
      component.obtenerListadoClientes();

      // assert
      expect(component.listadoClientes.length).toBeGreaterThan(0);
    });
  });


  describe('cuando el metodo consultarCuentas es llamado', () => {
    it('no debe retornar nada', () => {
      // arrange
      const listadoCuentas  = [];
      spyOn(cuentaService, 'obtenerListaCuentas').and.returnValue(of(listadoCuentas));
      
      // act
      component.notificacion = notificacionService;
      component.consultarCuentas();

      // assert
      expect(component.listadoCuentas.length).toBe(0);
    });

    it('debe retornar una lista de cuentas', () => {
      // arrange
      const listadoCuentas = [new Cuenta(1,'1234567890',1200000,500000,1,new Date())];
      spyOn(cuentaService, 'obtenerListaCuentas').and.returnValue(of(listadoCuentas));
      
      // act
      component.consultarCuentas();

      // assert
      expect(component.listadoCuentas.length).toBeGreaterThan(0);
    });

    it('debe espera un error', () => {
      // arrange
      spyOn(cuentaService, 'obtenerListaCuentas').and.returnValue(throwError({ error: 'error' }));
      
      // act
      component.consultarCuentas();

      // assert
      expect(component.listadoCuentas.length).toBe(0);
    });
  });

  describe('cuando el metodo seleccionarCuentaOrigen es llamado', () => {
    it('debe indefinir la variable cuentaDestinoSeleccionada y asignar valor a la variable cuentaOrigenSeleccionada ', () => {
      // arrange
      const cuenta  = new Cuenta(1,'1234567890',1200000,500000,1,new Date());

      // act
      component.seleccionarCuentaOrigen(cuenta);

      // assert
      expect(component.cuentaDestinoSeleccionada).toBeUndefined();
      expect(component.cuentaOrigenSeleccionada).toBe(cuenta);
    });

    it('debe asignar valor a la variable cuentaDestinoSeleccionada', () => {
      // arrange
      const cuenta  = new Cuenta(1,'1234567890',1200000,500000,1,new Date());
      component.cuentaOrigenSeleccionada = cuenta;

      // act
      component.seleccionarCuentaDestino(cuenta);

      // assert
      expect(component.cuentaDestinoSeleccionada).toBe(cuenta);
    });
  });

  describe('cuando el metodo crearTransaccion es llamado', () => {
    it('debe crear una transaccion', () => {
      // arrange
      const transaccion = new Transaccion(1,1,2,100,0.5,new Date(),1,'','');
      component.transaccion = transaccion;
      component.notificacion = notificacionService;
      spyOn(transaccionService, 'crear').and.returnValue(throwError({ error: 'error' }));

      // act
      component.crearTransaccion();

      // assert
      expect(component.cuentaDestinoSeleccionada).toBeUndefined();
    });
  });

});
