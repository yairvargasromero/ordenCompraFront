
import axios, { AxiosResponse } from 'axios';
import { actionsSettings } from '../settings';
import { getAuthToken } from '../axios-helper/getToken';
import { handleHttpError } from '../axios-helper/axiosError';
import { ICategories, IResponseCategoriaDetalle, IResponseCategories } from '../../interfaces/categoria.interface';
import { IRespuestaGeneralAction } from '../../interfaces/general.interface';

export const obtenerCategorias = async () =>{
  try {

    let options = {
      method: 'get',
      url: actionsSettings.backendRoutes.obtenerCategorias,
      headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthToken()
      },
      maxRedirects: 21,
     
  }
  const { data }: AxiosResponse<IResponseCategories> = await axios(options);
  return data
  } catch (e) {
    handleHttpError(e);
    console.log('************')
    console.log(e)
    return null
  }
}

export const obtenerCategoriaDetalle = async ( codCategoria:number ) =>{
    try {
  
      let options = {
        method: 'get',
        url: actionsSettings.backendRoutes.obtenerCategoriaDetalle + '/' + codCategoria,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAuthToken()
        },
        maxRedirects: 21,
       
    }
    const { data }: AxiosResponse<IResponseCategoriaDetalle> = await axios(options);
    return data
    } catch (e) {
      handleHttpError(e);
      console.log('************')
      console.log(e)
      return null
    }
}

export const crearCategoria = async ( nuevaCategoria:ICategories ) =>{
    try {
  
      let options = {
        method: 'post',
        url: actionsSettings.backendRoutes.crearCategoria,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAuthToken()
        },
        data:nuevaCategoria,
        maxRedirects: 21,
       
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

export const actualizarCategoria = async (codCategoria:number, categoriaEditar:ICategories ) =>{
    try {
  
      let options = {
        method: 'put',
        url: `${actionsSettings.backendRoutes.actualizarCategoria}/${codCategoria} ` ,
        headers: {
            'Content-Type': 'application/json',
            'Authorization':getAuthToken()
        },
        maxRedirects: 21,
        data:categoriaEditar
       
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