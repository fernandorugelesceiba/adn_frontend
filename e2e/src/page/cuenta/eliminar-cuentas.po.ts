import { by, element } from 'protractor';

export class EliminarCuentas {
  private cadaItem = element.all(by.className('cada-item'));

  async contarListadoCuentas() {
    return this.cadaItem.count();
  }

  async eliminarCuenta(id: number) {
    return element(by.id(`botonEliminar${id}`)).click();
  }

  async comprobarEliminado(id: number) {
    return element(by.id(`botonEliminar${id}`)).isPresent();
  }
}
