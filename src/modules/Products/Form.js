import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from "react-redux";

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Card, { CardContent } from 'material-ui/Card';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';

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

const TextInput = ({ input, label, name, meta: { touched, error }, children, ...custom }) => {
  return <TextField
    error={!!touched && !!error}
    label={label}
    margin="normal"
    {...input}
    {...custom}>{children}</TextField>
}

const SelectInput = ({ input, label, meta: { touched, error }, children, ...custom }) => {
  return <FormControl
    margin="normal"
    {...custom}

  >
    <InputLabel htmlFor="age-simple">{label}</InputLabel>
    <Select
      error={!!touched && !!error}
      {...input}
    >
      {children}
    </Select>
  </FormControl>

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
        <div className={classes.container}>

          <Field className={classes.textField} component={TextInput} label="Unit Price" name="price" type="number" />
          <Field className={classes.textField} component={SelectInput} label="Category" name="category_id" children={mappedCategories} />
        </div>
        {children}
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
