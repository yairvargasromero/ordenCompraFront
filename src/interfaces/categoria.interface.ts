export  interface ICategories{
    cod_categoria?:number,
    nombre:string;
    activo:number;
    sexo:('M' | 'F')[]   
}

export interface IResponseCategories {
    error:number,
    categorias:ICategories[]
}

export interface IResponseCategoriaDetalle {
    error:number,
    categoria:ICategories
}