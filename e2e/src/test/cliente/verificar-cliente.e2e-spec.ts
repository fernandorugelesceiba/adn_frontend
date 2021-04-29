import { browser } from 'protractor';
import { AppPage } from '../../app.po';
import { FormularioVerificarCliente } from '../../page/cliente/verificar-cliente/verficar-cliente.po';

describe('consulta de clientes', () => {
    let page: AppPage;
    let formularioVerificarCliente: FormularioVerificarCliente;

    beforeEach(() => {
        page = new AppPage();
        formularioVerificarCliente = new FormularioVerificarCliente();
    });

    it('Deberia consultar un cliente existente', () => {
        // arrange
        const TIPO_DOCUMENTO = 1;
        const NUMERO_DOCUMENTO = '1234567891';
        page.navigateTo();
        formularioVerificarCliente.clickSelectTipoDocumento();
        formularioVerificarCliente.setSelectTipoDocumento(TIPO_DOCUMENTO);
        browser.sleep(500);
        formularioVerificarCliente.clickInputNumeroDocumento();
        formularioVerificarCliente.setInputNumeroDocumento(NUMERO_DOCUMENTO);
        browser.sleep(500);

        // act
        formularioVerificarCliente.clickButtonVerificarCliente();
        browser.sleep(500);

        // assert
        const existe = formularioVerificarCliente.getContenedorUsuario();
        expect(existe).toEqual(true);
        browser.sleep(300);
    });
});
