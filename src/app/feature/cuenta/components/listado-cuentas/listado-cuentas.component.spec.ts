import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ListadoCuentasComponent } from './listado-cuentas.component';
import { ClienteService } from '@cliente/shared/service/cliente.service';
import { HttpService } from '@core/services/http.service';
import { CuentaService } from '@cuenta/shared/service/cuenta.service';
import { Cliente } from '@cliente/shared/model/cliente';
import { of } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Cuenta } from '@cuenta/shared/model/cuenta';
import { ManejadorError } from '@core/interceptor/manejador-error';
import { TransaccionService } from '@transaccion/shared/service/transaccion.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListadoCuentasComponent', () => {
  let component: ListadoCuentasComponent;
  let clienteService: ClienteService;
  let cuentaService: CuentaService;
  let fixture: ComponentFixture<ListadoCuentasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoCuentasComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [TransaccionService, ClienteService, CuentaService, HttpService, ToastrService, ManejadorError]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoCuentasComponent);
    clienteService = TestBed.inject(ClienteService);
    cuentaService = TestBed.inject(CuentaService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  describe('cuando el metodo obtenerListadoClientes es llamado', () => {
    it('debe retornar un mapa de clientes', () => {
      // arrange
      const cliente = new Cliente(1, 'fernando', 'rugeles', 1, '1098744055', '2021-04-15 09:55:43', 1);
      const listaClientes = [cliente];
      const mapaCliente = new Map();
      mapaCliente.set(cliente.id, `${cliente.nombre} ${cliente.apellido}`);
      spyOn(clienteService, 'obtenerListadoClientes').and.returnValue(of(listaClientes));

      // act
      component.obtenerListadoClientes();

      // assert
      expect(component.mapaClientes).toEqual(mapaCliente);
    });
  });


  describe('cuando el metodo consultarCuentas es llamado', () => {
    it('debe retornar una lista de cuentas', () => {
      // arrange
      const listadoCuentas = [new Cuenta(1, '1234567890', 1200000, 500000, 1, new Date())];
      spyOn(cuentaService, 'obtenerListaCuentas').and.returnValue(of(listadoCuentas));

      // act
      component.consultarCuentas();

      // assert
      expect(component.listadoCuentas.length).toBeGreaterThan(0);
    });
  });

  describe('cuando el metodo eliminar es llamado', () => {
    it('debe eliminar un registro y quitarlo de la lista', () => {
      // arrange
      const cuentaUno = new Cuenta(1, '1234567890', 1200000, 500000, 1, new Date());
      const cuentaDos = new Cuenta(2, '1234567891', 1200000, 500000, 1, new Date());
      const listadoCuentas = [cuentaUno, cuentaDos];
      component.listadoCuentas = listadoCuentas;
      spyOn(cuentaService, 'eliminar').and.returnValue(of(true));

      // act
      component.eliminar(cuentaDos.id, 1);

      // assert
      expect(component.listadoCuentas.length).toBeGreaterThan(0);
    });
  });
});
