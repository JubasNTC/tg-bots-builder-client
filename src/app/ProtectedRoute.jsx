import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthorized, children }) => {
  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export { ProtectedRoute };
