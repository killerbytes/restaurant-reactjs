import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from "react-redux";

import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import { TextInput } from '../../components/Input'

const styles = theme => ({
  actionField: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
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
  return errors
}



let Form = ({ classes, categories, onSubmit, handleSubmit, submitting, children }) => {
  return <Card>
    <CardContent className="mb">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field component={TextInput} label="Name" name="name" fullWidth />
        <div className={classes.actionField}>
          {children}
        </div>
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
