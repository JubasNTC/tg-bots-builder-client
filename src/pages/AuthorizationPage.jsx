import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { authorizeByAPI } from '../actions/app';
import { AuthorizationForm } from '../components/AuthorizationForm';

const AuthorizationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuthorization = async (credentials) => {
    try {
      await authorizeByAPI(dispatch, credentials);
      navigate('/dashboard');
    } catch {
      //
    }
  };

  return <AuthorizationForm handleAuthorization={handleAuthorization} />;
};

export { AuthorizationPage };
