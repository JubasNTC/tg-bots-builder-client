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
    text: yup
      .string()
      .max(300, 'Максимальная длина 300 символов')
      .required('Обязательное поле'),
    chatIds: yup
      .string()
      .max(300, 'Максимальная длина 300 символов')
      .required('Обязательное поле'),
  })
  .noUnknown(true);

const NotificationTaskForm = ({ initialValues, onSubmit }) => {
  const formik = useFormik({
    initialValues: initialValues
      ? initialValues
      : {
          name: '',
          text: '',
          chatIds: '',
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
        label="Текст"
        placeholder="Текст уведомления"
        value={formik.values.text}
        onChange={formik.handleChange}
        error={formik.touched.text && formik.errors.text}
      />
      <Form.TextArea
        fluid
        id="chatIds"
        name="chatIds"
        label="ID чатов, которые необходимо уведомить"
        placeholder="ID чатов, которые необходимо уведомить"
        value={formik.values.chatIds}
        onChange={formik.handleChange}
        error={formik.touched.chatIds && formik.errors.chatIds}
      />
      <Message>
        <Message.Header>Для получения ID чата, необходимо:</Message.Header>
        <Message.List>
          <Message.Item>Добавить бота в нужную группу;</Message.Item>
          <Message.Item>Написать хотя бы одно сообщение в группу;</Message.Item>
          <Message.Item>{`Отправить GET-запрос по следующему адресу:\n https://api.telegram.org/bot<ТОКЕН_БОТА>/getUpdates`}</Message.Item>
          <Message.Item>
            Взять значение "id" из объекта "chat". Это и есть идентификатор
            чата. Для групповых чатов он отрицательный, для личных переписок
            положительный.
          </Message.Item>
        </Message.List>
      </Message>
      <Divider />
      <Button floated="right" color="blue" size="large" type="submit">
        Сохранить
      </Button>
    </Form>
  );
};

export { NotificationTaskForm };
