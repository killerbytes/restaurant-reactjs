import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import ButtonBase from 'material-ui/ButtonBase';
import Button from 'material-ui/Button';


import Box from '../../../components/Box'
import VoidOrder from '../../../components/VoidOrder'
import { getCart } from '../../../actions/cartActions'
import { saveTransaction } from '../../../actions/transactionActions'
import { updateOrder } from '../../../actions/orderActions'
import { getTotals } from '../../../utils'


class Carts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: "",
      open: false,
      voidQuantity: 0
    }
  }
  componentDidMount() {
    const { match: { params }, getCart } = this.props
    getCart(params.id)
  }
  handleItemClick = (item) => {
    this.props.history.push(`/admin/carts/${item.id}`)
  }
  handleAmountChange = (e) => {
    this.setState({
      amount: e.target.value
    })
  }
  handleCheckout = () => {
    const { carts: { item } } = this.props
    const total = getTotals(item.orders)

    this.props.saveTransaction({
      cart_id: item.id,
      discount: 0,
      total_price: total.amount_due,
      amount_paid: parseFloat(this.state.amount)
    }).then(res => {
      this.props.history.push('/admin/carts')
    })

  }
  handleDialogOpen = (e, item) => {
    this.setState({
      open: true,
      order: item
    })
  }

  handleDialogClose = () => {
    this.setState({ open: false })
  }

  handleVoidSubmit = () => {
    const { match: { params }, updateOrder, getCart } = this.props
    updateOrder(params.id, this.state.order.id, this.state.voidQuantity)
      .then(res => {
        getCart(params.id)
        this.handleDialogClose()
      })
  }

  handleVoidChange = (e) => {
    this.setState({ voidQuantity: e.target.value })
  }

  render() {
    const { carts: { item } } = this.props
    const { orders } = item
    const total = getTotals(orders)

    const change = this.state.amount - total.amount_due
    console.log(change)

    const mappedOrders = item.orders.map(item => {
      return <TableRow key={item.id}>
        <TableCell style={{ whiteSpace: 'normal' }}><ButtonBase onClick={(e) => this.handleDialogOpen(e, item)}>{item.product.name}</ButtonBase></TableCell>
        <TableCell style={{ width: 70, textAlign: 'right' }}>{item.quantity}</TableCell>
        <TableCell style={{ width: 70, textAlign: 'right' }}>{parseFloat(item.price).toFixed(2)}</TableCell>
        <TableCell style={{ width: 70, textAlign: 'right' }}>{(item.quantity * item.price).toFixed(2)}</TableCell>
      </TableRow>
    })

    const mappedVoid = !!item.void.length && item.void.map(item => {
      return <TableRow key={item.id}>
        <TableCell style={{ whiteSpace: 'normal' }}>{item.product.name}</TableCell>
        <TableCell style={{ width: 70, textAlign: 'right' }}>{item.quantity}</TableCell>
        <TableCell style={{ width: 70, textAlign: 'right' }}>{parseFloat(item.price).toFixed(2)}</TableCell>
        <TableCell style={{ width: 70, textAlign: 'right' }}>{(item.quantity * item.price).toFixed(2)}</TableCell>
      </TableRow>
    })
    console.log(mappedVoid)


    return <div>
      <h1>{item && item.customer.name}</h1>
      <Toolbar>
        <Typography variant="subheading">Orders</Typography>
      </Toolbar>
      <Paper className="mb">
        {
          mappedOrders && <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order</TableCell>
                <TableCell numeric>Quantity</TableCell>
                <TableCell numeric>Unit Price</TableCell>
                <TableCell numeric>Total</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>{mappedOrders}</TableBody>
          </Table>
        }
      </Paper>


      {
        mappedVoid && <div>
          <Toolbar>
            <Typography>Void</Typography>
          </Toolbar>
          <Paper className="mb">
            <Table>
              <TableBody>{mappedVoid}</TableBody>
            </Table>
          </Paper>
        </div>
      }

      <Box>
        <label htmlFor="">Total</label>
        <strong>{total.amount_due.toFixed(2)}</strong>
      </Box>

      <div className="mb" style={{ display: 'flex', justifyContent: 'flex-end' }}>

        <Paper style={{ padding: '1rem 1.5rem' }}>
          <div className="mb">
            <label htmlFor="" style={{ width: 200, display: 'inline-block' }}>Payment:</label>
            <TextField
              label="Amount"
              type="number"
              value={this.state.amount}
              onChange={this.handleAmountChange} />
          </div>
          <div className="mb" style={{ display: 'flex' }}>
            <label htmlFor="" style={{ width: 200, display: 'inline-block' }}>
              Change:
            </label>
            <span style={{ marginLeft: 'auto', paddingRight: 14 }}>
              {change >= 0 ? change : null}
            </span>
          </div>
          <Button variant="raised" color="primary" style={{ float: 'right' }} onClick={this.handleCheckout} >Checkout</Button>
        </Paper>

      </div>

      <VoidOrder
        handleTextChange={this.handleVoidChange}
        handleClose={() => this.handleDialogClose()}
        handleSubmit={() => this.handleVoidSubmit()}
        value={this.state.voidQuantity}
        open={this.state.open} />

    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getCart,
    saveTransaction,
    updateOrder
  }, dispatch)
};

const mapStateToProps = ({ carts }) => ({
  carts
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carts);

