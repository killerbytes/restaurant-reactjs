import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { format } from 'date-fns'
import currency from 'currency.js'

import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';


import Box from '../../../components/Box'
import { fetchTransactions } from '../../../actions/transactionActions'
import { getTransactionTotals } from '../../../utils/index'

class Transactions extends React.Component {
  componentDidMount() {
    this.props.fetchTransactions()
  }
  navigate = (item) => {
    this.props.history.push(`/admin/transactions/${item.id}`)
  }
  render() {
    const { transaction: { items } } = this.props
    const total = getTransactionTotals(items)
    const mappedOrders = items.map(item => {
      return <TableRow key={item.id} hover onClick={() => this.navigate(item)}>
        <TableCell style={{ whiteSpace: 'normal' }}>{item.cart.customer.name}</TableCell>
        <TableCell style={{ width: 150 }}>{format(item.created_at, 'YY-MM-DD h:mm:ss A')}</TableCell>
        <TableCell style={{ width: 70 }}>{item.user.name}</TableCell>
        <TableCell numeric style={{ width: 70 }}>{currency(item.total_amount_due).format()}</TableCell>
      </TableRow>
    })

    return <div>
      <h1>Transactions</h1>
      <Paper className="mb">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Cashier</TableCell>
              <TableCell numeric>Amount</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {mappedOrders}

          </TableBody>
        </Table>
      </Paper>
      <Box>
        <label htmlFor="">Total</label>
        <strong>{currency(total.total_amount_due).format()}</strong>
      </Box>

    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchTransactions
  }, dispatch)
};

const mapStateToProps = ({ transaction }) => ({
  transaction
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);

