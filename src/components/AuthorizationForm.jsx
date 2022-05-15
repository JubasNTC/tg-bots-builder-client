import React from 'react';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup
    .string('Введите свой email')
    .email('Введите действительный адрес электронной почты')
    .required('Обязательное поле'),
  password: yup
    .string('Введите пароль')
    .min(12, 'Пароль должен состоять минимум из 12 символов')
    .required('Обязательное поле'),
});

const AuthorizationForm = ({ handleAuthorization }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await handleAuthorization(values);
    },
  });

  return (
    <Grid
      centered
      columns={1}
      style={{ height: '100vh' }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="black" textAlign="center">
          Войдите в свой аккаунт
        </Header>
        <Form size="large" onSubmit={formik.handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              id="email"
              name="email"
              icon="user"
              iconPosition="left"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && formik.errors.email}
            />
            <Form.Input
              fluid
              id="password"
              name="password"
              type="password"
              icon="lock"
              iconPosition="left"
              placeholder="Пароль"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && formik.errors.password}
            />
            <Button fluid color="blue" size="large" type="submit">
              Войти
            </Button>
          </Segment>
        </Form>
        <Message style={{ textAlign: 'center' }}>
          У вас нет учетной записи?{' '}
          <NavLink to="/registration">Зарегистрируйтесь</NavLink>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export { AuthorizationForm };
