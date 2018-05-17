import React from "react";
import { bindActionCreators, compose } from 'redux'
import { connect } from "react-redux";
import currency from 'currency.js'
import { withStyles } from 'material-ui/styles';
import { format } from 'date-fns'

import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Delete from 'material-ui-icons/Delete';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import CheckIcon from 'material-ui-icons/Check';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';


import VoidOrder from '../../components/VoidOrder'
import { getCart } from '../../actions/cartActions'
import { createTransaction } from '../../actions/transactionActions'
import { saveOrderVoid } from '../../actions/orderActions'
import { getTotals } from '../../utils'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  },
  margin: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  }
});

class Carts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      void_dialog: false,
      discount_dialog: false,
      void_collapse: false,
      amount: "",
      notes: "",
      discount: 0,
      order: {},
      voidQuantity: 0,
      menu: false,
      anchorEl: null,

    }
  }
  componentDidMount() {
    const { match: { params }, getCart } = this.props
    getCart(params.id)
  }

  handleTextChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleDialog = (key, open = false) => {
    this.setState({ [key]: open, menu: false })
  }

  handleCheckout = () => {
    const { match: { params }, carts: { item } } = this.props
    this.props.createTransaction({
      cart_id: item[params.id].id,
      notes: this.state.notes,
      discount: parseFloat(this.state.discount),
      amount_paid: parseFloat(this.state.amount)
    })

  }


  handleSetVoid = (order) => {
    this.setState({ order })
    this.handleDialog('void_dialog', true)
  }

  handleVoidCollapse = () => {
    this.setState({ 'void_collapse': !this.state.void_collapse })
  }

  handleVoidSubmit = (e) => {
    const { match: { params }, saveOrderVoid } = this.props
    const { order, voidQuantity } = this.state
    const qty = parseInt(voidQuantity, 10)
    if (qty >= 0) {

      saveOrderVoid(params.id, order.id, qty)
      this.setState({ voidQuantity: 0 })
      this.handleDialog('void_dialog')
    }
  }

  handleApplyDiscount = (e) => {
    e.preventDefault()
    if (this.inputDiscount.value > 0) {
      this.setState({ discount: this.inputDiscount.value })
    }
    this.handleDialog('discount_dialog')
  }
  handleMenu = (e) => {
    this.setState({
      menu: true,
      anchorEl: e.target
    })
  }

  render() {
    const { carts, classes, match: { params } } = this.props
    const { discount, amount } = this.state
    const cart = carts.item && carts.item[params.id]
    if (!cart) return false
    const { orders } = cart
    const total = getTotals(orders)
    const subtotal = parseFloat(total.amount_due) - parseFloat(discount) || 0
    const change = parseFloat(amount) - parseFloat(subtotal) > 0 ? currency(amount).subtract(subtotal).value : ""
    const mappedOrders = cart.orders.map(item => {
      const getStatus = () => {
        switch (item.status) {
          case 'ready':
            return <IconButton disabled><CheckIcon className={item.status}></CheckIcon></IconButton>
          case 'complete':
            return <IconButton disabled><CheckIcon color="secondary" className={item.status}></CheckIcon></IconButton>
          default:
            return <IconButton disabled><CheckIcon className={item.status}></CheckIcon></IconButton>
        }
      }

      return <TableRow key={item.id}>
        <TableCell style={{ whiteSpace: 'normal' }}>{item.product.name}</TableCell>
        <TableCell>{item.user.name}</TableCell>
        <TableCell numeric>{format(item.created_at, 'h:mm:ss A')}</TableCell>
        <TableCell>{getStatus()}</TableCell>
        <TableCell numeric style={{ width: 70 }}>{item.quantity}  </TableCell>
        {/* <TableCell numeric style={{ width: 50 }}><IconButton onClick={() => this.handleSetVoid(item)}><BlockIcon></BlockIcon></IconButton></TableCell> */}
        <TableCell numeric style={{ width: 70 }}>{parseFloat(item.price).toFixed(2)}</TableCell>
        <TableCell numeric style={{ width: 70 }}>{(item.quantity * item.price).toFixed(2)}</TableCell>
        <TableCell>
          <IconButton
            aria-haspopup="true"
            color="inherit"
            onClick={this.handleMenu}
          >
            <MoreVertIcon />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={this.state.anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={this.state.menu}
            onClose={() => this.handleDialog('menu')}
          >
            <MenuItem onClick={() => this.handleSetVoid(item)}>Void</MenuItem>
          </Menu>

        </TableCell>

      </TableRow>
    })

    const mappedVoid = !!cart.void.length && cart.void.map(item => {
      return <TableRow key={item.id}>
        <TableCell style={{ whiteSpace: 'normal' }}>{item.product.name}</TableCell>
        <TableCell numeric style={{ width: 70 }}>{item.quantity}</TableCell>
        <TableCell numeric style={{ width: 70 }}>{parseFloat(item.price).toFixed(2)}</TableCell>
        <TableCell numeric style={{ width: 70 }}>{(item.quantity * item.price).toFixed(2)}</TableCell>
      </TableRow>
    })
    return <div>
      <h1>{cart && cart.customer.name}</h1>
      <Toolbar>
        <Typography variant="subheading">Orders</Typography>
      </Toolbar>
      <Paper className="mb">
        {
          mappedOrders && <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order</TableCell>
                <TableCell>User</TableCell>
                <TableCell numeric>Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell numeric>Quantity</TableCell>
                <TableCell numeric>Unit Price</TableCell>
                <TableCell numeric>Total</TableCell>
                <TableCell >Void</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {mappedOrders}
              {
                !!discount && <TableRow key={cart.id}>
                  <TableCell
                    component={() => <td className="MuiTableCell-root-108 MuiTableCell-body-110" colSpan={6}>Discount<IconButton onClick={() => { this.setState({ discount: 0 }) }}><Delete style={{ fontSize: '1rem', marginTop: '-3px' }} /></IconButton></td>}>
                  </TableCell>
                  <TableCell numeric>{currency(discount).format()}</TableCell>
                </TableRow>

              }
            </TableBody>
          </Table>
        }
      </Paper>


      {
        mappedVoid && <div>
          <Toolbar>
            <Typography >
              Void
            </Typography>
            <IconButton onClick={() => this.handleVoidCollapse()}>
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>

          </Toolbar>
          <Collapse in={this.state.void_collapse} timeout="auto" unmountOnExit>
            <Paper className="mb">
              <Table>
                <TableBody>{mappedVoid}</TableBody>
              </Table>
            </Paper>
          </Collapse>

        </div>
      }


      <Grid container spacing={0}>
        <Grid item sm={9}>
          <div></div>
          <TextField
            label="Notes"
            name="notes"
            multiline
            value={this.state.notes}
            onChange={(e) => this.handleTextChange(e)} />

        </Grid>
        <Grid item sm={3}>
          <Grid container spacing={0}>
            <Paper style={{ flex: 1 }}>
              <div className={classes.root}>
                <div className="flex">
                  Subtotal
                  <Typography variant="title" style={{ float: 'right' }}>{currency(subtotal).format()}</Typography>
                </div>

                <TextField
                  label="Amount"
                  type="number"
                  fullWidth
                  className={classes.margin}
                  inputProps={{ min: 0 }}
                  value={this.state.amount}
                  name="amount"
                  onChange={(e) => this.handleTextChange(e)} />
                <div>Change: <span style={{ float: 'right' }}>{change && currency(change).format()}</span></div>


                <div style={{ marginBottom: '1rem' }}></div>
                <Button color="primary" style={{ marginBottom: '1rem' }} onClick={() => this.handleDialog('discount_dialog', true)}>
                  Apply Discount
                </Button>

                <Button variant="raised" color="primary" style={{ float: 'right' }} onClick={this.handleCheckout} >Checkout</Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>


      <VoidOrder
        handleTextChange={this.handleTextChange}
        handleClose={() => this.handleDialog('void_dialog')}
        handleSubmit={this.handleVoidSubmit}
        item={this.state.order}
        value={this.state.voidQuantity}
        open={this.state.void_dialog} />

      <Dialog
        open={this.state.discount_dialog}
        onClose={() => this.handleDialog('discount_dialog')} >
        <form onSubmit={(e) => this.handleApplyDiscount(e, this)}>
          <DialogTitle>Apply discount</DialogTitle>
          <DialogContent>

            <TextField
              label="Discount"
              type="number"
              className={classes.margin}
              inputProps={{ min: 0 }}
              inputRef={(input) => this.inputDiscount = input}
              defaultValue="" />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleDialog('discount_dialog')} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Apply
            </Button>
          </DialogActions>
        </form>
      </Dialog>

    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getCart,
    createTransaction,
    saveOrderVoid
  }, dispatch)
};

const mapStateToProps = ({ carts, error }) => ({
  carts,
  error
});

withStyles(styles)(Carts)

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ))(Carts);

