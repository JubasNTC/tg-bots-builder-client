import React from 'react';
import { useFormik } from 'formik';
import { Button, Divider, Form, Header } from 'semantic-ui-react';
import mapValues from 'lodash/mapValues';
import * as yup from 'yup';

const validationSchema = yup.lazy((obj) =>
  yup.object(
    mapValues(obj, (value, key) => {
      if (key === 'name') {
        return yup
          .string()
          .max(30, 'Максимальная длина 30 символов')
          .required('Обязательное поле');
      }

      if (key === 'type') {
        return yup
          .string()
          .oneOf(['text', 'choice'], 'Неверный тип вопроса')
          .required('Обязательное поле');
      }

      if (key === 'question') {
        return yup
          .string()
          .max(300, 'Максимальная длина 300 символов')
          .required('Обязательное поле');
      }

      if (key === 'validation') {
        return yup.string().default('');
      }

      if (key === 'customValidationMessage') {
        return yup.string().default('');
      }

      if (key === 'numberOfInvalidAnswers') {
        return obj.type === 'text' && !!obj.validation
          ? yup.number().min(1).max(5).required('Обязательное поле')
          : yup.number().default(0);
      }

      if (key === 'choiceAnswerText1') {
        return obj.type === 'choice' && !!obj.choiceAnswerValue1
          ? yup
              .string()
              .max(30, 'Максимальная длина 30 символов')
              .required('Обязательное поле')
          : yup.string().default('');
      }

      if (key === 'choiceAnswerText2') {
        return obj.type === 'choice' && !!obj.choiceAnswerValue2
          ? yup
              .string()
              .max(30, 'Максимальная длина 30 символов')
              .required('Обязательное поле')
          : yup.string().default('');
      }

      if (key === 'choiceAnswerText3') {
        return obj.type === 'choice' && !!obj.choiceAnswerValue3
          ? yup
              .string()
              .max(30, 'Максимальная длина 30 символов')
              .required('Обязательное поле')
          : yup.string().default('');
      }

      if (key === 'choiceAnswerText4') {
        return obj.type === 'choice' && !!obj.choiceAnswerValue4
          ? yup
              .string()
              .max(30, 'Максимальная длина 30 символов')
              .required('Обязательное поле')
          : yup.string().default('');
      }

      if (key === 'choiceAnswerText5') {
        return obj.type === 'choice' && !!obj.choiceAnswerValue5
          ? yup
              .string()
              .max(30, 'Максимальная длина 30 символов')
              .required('Обязательное поле')
          : yup.string().default('');
      }

      if (key === 'choiceAnswerText6') {
        return obj.type === 'choice' && !!obj.choiceAnswerValue6
          ? yup
              .string()
              .max(30, 'Максимальная длина 30 символов')
              .required('Обязательное поле')
          : yup.string().default('');
      }

      //

      if (key === 'choiceAnswerValue1') {
        return obj.type === 'choice' && !!obj.choiceAnswerText1
          ? yup
              .string()
              .max(30, 'Максимальная длина 30 символов')
              .required('Обязательное поле')
          : yup.string().default('');
      }

      if (key === 'choiceAnswerValue2') {
        return obj.type === 'choice' && !!obj.choiceAnswerText2
          ? yup
              .string()
              .max(30, 'Максимальная длина 30 символов')
              .required('Обязательное поле')
          : yup.string().default('');
      }

      if (key === 'choiceAnswerValue3') {
        return obj.type === 'choice' && !!obj.choiceAnswerText3
          ? yup
              .string()
              .max(30, 'Максимальная длина 30 символов')
              .required('Обязательное поле')
          : yup.string().default('');
      }

      if (key === 'choiceAnswerValue4') {
        return obj.type === 'choice' && !!obj.choiceAnswerText4
          ? yup
              .string()
              .max(30, 'Максимальная длина 30 символов')
              .required('Обязательное поле')
          : yup.string().default('');
      }

      if (key === 'choiceAnswerValue5') {
        return obj.type === 'choice' && !!obj.choiceAnswerText5
          ? yup
              .string()
              .max(30, 'Максимальная длина 30 символов')
              .required('Обязательное поле')
          : yup.string().default('');
      }

      if (key === 'choiceAnswerValue6') {
        return obj.type === 'choice' && !!obj.choiceAnswerText6
          ? yup
              .string()
              .max(30, 'Максимальная длина 30 символов')
              .required('Обязательное поле')
          : yup.string().default('');
      }
    })
  )
);

const questionTypesOptions = [
  { key: 'text', text: 'Ответ текстом', value: 'text' },
  { key: 'choice', text: 'Ответ выбором варианта', value: 'choice' },
];

