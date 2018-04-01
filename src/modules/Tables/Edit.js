import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import Dialog, { DialogActions, DialogContent, DialogContentText } from 'material-ui/Dialog';
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

import { fetchTable, updateTable, deleteTable } from '../../actions/tableActions'
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
    this.props.deleteTable(params.id)
  }

  handleSubmit = (form) => {
    const { match: { params } } = this.props
    this.props.updateTable(params.id, form)
  }

  componentDidMount() {
    const { match: { params } } = this.props
    this.props.fetchTable(params.id)

  }
  render() {
    const { tables, match: { params } } = this.props

    const item = tables.item && tables.item[params.id]
    console.log(this.props)
    return <div className="container">
      <Form item={item} onSubmit={this.handleSubmit} >
        <IconButton onClick={() => this.handleDialog('confirm_dialog', true)}><DeleteIcon /></IconButton>
        <Button variant="raised" color="primary" type="submit" style={{ float: 'right' }}>
          Save
        </Button>
      </Form>

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
    fetchTable,
    updateTable,
    deleteTable
  }, dispatch)
};

const mapStateToProps = ({ tables }) => ({
  tables
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTable);
