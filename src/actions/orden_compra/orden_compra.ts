import axios, { AxiosResponse } from 'axios';
import { actionsSettings } from '../settings';
import { getAuthToken } from '../axios-helper/getToken';
import { handleHttpError } from '../axios-helper/axiosError';
import { IResponseProductoDetalleCarro, IResponseProductosUsuario } from '../../interfaces/orden_compra.interface';

export const obtenerProductosUsuario = async (codUsuario:number) => {
  try {

    let options = {
      method: 'get',
      url: `${actionsSettings.backendRoutes.productosUsuario}/${codUsuario}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken()
      },
      maxRedirects: 21,

    }
    const { data }: AxiosResponse<IResponseProductosUsuario> = await axios(options);
    return data
  } catch (e) {
    handleHttpError(e);
    console.log('************')
    console.log(e)
    return null
  }
}

export const obtenerProductoDetalleCarro = async (codUsuario:number) => {
  try {

    let options = {
      method: 'get',
      url: `${actionsSettings.backendRoutes.obtenerProductoDetalleCarro}/${codUsuario}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken()
      },
      maxRedirects: 21,

    }
    const { data }: AxiosResponse<IResponseProductoDetalleCarro> = await axios(options);
    return data
  } catch (e) {
    handleHttpError(e);
    console.log('************')
    console.log(e)
    return null
  }
}