const validationTypesOptions = [
  { key: 'email', text: 'Email', value: 'email' },
  { key: 'phone', text: 'Номер телефона +XYYYZZZZZZZ', value: 'phone' },
  { key: 'date', text: 'Дата DD-MM-YYYY', value: 'date' },
  {
    key: 'dateTimeHoursMinutes',
    text: 'Дата DD-MM-YYYY HH:mm',
    value: 'dateTimeHoursMinutes',
  },
  {
    key: 'dateTimeHoursMinutesSeconds',
    text: 'Дата DD-MM-YYYY HH:mm:ss',
    value: 'dateTimeHoursMinutesSeconds',
  },
  { key: 'integer', text: 'Целое число', value: 'integer' },
  {
    key: 'positiveInteger',
    text: 'Целое положительное число',
    value: 'positiveInteger',
  },
  {
    key: 'negativeInteger',
    text: 'Целое отрицательное число',
    value: 'negativeInteger',
  },
  { key: 'decimal', text: 'Десятичная дробь через точку', value: 'decimal' },
  {
    key: 'positiveDecimal',
    text: 'Положительная десятичная дробь через точку',
    value: 'positiveDecimal',
  },
  {
    key: 'negativeDecimal',
    text: 'Отрицательная десятичная дробь через точку',
    value: 'negativeDecimal',
  },
];

const numberOfInvalidAnswersOptions = [
  { key: 'id_1', text: '1', value: 1 },
  { key: 'id_2', text: '2', value: 2 },
  { key: 'id_3', text: '3', value: 3 },
  { key: 'id_4', text: '4', value: 4 },
  { key: 'id_5', text: '5', value: 5 },
];

