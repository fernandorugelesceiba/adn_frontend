import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CrearCuentasComponent } from './crear-cuentas.component';
import { ClienteService } from '@cliente/shared/service/cliente.service';
import { HttpService } from '@core/services/http.service';
import { CuentaService } from '@cuenta/shared/service/cuenta.service';
import { Cliente } from '@cliente/shared/model/cliente';
import { of, throwError } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Cuenta } from '@cuenta/shared/model/cuenta';

describe('ListadoCuentasComponent', () => {
    let component: CrearCuentasComponent;
    let clienteService: ClienteService;
    let cuentaService: CuentaService;
    let notificacionService: ToastrService;
    let fixture: ComponentFixture<CrearCuentasComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CrearCuentasComponent],
            imports: [
                CommonModule,
                HttpClientModule,
                RouterTestingModule,
                ReactiveFormsModule,
                FormsModule,
                BrowserAnimationsModule,
                ToastrModule.forRoot()
            ],
            providers: [ClienteService, CuentaService, HttpService, ToastrService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CrearCuentasComponent);
        clienteService = TestBed.inject(ClienteService);
        cuentaService = TestBed.inject(CuentaService);
        notificacionService = TestBed.inject(ToastrService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('cuando el metodo obtenerListadoClientes es llamado', () => {
        it('debe retornar una lista de clientes', () => {
            // arrange
            const cliente = new Cliente(1, 'fernando', 'rugeles', 1, '1098744055', '2021-04-15 09:55:43', 1);
            const listaClientes = [cliente, cliente];
            spyOn(clienteService, 'obtenerListadoClientes').and.returnValue(of(listaClientes));

            // act
            component.obtenerListadoClientes();

            // assert
            expect(component.listadoClientes.length).toBeGreaterThan(0);
        });

        it('no debe retornar nada', () => {
            // arrange
            const listaClientes = [];
            spyOn(clienteService, 'obtenerListadoClientes').and.returnValue(of(listaClientes));

            // act
            component.obtenerListadoClientes();

            // assert
            expect(component.listadoClientes.length).toBe(0);
        });

        it('no debe retornar un error', () => {
            // arrange
            spyOn(clienteService, 'obtenerListadoClientes').and.returnValue(throwError({ error: 'error' }));

            // act
            component.obtenerListadoClientes();

            // assert
            expect(component.listadoClientes.length).toBe(0);
        });
    });

    describe('cuando el metodo crearCuenta es llamado', () => {
        it('debe crear una cuenta', () => {
            // arrange
            const cuenta = new Cuenta(1,'1234567890',1200000, 500000,1,new Date());
            component.cuentasFormulario.controls.numeroCuenta.setValue(cuenta.numeroCuenta);
            component.cuentasFormulario.controls.idCliente.setValue(cuenta.idCliente);
            component.cuentasFormulario.controls.monto.setValue(cuenta.monto);
            component.cuentasFormulario.controls.montoMaximo.setValue(cuenta.montoMaximo);
            spyOn(cuentaService, 'crear').and.returnValue(of(true));
            component.notificacion = notificacionService;

            // act
            component.crearCuenta();

            // assert
            expect(component.notificacion).toBeTruthy();
        });

        it('no debe crear una cuenta', () => {
            // arrange
            const cuenta = new Cuenta(1,'1234567890',1200000, 500000,1,new Date());
            component.cuentasFormulario.controls.numeroCuenta.setValue(cuenta.numeroCuenta);
            component.cuentasFormulario.controls.idCliente.setValue(cuenta.idCliente);
            component.cuentasFormulario.controls.monto.setValue(cuenta.monto);
            component.cuentasFormulario.controls.montoMaximo.setValue(cuenta.montoMaximo);
            spyOn(cuentaService, 'crear').and.returnValue(of(false));
            component.notificacion = notificacionService;

            // act
            component.crearCuenta();

            // assert
            expect(component.notificacion).toBeTruthy();
        });

        it('debe retornar un error', () => {
            // arrange
            const cuenta = new Cuenta(1,'1234567890',1200000, 500000,1,new Date());
            component.cuentasFormulario.controls.numeroCuenta.setValue(cuenta.numeroCuenta);
            component.cuentasFormulario.controls.idCliente.setValue(cuenta.idCliente);
            component.cuentasFormulario.controls.monto.setValue(cuenta.monto);
            component.cuentasFormulario.controls.montoMaximo.setValue(cuenta.montoMaximo);
            spyOn(cuentaService, 'crear').and.returnValue(throwError({ error: 'error' }));
            component.notificacion = notificacionService;

            // act
            component.crearCuenta();

            // assert
            expect(component.notificacion).toBeTruthy();
        });
    });
});
