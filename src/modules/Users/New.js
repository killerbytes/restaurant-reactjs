import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

import Button from 'material-ui/Button'

import { createUser } from "../../actions/userActions";

import Form from './Form'



class NewProduct extends React.Component {

  handleSubmit = (form) => {
    this.props.createUser(form)
  }

  render() {
    return <div className="container">
      <Form onSubmit={this.handleSubmit}>
        <Button variant="raised" component={Link} to="/tables">Cancel</Button>
        <Button variant="raised" color="primary" type="submit" style={{ float: 'right' }}>Save</Button>
      </Form>
    </div>
  }

}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    createUser,
  }, dispatch)
};

const mapStateToProps = ({ form }) => {
  return ({
    form
  });
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProduct);
