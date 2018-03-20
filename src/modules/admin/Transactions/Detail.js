import React from "react";
import { bindActionCreators } from 'redux'
import { format } from 'date-fns'
import { connect } from "react-redux";
import currency from 'currency.js'

import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import Box from '../../../components/Box'
import { fetchTransaction } from '../../../actions/transactionActions'

class Transactions extends React.Component {
  componentDidMount() {
    const { match: { params } } = this.props
    this.props.fetchTransaction(params.id)
  }
  render() {
    const { transaction: { item } } = this.props
    const mappedOrders = item.cart.orders.map(item => {
      return <TableRow key={item.id}>
        <TableCell style={{ whiteSpace: 'normal' }}>{item.product.name}</TableCell>
        <TableCell style={{ width: 70, textAlign: 'right' }}>{item.quantity}</TableCell>
        <TableCell style={{ width: 70, textAlign: 'right' }}>{parseFloat(item.price).toFixed(2)}</TableCell>
        <TableCell style={{ width: 70, textAlign: 'right' }}>{(item.quantity * item.price).toFixed(2)}</TableCell>
      </TableRow>
    })

    return <div>
      <h1>{item.cart.customer && item.cart.customer.name}</h1>
      <div style={{ display: 'flex' }}>
        <Box>
          <label htmlFor="">Transaction Date: </label>
          <span>{format(item.created_at, "YY-MM-DD h:mm:ss A")}</span>
        </Box>
        <Box>
          <label htmlFor="">Cashier:</label>
          <span>{item.user && item.user.name}</span>
        </Box>
      </div>
      <Box>
        <label htmlFor="">Notes: </label> <span>{item.notes}</span>
      </Box>
      <Paper className="mb">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell numeric>Quantity</TableCell>
              <TableCell numeric>Unit Price</TableCell>
              <TableCell numeric>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mappedOrders}

          </TableBody>
        </Table>
      </Paper>

      <Box>
        <label htmlFor="">Discount</label>
        <strong>{currency(item.discount).format()}</strong>
      </Box>
      <div></div>
      <Box>
        <label htmlFor="">Total</label>
        <strong>{currency(item.total_amount_due).format()}</strong>
      </Box>

    </div >
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchTransaction
  }, dispatch)
};

const mapStateToProps = ({ transaction }) => ({
  transaction
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);

