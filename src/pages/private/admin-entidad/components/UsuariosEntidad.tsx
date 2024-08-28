import { Button } from '@mui/material'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { cargarUsuariosEntidad, obtenerUsuariosEntidad } from '../../../../actions/entidad/entidad';
import LoadingSpinnerScreen from '../../../../components/loadingSpinnerScreen/LoadingSpinnerScreen';
import Swal from 'sweetalert2';
import { DialogCargarUsuarios } from './DialogCargarUsuarios';
import DataTable from 'react-data-table-component';
import { Title } from '../../../../components/title/Title';
import { IUsuarioEntidadResumen } from '../../../../interfaces/entidad.interface';
import { DataTableUsuarios } from './DataTableUsuarios';
import { DialogEditarUsuarioEntidad } from './DialogEditarUsuarioEntidad';
interface Props {
    codEntidad: string
}

export const UsuariosEntidad = ({ codEntidad }: Props) => {

    const [open, setOpen] = useState(false);
    const [refreshUsuarios, setRefreshUsuarios] = useState(false);
   
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (actualizarUsuarios: boolean) => {
        if(actualizarUsuarios){
            // obtenerUsuarios()
            setRefreshUsuarios(!refreshUsuarios)
        }
        setOpen(false);
    };


    return (
        <>
            <Button type="button" onClick={handleClickOpen}>Cargar Usuarios</Button>
            <DataTableUsuarios codEntidad={codEntidad}  refreshUsuarios={refreshUsuarios}/>
            <DialogCargarUsuarios
                openDialog={open}
                onClose={handleClose}
                codEntidad={+codEntidad}
            />

            
        </>
    )
}
