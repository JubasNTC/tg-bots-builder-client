import React from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grid, Icon, Menu } from 'semantic-ui-react';

import { NavLink } from 'react-router-dom';
import { logoutByAPI } from '../actions/app';

const LayoutWithSidebar = ({ children }) => {
  const dispatch = useDispatch();

  // const email = useSelector(({ appReducer: { account } }) => account.email);

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
        <Menu.Item position="right" onClick={() => logoutByAPI(dispatch)}>
          <Icon name="window close" />
          Выйти
        </Menu.Item>
      </Menu>
      <Grid columns={1}>
        <Grid.Row>
          <Grid.Column style={{ paddingTop: '30px' }}>{children}</Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export { LayoutWithSidebar };
