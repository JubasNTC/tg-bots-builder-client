import React from 'react';
import { useFormik } from 'formik';
import { Button, Divider, Form, Message } from 'semantic-ui-react';
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
    startText: yup
      .string()
      .max(300, 'Максимальная длина 300 символов')
      .default(''),
    helpText: yup
      .string()
      .max(300, 'Максимальная длина 300 символов')
      .default(''),
    settingsText: yup
      .string()
      .max(300, 'Максимальная длина 300 символов')
      .default(''),
    botUsername: yup
      .string()
      .min(5, 'Минимальная длина 5 символов')
      .max(32, 'Максимальная длина 32 символов')
      .required('Обязательное поле'),
    botToken: yup
      .string()
      .length(46, 'Токен должен имеет длину в 46 символов')
      .required('Обязательное поле'),
  })
  .noUnknown(true);

const BotForm = ({ initialValues, onSubmit }) => {
  const formik = useFormik({
    initialValues: initialValues
      ? initialValues
      : {
          name: '',
          description: '',
          startText: '',
          helpText: '',
          settingsText: '',
          botUsername: '',
          botToken: '',
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
        label="Имя бота в системе"
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
        label="Краткое описание бота"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && formik.errors.description}
      />
      <Form.TextArea
        fluid
        id="startText"
        name="startText"
        label="Текст на команду /start"
        value={formik.values.startText}
        onChange={formik.handleChange}
        error={formik.touched.startText && formik.errors.startText}
      />
      <Form.TextArea
        fluid
        id="helpText"
        name="helpText"
        label="Текст на команду /help"
        value={formik.values.helpText}
        onChange={formik.handleChange}
        error={formik.touched.helpText && formik.errors.helpText}
      />
      <Form.TextArea
        fluid
        id="settingsText"
        name="settingsText"
        label="Текст на команду /settings"
        value={formik.values.settingsText}
        onChange={formik.handleChange}
        error={formik.touched.settingsText && formik.errors.settingsText}
      />
      <Form.Input
        fluid
        id="botUsername"
        name="botUsername"
        icon="telegram"
        iconPosition="left"
        label="Имя бота в Telegram"
        value={formik.values.botUsername}
        onChange={formik.handleChange}
        error={formik.touched.botUsername && formik.errors.botUsername}
      />
      <Form.Input
        fluid
        id="botToken"
        name="botToken"
        type="password"
        icon="telegram"
        iconPosition="left"
        label="Токен бота в Telegram"
        value={formik.values.botToken}
        onChange={formik.handleChange}
        error={formik.touched.botToken && formik.errors.botToken}
      />
      <Message>
        <Message.Header>Для получения токена, необходимо:</Message.Header>
        <Message.List>
          <Message.Item>
            Перейти по следующей ссылке{' '}
            <a href="https://t.me/BotFather" target="_blank" rel="noreferrer">
              @BotFather
            </a>
          </Message.Item>
          <Message.Item>
            Откроется приложение Telegram и необходимо отправить в чат команду{' '}
            <b>/newbot</b>
          </Message.Item>
          <Message.Item>Далее следовать инструкциям</Message.Item>
          <Message.Item>Скопировать полученный токен и вставить</Message.Item>
        </Message.List>
      </Message>
      <Divider />
      <Button floated="right" color="blue" size="large" type="submit">
        Сохранить
      </Button>
    </Form>
  );
};

export { BotForm };
