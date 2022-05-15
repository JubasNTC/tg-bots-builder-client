import React from 'react';

import { Button, Grid, Header, Icon } from 'semantic-ui-react';

const CreationHeader = ({ headerText, onClickCreate }) => {
  return (
    <Grid columns={2} style={{ paddingTop: '30px' }}>
      <Grid.Row>
        <Grid.Column floated="left">
          <Header as="h1">{headerText}</Header>
        </Grid.Column>
        <Grid.Column floated="right">
          <Button
            icon
            color="green"
            floated="right"
            labelPosition="left"
            onClick={onClickCreate}
          >
            Добавить
            <Icon name="add" />
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export { CreationHeader };
