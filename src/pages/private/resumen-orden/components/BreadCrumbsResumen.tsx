import { Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const BreadCrumbsResumen = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/control-ordenes">
          Control Ordenes
        </Link>
        
        <Typography color="text.primary">Resumen</Typography>
      </Breadcrumbs>
  )
}
