import React, { useEffect, useState } from 'react'
import { useUserStore } from '../../../store/user/user';
import { actualizarOrdenCompra, validarOrdenUsuario } from '../../../actions/orden_compra/orden_compra';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CardProducto } from './components/CardProducto';
import { ICategoriaUsuario, IOrdenValidar } from '../../../interfaces/orden_compra.interface';
import { ControlCategorias } from '../cart/ui/ControlCategorias';
import { useCartStore } from '../../../store/cart/cart-store';
import { formatDate } from '../../../utils/formatDate';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { BreadCrumbsResumen } from './components/BreadCrumbsResumen';

interface IFormDireccion {
  ciudad: string,
  direccion: string,
  observaciones: string
}

export const ResumenOrden = () => {

  const { codUsuario } = useParams<{ codUsuario: string }>();
  const [orden, setOrden] = useState<IOrdenValidar>()
  const {setCategorias, setInfoUsuarioOrden} = useCartStore((state) => state)
  const session = useUserStore(state => state.user);
  const navigate = useNavigate()

  const location = useLocation();
  const { state } = location;
  const origin = state?.origin;

  const { register, handleSubmit, reset, control, formState: { isValid }, watch } = useForm<IFormDireccion>({
    defaultValues: { ciudad: '', direccion: '', observaciones:'' }
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
          setInfoUsuarioOrden(ordenUsuario.usuario)
          setOrden(ordenUsuario.orden)
          setCategorias(ordenUsuario.categorias)
          reset({
            ciudad: ordenUsuario.orden?.ciudad,
            direccion: ordenUsuario.orden?.direccion,
            observaciones: ordenUsuario.orden?.observaciones
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
      
      <br />
       {
        (session?.cod_perfil === 2) && <BreadCrumbsResumen  origin = {origin}/>
       }
      <h3 className='my-4 font-bold text-lg'>Resumen de orden</h3>

      <div className="w-100 bg-orange-400 p-4">
        <p> Solicitud no: <span className='font-bold uppercase'>{orden?.cod_orden}</span>, creada el <span className='font-bold'>( {formatDate(orden?.fecha_creacion || '')} )</span> por el usuario <span className='font-bold uppercase'>{orden?.usuario_creacion} </span> </p>
      </div>

      <div className="grid grid-cols-[20%_1fr]">


        <ControlCategorias mostrarSoloTotal={true} />
        <div>
          {session?.cod_perfil === 2 ? (
            <form onSubmit={handleSubmit(onSubmit)} className=''>


              <div className="flex flex-row justify-center  mx-4 mt-6">
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




              </div>

              <div className='mx-4 flex flex-row justify-between items-center'>
                <Controller
                  name="observaciones"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (

                    <TextField
                      fullWidth
                      label="Observaciones coordinador"
                      variant="outlined"
                      {...field}
                      value={field.value || ''}
                    />
                  )}
                />
                <div className='my-4'>
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
            <TextField
                fullWidth
                label="Observaciones coordinador"
                variant="outlined"
                disabled
                value={orden?.observaciones}
                InputLabelProps={{
                  shrink: Boolean(orden?.observaciones), // Force the label to shrink when there's a value
                }}
              />
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
