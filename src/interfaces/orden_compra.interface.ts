
export interface IResponseProductoDetalleCarro {
    error:      number;
    producto:  IProductoMostrar;
}

export interface IResponseProductosUsuario {
    error:      number;
    productos:  IProductoMostrar[];
    categorias: ICategoriaUsuario[];
}

export interface ICategoriaUsuario {
    cod_categoria: number;
    cantidad:      number;
    nombre:        string;
}

export interface IProductoMostrar {
    cod_producto:  number;
    cod_categoria: number;
    nombre:        string;
    tiene_talla:   number;
    tiene_color:   number;
    talla:         string[];
    categoria:     string;
    descripcion:string;
    colores?:      IColoresMostrar[];
    url_tallaje?: string
}

export interface IColoresMostrar {
    cod_producto_color: number;
    color:              string;
    color_descripcion:  string;
    imagenes:           string[];
}