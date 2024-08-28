import { PanelLayout } from '../components/layout/PanelLayout';
import { PageNotFound } from '../components/ui/not-found/PageNotFound';
import { LoginPage } from '../pages/auth/LoginPage';
import { AdminEntidad } from '../pages/private/admin-entidad/AdminEntidad';
import { CartPage } from '../pages/private/cart/CartPage';
import { CategoriasPage } from '../pages/private/categorias/CategoriasPage';
import EditarProducto from '../pages/private/editar-producto/EditarProducto';
import { EmptyPage } from '../pages/private/empty/EmptyPage';
import { EntidadesPage } from '../pages/private/entidades/EntidadesPage';
import { OrdenesCompraPage } from '../pages/private/ordenes-compra/OrdenesCompraPage';
import { ProductBySlugPage } from '../pages/private/producto/ProductBySlugPage';
import { ProductosPage } from '../pages/private/productos/ProductosPage';
import { ReportesPage } from '../pages/private/reportes/page';
import { TallajesPage } from '../pages/private/tallajes/TallajesPage';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import {PageNotFound, PanelLayout} from '@/components';
// import {
//     CartPage, 
//     CategoriasPage, 
//     EditarProducto, 
//     EmptyPage, 
//     EntidadesPage, 
//     LoginPage, 
//     ProductosPage,
//     OrdenesCompraPage,
//     ProductBySlugPage,
//     ReportesPage,
//     TallajesPage
// } from '@/pages';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/auth/login" element={<LoginPage />} />

        {/* Private routes with layout */}
        <Route path="/" element={<PanelLayout />}>
          
          <Route path="categorias" element={<CategoriasPage />} />
          <Route path="productos" element={<ProductosPage />} />
          <Route path="productos/editar-producto/:codProducto" element={<EditarProducto />} />
          <Route path="tallajes" element={<TallajesPage />} />
          <Route path="entidades" element={<EntidadesPage />} />
          <Route path="entidades/admin-entidad/:codEntidad" element={<AdminEntidad />} />


          <Route path="ordenes-compra" element={<OrdenesCompraPage />} />

          <Route path="empty" element={<EmptyPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="producto/:codProducto" element={<ProductBySlugPage />} />
          <Route path="reportes" element={<ReportesPage />} />
          
          <Route path="*" element={<PageNotFound />} />
        </Route>

        {/* 404 Not Found route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
