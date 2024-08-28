import React, { useEffect, useState } from 'react'
import LoadingSpinnerScreen from '../../../../components/loadingSpinnerScreen/LoadingSpinnerScreen';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IUsuarioEntidadResumen } from '../../../../interfaces/entidad.interface';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { actualizarUsuarioEntidad, crearUsuarioEntidad } from '../../../../actions/entidad/entidad';
import Swal from 'sweetalert2';


interface Props {
    openDialog: boolean;
    usuario: IUsuarioEntidadResumen;
    onClose: (actualizarUsuario: boolean) => void;
    codEntidad: number;
}

export const DialogEditarUsuarioEntidad = ({ codEntidad, openDialog, usuario, onClose }: Props) => {

    const [openLoadingSpinner, setLoadingSpinner] = useState<boolean>(false)

    const { register, handleSubmit, reset, control, formState: { isValid }, watch } = useForm<IUsuarioEntidadResumen>({
        defaultValues: usuario
    });

    useEffect(() => {
        if (usuario.cod_usuario != 0) {
            reset(usuario)
        }
    }, [usuario])



    const onSubmit: SubmitHandler<IUsuarioEntidadResumen> = async (data) => {

        let dataAux: any = {
            ...data,
            cod_entidad: codEntidad,
            cod_perfil: 3
        }
        delete dataAux.cod_usuario
        delete dataAux.cod_orden

        if (usuario.cod_usuario) {
            updateUsuarioEntidad(dataAux)
        } else {
            crearUsuario(dataAux)
        }
    }

    const crearUsuario = async (data: Partial<IUsuarioEntidadResumen>) => {
        try {
            let res = await crearUsuarioEntidad(data)
            if (res) {
                await Swal.fire(res.msg)
                if (res?.error == 0) {
                    console.log('VAMOS A CREAR')
                    onClose(true)
                }
            }

        } catch (e) {
            Swal.fire({
                icon: "error",
                text: "Comuniquese con el administrador"
            })
        }
    }

    const updateUsuarioEntidad = async (data: Partial<IUsuarioEntidadResumen>) => {
        try {
            let res = await actualizarUsuarioEntidad(usuario.cod_usuario, data)
            if (res) {
                Swal.fire(res.msg)
                if (res?.error == 0) {
                    console.log('VAMOS A EDITAR')
                    onClose(true)
                }
            }

        } catch (e) {
            Swal.fire({
                icon: "error",
                text: "Comuniquese con el administrador"
            })
        }
    }


    return (
        <>

            <Dialog
                open={openDialog}
                onClose={() => onClose(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='lg'
            >
                <DialogTitle id="alert-dialog-title">
                    Crear Usuario
                </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>


                        <div className="flex flex-col mt-4 w-96">
                            <Controller
                                name="nombre"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (

                                    <div className="my-2 w-96">


                                        <TextField
                                            fullWidth
                                            label="Nombre"
                                            variant="outlined"
                                            {...field}
                                            value={field.value || ''}
                                        />
                                    </div>
                                )}
                            />

                            <Controller
                                name="cedula"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (

                                    <div className="my-2 w-96">


                                        <TextField
                                            fullWidth
                                            label="Cédula"
                                            variant="outlined"
                                            {...field}
                                            value={field.value || ''}
                                        />
                                    </div>
                                )}
                            />

                            <Controller
                                name="email"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (

                                    <div className="my-2 w-96">


                                        <TextField
                                            fullWidth
                                            label="Email"
                                            variant="outlined"
                                            type="email"
                                            {...field}
                                            value={field.value || ''}
                                        />
                                    </div>
                                )}
                            />

                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: false }}
                                render={({ field }) => (

                                    <div className="my-2 w-96">


                                        <TextField
                                            fullWidth
                                            label="Contraseña"
                                            variant="outlined"
                                            type="password"
                                            placeholder={field.value ? '' : '*******'}
                                            {...field}
                                            value={field.value || ''}
                                        />
                                    </div>
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

                            <Controller
                                name="sexo"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <InputLabel id="sexo" className='mt-4'>sexo</InputLabel>
                                        <Select
                                            labelId="sexo"
                                            {...field}
                                            label="sexo"
                                        >
                                            <MenuItem value={'M'}>Masculino</MenuItem>
                                            <MenuItem value={'F'}>Femenino</MenuItem>
                                        </Select>
                                    </>
                                )}
                            />

                        </div>


                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => onClose(false)}>Cancelar</Button>
                        <Button type='submit' disabled={!isValid}>
                            Guardar usuario
                        </Button>
                    </DialogActions>
                </form>

            </Dialog>


            <LoadingSpinnerScreen open={openLoadingSpinner} />

        </>
    )
}
