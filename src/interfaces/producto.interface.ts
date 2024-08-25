import { IRespuestaGeneralAction } from "./general.interface"

export interface IProductoResumen {
    cod_producto:number,
    nombre:string,
    talla?:string[],
    color:IColorResumen[],
    categoria:string,
    tiene_talla:boolean,
    tiene_color:boolean,
    sexo:string[]
}

export interface IProductoEditar{
    nombre?: string,
    cod_categoria?: number,
    cod_tallaje?: number,
    activo?: boolean,
    talla?:string[],
    tiene_color?: boolean,
    tiene_talla?: boolean
}

export interface IResponseObtenerProductos {
    error:number,
    productos:IProductoResumen[]
}



interface IColorResumen {
    color:string,
    color_descripcion:string
}


export interface IProductoDetalle extends IProductoResumen{
    color_detalle?:IColorProductoBD[],
    talla_detalle?:string[],
    sexo_detalle:string[],
    cod_categoria:string 
}
export interface IColorProductoBD {
    color:string,
    imagenes:string[],
    color_descripcion:string
}

export interface IResponseObtenerProductoDetalle {
    error:number,
    producto:IProductoDetalle
}

export interface IResponseInformacionBasicaProducto{
    error:number,
    producto:IProductoInformacionBasica
}

export interface IResponseCreacionProducto extends IRespuestaGeneralAction{
    cod_producto:number
}

export interface IProductoInformacionBasica{
    nombre:string,
    cod_categoria:number,
    activo: 0 | 1
}


export interface IResponseColoresProducto{
    error:0,
    colores:IColorProducto[],
    tiene_color:boolean
}

export interface IColorProducto{
    cod_producto_color:number,
    color:string,
    color_descripcion:string,
    cod_producto:number
}

export interface IResponseColorImagenes{
    error:0,
    imagenes:IProductoColorImagen[]
}

export interface IProductoColorImagen{
    cod_producto_color_imagen:number,
    cod_producto_color:number,
    url:string
}

export interface IResponseTallasProducto{
    error:0,
    tallas:string[],
    tiene_talla:boolean,
    msg?:any
}