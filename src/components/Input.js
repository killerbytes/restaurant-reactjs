import React from 'react'
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';

export const TextInput = ({ input, label, name, meta: { touched, error }, children, ...custom }) => {
  return <TextField
    error={!!touched && !!error}
    label={label}
    helperText={(!!touched && !!error && error)}
    margin="normal"
    {...input}
    {...custom}>{children}</TextField>
}


export const SelectInput = ({ input, label, meta: { touched, error }, children, ...custom }) => {
  return <FormControl
    margin="normal"
    {...custom}

  >
    <InputLabel>{label}</InputLabel>
    <Select
      error={!!touched && !!error}
      {...input}
    >
      {children}
    </Select>
  </FormControl>

}


