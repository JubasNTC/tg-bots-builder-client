import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { registerByAPI } from '../actions/app';
import { RegistrationForm } from '../components/RegistrationForm';

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegistration = async (credentials) => {
    await registerByAPI(dispatch, credentials);
    navigate('/dashboard');
  };

  return <RegistrationForm handleRegistration={handleRegistration} />;
};

export { RegistrationPage };
