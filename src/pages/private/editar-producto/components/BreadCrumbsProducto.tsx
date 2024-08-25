import React from 'react'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export const BreadCrumbsProducto = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/productos">
          Productos
        </Link>
        
        <Typography color="text.primary">Edición-Creación</Typography>
      </Breadcrumbs>
  )
}
