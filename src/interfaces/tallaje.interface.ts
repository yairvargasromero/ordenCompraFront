export interface ITallajeResumen{
    cod_tallaje:number,
    nombre:string,
    activo:1|0,
    imagen:string
}

export interface ITallajeResumenResponse{
    error:0|1,
    tallajes: ITallajeResumen[]
}