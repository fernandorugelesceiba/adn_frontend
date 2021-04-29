import { browser } from 'protractor';
import { AppPage } from '../../app.po';
import { NavbarPage } from '../../page/navbar/navbar.po';
import { ListarCuentas } from '../../page/cuenta/listar-cuentas.po';
import { Cuentas } from '../../page/cuenta/cuenta.po';

describe('Cuentas', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let listarCuentas: ListarCuentas;
    let cuentas: Cuentas;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        listarCuentas = new ListarCuentas();
        cuentas = new Cuentas();
    });

    it('Deberia listar cuentas', () => {
        // arrange
        page.navigateTo();
        navBar.clickBotonCuenta();
        browser.sleep(500);
        cuentas.clickListarCuentas();
        browser.sleep(500);

        // act  - assert
        const noHayRegistros = listarCuentas.noHayRegistros();
        expect(noHayRegistros).toEqual(false);
        browser.sleep(300);
    });
});
