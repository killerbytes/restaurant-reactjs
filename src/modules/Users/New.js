import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

import Button from 'material-ui/Button'
import Card, { CardContent } from 'material-ui/Card';

import { createUser } from "../../actions/userActions";

import NewForm from './NewForm'



class NewProduct extends React.Component {

  handleSubmit = (form) => {
    this.props.createUser(form)
  }

  render() {
    return <div className="container">
      <Card>
        <CardContent>
          <NewForm isNew onSubmit={this.handleSubmit}>
            <Button component={Link} to="/users">Cancel</Button>
            <Button variant="raised" color="primary" type="submit">Save</Button>
          </NewForm>
        </CardContent>
      </Card>

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
