import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  RouterTestingModule
} from '@angular/router/testing';
import { VerificarCredencialesClienteComponent } from './verificar-credenciales-cliente.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from '@cliente/shared/service/cliente.service';
import { HttpService } from '@core/services/http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Cliente } from '@cliente/shared/model/cliente';
import { of } from 'rxjs';
import { Cuenta } from '@cuenta/shared/model/cuenta';

describe('VerificarCredencialesClienteComponent', () => {
  let component: VerificarCredencialesClienteComponent;
  let fixture: ComponentFixture<VerificarCredencialesClienteComponent>;
  let clienteService: ClienteService;
  let notificacionService: ToastrService;
  //let toastService: ToastrService;
  //const listaTransacciones:Transaccion[] = [new Transaccion(1, 1,2,11200,0.5,new Date(),1,'','')];
  //const listaClientes: Cliente[] = [new Cliente(1, 'fernando', 'rugeles', 1, '1098744056', '2021-04-15 19:50:51', 1)];
  //const listaCuentas: Cuenta[] = [new Cuenta(1,'1234567890',1200000, 500000,1, new Date())];
  //const cliente: Cliente = new Cliente(1,'fernando','rugeles', 1,'1098744056','2021-04-15 19:50:51', 1);
  //const cuenta: Cuenta = new Cuenta(1,'1234567890',1200000, 500000,1, new Date());

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VerificarCredencialesClienteComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
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
      //arrange
      const cliente = new Cliente(1, 'fernando', 'rugeles', 1, '1098744055', '2021-04-15 09:55:43', 1);
      const listaClientes = [cliente];
      component.clienteFormulario.controls.tipoDocumento.setValue(cliente.tipoDocumento);
      component.clienteFormulario.controls.numeroDocumento.setValue(cliente.numeroDocumento);
      spyOn(clienteService, 'verificarClienteSegunNumeroYTipoDocumento').and.returnValue(of(listaClientes));
      component.notificacion = notificacionService;

      //act
      component.consultarPorTipoYNumeroDocumento();

      //assert
      expect(component.cliente).toEqual(cliente);
      expect(component.usuarioEncontrado).toBeTrue();
    });
  });


  describe('cuando el metodo consultarCuentasSegunCliente es llamado', () => {
    it('debe retornar un cliente', () => {
      //arrange
      const cliente = new Cliente(1, 'fernando', 'rugeles', 1, '1098744055', '2021-04-15 09:55:43', 1);
      const cuenta = new Cuenta(1,'1234567890',1200000, 500000,1, new Date());
      const listadoCuentas = [cuenta];
      component.notificacion = notificacionService;
      spyOn(clienteService, 'obtenerListaCuentaSegunCliente').and.returnValue(of(listadoCuentas));

      //act
      component.consultarPorTipoYNumeroDocumento();
      component.cliente = cliente;

      //assert
      expect(component.cliente).toEqual(cliente);
    });
  });

  describe('cuando el metodo consultarCuentasSegunCliente es llamado', () => {
    it('debe retornar una lista de clientes', () => {
      //arrange
      const cliente = new Cliente(1, 'fernando', 'rugeles', 1, '1098744055', '2021-04-15 09:55:43', 1);
      const cuenta = new Cuenta(1,'1234567890',1200000, 500000,1, new Date());
      const listadoCuentas = [cuenta];
      component.notificacion = notificacionService;
      spyOn(clienteService, 'obtenerListaCuentaSegunCliente').and.returnValue(of(listadoCuentas));

      //act
      component.consultarPorTipoYNumeroDocumento();
      component.cliente = cliente;
      component.cliente.listadoCuentas = listadoCuentas;

      //assert
      expect(component.cliente.listadoCuentas.length).toBeGreaterThan(0);
    });
  });
  
});
