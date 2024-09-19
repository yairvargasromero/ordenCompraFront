import { Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const BreadCrumbsResumen = ({origin}:{origin:string}) => {
  const originText =( origin === 'control-ordenes' ) ? 'Control Ordenes' : 'Gestion solicitudes' 
  return (
    <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={`/${origin}`}>
          {originText}
        </Link>
        
        <Typography color="text.primary">Resumen</Typography>
      </Breadcrumbs>
  )
}
