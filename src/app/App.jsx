import React from 'react';
import { useSelector } from 'react-redux';

// import { Preloader } from '../components/Preloader';
// import { ErrorPage } from '../pages/ErrorPage';

import { Router } from './Router';
import { Dimmer, Loader } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const appReady = useSelector(({ appReducer: { appReady } }) => appReady);
  const isLoading = useSelector(({ appReducer: { isLoading } }) => isLoading);

  return (
    <>
      <Dimmer inverted active={isLoading}>
        <Loader inverted>Подождите...</Loader>
      </Dimmer>
      {appReady && <Router />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export { App };
