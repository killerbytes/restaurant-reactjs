import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from "react-redux";

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Card, { CardContent } from 'material-ui/Card';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: -theme.spacing.unit,
    marginRight: -theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    flex: 1
  },
  menu: {
    width: 200,
  },
});

const validate = values => {
  const errors = {}
  const requiredFields = ['name']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const TextInput = ({ input, label, name, meta: { touched, error }, children, ...custom }) => {
  return <TextField
    error={!!touched && !!error}
    label={label}
    margin="normal"
    {...input}
    {...custom}>{children}</TextField>
}


let Form = ({ classes, categories, onSubmit, handleSubmit, submitting, children }) => {
  return <Card>
    <CardContent className="mb">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field component={TextInput} label="Name" name="name" fullWidth />
        {children}
      </form>
    </CardContent>
  </Card>
}

Form = withStyles(styles)(Form)

Form = reduxForm({
  form: 'categoryForm',
  validate,
  enableReinitialize: true
})(Form)

Form = connect(
  (state, props) => {
    return ({
      initialValues: props.item
    })
  }
)(Form)
export default Form
