import React from 'react';
import { Container, Grid, Icon, Menu } from 'semantic-ui-react';

import { NavLink } from 'react-router-dom';

const LayoutWithSidebar = ({ children }) => {
  return (
    <Container style={{ paddingTop: '30px' }}>
      <Menu size="huge" pointing stackable fluid>
        <Menu.Item as={NavLink} to="/dashboard">
          <Icon name="home" />
          Главная
        </Menu.Item>
        <Menu.Item as={NavLink} to="/bots">
          <Icon name="paper plane" />
          Боты
        </Menu.Item>
        <Menu.Item as={NavLink} to="/flows">
          <Icon name="fork" />
          Сценарии
        </Menu.Item>
        <Menu.Item as={NavLink} to="/analytics">
          <Icon name="chart bar" />
          Аналитика
        </Menu.Item>
      </Menu>
      <Grid columns={1}>
        <Grid.Row>
          <Grid.Column>{children}</Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export { LayoutWithSidebar };
