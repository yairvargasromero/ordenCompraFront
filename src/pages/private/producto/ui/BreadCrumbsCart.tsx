import { Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import Link from '@mui/material/Link';
import { useCartStore } from '../../../../store/cart/cart-store';

export const BreadCrumbsCart = () => {

  const usuarioOrden = useCartStore((state)=>state.usuarioOrden)

  return (
    <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href={`/ordenes-compra/${usuarioOrden?.cod_usuario}`}>
          Productos
        </Link>
        
        <Typography color="text.primary">Detalle</Typography>
      </Breadcrumbs>
  )
}
