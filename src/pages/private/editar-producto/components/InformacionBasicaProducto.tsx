import { Button, Checkbox, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IProductoInformacionBasica } from '../../../../interfaces/producto.interface';
import { obtenerCategorias } from '../../../../actions/categorias/categorias';
import { ICategories } from '../../../../interfaces/categoria.interface';
import { obtenerInfoBasicaProducto } from '../../../../actions/producto/producto';

interface Props {
    codProducto?: string
}


const defaulValueProducto: IProductoInformacionBasica = {
    nombre: '',
    cod_categoria: 0,
    activo: 0
}



export const InformacionBasicaProducto = ({ codProducto }: Props) => {

    const [categorias, setCategorias] = useState<ICategories[]>([]);

    useEffect(() => {
        obtenerTodasCategorias()
        if(codProducto){
            obtenerInfoBasicaDelProducto(codProducto)
        } else {
            reset(defaulValueProducto)
        }
    }, [codProducto])

    const obtenerTodasCategorias = async () => {
        let response = await obtenerCategorias()
        if (response?.error === 0) {
            setCategorias(response.categorias)
        }
    }

    const obtenerInfoBasicaDelProducto = async (codProducto:string) =>{
        let response = await obtenerInfoBasicaProducto(codProducto)
        if (response?.error === 0) {
            reset(response.producto)
        }
    }

    const { register, handleSubmit, reset, control, formState: { isValid } } = useForm<IProductoInformacionBasica>({
        defaultValues: defaulValueProducto
    });

    const onSubmit: SubmitHandler<IProductoInformacionBasica> = async (data) => {
        console.log('SUBMIT ', data)
    }




    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="flex flex-col mt-4">
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        {...register('nombre', { required: true })}
                    />

                    <Controller
                        name="cod_categoria"
                        control={control}
                        rules={{ required: 'Categoria es obligatorio' }}
                        render={({ field }) => (
                            <>
                                <InputLabel id="Categoria" className='mt-4'>Categoria</InputLabel>

                                <Select
                                    {...field}
                                    label="Categoria"
                                    labelId="Categoria"
                                >
                                    {categorias.map((categoria) => (<MenuItem key={categoria.cod_categoria} value={categoria.cod_categoria}>{categoria.nombre}</MenuItem>))}
                                </Select>
                            </>
                        )}
                    />

                    <Controller
                        name="activo"
                        control={control}
                        render={({ field }) => (
                            <>
                                <InputLabel id="activo" className='mt-4'>Activo</InputLabel>
                                <Select
                                    labelId="activo"
                                    {...field}
                                    label="Activo"
                                >
                                    <MenuItem value={1}>Activo</MenuItem>
                                    <MenuItem value={0}>Inactivo</MenuItem>
                                </Select>
                            </>
                        )}
                    />


                    <Button disabled={!isValid} type='submit'>
                        {codProducto ? 'Editar Producto' : 'Crear Producto'}
                    </Button>
                </div>
            </form>

        </>
    )
}
