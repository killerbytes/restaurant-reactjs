import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { getTransactions } from '../../../actions/transactionActions'
import { getTransactionTotals } from '../../../utils/index'

class Transactions extends React.Component {
  componentDidMount() {
    this.props.getTransactions()
  }
  render() {
    const { transaction: { items } } = this.props
    const total = getTransactionTotals(items)
    const mappedOrders = items.map(item => {
      return <TableRow key={item.id} displayBorder={false} hoverable={true} selectable={false}>
        <TableRowColumn style={{ whiteSpace: 'normal' }}><Link to={`/admin/transactions/${item.id}`}>{item.cart.customer.name}</Link></TableRowColumn>
        <TableRowColumn style={{ width: 70, textAlign: 'right' }}>{item.user.name}</TableRowColumn>
        <TableRowColumn style={{ width: 70, textAlign: 'right' }}>{item.total_amount_due}</TableRowColumn>
      </TableRow>
    })

    return <div>
      <AppBar title="Transactions" />
      <Table>
        <TableBody displayRowCheckbox={false}>
          {mappedOrders}
          <TableRow>
            <TableRowColumn />
            <TableRowColumn />
            <TableRowColumn style={{ textAlign: 'right', fontWeight: 'bold' }}>Total</TableRowColumn>
            <TableRowColumn style={{ width: 70, textAlign: 'right', fontWeight: 'bold' }}>{total.total_amount_due}</TableRowColumn>
          </TableRow>

        </TableBody>
      </Table>

    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getTransactions
  }, dispatch)
};

const mapStateToProps = ({ transaction }) => ({
  transaction
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);

