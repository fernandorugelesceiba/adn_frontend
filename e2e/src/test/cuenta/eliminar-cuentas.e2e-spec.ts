import { browser } from 'protractor';
import { AppPage } from '../../app.po';
import { NavbarPage } from '../../page/navbar/navbar.po';
import { Cuentas } from '../../page/cuenta/cuenta.po';
import { EliminarCuentas } from '../../page/cuenta/eliminar-cuentas.po';

describe('Cuentas', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let cuentas: Cuentas;
    let eliminarCuentas: EliminarCuentas;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        cuentas = new Cuentas();
        eliminarCuentas = new EliminarCuentas();
    });

    it('se debe eliminar una cuenta', () => {
        // arrange
        const PRIMER_REGISTRO = 0;
        page.navigateTo();
        navBar.clickBotonCuenta();
        browser.sleep(500);
        cuentas.clickCrearCuenta();
        browser.sleep(500);
        cuentas.clickListarCuentas();
        browser.sleep(500);

        // act
        eliminarCuentas.eliminarCuenta(PRIMER_REGISTRO);
        browser.sleep(2500);

        // assert
        const exito = eliminarCuentas.comprobarEliminado(PRIMER_REGISTRO);
        expect(exito).toEqual(true);
        browser.sleep(1000);
    });
});
