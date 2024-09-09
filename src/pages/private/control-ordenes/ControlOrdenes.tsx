import React, { useEffect, useState } from 'react'
import { useFilteredData } from '../../../hooks/useFilteredData';
import { useNavigate } from 'react-router-dom';
import { IOrdenPendiente } from '../../../interfaces/solicitud_dotacion.interface';
import DataTable from 'react-data-table-component';
import LoadingSpinnerScreen from '../../../components/loadingSpinnerScreen/LoadingSpinnerScreen';
import { Title } from '../../../components/title/Title';
import { IUsuarioGestionar } from '../../../interfaces/orden_compra.interface';
import { Button } from '@mui/material';
import { obtenerUsuariosCoordinadorGestionar } from '../../../actions/orden_compra/orden_compra';
import clsx from 'clsx';
import { useCartStore } from '../../../store/cart/cart-store';

export const ControlOrdenes = () => {
 
  const navigate = useNavigate()
  const [openLoadingSpinner, setLoadingSpinner] = useState<boolean>(false);
  const [usuarios, setUsuarios] = useState<IUsuarioGestionar[]>([]);
  const { search, setSearch, filteredData } = useFilteredData(usuarios);
  const clearCart = useCartStore((state)=>state.clearCart)

  const columns = [
    {
        name: 'Cédula',
        selector: (row: IUsuarioGestionar) => row.cedula,
    },
    {
        name: 'Nombre',
        selector: (row: IUsuarioGestionar) => row.nombre,
    },
    {
        name: 'Email',
        selector: (row: IUsuarioGestionar) => row.email,
    },
    {
        name: 'Cargo',
        selector: (row: IUsuarioGestionar) => row.cargo_entidad || '',
    },
    {
        name: 'Sexo',
        selector: (row: IUsuarioGestionar) => (row.sexo === "F" ? "Femenino" : "Masculino"),
    },
    {
        name: 'Activo',
        selector: (row: IUsuarioGestionar) => ((row.activo === 1) ? 'Si' : 'No'),
        sortable: true,
    },
    {
        name: 'Acciones',
        cell: (row: IUsuarioGestionar) => {
          
          if(row.cod_orden){
            // Orden Completa, verlo en resumen
            return (
              <button
                type='button'
                className={
                  clsx(
                      'py-0.5 px-1 my-1 border-2 rounded-sm hover:text-white transition-colors duration-300',
                      {
                          'border-green-500 text-green-500 hover:bg-green-500 ': row.orden_completa,
                          ' border-orange-500 text-orange-500 hover:bg-orange-500 ': !row.orden_completa,
                      }
                  )
              }
                onClick={() => navigate('/resumen_orden/'+ row.cod_usuario)}
            >
                {row.orden_completa ? 'Orden Completa':'Gestionar Orden'}
            </button>
            )
          }else{
            return (
              <button
                disabled={!!row.cod_orden}
                onClick={() => navigate('/ordenes-compra/'+ row.cod_usuario)}
                className='p-0.5 py-0.5 px-1 my-1 border-2 rounded-sm hover:text-white transition-colors duration-300 border-blue-500 text-blue-500 hover:bg-blue-500'
            >
                Crear Orden
            </button>
            )
          }

            
        }
    },
];

  useEffect(() => {
      obtenerSolicitudes()
      clearCart()
  }, [])

  const obtenerSolicitudes = async () => {

      setLoadingSpinner(true)
      let response = await obtenerUsuariosCoordinadorGestionar()
      setLoadingSpinner(false)
      if (response?.error == 0) {
          setUsuarios(response.usuarios)
      }
  }


  return (
      <>
      <Title title="Control de ordenes" />
          <div className="mb-4">
              <input
                  type="text"
                  placeholder="Buscar..."
                  className="border rounded p-2"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
              />
          </div>
          <DataTable
              columns={columns}
              data={filteredData}
              pagination
              highlightOnHover
          />

          <LoadingSpinnerScreen open={openLoadingSpinner} />
      </>
  )
}
