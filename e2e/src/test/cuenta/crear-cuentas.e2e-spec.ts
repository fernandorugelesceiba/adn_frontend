import { browser } from 'protractor';
import { AppPage } from '../../app.po';
import { NavbarPage } from '../../page/navbar/navbar.po';
import { Cuentas } from '../../page/cuenta/cuenta.po';
import { CrearCuentas } from '../../page/cuenta/crear-cuentas.po';

describe('Cuentas', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let cuentas: Cuentas;
    let crearCuenta: CrearCuentas;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        cuentas = new Cuentas();
        crearCuenta = new CrearCuentas();
    });

    it('Deberia crear una cuenta', () => {
        // arrange
        const NUMERO_CUENTA = Math.random() * 10000000000;
        const ID_CLIENTE = 1;
        const MONTO = 1000;
        const MONTO_MAXIMO = 10000;
        page.navigateTo();
        navBar.clickBotonCuenta();
        browser.sleep(500);
        cuentas.clickCrearCuenta();
        browser.sleep(500);
        crearCuenta.clickInputNumeroCuenta();
        crearCuenta.setInputNumeroCuenta(NUMERO_CUENTA);
        browser.sleep(500);
        crearCuenta.clickSelectIdCliente();
        crearCuenta.setSelectIdCliente(ID_CLIENTE);
        browser.sleep(500);
        crearCuenta.clickInputMonto();
        crearCuenta.setInputMonto(MONTO);
        browser.sleep(500);
        crearCuenta.clickInputMontoMaximo();
        crearCuenta.setInputMontoMaximo(MONTO_MAXIMO);
        browser.sleep(500);

        // act
        crearCuenta.clickButtonCrearCuenta();
        browser.sleep(1000);

        // assert
        const exito = crearCuenta.getTextoNumeroCuenta();
        expect(exito).toBeFalsy();
        browser.sleep(1000);
    });
});
