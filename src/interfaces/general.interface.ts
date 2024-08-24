export interface IRespuestaGeneralAction{
    error:0|1,
    msg:IMessageSwal
}

export interface IMessageSwal{
    title?:string,
    texte:string,
    icon:"success" | "error" | "warning" | "info" | "question",
}