const QuestionTaskForm = ({ initialValues, onSubmit }) => {
  const formik = useFormik({
    initialValues: initialValues
      ? initialValues
      : {
          name: '',
          question: '',
          type: 'text',
          validation: 'email',
          customValidationMessage: '',
          numberOfInvalidAnswers: 2,
          choiceAnswerText1: '',
          choiceAnswerText2: '',
          choiceAnswerText3: '',
          choiceAnswerText4: '',
          choiceAnswerText5: '',
          choiceAnswerText6: '',
          choiceAnswerValue1: '',
          choiceAnswerValue2: '',
          choiceAnswerValue3: '',
          choiceAnswerValue4: '',
          choiceAnswerValue5: '',
          choiceAnswerValue6: '',
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
        id="question"
        name="question"
        label="Текст вопроса"
        placeholder="Текст вопроса"
        value={formik.values.question}
        onChange={formik.handleChange}
        error={formik.touched.question && formik.errors.question}
      />
      <Form.Dropdown
        fluid
        id="type"
        name="type"
        selection
        label="Выберите тип ответа на вопрос"
        noResultsMessage="Нет подходящих вариантов"
        options={questionTypesOptions}
        value={formik.values.type}
        onChange={(selectedOptions, data) =>
          formik.setFieldValue('type', data.value)
        }
        error={formik.touched.type && formik.errors.type}
      />
      {formik.values.type === 'text' && (
        <>
          <Form.Dropdown
            fluid
            id="validation"
            name="validation"
            selection
            label="Валидация"
            noResultsMessage="Нет подходящих вариантов"
            options={validationTypesOptions}
            value={formik.values.validation}
            onChange={(selectedOptions, data) =>
              formik.setFieldValue('validation', data.value)
            }
            error={formik.touched.validation && formik.errors.validation}
          />
          <Form.Input
            fluid
            id="customValidationMessage"
            name="customValidationMessage"
            icon="comment alternate"
            iconPosition="left"
            label="Кастомное сообщение при ошибке валидации"
            placeholder="Сообщение при ошибке валидации"
            value={formik.values.customValidationMessage}
            onChange={formik.handleChange}
            error={
              formik.touched.customValidationMessage &&
              formik.errors.customValidationMessage
            }
          />
          <Form.Dropdown
            fluid
            id="numberOfInvalidAnswers"
            name="numberOfInvalidAnswers"
            selection
            label="Количество неверных ответов"
            noResultsMessage="Нет подходящих вариантов"
            options={numberOfInvalidAnswersOptions}
            value={formik.values.numberOfInvalidAnswers}
            onChange={(selectedOptions, data) =>
              formik.setFieldValue('numberOfInvalidAnswersOptions', data.value)
            }
            error={
              formik.touched.numberOfInvalidAnswers &&
              formik.errors.numberOfInvalidAnswers
            }
          />
        </>
      )}
      {formik.values.type === 'choice' && (
        <>
          <Header as="h3" color="black">
            Варианты ответов
          </Header>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              id="choiceAnswerText1"
              name="choiceAnswerText1"
              icon="radio"
              iconPosition="left"
              label="Текст варианта ответа"
              placeholder="Текст варианта ответа"
              value={formik.values.choiceAnswerText1}
              onChange={formik.handleChange}
              error={
                formik.touched.choiceAnswerText1 &&
                formik.errors.choiceAnswerText1
              }
            />
            <Form.Input
              fluid
              id="choiceAnswerValue1"
              name="choiceAnswerValue1"
              icon="cog"
              iconPosition="left"
              label="Значение варианта ответа"
              placeholder="Значение варианта ответа"
              value={formik.values.choiceAnswerValue1}
              onChange={formik.handleChange}
              error={
                formik.touched.choiceAnswerValue1 &&
                formik.errors.choiceAnswerValue1
              }
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              id="choiceAnswerText2"
              name="choiceAnswerText2"
              icon="radio"
              iconPosition="left"
              label="Текст варианта ответа"
              placeholder="Текст варианта ответа"
              value={formik.values.choiceAnswerText2}
              onChange={formik.handleChange}
              error={
                formik.touched.choiceAnswerText2 &&
                formik.errors.choiceAnswerText2
              }
            />
            <Form.Input
              fluid
              id="choiceAnswerValue2"
              name="choiceAnswerValue2"
              icon="cog"
              iconPosition="left"
              label="Значение варианта ответа"
              placeholder="Значение варианта ответа"
              value={formik.values.choiceAnswerValue2}
              onChange={formik.handleChange}
              error={
                formik.touched.choiceAnswerValue2 &&
                formik.errors.choiceAnswerValue2
              }
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              id="choiceAnswerText3"
              name="choiceAnswerText3"
              icon="radio"
              iconPosition="left"
              label="Текст варианта ответа"
              placeholder="Текст варианта ответа"
              value={formik.values.choiceAnswerText3}
              onChange={formik.handleChange}
              error={
                formik.touched.choiceAnswerText3 &&
                formik.errors.choiceAnswerText3
              }
            />
            <Form.Input
              fluid
              id="choiceAnswerValue3"
              name="choiceAnswerValue3"
              icon="cog"
              iconPosition="left"
              label="Значение варианта ответа"
              placeholder="Значение варианта ответа"
              value={formik.values.choiceAnswerValue3}
              onChange={formik.handleChange}
              error={
                formik.touched.choiceAnswerValue3 &&
                formik.errors.choiceAnswerValue3
              }
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              id="choiceAnswerText4"
              name="choiceAnswerText4"
              icon="radio"
              iconPosition="left"
              label="Текст варианта ответа"
              placeholder="Текст варианта ответа"
              value={formik.values.choiceAnswerText4}
              onChange={formik.handleChange}
              error={
                formik.touched.choiceAnswerText4 &&
                formik.errors.choiceAnswerText4
              }
            />
            <Form.Input
              fluid
              id="choiceAnswerValue4"
              name="choiceAnswerValue4"
              icon="cog"
              iconPosition="left"
              label="Значение варианта ответа"
              placeholder="Значение варианта ответа"
              value={formik.values.choiceAnswerValue4}
              onChange={formik.handleChange}
              error={
                formik.touched.choiceAnswerValue4 &&
                formik.errors.choiceAnswerValue4
              }
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              id="choiceAnswerText5"
              name="choiceAnswerText5"
              icon="radio"
              iconPosition="left"
              label="Текст варианта ответа"
              placeholder="Текст варианта ответа"
              value={formik.values.choiceAnswerText5}
              onChange={formik.handleChange}
              error={
                formik.touched.choiceAnswerText5 &&
                formik.errors.choiceAnswerText5
              }
            />
            <Form.Input
              fluid
              id="choiceAnswerValue5"
              name="choiceAnswerValue5"
              icon="cog"
              iconPosition="left"
              label="Значение варианта ответа"
              placeholder="Значение варианта ответа"
              value={formik.values.choiceAnswerValue5}
              onChange={formik.handleChange}
              error={
                formik.touched.choiceAnswerValue5 &&
                formik.errors.choiceAnswerValue5
              }
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              id="choiceAnswerText6"
              name="choiceAnswerText6"
              icon="radio"
              iconPosition="left"
              label="Текст варианта ответа"
              placeholder="Текст варианта ответа"
              value={formik.values.choiceAnswerText6}
              onChange={formik.handleChange}
              error={
                formik.touched.choiceAnswerText6 &&
                formik.errors.choiceAnswerText6
              }
            />
            <Form.Input
              fluid
              id="choiceAnswerValue6"
              name="choiceAnswerValue6"
              icon="cog"
              iconPosition="left"
              label="Значение варианта ответа"
              placeholder="Значение варианта ответа"
              value={formik.values.choiceAnswerValue6}
              onChange={formik.handleChange}
              error={
                formik.touched.choiceAnswerValue6 &&
                formik.errors.choiceAnswerValue6
              }
            />
          </Form.Group>
        </>
      )}
      <Divider />
      <Button floated="right" color="blue" size="large" type="submit">
        Сохранить
      </Button>
    </Form>
  );
};

export { QuestionTaskForm };
