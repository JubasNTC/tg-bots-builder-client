import React from 'react';
import { useFormik } from 'formik';
import { Button, Divider, Form } from 'semantic-ui-react';
import * as yup from 'yup';

const validationSchema = yup
  .object({
    name: yup
      .string()
      .max(30, 'Максимальная длина 30 символов')
      .required('Обязательное поле'),
    text: yup
      .string()
      .max(500, 'Максимальная длина 500 символов')
      .required('Обязательное поле'),
  })
  .noUnknown(true);

const MessageTaskForm = ({ initialValues, onSubmit }) => {
  const formik = useFormik({
    initialValues: initialValues
      ? initialValues
      : {
          name: '',
          text: '',
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
      <Form.TextArea
        fluid
        id="text"
        name="text"
        label="Текст сообщения"
        placeholder="Текст сообщения"
        value={formik.values.text}
        onChange={formik.handleChange}
        error={formik.touched.text && formik.errors.text}
      />
      <Divider />
      <Button floated="right" color="blue" size="large" type="submit">
        Сохранить
      </Button>
    </Form>
  );
};

export { MessageTaskForm };
