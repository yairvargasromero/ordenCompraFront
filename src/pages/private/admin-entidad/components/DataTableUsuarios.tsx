import React, { useEffect, useState } from 'react'
import { Title } from '../../../../components/title/Title';
import { Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import { obtenerUsuariosEntidad } from '../../../../actions/entidad/entidad';
import { IUsuarioEntidadResumen } from '../../../../interfaces/entidad.interface';
import LoadingSpinnerScreen from '../../../../components/loadingSpinnerScreen/LoadingSpinnerScreen';
import { useFilteredData } from '../../../../hooks/useFilteredData';
import { DialogEditarUsuarioEntidad } from './DialogEditarUsuarioEntidad';

interface Props {
    codEntidad: string,
    refreshUsuarios: boolean
}

const defaultUsuario: IUsuarioEntidadResumen = {
    cod_usuario: 0,
    email: '',
    nombre: '',
    activo: 1,
    sexo: 'M',
    cedula: ''
}

export const DataTableUsuarios = ({ codEntidad, refreshUsuarios }: Props) => {


    const [openLoadingSpinner, setLoadingSpinner] = useState<boolean>(false);
    const [openEditUsuario, setOpenEditUsuario] = useState(false);
    const [usuarios, setUsuarios] = useState<IUsuarioEntidadResumen[]>([]);
    const [usuarioEditar, setUsuarioEditar] = useState<IUsuarioEntidadResumen>(defaultUsuario)
    const { search, setSearch, filteredData } = useFilteredData(usuarios);
    const columns = [
        {
            name: 'Cédula',
            selector: (row: IUsuarioEntidadResumen) => row.cedula,
        },
        {
            name: 'Nombre',
            selector: (row: IUsuarioEntidadResumen) => row.nombre,
        },
        {
            name: 'Email',
            selector: (row: IUsuarioEntidadResumen) => row.email,
        },
        {
            name: 'Sexo',
            selector: (row: IUsuarioEntidadResumen) => (row.sexo === "F" ? "Femenino" : "Masculino"),
        },
        {
            name: 'Activo',
            selector: (row: IUsuarioEntidadResumen) => ((row.activo === 1) ? 'Si' : 'No'),
            sortable: true,
        },
        {
            name: 'Orden',
            cell: (row: IUsuarioEntidadResumen) => ((!!row.cod_orden) ? (
                <Button onClick={() => handleOpenOrden(row.cod_orden || 0)}>
                    {row.cod_orden}
                </Button>
            ) : (
                ''
            )

            )

        },
        {
            name: 'Actions',
            cell: (row: IUsuarioEntidadResumen) => (
                <button
                    onClick={() => handleActionUsuario(row)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                    Editar
                </button>
            ),
        },
    ];


    useEffect(() => {
        obtenerUsuarios()
    }, [refreshUsuarios])

    const obtenerUsuarios = async () => {
        setLoadingSpinner(true)
        let response = await obtenerUsuariosEntidad(+codEntidad)
        setLoadingSpinner(false)
        if (response?.error == 0) {
            setUsuarios(response.usuarios)
        }
    }

    const handleActionUsuario = async (usuario:IUsuarioEntidadResumen ) => {
        console.log('********', usuario)
        setUsuarioEditar(usuario)
        setOpenEditUsuario(true)
    }

    const handleOpenOrden = async (codOrden: number) => {
        console.log('********', codOrden)
    }

    const handleClickCrearClienteEntidad = () => {
        setUsuarioEditar(defaultUsuario)
        setOpenEditUsuario(true)
    };

    const handleCloseEditUsuario = (actualizarUsuarios: boolean) => {
        if(actualizarUsuarios){
            obtenerUsuarios()
        }
        setOpenEditUsuario(false);
    };
    return (
        <>
            <Title title="usuarios" />
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="border rounded p-2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Button className='ml-4' variant="outlined" onClick={() => handleClickCrearClienteEntidad()}>
                    Crear Cliente Entidad
                </Button>

            </div>
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
            />

            <DialogEditarUsuarioEntidad 
                openDialog={openEditUsuario}
                onClose={handleCloseEditUsuario}
                codEntidad={+codEntidad}
                usuario={usuarioEditar}
            />

            <LoadingSpinnerScreen open={openLoadingSpinner} />
        </>
    )
}
