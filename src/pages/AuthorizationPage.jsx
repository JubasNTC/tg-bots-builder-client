import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { authorizeByAPI } from '../actions/app';
import { Layout } from '../components/Layout';
import { AuthorizationForm } from '../components/AuthorizationForm';

const AuthorizationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuthorization = async (credentials) => {
    await authorizeByAPI(dispatch, credentials);
    navigate('/dashboard');
  };

  return (
    <Layout>
      <AuthorizationForm handleAuthorization={handleAuthorization} />
    </Layout>
  );
};

export { AuthorizationPage };
