import React, { useEffect, useState } from 'react'
import { useCartStore } from '../../../../store/cart/cart-store'
import { useUserStore } from '../../../../store/user/user'

export const ControlCategorias = () => {
    const categorias = useCartStore((state) => state.categorias)
    const categoriasSeleccionada = useCartStore((state) => state.categoriasSeleccionada)
    const usuario = useUserStore((state) => state.user)
    
    const getCantidadSeleccionada = (codCategoria:number) =>{
        if(categoriasSeleccionada[codCategoria]){
            return categoriasSeleccionada[codCategoria].cantidadSeleccionada
        }else{
            return 0
        }
    }

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, [])


    return (
        <div className=" h-screen w-60 bg-gray-100 shadow-lg mt-4 p-4">
          
            <div className='my-3 border-gray-3 border-b-2'>
                <p className='font-bold text-sm'>NOMBRE ENTIDAD</p>
                <p>{usuario?.entidad}</p>
            </div>
            <div className='my-3 border-gray-3 border-b-2'>
                <p className='font-bold text-sm'>NIT ENTIDAD</p>
                <p>{usuario?.nit}</p>
            </div>
            <div className='my-3 border-gray-3 border-b-2'>
                <p className='font-bold text-sm'>NOMBRE PERSONA</p>
                <p>{usuario?.nombre}</p>
            </div>
            <div className='my-3 border-gray-3 border-b-2'>
                <p className='font-bold text-sm'>DOCUMENTO</p>
                <p>{usuario?.cedula}</p>
            </div>
            
            <div className='my-3 border-gray-3 border-b-2'>
                <p className='font-bold text-sm'>CARGO</p>
                <p>CARGO</p>
            </div>

            <p className='font-bold text-lg'>CONTROL CATEGORIAS</p>
            {categorias.length === 0 &&
                <p>No hay categorias, por lo tanto no puede escoger productos</p>
            }

            {( loaded && 
            
            
            categorias.length > 0) &&

                categorias.map((categoria) => (
                    <div key={categoria.cod_categoria} className='mt-5 border-b border-gray-300 p-1'>
                        <p className='text-sm font-semibold'>{categoria.nombre}</p>
                        <p className='text-xs mt-1 ms-2'>( {getCantidadSeleccionada(categoria.cod_categoria)} ) de  ({categoria.cantidad}) productos escogido(s) </p>
                    </div>
                ))
            }

        </div>
    )
}
