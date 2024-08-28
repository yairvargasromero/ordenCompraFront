
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from '@mui/material/Button';
import { FormCategoria } from './ui/FormCategoria';
import { ICategories } from '../../../interfaces/categoria.interface';
import { obtenerCategorias } from '../../../actions/categorias/categorias';
import { Title } from '../../../components/title/Title';
import { useFilteredData } from '../../../hooks/useFilteredData';



export const CategoriasPage = () => {

  const [open, setOpen] = useState(false);
  const [codigoCategoria, setCodigoCategoria] = useState(0);
  const [categorias, setCategorias] = useState<ICategories[]>([]);
  const { search, setSearch, filteredData } = useFilteredData(categorias);
  const columns = [
    {
      name: 'Nombre',
      selector: (row: ICategories) => row.nombre,
    },
    {
      name: 'Sexo',
      selector: (row: ICategories) => row.sexo.map((value) => (value === "F" ? "Femenino" : "Masculino")).join(','),
    },
    {
      name: 'Activo',
      selector: (row: ICategories) => ((row.activo === 1) ? 'Si' : 'No'),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row: ICategories) => (
        <button
          onClick={() => handleClickOpen(row.cod_categoria)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Editar
        </button>
      ),
    },
  ];

  useEffect(() => {
    obtenerTodasCategorias()
  }, [])

  const obtenerTodasCategorias = async () => {
    let response = await obtenerCategorias()
    if (response?.error == 0) {
      setCategorias(response.categorias)
    }
  }



  const handleClickOpen = (codCategoria: number = 0) => {
    setCodigoCategoria(codCategoria)
    setOpen(true);
  };

  const handleClose = (actualizarCategoria: boolean) => {
    if (actualizarCategoria) {
      obtenerTodasCategorias()
    }
    setOpen(false);
  };


  return (
    <div className="container mx-auto p-4">
      <Title title="Categorias" />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          className="border rounded p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button className='ml-4' variant="outlined" onClick={() => handleClickOpen()}>
          Crear Categoria
        </Button>

      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
      />

      <FormCategoria
        openDialog={open} onClose={handleClose} codCategoria={codigoCategoria}
      />

    </div>



  );
}