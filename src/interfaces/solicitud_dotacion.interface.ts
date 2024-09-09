import { IRespuestaGeneralAction } from "./general.interface";

export interface IRespuestaOrdenesPendientes extends IRespuestaGeneralAction{
    ordenes:IOrdenPendiente[]
}

export interface IOrdenPendiente{
    cod_orden:number,
    cod_usuario:number,
    usuario:string,
    cedula:string,
    usuario_creacion:string,
    fecha_creacion:string,
    cargo:string,
    documento_usuario_creacion:string
}