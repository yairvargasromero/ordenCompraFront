import { Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const BreadCrumbsEntidad = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/entidades">
          Entidades
        </Link>
        
        <Typography color="text.primary">Edición-Creación</Typography>
      </Breadcrumbs>
  )
}
