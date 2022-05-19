import React from 'react';
import { useFormik } from 'formik';
import { Button, Divider, Form, Image } from 'semantic-ui-react';
import * as yup from 'yup';

const validationSchema = yup
  .object({
    name: yup
      .string()
      .max(30, 'Максимальная длина 30 символов')
      .required('Обязательное поле'),
    url: yup
      .string()
      .url('Не верный формат URL-адреса')
      .required('Обязательное поле'),
  })
  .noUnknown(true);

const ImageTaskForm = ({ initialValues, onSubmit }) => {
  const formik = useFormik({
    initialValues: initialValues
      ? initialValues
      : {
          name: '',
          url: '',
        },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <Form size="large" onSubmit={formik.handleSubmit}>
      <Form.Input
        fluid
        id="name"
        name="name"
        icon="code branch"
        iconPosition="left"
        label="Наименование"
        placeholder="Наименование вопроса в системе"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && formik.errors.name}
      />
      <Form.Input
        fluid
        id="url"
        name="url"
        icon="images outline"
        iconPosition="left"
        label="URL-адрес изображения"
        placeholder="URL-адрес изображения"
        value={formik.values.url}
        onChange={formik.handleChange}
        error={formik.touched.url && formik.errors.url}
      />
      {formik.values.url && (
        <Image
          src={formik.values.url}
          as="a"
          size="medium"
          href={formik.values.url}
          target="_blank"
        />
      )}
      <Divider />
      <Button floated="right" color="blue" size="large" type="submit">
        Сохранить
      </Button>
    </Form>
  );
};

export { ImageTaskForm };
