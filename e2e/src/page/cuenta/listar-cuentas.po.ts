import { by, element } from 'protractor';

export class ListarCuentas {
  private sinRegistros = element(by.id('sinDatos'));

  async noHayRegistros() {
    return await this.sinRegistros.isPresent();
  }
}
