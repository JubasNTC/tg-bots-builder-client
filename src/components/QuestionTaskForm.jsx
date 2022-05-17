import React from 'react';
import { useFormik } from 'formik';
import { Button, Divider, Form, Header, Icon } from 'semantic-ui-react';
import { nanoid } from 'nanoid';
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

      if (key.startsWith('text_choice_') || key.startsWith('value_choice_')) {
        return yup.string().required('Обязательное поле');
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
        },
    validationSchema: validationSchema,
    onSubmit: (values) => console.dir({ values }),
  });

  const [questionChoiceFields, setQuestionChoiceFields] = React.useState([]);

  const handleAddChoiceField = () => {
    const id = nanoid();
    const textId = `text_choice_${id}`;
    const valueId = `value_choice_${id}`;

    formik.setFieldValue(textId, '');
    formik.setFieldValue(valueId, '');

    setQuestionChoiceFields([...questionChoiceFields, { textId, valueId }]);
  };

  const handleDeleteChoiceField = (_textId, _valueId) => {
    formik.setFieldValue(_textId, undefined);
    formik.setFieldValue(_valueId, undefined);

    setQuestionChoiceFields(
      questionChoiceFields.filter(({ valueId }) => valueId !== _valueId)
    );
  };

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
          {questionChoiceFields.map(({ textId, valueId }) => (
            <Form.Group widths="equal" key={`${textId}${valueId}`}>
              <Form.Input
                fluid
                id={textId}
                name={textId}
                placeholder="Текст варианта ответа"
                value={formik.values[textId]}
                onChange={formik.handleChange}
                error={formik.touched[textId] && formik.errors[textId]}
              />
              <Form.Input
                fluid
                id={valueId}
                name={valueId}
                placeholder="Зачение варианта ответа"
                value={formik.values[valueId]}
                onChange={formik.handleChange}
                error={formik.touched[valueId] && formik.errors[valueId]}
              />
              <Form.Button
                type="button"
                icon
                style={{ height: '42px' }}
                onClick={() => handleDeleteChoiceField(textId, valueId)}
              >
                <Icon name="remove" />
              </Form.Button>
            </Form.Group>
          ))}
          <Button
            type="button"
            content="Добавить"
            icon="plus"
            labelPosition="left"
            onClick={handleAddChoiceField}
          />
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
