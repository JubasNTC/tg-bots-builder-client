import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { AuthorizationPage } from '../pages/AuthorizationPage';
import { DashboardPage } from '../pages/DashboardPage';

import { ProtectedRoute } from './ProtectedRoute';
import { RegistrationPage } from '../pages/RegistrationPage';
import { BotsPage } from '../pages/BotsPage';

const Router = () => {
  const isAuthorized = !!useSelector(({ appReducer: { account } }) => account);

  return (
    <Routes>
      <Route path="/" exact element={<AuthorizationPage />} />
      <Route path="/registration" exact element={<RegistrationPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthorized={isAuthorized}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bots"
        element={
          <ProtectedRoute isAuthorized={isAuthorized}>
            <BotsPage />
          </ProtectedRoute>
        }
      />

      {/* <Route path="/pokemon/:id" component={PokemonPage} /> */}
      {/* <Route component={NotFoundPage} /> */}
    </Routes>
  );
};

export { Router };
