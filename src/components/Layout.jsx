import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const isLoading = useSelector(({ app: { isLoading } }) => isLoading);

  return (
    <>
      <Dimmer active={isLoading}>
        <Loader inverted>Подождите...</Loader>
      </Dimmer>
      {children}
    </>
  );
};

export { Layout };
