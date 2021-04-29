import { by, element } from 'protractor';

export class CrearTransaccion {
  private selectIdCliente = element(by.id('idCliente'));
  private botonTraerCuentas = element(by.id('botonTraerCuentas'));
  private inputMontoTransaccion = element(by.id('montoTransaccion'));
  private botonCrearTransaccion = element(by.id('botonCrearTransaccion'));
  private cadaItemEnvio;
  private cadaItemRecibe;

  async clickSelectIdCliente() {
    await this.selectIdCliente.click();
  }
  async clickInputMontoTransaccion() {
    await this.inputMontoTransaccion.click();
  }
  async setSelectIdCliente(id: number) {
    await this.selectIdCliente.element(by.css(`option[value='${id}']`)).click();
  }
  async setInputMontoTransaccion(monto: number) {
    await this.inputMontoTransaccion.sendKeys(monto);
  }
  async limpiarSelectIdCliente() {
    await this.selectIdCliente.clear();
  }
  async limpiarInputMontoTransaccion() {
    await this.inputMontoTransaccion.clear();
  }
  async clickBotonTraerCuentas() {
    await this.botonTraerCuentas.click();
  }
  async clickBotonCrearTransaccion() {
    await this.botonCrearTransaccion.click();
  }
  async clickSeleccionarItemCuentaEnviar() {
    this.cadaItemEnvio = element.all(by.css('[name="origen"]'));
    this.cadaItemEnvio.first().click();
  }
  async clickSeleccionarItemCuentaRecibe() {
    this.cadaItemRecibe = element.all(by.css('[name="destino"]'));
    this.cadaItemRecibe.first().click();
  }
}
