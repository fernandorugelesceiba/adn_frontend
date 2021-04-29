import { by, element } from 'protractor';

export class Cuentas {
    private buttonLinkListarCuentas = element(by.id('linkListarCuentas'));
    private buttonLinkCrearCuentas = element(by.id('linkCrearCuentas'));

    async clickListarCuentas() {
        return this.buttonLinkListarCuentas.click();
    }

    async clickCrearCuenta() {
        return this.buttonLinkCrearCuentas.click();
    }
}
