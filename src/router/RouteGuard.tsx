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

  console.log('VALID ROUTES00')
  console.log(validRoutes)
  
  let currentPath = location.pathname;
  currentPath = currentPath.split('/')[1]
 
  console.log(currentPath)
  // Check if the current path is in the valid routes
  const isValidRoute = validRoutes.includes(currentPath);
  if (!isValidRoute) {
    // Redirect to a 404 or access denied page if the route is not valid
    return <Navigate to="/404" />;
  }

  return element;
};

export default RouteGuard;
