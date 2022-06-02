import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';
import { AuthedRoute } from './AuthedRoute';

import { AuthorizationPage } from '../pages/AuthorizationPage';
import { DashboardPage } from '../pages/DashboardPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { BotsPage } from '../pages/BotsPage';
import { FlowsPage } from '../pages/FlowsPage';
import { FlowConstructorPage } from '../pages/FlowConstructorPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';

const Router = () => {
  const isAuthorized = !!useSelector(({ appReducer: { account } }) => account);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthedRoute isAuthorized={isAuthorized}>
            <AuthorizationPage />
          </AuthedRoute>
        }
      />
      <Route
        path="/registration"
        element={
          <AuthedRoute isAuthorized={isAuthorized}>
            <RegistrationPage />
          </AuthedRoute>
        }
      />
      {/*<Route path="/" exact element={<AuthorizationPage />} />*/}
      {/*<Route path="/registration" exact element={<RegistrationPage />} />*/}
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
      <Route
        path="/flows"
        element={
          <ProtectedRoute isAuthorized={isAuthorized}>
            <FlowsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/flows/:flowId/constructor"
        element={
          <ProtectedRoute isAuthorized={isAuthorized}>
            <FlowConstructorPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute isAuthorized={isAuthorized}>
            <AnalyticsPage />
          </ProtectedRoute>
        }
      />

      {/* <Route path="/pokemon/:id" component={PokemonPage} /> */}
      {/* <Route component={NotFoundPage} /> */}
    </Routes>
  );
};

export { Router };
