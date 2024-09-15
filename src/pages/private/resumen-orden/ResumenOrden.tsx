import React, { useEffect, useState } from 'react'
import { useUserStore } from '../../../store/user/user';
import { actualizarOrdenCompra, validarOrdenUsuario } from '../../../actions/orden_compra/orden_compra';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CardProducto } from './components/CardProducto';
import { ICategoriaUsuario, IOrdenValidar } from '../../../interfaces/orden_compra.interface';
import { ControlCategorias } from '../cart/ui/ControlCategorias';
import { useCartStore } from '../../../store/cart/cart-store';
import { formatDate } from '../../../utils/formatDate';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';

interface IFormDireccion {
  ciudad: string,
  direccion: string
}

export const ResumenOrden = () => {

  const { codUsuario } = useParams<{ codUsuario: string }>();
  const [orden, setOrden] = useState<IOrdenValidar>()
  const setCategorias = useCartStore((state) => state.setCategorias)
  const session = useUserStore(state => state.user);
  const navigate = useNavigate()

  const { register, handleSubmit, reset, control, formState: { isValid }, watch } = useForm<IFormDireccion>({
    defaultValues: { ciudad: '', direccion: '' }
  });


  useEffect(() => {

    if (
      (codUsuario && session?.cod_perfil === 3 && session?.cod_usuario === +codUsuario) ||
      (session?.cod_perfil === 2)
    ) {
      validarOrden()
    } else {
      navigate('/')
    }

  }, [session])


  const validarOrden = async () => {
    try {
      if (codUsuario && +codUsuario !== 0) {
        let ordenUsuario = await validarOrdenUsuario(+codUsuario || 0)
        if (ordenUsuario && ordenUsuario.error === 0 && (ordenUsuario.existe === 0)) {
          navigate('/ordenes-compra')
        } else if (ordenUsuario && ordenUsuario.existe === 1) {
          setOrden(ordenUsuario.orden)
          setCategorias(ordenUsuario.categorias)
          reset({
            ciudad: ordenUsuario.orden?.ciudad,
            direccion: ordenUsuario.orden?.direccion
          })
        } else {
          navigate('/')

        }
      } else {
        navigate('/ordenes-compra')
      }
    } catch (e) {
      Swal.fire({
        icon: 'error',
        text: 'Error al validar la orden de este usuario'
      })
    }
  }

  const onSubmit: SubmitHandler<IFormDireccion> = async (data) => {
    try {
      let response = await actualizarOrdenCompra(orden?.cod_orden || 0, data)
      if (response) {
        Swal.fire(response.msg)
      }
    } catch (e) {
      Swal.fire({
        icon: 'error',
        text: 'Error al actualizar la información de la orden, comuniquese con el administrador'
      })
    }


  }

  return (
    <>
      <h3 className='my-4 font-bold text-lg'>Resumen de orden</h3>

      <div className="w-100 bg-orange-400 p-4">
        <p> Solicitud no: <span className='font-bold uppercase'>{orden?.cod_orden}</span>, creada el <span className='font-bold'>( {formatDate(orden?.fecha_creacion || '')} )</span> por el usuario <span className='font-bold uppercase'>{orden?.usuario_creacion} </span> </p>
      </div>

      <div className="grid grid-cols-[20%_1fr]">


        <ControlCategorias mostrarSoloTotal={true} />
        <div>
          {session?.cod_perfil === 2 ? (
            <form onSubmit={handleSubmit(onSubmit)} className='flex justify-start'>


              <div className="flex flex-row justify-center  m-6">
                <Controller
                  name="ciudad"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Ciudad"
                      variant="outlined"
                      {...field}
                      value={field.value || ''}
                    />

                  )}
                />


                <Controller
                  name="direccion"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (

                    <TextField
                      fullWidth
                      label="Dirección"
                      variant="outlined"
                      {...field}
                      value={field.value || ''}
                    />
                  )}
                />
                <div className='mx-4'>
                  <Button type='submit' disabled={!isValid}>
                    Guardar Cambios
                  </Button>
                </div>
              </div>

            </form>
          ) : <>
            <div className='flex justify-start my-6'>
              <TextField
                fullWidth
                label="Ciudad"
                variant="outlined"
                disabled
                value={orden?.ciudad}
                InputLabelProps={{
                  shrink: Boolean(orden?.ciudad), // Force the label to shrink when there's a value
                }}
              />
              <TextField
                fullWidth
                label="Dirección"
                variant="outlined"
                disabled
                value={orden?.direccion}
                InputLabelProps={{
                  shrink: Boolean(orden?.direccion), // Force the label to shrink when there's a value
                }}
              />
            </div>
          </>
          }

          <hr />

          <div className='grid grid-cols-4 '>
            {orden?.productos.map((producto) => <CardProducto key={`${producto.cod_producto}-${producto.cod_color_producto}-${producto.talla}`} producto={producto} />)}
          </div>
        </div>
      </div>
    </>
  )
}
