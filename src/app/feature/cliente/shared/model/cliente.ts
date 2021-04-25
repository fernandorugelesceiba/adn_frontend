import { Cuenta } from '@cuenta/shared/model/cuenta';

export class Cliente {
    id: number;
    nombre: string;
    apellido: string;
    tipoDocumento: number;
    numeroDocumento: string;
    fechaCreacion: string;
    idUsuarioCreacion: number;
    listadoCuentas: Array<Cuenta>;

    constructor(
        id: number,
        nombre: string,
        apellido: string,
        tipoDocumento: number,
        numeroDocumento: string,
        fechaCreacion: string,
        idUsuarioCreacion: number)
        {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.tipoDocumento = tipoDocumento;
        this.numeroDocumento = numeroDocumento;
        this.fechaCreacion = fechaCreacion;
        this.idUsuarioCreacion = idUsuarioCreacion;
        this.listadoCuentas = [];
    }

    construirListadoCuenta(lista: Array<Cuenta>) {
        this.listadoCuentas = [];
        for (const cuenta of lista) {
            this.listadoCuentas.push(new Cuenta(cuenta.id,
                cuenta.numeroCuenta,
                cuenta.montoMaximo,
                cuenta.monto,
                cuenta.idCliente,
                cuenta.fechaCreacion)
            );
        }
    }

}
