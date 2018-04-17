import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from "react-redux";

import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import Card, { CardContent } from 'material-ui/Card';

import { TextInput, SelectInput } from '../../components/Input'

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
  const requiredFields = ['name', 'price', 'category_id']
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



let Form = ({ classes, categories, onSubmit, handleSubmit, submitting, children }) => {
  const mappedCategories = categories.items.map(category => {
    return <MenuItem key={category.id} name="category" value={category.id}>{category.name}</MenuItem>
  })
  return <Card>
    <CardContent className="mb">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field component={TextInput} label="Name" name="name" fullWidth />
        <Field component={TextInput} label="Description" name="description" fullWidth />
        <Field fullWidth component={TextInput} label="Unit Price" name="price" type="number" />
        <Field fullWidth component={SelectInput} label="Category" name="category_id" children={mappedCategories} />
        <div className={classes.actionField}>
          {children}
        </div>

      </form>
    </CardContent>
  </Card>
}

Form = withStyles(styles)(Form)

Form = reduxForm({
  form: 'productForm',
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
