import { Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import { useCartStore } from '../../../../store/cart/cart-store';
import { Link } from 'react-router-dom';

export const BreadCrumbsCart = () => {

  const usuarioOrden = useCartStore((state)=>state.usuarioOrden)

  return (
    <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={`/ordenes-compra/${usuarioOrden?.cod_usuario}`}>
          Productos
        </Link>
        
        <Typography color="text.primary">Detalle</Typography>
      </Breadcrumbs>
  )
}
