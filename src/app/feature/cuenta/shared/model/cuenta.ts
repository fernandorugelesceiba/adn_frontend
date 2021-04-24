import { Transaccion } from "src/app/feature/transaccion/shared/model/transaccion";

export class Cuenta {
    id;
    numeroCuenta: string;
    montoMaximo: number;
    monto: number;
    idCliente: number;
    fechaCreacion: Date;
    listaTransacciones: Array<Transaccion>;

    constructor(id: number, numeroCuenta: string,
         montoMaximo: number, monto: number, 
         idCliente: number, fechaCreacion: Date) {

        this.id = id;
        this.numeroCuenta = numeroCuenta;
        this.montoMaximo = montoMaximo;
        this.monto = monto;
        this.idCliente = idCliente;
        this.fechaCreacion = fechaCreacion;
        this.listaTransacciones = [];
    }

    construirListadoTransaccion(lista: Array<Transaccion>) {
        this.listaTransacciones = [];
        for (let transaccion of lista) {
            this.listaTransacciones.push(new Transaccion(
                transaccion.id, transaccion.idCuentaOrigen,
                transaccion.idCuentaDestino, transaccion.valorTransaccion, 
                transaccion.porcentajeDescuento, transaccion.fechaCreacion, transaccion.estado,transaccion.numeroCuentaOrigen,transaccion.numeroCuentaDestino
            ));
        }
    }
}
