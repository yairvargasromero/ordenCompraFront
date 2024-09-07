import { Button, Checkbox, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { obtenerCategoriasActivas } from '../../../../actions/categorias/categorias';
import { ICategoriaActiva } from '../../../../interfaces/categoria.interface';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingSpinnerScreen from '../../../../components/loadingSpinnerScreen/LoadingSpinnerScreen';
import { IInformacionBasicaEntidad } from '../../../../interfaces/entidad.interface';
import { BotonProductoCategoria } from './BotonProductoCategoria';
import { crearEntidad, editarEntidad, obtenerInfoBasicaEntidad } from '../../../../actions/entidad/entidad';

interface Props {
    codEntidad?: string
}


const defaulValueProducto: IInformacionBasicaEntidad = {
    nombre: '',
    cod_categorias: [],
    activo: 0,
    nit: '',
    info_contrato: ''
}



export const InformacionBasicaEntidad = ({ codEntidad }: Props) => {

    const [openLoadingSpinner, setLoadingSpinner] = useState<boolean>(false)
    const [isFocused, setIsFocused] = useState(false);
    const [categorias, setCategorias] = useState<ICategoriaActiva[]>([]);

    const [categoriasSave, setCategoriasSave] = useState<{ cod_categoria: number, cantidad: number }[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        obtenerTodasCategorias()
        if (codEntidad && +codEntidad !== 0) {
            obtenerInfoEntidad(codEntidad)
        } else {
            reset(defaulValueProducto)
        }
    }, [codEntidad])

    const obtenerTodasCategorias = async () => {
        let response = await obtenerCategoriasActivas()
        if (response?.error === 0) {
            setCategorias(response.categorias)
            sincronizarCategorias()
        }
    }

    const obtenerInfoEntidad = async (codEntidad: string) => {
        let response = await obtenerInfoBasicaEntidad(codEntidad)
        if (response?.error === 0) {
            if (Object.keys(response.entidad).length === 0) {
                navigate('/')
            }

            let entidadAux: IInformacionBasicaEntidad = {
                ...response.entidad,
                cod_categorias: response.entidad.cod_categorias.map((cat: any) => cat.cod_categoria)
            }
            setCategoriasSave(response.entidad.cod_categorias)
            reset(entidadAux)
        }
    }

    const { register, handleSubmit, reset, control, formState: { isValid }, watch } = useForm<IInformacionBasicaEntidad>({
        defaultValues: defaulValueProducto
    });

    const onSubmit: SubmitHandler<IInformacionBasicaEntidad> = async (data) => {
        let dataAux: any = data
        dataAux.cod_categorias = categoriasSave
        if (!codEntidad || +codEntidad === 0) {

            setLoadingSpinner(true)
            let response = await crearEntidad(dataAux);
            setLoadingSpinner(false)
            if (response) {
                if (response.error === 0) {
                    navigate('/entidades/admin-entidad/' + response.cod_entidad.toString())
                }
            }

        } else {

            setLoadingSpinner(true)
            let response = await editarEntidad(dataAux, +codEntidad);
            setLoadingSpinner(false)
            if (response) {
                if (response) {
                    Swal.fire(response.msg)
                }
            }
        }


    }

    // Obtener el valor actual de cod_categorias
    const codCategorias = watch('cod_categorias');

    const nombreCategoria = (codCategoria: number) => {
        return categorias.filter((categoria) => categoria.cod_categoria === codCategoria)[0].nombre
    }

    const cantidadCategoria = (codCategoria: number) => {
        return categoriasSave.filter((categoria) => categoria.cod_categoria === codCategoria)[0].cantidad
    }

    const handleCantidadCategoria = (cod_categoria: number, cantidad: number) => {
        let categoriaFilter = categoriasSave.findIndex((categoria) => categoria.cod_categoria === cod_categoria);

        if (categoriaFilter === -1) {
            setCategoriasSave([...categoriasSave, { cod_categoria, cantidad }]);
        } else {

            const nuevasCategorias = [...categoriasSave];
            nuevasCategorias[categoriaFilter] = { cod_categoria, cantidad };
            setCategoriasSave(nuevasCategorias);
        }

    }

    const sincronizarCategorias = () => {

        // Filtrar categorías existentes que no están en codCategorias
        const categoriasFiltradas = categoriasSave.filter((categoria) =>
            watch('cod_categorias').map((cat) => cat.toString()).includes(categoria.cod_categoria.toString())
        );

        watch('cod_categorias').forEach((codCategoria) => {
            const existe = categoriasFiltradas.some(
                (categoria) => categoria.cod_categoria === +codCategoria
            );

            if (!existe) {
                categoriasFiltradas.push({
                    cod_categoria: +codCategoria,
                    cantidad: 0,
                });
            }
        });

        // Actualizar el estado con las categorías sincronizadas
        setCategoriasSave(categoriasFiltradas);
    };



    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="flex flex-col mt-4">
                    <Controller
                        name="nombre"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                label="Nombre"
                                variant="outlined"
                                {...field}
                                value={field.value || ''}
                            />
                        )}
                    />
                    <br />
                    <Controller
                        name="nit"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                label="NIT"
                                variant="outlined"
                                {...field}
                                value={field.value || ''}
                            />
                        )}
                    />

                    <Controller
                        name="info_contrato"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <>
                                <InputLabel className='mt-4'>Información del contrato</InputLabel>
                                <TextareaAutosize
                                    
                                    minRows={2}
                                    placeholder="Info..."
                                    {...field}
                                    value={field.value || ''}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '4px',
                                        border: isFocused ? '2px solid #1976d2' : '1px solid #ccc',
                                        fontSize: '1rem',
                                        lineHeight: '1.5',
                                        color: '#495057',
                                        backgroundColor: '#fff',
                                        boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075)',
                                        transition: 'border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s',
                                      }}
                                />
                            </>

                        )}
                    />

                    <Controller
                        name="cod_categorias"
                        control={control}
                        rules={{ required: 'Categorias es obligatorio' }}
                        render={({ field }) => (
                            <>
                                <InputLabel id="Categoria" className='mt-4'>Categorias</InputLabel>
                                <Select
                                    {...field}
                                    label="Categoria"
                                    labelId="Categoria"
                                    multiple
                                    onChange={(event) => {
                                        field.onChange(event);
                                        sincronizarCategorias()
                                    }}
                                    value={field.value}
                                >
                                    {categorias.map((categoria) => (
                                        <MenuItem key={categoria.cod_categoria} value={categoria.cod_categoria}>
                                            <Checkbox checked={field.value.map(value => value.toString()).indexOf(categoria.cod_categoria.toString()) > -1} />
                                            {categoria.nombre}
                                        </MenuItem>
                                    ))
                                    }
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


                    {/* Mapear los valores seleccionados */}
                    <div className="my-7 flex row justify-start">
                        {codCategorias.map((cod) => (

                            <BotonProductoCategoria
                                key={cod}
                                codCategoria={+cod}
                                cantidadDefecto={cantidadCategoria(+cod)}
                                categoria={nombreCategoria(+cod)}
                                handleCantidadCategoria={handleCantidadCategoria}
                            />
                        ))}

                    </div>


                    <Button disabled={!isValid} type='submit'>
                        {(!codEntidad || +codEntidad === 0) ? 'Crear Entidad' : 'Editar Entidad'}
                    </Button>
                </div>
            </form>

            <LoadingSpinnerScreen open={openLoadingSpinner} />

        </>
    )
}
