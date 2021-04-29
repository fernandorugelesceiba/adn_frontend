import { by, element } from 'protractor';

export class CrearCuentas {
  private selectIdCliente = element(by.id('idCliente'));
  private inputNumeroCuenta = element(by.id('numeroCuenta'));
  private inputMonto = element(by.id('monto'));
  private inputMontoMaximo = element(by.id('montoMaximo'));
  private botonCrearCuenta = element(by.id('botonCrearCuenta'));

  async clickSelectIdCliente() {
    await this.selectIdCliente.click();
  }
  async clickInputNumeroCuenta() {
    await this.inputNumeroCuenta.click();
  }
  async clickInputMonto() {
    await this.inputMonto.click();
  }
  async clickInputMontoMaximo() {
    await this.inputMontoMaximo.click();
  }
  async setSelectIdCliente(id: number) {
    await this.selectIdCliente.element(by.css(`option[value='${id}']`)).click();
  }
  async setInputNumeroCuenta(inputNumeroCuenta: number) {
    await this.inputNumeroCuenta.sendKeys(inputNumeroCuenta);
  }
  async setInputMonto(inputMonto: number) {
    await this.inputMonto.sendKeys(inputMonto);
  }
  async setInputMontoMaximo(inputMontoMaximo: number) {
    await this.inputMontoMaximo.sendKeys(inputMontoMaximo);
  }
  async limpiarSelectIdCliente() {
    await this.selectIdCliente.clear();
  }
  async limpiarInputNumeroCuenta() {
    await this.inputNumeroCuenta.clear();
  }
  async limpiarInputMonto() {
    await this.inputMonto.clear();
  }
  async limpiarInputMontoMaximo() {
    await this.inputMontoMaximo.clear();
  }
  async clickButtonCrearCuenta() {
    await this.botonCrearCuenta.click();
  }
  async getTextoNumeroCuenta() {
    await this.inputNumeroCuenta.getText();
  }
}
