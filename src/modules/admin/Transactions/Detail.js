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

import { getTransaction } from '../../../actions/transactionActions'
import { getTotals } from '../../../utils/index'

class Transactions extends React.Component {
  componentDidMount() {
    const { match: { params } } = this.props
    this.props.getTransaction(params.id)
  }
  render() {
    const { transaction: { item } } = this.props
    const total = getTotals(item.cart.orders)
    console.log(item, total)


    const mappedOrders = item.cart.orders.map(item => {
      return <TableRow key={item.id} displayBorder={false} hoverable={true} selectable={false}>
        <TableRowColumn style={{ whiteSpace: 'normal' }}>{item.product.name}</TableRowColumn>
        <TableRowColumn style={{ width: 70, textAlign: 'right' }}>{item.quantity}</TableRowColumn>
        <TableRowColumn style={{ width: 70, textAlign: 'right' }}>{parseFloat(item.price).toFixed(2)}</TableRowColumn>
        <TableRowColumn style={{ width: 70, textAlign: 'right' }}>{(item.quantity * item.price).toFixed(2)}</TableRowColumn>
      </TableRow>
    })

    return <div>
      <AppBar title="Transactions" />
      {item.created_at}
      {item.notes}
      {item.discount}
      {item.user && item.user.name}
      <Table>
        <TableBody displayRowCheckbox={false}>
          {mappedOrders}
          <TableRow>
            <TableRowColumn />
            <TableRowColumn />
            <TableRowColumn style={{ textAlign: 'right', fontWeight: 'bold' }}>Total</TableRowColumn>
            <TableRowColumn style={{ width: 70, textAlign: 'right', fontWeight: 'bold' }}>{total.amount_due}</TableRowColumn>
          </TableRow>

        </TableBody>
      </Table>

      {item.total_amount_due}
    </div >
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getTransaction
  }, dispatch)
};

const mapStateToProps = ({ transaction }) => ({
  transaction
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);

