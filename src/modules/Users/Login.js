import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Card, { CardMedia, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button'

import { authenticate } from '../../actions/authActions'
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
  media: {
    marginTop: 20,
    height: '30vh',
    backgroundSize: 'contain'
  },
  menu: {
    width: 200,
  },
});

const validate = values => {
  const errors = {}
  const requiredFields = ['username', 'password']
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


class Login extends React.Component {
  handleSubmit = (form) => {
    this.props.authenticate(form)
  }
  render() {
    const { handleSubmit, classes } = this.props
    return <div className="container" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Card>
        <CardMedia
          className={classes.media}
          image="/images/bg.jpg"
        />
        <CardContent className="mb">
          <form onSubmit={handleSubmit(this.handleSubmit)}>
            <Field component={TextInput} label="Username" name="username" fullWidth />
            <Field type="password" component={TextInput} label="Password" name="password" fullWidth />
            <Button variant="raised" size="large" type="submit" color="primary" style={{ width: '100%' }}>Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    authenticate,
  }, dispatch)
};

const mapStateToProps = ({ item }) => {
  return ({
    initialValues: { username: '', password: '' }
  });
}

Login = withStyles(styles)(Login)

Login = reduxForm({
  form: 'loginForm',
  validate,
  enableReinitialize: true
})(Login)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

