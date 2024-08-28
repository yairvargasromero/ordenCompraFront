import { IRespuestaGeneralAction } from "./general.interface"

export interface IEntidadResumen {
    cod_entidad:number,
    nombre:string,
    activo:1|0,
}

export interface IResponseEntidadResumen {
    error:number,
    entidades:IEntidadResumen[]
}

export interface IInformacionBasicaEntidad {
    nombre:string,
    activo:1|0,
    cod_categorias:string[]
}

export interface IInformacionBasicaEntidadGuardar {
    nombre:string,
    activo:1|0,
    cod_categorias:{cod_categoria:number , cantidad:number}[]
}

export interface IResponseCreacionEntidad extends IRespuestaGeneralAction{
    cod_entidad:number
}

export interface IResponseInformacionBasicaEntidad{
    error:number,
    entidad:IInformacionBasicaEntidadGuardar
}

export interface IResponseUsuariosEntidadResumen extends IRespuestaGeneralAction{
    usuarios:IUsuarioEntidadResumen[]
}

export interface IUsuarioEntidadResumen{
    cod_usuario:number,
    email:string,
    nombre:string,
    activo:1|0,
    sexo:'M' | 'F',
    cedula:string,
    password?:string,
    cod_orden?:number
}   