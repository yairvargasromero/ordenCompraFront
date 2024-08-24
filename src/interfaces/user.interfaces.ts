export interface IUser {
    cod_usuario?: number;
    email: string;
    nombre:string;
    cedula?:string;
    password?:string;
    activo?:number;
    cod_perfil:number;
    cod_entidad?:number;
    sexo:string;
  }

export interface LoginResult {
    error: number;
    token: string;
    menu:  ISidebar[];
    user:IUser
}

export interface ISidebar {
    cod_menu: number;
    label:    string;
    route:    string;
    icono:    string;
}