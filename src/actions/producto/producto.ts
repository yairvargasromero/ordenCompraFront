import axios, { AxiosResponse } from 'axios';
import { actionsSettings} from '../settings';
import { getAuthToken } from '../axios-helper/getToken';
import { handleHttpError } from '../axios-helper/axiosError';
import { IProductoInformacionBasica, IResponseColoresProducto, IResponseColorImagenes, IResponseInformacionBasicaProducto, IResponseObtenerProductoDetalle, IResponseObtenerProductos } from '../../interfaces/producto.interface';
import { IRespuestaGeneralAction } from '../../interfaces/general.interface';

export const obtenerProductos = async () =>{
  try {

    let options = {
      method: 'get',
      url: actionsSettings.backendRoutes.obtenerProductos,
      headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthToken()
      },
      maxRedirects: 21,
     
  }
  const { data }: AxiosResponse<IResponseObtenerProductos> = await axios(options);
  return data
  } catch (e) {
    handleHttpError(e);
    console.log('************')
    console.log(e)
    return null
  }
}

export const obtenerProductoDetalle = async ( codProducto:string ) =>{
  try {

    let options = {
      method: 'get',
      url:`${actionsSettings.backendRoutes.obtenerProductoDetalle}/${codProducto}`  ,
      headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthToken()
      },
      maxRedirects: 21,
     
  }
  const { data }: AxiosResponse<IResponseObtenerProductoDetalle> = await axios(options);
  return data
  } catch (e) {
    handleHttpError(e);
    console.log('************')
    console.log(e)
    return null
  }
}

export const obtenerInfoBasicaProducto = async ( codProducto:string ) =>{
  try {

    let options = {
      method: 'get',
      url:`${actionsSettings.backendRoutes.obtenerInfoBasicaProducto}/${codProducto}`  ,
      headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthToken()
      },
      maxRedirects: 21,
     
  }
  const { data }: AxiosResponse<IResponseInformacionBasicaProducto> = await axios(options);
  return data
  } catch (e) {
    handleHttpError(e);
    console.log('************')
    console.log(e)
    return null
  }
}

export const  obtenerColoresProducto = async ( codProducto:number | string ) =>{
  try {

    let options = {
      method: 'get',
      url: `${actionsSettings.backendRoutes.obtenerColoresProducto}/${codProducto}` ,
      headers: {
          'Authorization': getAuthToken(),
          'Content-Type':'multipart/form-data'
      }
  }
  const { data }: AxiosResponse<IResponseColoresProducto> = await axios(options);
  return data
  } catch (e) {
    handleHttpError(e);
    console.log('************')
    console.log(e)
    return null
  }
}

export const  crearColorProducto = async ( dataColor:{
    cod_producto:number,
    color:string,
    color_descripcion:string

  }) =>{
  try {

    let options = {
      method: 'post',
      url: `${actionsSettings.backendRoutes.crearColorProducto}` ,
      headers: {
          'Authorization': getAuthToken(),
          'Content-Type':'multipart/form-data'
      },
      data:dataColor
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

export const  editarColorProducto = async ( dataColor:{
  cod_producto:number,
  color:string,
  color_descripcion:string

}, codProductoColor:number) =>{
try {

  let options = {
    method: 'post',
    url: `${actionsSettings.backendRoutes.editarColorProducto}/${codProductoColor}` ,
    headers: {
        'Authorization': getAuthToken(),
        'Content-Type':'multipart/form-data'
    },
    data:dataColor
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



export const  borrarColorProducto = async ( codProductoColor:number) =>{
try {

  let options = {
    method: 'delete',
    url: `${actionsSettings.backendRoutes.borrarColorProducto}/${codProductoColor}` ,
    headers: {
        'Authorization': getAuthToken(),
        'Content-Type':'multipart/form-data'
    }
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



export const  obtenerImagenesColoresProducto = async ( codProductoColor:number | string ) =>{
  try {

    let options = {
      method: 'get',
      url: `${actionsSettings.backendRoutes.obtenerImagenesColores}/${codProductoColor}` ,
      headers: {
          'Authorization': getAuthToken(),
          'Content-Type':'multipart/form-data'
      }
  }
  const { data }: AxiosResponse<IResponseColorImagenes> = await axios(options);
  return data
  } catch (e) {
    handleHttpError(e);
    console.log('************')
    console.log(e)
    return null
  }
}

export const subirImagenProducto = async ( form:FormData ) =>{
  try {

    let options = {
      method: 'post',
      url: actionsSettings.backendRoutes.subirImagen,
      headers: {
          'Authorization': getAuthToken(),
          'Content-Type':'multipart/form-data'
      },
      data:form
     
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

export const  borrarImagenProducto = async ( dataImagen:{cod_producto_color_imagen:number | string, url:string } ) =>{
  try {

    let options = {
      method: 'post',
      url: `${actionsSettings.backendRoutes.borrarImagen}` ,
      headers: {
          'Authorization': getAuthToken(),
          'Content-Type':'multipart/form-data'
      },
      data:dataImagen
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
