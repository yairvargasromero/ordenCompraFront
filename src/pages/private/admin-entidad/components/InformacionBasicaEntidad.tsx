import React, { useEffect, useState } from 'react'
import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingSpinnerScreen from '../../../../components/loadingSpinnerScreen/LoadingSpinnerScreen';
import { IInformacionBasicaEntidad } from '../../../../interfaces/entidad.interface';
import { crearEntidad, editarEntidad, obtenerInfoBasicaEntidad } from '../../../../actions/entidad/entidad';

interface Props {
    codEntidad?: string
}


const defaulValueProducto: IInformacionBasicaEntidad = {
    nombre: '',
    activo: 0,
    nit: '',
    info_contrato: '',
    no_contrato: '',
    fecha_inicio: '',
    fecha_final: ''
}



export const InformacionBasicaEntidad = ({ codEntidad }: Props) => {

    const [openLoadingSpinner, setLoadingSpinner] = useState<boolean>(false)
    const [isFocused, setIsFocused] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (codEntidad && +codEntidad !== 0) {
            obtenerInfoEntidad(codEntidad)
        } else {
            reset(defaulValueProducto)
        }
    }, [codEntidad])



    const obtenerInfoEntidad = async (codEntidad: string) => {
        let response = await obtenerInfoBasicaEntidad(codEntidad)
        if (response?.error === 0) {
            if (Object.keys(response.entidad).length === 0) {
                navigate('/')
            }

            let entidadAux: IInformacionBasicaEntidad = {
                ...response.entidad,
            }
            reset(entidadAux)
        }
    }

    const { handleSubmit, reset, control, formState: { isValid }, watch } = useForm<IInformacionBasicaEntidad>({
        defaultValues: defaulValueProducto
    });

    const onSubmit: SubmitHandler<IInformacionBasicaEntidad> = async (data) => {
        let dataAux: any = data
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

                    <br />
                    <Controller
                        name="no_contrato"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                label="Número contrato"
                                variant="outlined"
                                {...field}
                                value={field.value || ''}
                            />
                        )}
                    />

                    <div className='mt-6'>
                        {/* Date input for fecha_inicio */}
                        <Controller
                            name="fecha_inicio"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <TextField
                                    label="Fecha Inicio"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}  // Keeps label up when value is empty
                                    variant="outlined"
                                    {...field}
                                />
                            )}
                        />

                        {/* Date input for fecha_fin */}
                        <Controller
                            name="fecha_final"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <TextField
                                    label="Fecha Fin"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}  // Keeps label up when value is empty
                                    variant="outlined"
                                    {...field}
                                />
                            )}
                        />

                    </div>


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
                    <br/>
                    <Button disabled={!isValid} type='submit' variant='contained'>
                        {(!codEntidad || +codEntidad === 0) ? 'Crear Entidad' : 'Editar Entidad'}
                    </Button>
                </div>
            </form>

            <LoadingSpinnerScreen open={openLoadingSpinner} />

        </>
    )
}
