import React from 'react';
import { useFormik } from 'formik';
import { Button, Checkbox, Divider, Form, Header } from 'semantic-ui-react';
import mapValues from 'lodash/mapValues';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/ru';
import * as yup from 'yup';

const validationSchema = yup.lazy((obj) =>
  yup
    .object(
      mapValues(obj, (value, key) => {
        if (key === 'name') {
          return yup
            .string()
            .max(30, 'Максимальная длина 30 символов')
            .required('Обязательное поле');
        }

        if (key === 'method') {
          return yup
            .string()
            .oneOf(
              ['get', 'post', 'patch', 'delete', 'head'],
              'Неверный HTTP метод'
            )
            .required('Обязательное поле');
        }

        if (key === 'httpHeaders') {
          return yup.object().required('Обязательное поле');
        }

        if (key === 'httpBody') {
          return yup.object().required('Обязательное поле');
        }

        if (key === 'timeout') {
          return yup
            .number()
            .integer()
            .min(0, 'Минимальное значение 0')
            .max(30000000, 'Максимальное значение 30000000')
            .required('Обязательное поле');
        }

        if (key === 'basicUsername') {
          return !!obj.basicPassword
            ? yup.string().required('Обязательное поле')
            : yup.string().default('');
        }

        if (key === 'basicPassword') {
          return !!obj.basicUsername
            ? yup.string().required('Обязательное поле')
            : yup.string().default('');
        }

        if (key === 'isUseProxy') {
          return yup.boolean().default(false);
        }

        if (key === 'proxyUrl') {
          return obj.isUseProxy
            ? yup
                .string()
                .matches(
                  /^((([^:]+):([^@]+))@)?((\d{1,3}\.){3}\d{1,3})(:(\d{1,5}))?$/,
                  'Неверный формат URL прокси-сервера'
                )
                .required('Обязательное поле')
            : yup.string().default('');
        }
      })
    )
    .noUnknown(true)
);

const httpTypesOptions = [
  { key: 'get', text: 'GET', value: 'get' },
  { key: 'post', text: 'POST', value: 'post' },
  { key: 'put', text: 'PUT', value: 'put' },
  {
    key: 'patch',
    text: 'PATCH',
    value: 'patch',
  },
  {
    key: 'delete',
    text: 'DELETE',
    value: 'delete',
  },
  { key: 'head', text: 'HEAD', value: 'head' },
];

const enableBodyMethods = new Set(['post', 'put', 'patch', 'delete']);

const RequestTaskForm = ({ initialValues, onSubmit }) => {
  const formik = useFormik({
    initialValues: initialValues
      ? initialValues
      : {
          name: '',
          method: 'get',
          httpHeaders: {
            'Content-Type': 'application/json',
          },
          httpBody: {},
          timeout: 0,
          basicUsername: '',
          basicPassword: '',
          isUseProxy: false,
          proxyUrl: '',
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
        placeholder="Наименование запроса в системе"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && formik.errors.name}
      />
      <Form.Dropdown
        fluid
        id="method"
        name="method"
        selection
        label="HTTP метод"
        noResultsMessage="Нет подходящих вариантов"
        options={httpTypesOptions}
        value={formik.values.method}
        onChange={(selectedOptions, data) =>
          formik.setFieldValue('method', data.value)
        }
        error={formik.touched.method && formik.errors.method}
      />
      <Header as="h4" color="black">
        HTTP headers
      </Header>
      <div
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          border: '1px solid black',
          marginBottom: '15px',
        }}
      >
        <JSONInput
          id="httpHeaders"
          placeholder={formik.values.httpHeaders}
          theme="light_mitsuketa_tribute"
          locale={locale}
          height="250px"
          onChange={(data) => {
            formik.setFieldValue('httpHeaders', data.jsObject);
          }}
          colors={{
            default: 'black',
            background: 'white',
            string: 'red',
          }}
          style={{
            container: {
              width: '100%',
            },
            body: {
              width: undefined,
              display: 'flex',
            },
            outerBox: {
              width: '100%',
            },
            contentBox: {
              color: 'black',
              width: undefined,
              flex: 1,
            },
            warningBox: {
              width: '100%',
            },
          }}
        />
      </div>

      {enableBodyMethods.has(formik.values.method) && (
        <>
          <Header as="h4" color="black">
            HTTP body
          </Header>
          <div
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              border: '1px solid black',
              marginBottom: '15px',
            }}
          >
            <JSONInput
              id="httpBody"
              placeholder={formik.values.httpBody}
              theme="light_mitsuketa_tribute"
              locale={locale}
              height="250px"
              onChange={(data) => {
                formik.setFieldValue('httpBody', data.jsObject);
              }}
              colors={{
                default: 'black',
                background: 'white',
                string: 'red',
              }}
              style={{
                container: {
                  width: '100%',
                },
                body: {
                  width: undefined,
                  display: 'flex',
                },
                outerBox: {
                  width: '100%',
                },
                contentBox: {
                  color: 'black',
                  width: undefined,
                  flex: 1,
                },
                warningBox: {
                  width: '100%',
                },
              }}
            />
          </div>
        </>
      )}
      <Form.Input
        fluid
        id="timeout"
        name="timeout"
        type="number"
        min="0"
        max="30000000"
        icon="time"
        iconPosition="left"
        label="Таймаут (мс)"
        placeholder="Таймаут запроса (мс)"
        value={formik.values.timeout}
        onChange={formik.handleChange}
        error={formik.touched.timeout && formik.errors.timeout}
      />
      <Header as="h4" color="black">
        Basic Authentication
      </Header>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          id="basicUsername"
          name="basicUsername"
          icon="user"
          iconPosition="left"
          label="Имя пользователя"
          placeholder="Имя пользователя"
          value={formik.values.basicUsername}
          onChange={formik.handleChange}
          error={formik.touched.basicUsername && formik.errors.basicUsername}
        />
        <Form.Input
          fluid
          id="basicPassword"
          name="basicPassword"
          type="password"
          icon="lock"
          iconPosition="left"
          label="Пароль"
          placeholder="Пароль"
          value={formik.values.basicPassword}
          onChange={formik.handleChange}
          error={formik.touched.basicPassword && formik.errors.basicPassword}
        />
      </Form.Group>
      <Form.Field>
        <p>
          Имя пользователя и пароль базовой аутентификации, если необходимо.
        </p>
      </Form.Field>
      <Form.Field>
        <Checkbox
          id="isUseProxy"
          name="isUseProxy"
          label="Использовать прокси-сервер"
          value={formik.values.isUseProxy}
          onChange={formik.handleChange}
          error={formik.touched.isUseProxy && formik.errors.isUseProxy}
        />
      </Form.Field>
      {formik.values.isUseProxy && (
        <Form.Input
          fluid
          id="proxyUrl"
          name="proxyUrl"
          icon="linkify"
          iconPosition="left"
          label="URL прокси-сервера"
          placeholder="URL прокси-сервера"
          value={formik.values.proxyUrl}
          onChange={formik.handleChange}
          error={formik.touched.proxyUrl && formik.errors.proxyUrl}
        />
      )}
      <Divider />
      <Button floated="right" color="blue" size="large" type="submit">
        Сохранить
      </Button>
    </Form>
  );
};

export { RequestTaskForm };
