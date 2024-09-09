
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { obtenerProductos } from '../../../actions/producto/producto';
import { Title } from '../../../components/title/Title';
import { IEntidadResumen } from '../../../interfaces/entidad.interface';
import { obtenerEntidades } from '../../../actions/entidad/entidad';
import { useFilteredData } from '../../../hooks/useFilteredData';



export const EntidadesPage = () => {

  const navigate = useNavigate()
  const [entidades, setEntidades] = useState<IEntidadResumen[]>([]);
  const { search, setSearch, filteredData } = useFilteredData(entidades);
  const columns = [
    {
      name: 'Nombre',
      selector: (row: IEntidadResumen) => row.nombre,
    },
    {
      name: 'NIT',
      selector: (row: IEntidadResumen) => row.nit,
    },
    {
      name: 'Estado',
      selector: (row: IEntidadResumen) => (row.activo === 1) ? 'Activo' : 'Inactivo',
    },
    {
      name: 'Actions',
      cell: (row: IEntidadResumen) => (
        <button
          onClick={() => handleClickOpen(row.cod_entidad)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Editar
        </button>
      ),
    },
  ];

  useEffect(() => {
    obtenerTodosProductos()
  }, [])

  const obtenerTodosProductos = async () => {
    let response = await obtenerEntidades()
    console.log(response)
    if (response?.error == 0) {
      setEntidades(response.entidades)
    }
  }

  const handleClickOpen = (codEntidad: number = 0) => {
    navigate(`admin-entidad/${codEntidad}`)
  };


  return (
    <div className="container mx-auto p-4">
      <Title title="Entidades" />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          className="border rounded p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button className='ml-4' variant="outlined" onClick={() => handleClickOpen()}>
          Crear Entidad
        </Button>

      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
      />
    </div>
  );

}