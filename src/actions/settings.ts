
const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const actionsSettings  = {
    backendRoutes:{
        obtenerCategorias:`${apiUrl}/categoria/obtener-todas`,
        obtenerCategoriaDetalle:`${apiUrl}/categoria/detalle-categoria`,
        crearCategoria:`${apiUrl}/categoria/crear-categoria`,
        actualizarCategoria:`${apiUrl}/categoria/editar-categoria`,

        obtenerProductos:`${apiUrl}/producto/obtener`,
        obtenerProductoDetalle:`${apiUrl}/producto/detalle`,
        obtenerInfoBasicaProducto:`${apiUrl}/producto/info_basica`,
        obtenerColoresProducto:`${apiUrl}/producto/obtener_colores_producto`,
        obtenerImagenesColores:`${apiUrl}/producto/obtener_imagenes_colores`,
        subirImagen:`${apiUrl}/producto/cargar_imagen_producto`,

        

        login:`${apiUrl}/users/authentication`,
    }
}