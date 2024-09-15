import React from 'react'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';


export const BreadCrumbsProducto = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/productos">
          Productos
        </Link>
        
        <Typography color="text.primary">Edición-Creación</Typography>
      </Breadcrumbs>
  )
}
