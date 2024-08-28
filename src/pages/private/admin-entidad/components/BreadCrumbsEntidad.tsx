import { Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import Link from '@mui/material/Link';

export const BreadCrumbsEntidad = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/entidades">
          Entidades
        </Link>
        
        <Typography color="text.primary">Edición-Creación</Typography>
      </Breadcrumbs>
  )
}
