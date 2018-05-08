import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

import Button from 'material-ui/Button'
import Card, { CardContent } from 'material-ui/Card';

import { updatePassword } from "../../actions/userActions";
import { fetchProfileIfNeeded } from '../../actions/authActions'

import ChangePassword from './ChangePassword'



class NewProduct extends React.Component {
  componentDidMount() {
    this.props.fetchProfileIfNeeded()
  }
  handleSubmit = (form) => {
    const { auth: { me } } = this.props
    this.props.updatePassword(me.id, form)
  }

  render() {
    return <div className="container">
      <Card>
        <CardContent>
          <ChangePassword isNew onSubmit={this.handleSubmit}>
            <Button component={Link} to="/users">Cancel</Button>
            <Button variant="raised" color="primary" type="submit">Save</Button>
          </ChangePassword>
        </CardContent>
      </Card>

    </div>
  }

}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    updatePassword,
    fetchProfileIfNeeded
  }, dispatch)
};

const mapStateToProps = ({ auth }) => {
  return ({
    auth
  });
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProduct);
