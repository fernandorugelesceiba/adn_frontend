import { by, element } from 'protractor';

export class FormularioVerificarCliente {
  private selectTipoDocumento = element(by.id('idTipoDocumento'));
  private inputNumeroDocumento = element(by.id('numeroDocumento'));
  private buttonVerificarCliente = element(by.id('verificarCliente'));
  private contenerUsuarioEncontrado = element(by.id('contenedorUsuario'));

  async clickSelectTipoDocumento() {
    await this.selectTipoDocumento.click();
  }
  async clickInputNumeroDocumento() {
    await this.inputNumeroDocumento.click();
  }
  async setSelectTipoDocumento(id: number) {
    await this.selectTipoDocumento.element(by.css(`option[value='${id}']`)).click();
  }
  async setInputNumeroDocumento(numeroDocumento: string) {
    await this.inputNumeroDocumento.sendKeys(numeroDocumento);
  }
  async limpiarSelectTipoDocumento() {
    await this.selectTipoDocumento.clear();
  }
  async limpiarInputNumeroDocumento() {
    await this.inputNumeroDocumento.clear();
  }
  async clickButtonVerificarCliente() {
    await this.buttonVerificarCliente.click();
  }
  async getContenedorUsuario(): Promise<boolean> {
    return await this.contenerUsuarioEncontrado.isDisplayed();
  }
}
