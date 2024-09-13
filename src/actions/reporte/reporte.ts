import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { actionsSettings } from '../settings';
import { getAuthToken } from '../axios-helper/getToken';
import { handleHttpError } from '../axios-helper/axiosError';
import { IRespuestaGeneralAction } from '../../interfaces/general.interface';

export const reporteGeneralEntidad = async (codEntidad: number) => {
    try {
        const config: AxiosRequestConfig = {
          method: 'get',
          url: `${actionsSettings.backendRoutes.reporteGeneralEntidad}/${codEntidad}`,
          headers: {
            'Authorization': getAuthToken()
          },
          responseType: 'blob', // Especifica que esperamos un blob (archivo binario) como respuesta
          maxRedirects: 21,
        };
    
        const { data, headers }: AxiosResponse<Blob> = await axios(config);
    
        // Crea un enlace para descargar el archivo
        const fileName = headers['content-disposition']
          ? headers['content-disposition'].split('filename=')[1].replace(/"/g, '')
          : `reporte_${codEntidad}.xlsx`;
    
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    
        // Limpia el objeto URL creado
        window.URL.revokeObjectURL(url);
      } catch (e) {
        console.error('Error al descargar el archivo:', e);
        // Manejo del error
      }
}