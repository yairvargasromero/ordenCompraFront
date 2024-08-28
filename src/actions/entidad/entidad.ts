import axios, { AxiosResponse } from "axios";
import { handleHttpError } from "../axios-helper/axiosError";
import { getAuthToken } from "../axios-helper/getToken";
import { actionsSettings } from "../settings";
import { IInformacionBasicaEntidad, IInformacionBasicaEntidadGuardar, IResponseCreacionEntidad, IResponseEntidadResumen, IResponseInformacionBasicaEntidad, IResponseUsuariosEntidadResumen, IUsuarioEntidadResumen } from "../../interfaces/entidad.interface";
import { IRespuestaGeneralAction } from "../../interfaces/general.interface";
import { IUser } from "../../interfaces/user.interfaces";

export const obtenerEntidades = async () => {
    try {
  
      let options = {
        method: 'get',
        url: actionsSettings.backendRoutes.obtenerEntidades,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthToken()
        },
        maxRedirects: 21,
  
      }
      const { data }: AxiosResponse<IResponseEntidadResumen> = await axios(options);
      return data
    } catch (e) {
      handleHttpError(e);
      console.log('************')
      console.log(e)
      return null
    }
  }

  export const crearEntidad= async (entidad: IInformacionBasicaEntidadGuardar) => {
    try {
  
      let options = {
        method: 'post',
        url: `${actionsSettings.backendRoutes.crearEntidad}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthToken()
        },
        maxRedirects: 21,
        data: entidad
  
      }
      const { data }: AxiosResponse<IResponseCreacionEntidad> = await axios(options);
      return data
    } catch (e) {
      handleHttpError(e);
      console.log('************')
      console.log(e)
      return null
    }
  }

  export const editarEntidad = async (entidad: IInformacionBasicaEntidadGuardar, codEntidad: number) => {
    try {
  
      let options = {
        method: 'put',
        url: `${actionsSettings.backendRoutes.editarEntidad}/${codEntidad}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthToken()
        },
        maxRedirects: 21,
        data: entidad
  
      }
      const { data }: AxiosResponse<IRespuestaGeneralAction> = await axios(options);
      return data
    } catch (e) {
      handleHttpError(e);
      console.log('************')
      console.log(e)
      return null
    }
  }

  export const obtenerInfoBasicaEntidad = async (codEntidad: string) => {
    try {
  
      let options = {
        method: 'get',
        url: `${actionsSettings.backendRoutes.obtenerInfoBasicaEntidad}/${codEntidad}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthToken()
        },
        maxRedirects: 21,
  
      }
      const { data }: AxiosResponse<IResponseInformacionBasicaEntidad> = await axios(options);
      return data
    } catch (e) {
      handleHttpError(e);
      console.log('************')
      console.log(e)
      return null
    }
  }


  export const cargarUsuariosEntidad = async (form: FormData) => {
    try {
  
      let options = {
        method: 'post',
        url: actionsSettings.backendRoutes.cargarUsuariosEntidad,
        headers: {
          'Authorization': getAuthToken(),
          'Content-Type': 'multipart/form-data'
        },
        data: form
  
      }
      const { data }: AxiosResponse<IRespuestaGeneralAction> = await axios(options);
      return data
    } catch (e) {
      handleHttpError(e);
      console.log('************')
      console.log(e)
      return null
    }
  }

  export const obtenerUsuariosEntidad = async (codEntidad:number) => {
    try {
  
      let options = {
        method: 'get',
        url: actionsSettings.backendRoutes.obtenerUsuariosEntidad + '/' + codEntidad,
        headers: {
          'Authorization': getAuthToken(),
          'Content-Type': 'application/json',
        }
      }
      const { data }: AxiosResponse<IResponseUsuariosEntidadResumen> = await axios(options);
      return data
    } catch (e) {
      handleHttpError(e);
      console.log('************')
      console.log(e)
      return null
    }
  }

  export const crearUsuarioEntidad = async (usuario:Partial<IUsuarioEntidadResumen>) => {
    try {
  
      let options = {
        method: 'post',
        url: actionsSettings.backendRoutes.crearUsuarioEntidad,
        headers: {
          'Authorization': getAuthToken(),
          'Content-Type': 'application/json',
        },
        data:usuario
      }
      const { data }: AxiosResponse<IRespuestaGeneralAction> = await axios(options);
      return data
    } catch (e) {
      handleHttpError(e);
      console.log('************')
      console.log(e)
      return null
    }
  }

  export const actualizarUsuarioEntidad = async (codUsuario:number, usuario:Partial<IUsuarioEntidadResumen> ) =>{
    try {
  
      let options = {
        method: 'put',
        url: `${actionsSettings.backendRoutes.actualizarUsuarioEntidad}/${codUsuario} ` ,
        headers: {
            'Content-Type': 'application/json',
            'Authorization':getAuthToken()
        },
        maxRedirects: 21,
        data:usuario
    }
    const { data }: AxiosResponse<IRespuestaGeneralAction> = await axios(options);
    return data
    } catch (e) {
      handleHttpError(e);
      console.log('************')
      console.log(e)
      return null
    }
}