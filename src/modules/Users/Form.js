import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from "react-redux";

import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';

import { TextInput, SelectInput } from '../../components/Input'

const styles = theme => ({
  actionField: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }

});

const validate = values => {
  const errors = {}
  const requiredFields = ['name', 'username', 'role']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (values.password !== values.confirm_password) {
    errors.confirm_password = 'Password does not match'
  }
  return errors
}



let Form = ({ classes, isNew, roles, onSubmit, handleSubmit, submitting, children }) => {
  const mappedRoles = roles.items.map(role => {
    return <MenuItem key={role.id} name="role" value={role.name}>{role.name}</MenuItem>
  })

  return <form onSubmit={handleSubmit(onSubmit)}>
    <Field component={TextInput} label="Username" name="username" fullWidth />
    <Field component={TextInput} label="Name" name="name" fullWidth />
    <Field fullWidth component={SelectInput} label="Role" name="role" children={mappedRoles} />
    <div className={classes.actionField}>
      {children}
    </div>
  </form>
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
