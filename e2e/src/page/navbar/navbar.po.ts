import { by, element } from 'protractor';

export class NavbarPage {
    linkCliente = element(by.xpath('/html/body/app-root/app-navbar/nav/a[1]'));
    linkCuenta = element(by.xpath('/html/body/app-root/app-navbar/nav/a[2]'));
    linkTransaccion = element(by.xpath('/html/body/app-root/app-navbar/nav/a[3]'));

    async clickBotonCliente() {
        await this.linkCliente.click();
    }

    async clickBotonCuenta() {
        await this.linkCuenta.click();
    }

    async clickBotonTransaccion() {
        await this.linkTransaccion.click();
    }
}
