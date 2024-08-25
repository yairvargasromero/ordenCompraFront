import EditarProducto from "../pages/private/editar-producto/EditarProducto";

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
        crearProducto:`${apiUrl}/producto/crear_producto`,
        editarProducto:`${apiUrl}/producto/editar_producto`,

        obtenerColoresProducto:`${apiUrl}/producto/obtener_colores_producto`,
        crearColorProducto:`${apiUrl}/producto/crear_color_producto`,
        editarColorProducto:`${apiUrl}/producto/editar_color_producto`,
        borrarColorProducto:`${apiUrl}/producto/borrar_color_producto`,

        obtenerTallasProducto:`${apiUrl}/producto/obtener_tallas`,
        

        obtenerImagenesColores:`${apiUrl}/producto/obtener_imagenes_colores`,
        subirImagen:`${apiUrl}/producto/cargar_imagen_producto`,
        borrarImagen:`${apiUrl}/producto/borrar_imagen_producto`,

        obtenerTallajes:`${apiUrl}/tallaje/obtener`,
        crearTallaje:`${apiUrl}/tallaje/crear-tallaje`,
        editarTallaje:`${apiUrl}/tallaje/editar-tallaje`,
        
        

        

        login:`${apiUrl}/users/authentication`,
    }
}