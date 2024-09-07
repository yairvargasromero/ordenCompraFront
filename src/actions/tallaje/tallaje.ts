import axios, { AxiosResponse } from 'axios';
import { actionsSettings } from '../settings';
import { getAuthToken } from '../axios-helper/getToken';
import { handleHttpError } from '../axios-helper/axiosError';
import { ITallajeResumenResponse } from '../../interfaces/tallaje.interface';
import { IRespuestaGeneralAction } from '../../interfaces/general.interface';

export const obtenerTallajes = async () => {
  try {

    let options = {
      method: 'get',
      url: actionsSettings.backendRoutes.obtenerTallajes,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken()
      },
      maxRedirects: 21,

    }
    const { data }: AxiosResponse<ITallajeResumenResponse> = await axios(options);
    return data
  } catch (e) {
    handleHttpError(e);
    console.log('************')
    console.log(e)
    return null
  }
}

export const obtenerTallajesActivos = async () => {
  try {

    let options = {
      method: 'get',
      url: actionsSettings.backendRoutes.obtenerTallajeActivos,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken()
      },
      maxRedirects: 21,

    }
    const { data }: AxiosResponse<ITallajeResumenResponse> = await axios(options);
    return data
  } catch (e) {
    handleHttpError(e);
    console.log('************')
    console.log(e)
    return null
  }
}



export const crearTallaje = async (form: FormData) => {
  try {

    let options = {
      method: 'post',
      url: actionsSettings.backendRoutes.crearTallaje,
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

export const editarTallaje = async (form: FormData, codTallaje:number) => {
  try {

    let options = {
      method: 'put',
      url: `${actionsSettings.backendRoutes.editarTallaje}/${codTallaje}`,
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


