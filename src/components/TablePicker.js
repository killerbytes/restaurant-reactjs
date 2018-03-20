import React from 'react'
import { withStyles } from 'material-ui/styles';

import RadioButtonCheckedIcon from 'material-ui-icons/RadioButtonChecked';
import AssignmentInd from 'material-ui-icons/AssignmentInd';
import AssignmentTurnedIn from 'material-ui-icons/AssignmentTurnedIn';
import Group from 'material-ui-icons/Group';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle, DialogActions, DialogContent } from 'material-ui/Dialog';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  dialog: {
    width: '80%'
  },
});

class TablePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      custom_dialog: false,
      name: ''
    }
  }
  handleDialog = (key, open = false) => {
    this.setState({ [key]: open })
  }
  handleTextChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleCustomSet = () => {
    const { name } = this.state
    this.props.onClickItem({ name, id: null })
    this.setState({ name: '' })
    this.handleDialog('custom_dialog')
  }
  handleOnClickCustom = () => {

  }
  render() {
    const { tables, carts, isOpen, onClickItem, onCloseModal, classes, disableActive = false } = this.props
    const mappedTables = tables.items.map((item) => {

      const cart = carts.items.find(i => i.table_id === item.id)
      const is_disabled = disableActive && cart ? true : false

      const ready = cart && cart.orders && cart.orders.filter(order => order.status === 'ready')
      return <ListItem button key={item.id} onClick={() => onClickItem(item, cart)} disabled={is_disabled}>
        <ListItemIcon >
          {
            <Group color={cart ? 'primary' : 'disabled'} />
          }
        </ListItemIcon>
        <ListItemText inset primary={item.name}></ListItemText>
        {!!ready && !!ready.length && <RadioButtonCheckedIcon style={{ color: 'green' }} />}


        {

          cart && cart.is_checkout && <AssignmentTurnedIn color="secondary" />
        }

      </ListItem>
    })


    const mappedCustom = carts.items
      .filter(item => item.table_id == null)
      .map(cart => {
        return <ListItem button key={cart.id} onClick={() => onClickItem(null, cart)} disabled={disableActive}>
          <ListItemIcon >
            <AssignmentInd color="primary" />
          </ListItemIcon>
          <ListItemText primary={cart.customer.name}></ListItemText>
          {cart.is_checkout && <AssignmentTurnedIn color="secondary" />}

        </ListItem>

      })

    return <Dialog
      classes={{
        paper: classes.dialog
      }}
      open={isOpen}
      onClose={onCloseModal}>
      <DialogTitle>Choose Table</DialogTitle>
      <DialogContent>
        <Grid container spacing={0}>
          <Grid item sm={6} zeroMinWidth>
            <List component="nav">
              {mappedTables}
            </List>
          </Grid>
          <Grid item sm={6} zeroMinWidth>
            <List component="nav">
              {mappedCustom}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions >
        <Button onClick={() => this.handleDialog('custom_dialog', true)}>Custom</Button>

        <Button onClick={onCloseModal} style={{ marginLeft: 'auto' }}>Close</Button>

      </DialogActions>
      <Dialog
        open={this.state.custom_dialog}
        onClose={() => this.handleDialog('custom_dialog')}>
        <DialogContent>
          <TextField
            label="Customer Name"
            name="name"
            onChange={(e) => this.handleTextChange(e)}
            value={this.state.name} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleDialog('custom_dialog')}>Cancel</Button>
          <Button onClick={this.handleCustomSet} disabled={this.state.name.length ? false : true} color="primary">Apply</Button>

        </DialogActions>

      </Dialog>
    </Dialog>
  }
}

export default withStyles(styles)(TablePicker);
