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
    description: yup
      .string()
      .max(50, 'Максимальная длина 50 символов')
      .default(''),
    triggers: yup
      .string()
      .max(300, 'Максимальная длина 300 символов')
      .required('Должен быть минимум один триггер'),
    botsAttachment: yup.array().of(yup.string()).required(),
  })
  .noUnknown(true);

const FlowForm = ({ initialValues, botsForAttachment, onSubmit }) => {
  const formik = useFormik({
    initialValues: initialValues
      ? initialValues
      : {
          name: '',
          description: '',
          triggers: '',
          botsAttachment: [],
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
        icon="user"
        iconPosition="left"
        label="Название сценария в системе"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && formik.errors.name}
      />
      <Form.Input
        fluid
        id="description"
        name="description"
        icon="info circle"
        iconPosition="left"
        label="Краткое описание сценария"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && formik.errors.description}
      />
      <Form.TextArea
        fluid
        id="triggers"
        name="triggers"
        label="Список слов или фраз, на которые будет срабатывать сценарий"
        value={formik.values.triggers}
        onChange={formik.handleChange}
        error={formik.touched.triggers && formik.errors.triggers}
      />
      <Form.Dropdown
        fluid
        id="botsAttachment"
        name="botsAttachment"
        multiple
        selection
        label="Выберите к каким ботам подключить сценарий"
        noResultsMessage="Нет подходящих ботов"
        options={botsForAttachment}
        value={formik.values.botsAttachment}
        onChange={(selectedOption, data) =>
          formik.setFieldValue('botsAttachment', data.value)
        }
        error={formik.touched.botsAttachment && formik.errors.botsAttachment}
      />
      <Divider />
      <Button floated="right" color="blue" size="large" type="submit">
        Сохранить
      </Button>
    </Form>
  );
};

export { FlowForm };
