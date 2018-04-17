import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import Dialog, { DialogActions, DialogContent, DialogContentText } from 'material-ui/Dialog';
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Card, { CardContent } from 'material-ui/Card';
import { Link } from 'react-router-dom'

import { fetchUser, updateUser, deleteUser } from '../../actions/userActions'
import { getRoles } from '../../actions/roleActions'
import Form from './Form'

class EditTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      confirm_dialog: false,
    }
  }
  handleDialog = (key, open = false) => {
    this.setState({ [key]: open })
  }

  handleInputChange = (e) => {
    const { form } = this.state
    form[e.target.name] = e.target.value
    this.setState({ form })
  }

  handleDelete = () => {
    const { match: { params } } = this.props
    this.props.deleteUser(params.id)
  }

  handleSubmit = (form) => {
    const { match: { params } } = this.props
    this.props.updateUser(params.id, form)
  }

  componentDidMount() {
    const { match: { params } } = this.props
    this.props.fetchUser(params.id)
    this.props.getRoles()

  }
  render() {
    const { roles, users, match: { params } } = this.props

    const item = users.item && users.item[params.id]
    return <div className="container">
      <Card>
        <CardContent>
          <Form item={item} roles={roles} onSubmit={this.handleSubmit} >
            <IconButton onClick={() => this.handleDialog('confirm_dialog', true)}><DeleteIcon /></IconButton>
            <Button component={Link} to="/users" style={{ marginLeft: 'auto' }}>Cancel</Button>
            <Button variant="raised" color="primary" type="submit">Update</Button>
          </Form>
        </CardContent>
      </Card>


      <Dialog
        open={this.state.confirm_dialog}
        onClose={() => this.handleDialog('confirm_dialog')}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {item && item.name}?
            </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => this.handleDialog('confirm_dialog')} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleDelete} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchUser,
    updateUser,
    deleteUser,
    getRoles
  }, dispatch)
};

const mapStateToProps = ({ users, roles }) => ({
  users,
  roles
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTable);
