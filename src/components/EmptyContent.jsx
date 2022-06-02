import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

const EmptyContent = ({ text }) => {
  return (
    <Segment placeholder>
      <Header icon>{text}</Header>
    </Segment>
  );
};

export { EmptyContent };
