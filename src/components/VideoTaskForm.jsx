import React from 'react';
import { useFormik } from 'formik';
import { Button, Divider, Embed, Form } from 'semantic-ui-react';
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

const VideoTaskForm = ({ initialValues, onSubmit }) => {
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
        icon="file video outline"
        iconPosition="left"
        label="URL-адрес видео"
        placeholder="URL-адрес видео"
        value={formik.values.url}
        onChange={formik.handleChange}
        error={formik.touched.url && formik.errors.url}
      />
      <p>
        Вставьте URL-адрес вашего видео, размещенного на YouTube, Vimeo или
        Wistia.
      </p>
      {formik.values.url && (
        <Embed
          icon="right circle arrow"
          placeholder={`${process.env.PUBLIC_URL}/img/video-placeholder.png`}
          url={formik.values.url}
        />
      )}
      <Divider />
      <Button floated="right" color="blue" size="large" type="submit">
        Сохранить
      </Button>
    </Form>
  );
};

export { VideoTaskForm };
