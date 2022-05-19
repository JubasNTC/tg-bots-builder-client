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
    title: yup
      .string()
      .max(50, 'Максимальная длина 50 символов')
      .required('Обязательное поле'),
    text: yup
      .string()
      .max(300, 'Максимальная длина 300 символов')
      .required('Обязательное поле'),
    imageUrl: yup
      .string()
      .url('Не верный формат URL-адреса')
      .required('Обязательное поле'),
    linkText: yup
      .string()
      .max(30, 'Максимальная длина 30 символов')
      .required('Обязательное поле'),
    linkUrl: yup
      .string()
      .url('Не верный формат URL-адреса')
      .required('Обязательное поле'),
  })
  .noUnknown(true);

const CardTaskForm = ({ initialValues, onSubmit }) => {
  const formik = useFormik({
    initialValues: initialValues
      ? initialValues
      : {
          name: '',
          title: '',
          text: '',
          imageUrl: '',
          linkText: '',
          linkUrl: '',
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
        id="title"
        name="title"
        icon="align justify"
        iconPosition="left"
        label="Заголовок"
        placeholder="Заголовок карточки"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && formik.errors.title}
      />
      <Form.TextArea
        fluid
        id="text"
        name="text"
        label="Текст"
        placeholder="Текст карточки"
        value={formik.values.text}
        onChange={formik.handleChange}
        error={formik.touched.text && formik.errors.text}
      />
      <Form.Input
        fluid
        id="imageUrl"
        name="imageUrl"
        icon="images outline"
        iconPosition="left"
        label="URL-адрес изображения"
        placeholder="URL-адрес изображения карточки"
        value={formik.values.imageUrl}
        onChange={formik.handleChange}
        error={formik.touched.imageUrl && formik.errors.imageUrl}
      />
      {formik.values.imageUrl && (
        <Image
          src={formik.values.imageUrl}
          as="a"
          size="medium"
          href={formik.values.imageUrl}
          target="_blank"
        />
      )}
      <Form.Input
        fluid
        id="linkText"
        name="linkText"
        icon="align justify"
        iconPosition="left"
        label="Текст ссылки"
        placeholder="Текст ссылки карточки"
        value={formik.values.linkText}
        onChange={formik.handleChange}
        error={formik.touched.linkText && formik.errors.linkText}
      />
      <Form.Input
        fluid
        id="linkUrl"
        name="linkUrl"
        icon="linkify"
        iconPosition="left"
        label="URL-адрес ссылки"
        placeholder="URL-адрес ссылки карточки"
        value={formik.values.linkUrl}
        onChange={formik.handleChange}
        error={formik.touched.linkUrl && formik.errors.linkUrl}
      />
      <Divider />
      <Button floated="right" color="blue" size="large" type="submit">
        Сохранить
      </Button>
    </Form>
  );
};

export { CardTaskForm };
