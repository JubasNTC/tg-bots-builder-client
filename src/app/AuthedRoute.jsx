import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthedRoute = ({ isAuthorized, children }) => {
  if (isAuthorized) {
    return <Navigate to="/bots" replace />;
  }

  return children;
};

export { AuthedRoute };
