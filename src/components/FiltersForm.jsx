import React from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Button, Divider, Form, List, Segment } from 'semantic-ui-react';

const renderTextField = ({
  input,
  label,
  type,
  icon,
  iconPosition,
  placeholder,
  meta: { touched, error },
}) => (
  <Form.Input
    {...input}
    fluid
    icon={icon}
    type={type}
    iconPosition={iconPosition}
    label={label}
    placeholder={placeholder}
    error={touched && error}
  />
);

const conditionTypesOptions = [
  { key: 'isEquals', text: 'Равно', value: 'isEquals' },
  { key: 'isNotEquals', text: 'Не равно', value: 'isNotEquals' },
  // { key: 'isEmpty', text: 'Пустое', value: 'isEmpty' },
  // { key: 'isNotEmpty', text: 'Не пустое', value: 'isNotEmpty' },
];

const renderDropdownField = (props) => (
  <Form.Dropdown
    selection
    {...props.input}
    label="Условие"
    options={conditionTypesOptions}
    value={props.input.value}
    onChange={(param, data) => props.input.onChange(data.value)}
    placeholder={props.label}
  />
);

const renderHobbies = ({ fields, meta: { error } }) => (
  <Segment secondary>
    <List.List>
      {fields.map((and, index, _fields) => (
        <>
          <Segment>
            <List.Item key={index}>
              <h4>{`AND #${index + 1}`}</h4>
              <Field
                name={`${and}.taskId`}
                type="text"
                component={renderTextField}
                label="ID шага"
              />
              <Field
                name={`${and}.property`}
                type="text"
                component={renderTextField}
                label="Свойство"
              />
              <Field
                name={`${and}.condition`}
                component={renderDropdownField}
              />
              <Field
                name={`${and}.value`}
                type="text"
                component={renderTextField}
                label="Значение"
              />
              <Form.Button
                content="Удалить"
                icon="trash alternate"
                labelPosition="left"
                type="button"
                onClick={() => fields.remove(index)}
              />
            </List.Item>
          </Segment>
          {index !== _fields.length - 1 && <Divider horizontal>AND</Divider>}
        </>
      ))}
      {error && <li className="error">{error}</li>}
      <Form.Button
        content="AND"
        icon="plus"
        labelPosition="left"
        type="button"
        onClick={() => fields.push({})}
      />
    </List.List>
  </Segment>
);

const renderMembers = ({ fields, meta: { error, submitFailed } }) => (
  <Segment>
    <List>
      {fields.map((or, index, _fields) => (
        <>
          <Segment tertiary>
            <List.Item key={index}>
              <h4>OR #{index + 1}</h4>
              <FieldArray name={`${or}.ands`} component={renderHobbies} />
              <Form.Button
                content="Удалить"
                icon="trash alternate"
                labelPosition="left"
                type="button"
                onClick={() => fields.remove(index)}
              />
            </List.Item>
          </Segment>
          {index !== _fields.length - 1 && <Divider horizontal>OR</Divider>}
        </>
      ))}
      {submitFailed && error && <span>{error}</span>}
      <Form.Button
        content="OR"
        icon="plus"
        labelPosition="left"
        type="button"
        onClick={() => fields.push({})}
      />
    </List>
  </Segment>
);

const FiltersForm = (props) => {
  const { onSubmit, handleSubmit } = props;

  return (
    <Form size="large" onSubmit={handleSubmit((values) => onSubmit(values))}>
      <FieldArray name="ors" component={renderMembers} />
      <Divider />
      <Button floated="right" color="blue" size="large" type="submit">
        Сохранить
      </Button>
    </Form>
  );
};

const mapStateToProps = (state, props) => ({
  initialValues: state.flowsReducer.selectedTaskFlowFilters, // retrieve name from redux store
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'filters',
    enableReinitialize: true,
  })(FiltersForm)
);
//
// export default reduxForm({
//   form: 'filters',
//   enableReinitialize: true,
// })(FiltersForm);
