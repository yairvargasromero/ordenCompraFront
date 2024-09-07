export interface Product {
    id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    //todo: type: Type;
    gender: Category;
  }
  
  export interface CartProduct {
    id: string;
    slug: string;
    title: string;
    price: number;
    quantity: number;
    size: Size;
    image: string;
  }

  export interface CartProducto {
    cod_producto:number,
    nombre:string,
    talla:string,
    color:string,
    cod_color_producto:number,
    imagen:string,
    cantidad:number,
    tiene_talla:number,
    tiene_color:number,
    cod_categoria:number,
    categoria:string
  }
  
  
  
  export type Category = 'men'|'women'|'kid'|'unisex';
  export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
  export type Type = 'shirts'|'pants'|'hoodies'|'hats';