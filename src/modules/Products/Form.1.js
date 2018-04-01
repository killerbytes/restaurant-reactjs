import React from 'react'
import { Field, reduxForm } from 'redux-form';

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Card, { CardActions, CardContent } from 'material-ui/Card';

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
  const requiredFields = [ 'name', 'lastName', 'email', 'favoriteColor', 'notes' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}
const renderTextField = ({ input, label, name, meta: { touched, error }, ...custom }) => {
  console.log(label)
  {JSON.stringify(error)}
  return <TextField label={label}
    
    error={touched && error}
    {...input}
    {...custom}
  />
}

const  Form=({ classes, productForm, onChange, categories })=> {
  const mappedCategories = categories.items.map(category => {
    return <MenuItem key={category.id} name="category" value={category.id}>{category.name}</MenuItem>
  })

  return <Card>
    <CardContent className="mb">
    <Field name="name" component={renderTextField} label="Name"/>

    <TextField
      name="description"
      label="Description"
      fullWidth
      margin="normal"
      value={productForm.description}
      onChange={onChange}
    />
    <div>
    <TextField
      name="price"
      label="Unit Price"
      margin="normal"
      required
      value={productForm.price}
      onChange={onChange}
    />

    <TextField
      name="category_id"
      label="Category"
      required
      margin="normal"
      select
      value={productForm.category_id}
      onChange={onChange}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>

      {mappedCategories}
    </TextField>


    </div>
    </CardContent>
  </Card>
}

export default reduxForm({
  form: 'productForm',
  validate,
})(Form);
