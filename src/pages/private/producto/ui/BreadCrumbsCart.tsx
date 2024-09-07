import { Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import Link from '@mui/material/Link';

export const BreadCrumbsCart = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/ordenes-compra">
          Productos
        </Link>
        
        <Typography color="text.primary">Detalle</Typography>
      </Breadcrumbs>
  )
}
