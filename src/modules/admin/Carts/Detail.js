import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { List, ListItem } from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import Order from '../../../components/Orders'
import { getCart } from '../../../actions/cartActions'
import { saveTransaction } from '../../../actions/transactionActions'
import { getTotals } from '../../../utils'

class Carts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: ""
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
    })

  }

  render() {
    const { carts: { item } } = this.props
    const { orders } = item
    const total = getTotals(orders)

    const change = this.state.amount - total.amount_due
    console.log(change)

    const mappedOrders = item.orders.map(item => {
      return <TableRow key={item.id} displayBorder={false} hoverable={true} selectable={false}>
        <TableRowColumn style={{ whiteSpace: 'normal' }}>{item.product.name}</TableRowColumn>
        <TableRowColumn style={{ width: 70, textAlign: 'right' }}>{item.quantity}</TableRowColumn>
        <TableRowColumn style={{ width: 70, textAlign: 'right' }}>{parseFloat(item.price).toFixed(2)}</TableRowColumn>
        <TableRowColumn style={{ width: 70, textAlign: 'right' }}>{(item.quantity * item.price).toFixed(2)}</TableRowColumn>
      </TableRow>
    })


    return <div>
      <AppBar
        title={item && item.customer.name} />

      <Table>
        <TableBody displayRowCheckbox={false}>
          {mappedOrders}
          <TableRow>
            <TableRowColumn />
            <TableRowColumn />
            <TableRowColumn style={{ textAlign: 'right', fontWeight: 'bold' }}>Total</TableRowColumn>
            <TableRowColumn style={{ width: 70, textAlign: 'right', fontWeight: 'bold' }}>{total.amount_due.toFixed(2)}</TableRowColumn>
          </TableRow>

        </TableBody>
      </Table>

      <TextField
        hintText="Amount"
        type="number"
        value={this.state.amount}
        onChange={this.handleAmountChange} />

      {change}

      <RaisedButton label="Checkout" onClick={this.handleCheckout} />

    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getCart,
    saveTransaction
  }, dispatch)
};

const mapStateToProps = ({ carts }) => ({
  carts
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carts);

