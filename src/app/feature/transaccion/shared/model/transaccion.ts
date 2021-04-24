export class Transaccion {
    id:number;
	idCuentaOrigen:number;
	idCuentaDestino:number;
    valorTransaccion:number;
    porcentajeDescuento:number;
    fechaCreacion:Date;
    estado:number;
    numeroCuentaOrigen:string;
    numeroCuentaDestino:string;

    constructor(id: number, idCuentaOrigen: number,
        idCuentaDestino: number, valorTransaccion: number, 
        porcentajeDescuento: number, fechaCreacion: Date, estado:number, numeroCuentaOrigen:string, numeroCuentaDestino:string) {

        this.id = id;
        this.idCuentaOrigen = idCuentaOrigen;
        this.idCuentaDestino = idCuentaDestino;
        this.valorTransaccion = valorTransaccion;
        this.porcentajeDescuento = porcentajeDescuento;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
        this.numeroCuentaOrigen = numeroCuentaOrigen;
        this.numeroCuentaDestino = numeroCuentaDestino;
    }
}
