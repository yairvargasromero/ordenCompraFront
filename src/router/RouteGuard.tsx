import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../store/user/user';

interface RouteGuardProps {
  element: React.ReactElement;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ element }) => {
  const location = useLocation();
  const sidebarMenu = useUserStore((state) => state.sidebarMenu); // Fetch valid routes from the store
  const validRoutes = sidebarMenu.map((route)=>route.route)  
  let currentPath = location.pathname;
  currentPath = currentPath.split('/')[1]
  const isValidRoute = validRoutes.includes(currentPath);
  if (!isValidRoute) {
    return <Navigate to="/404" />;
  }

  return element;
};

export default RouteGuard;
