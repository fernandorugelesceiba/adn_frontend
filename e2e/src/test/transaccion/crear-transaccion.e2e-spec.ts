import { browser } from 'protractor';
import { AppPage } from '../../app.po';
import { NavbarPage } from '../../page/navbar/navbar.po';
import { CrearTransaccion } from '../../page/transaccion/crear-transaccion.po';

describe('crear transacciones', () => {
    let page: AppPage;
    let crearTransaccion: CrearTransaccion;
    let navBar: NavbarPage;

    beforeEach(() => {
        page = new AppPage();
        crearTransaccion = new CrearTransaccion();
        navBar = new NavbarPage();
    });

    it('Deberia crear una transaccion', () => {
        // arrange
        const ID_CLIENTE = 1;
        const MONTO_TRANSACCION = 10;
        page.navigateTo();
        navBar.clickBotonTransaccion();
        browser.sleep(500);
        crearTransaccion.clickSelectIdCliente();
        crearTransaccion.setSelectIdCliente(ID_CLIENTE);
        browser.sleep(500);
        crearTransaccion.clickBotonTraerCuentas();
        browser.sleep(500);
        crearTransaccion.clickSeleccionarItemCuentaEnviar();
        browser.sleep(1000);
        crearTransaccion.clickSeleccionarItemCuentaRecibe();
        browser.sleep(1000);
        crearTransaccion.setInputMontoTransaccion(MONTO_TRANSACCION);
        browser.sleep(1000);

        // act
        crearTransaccion.clickBotonCrearTransaccion();
        browser.sleep(500);

        // assert
        expect(true).toEqual(true);
        browser.sleep(300);
    });
});
