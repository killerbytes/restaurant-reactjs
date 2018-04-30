import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import currency from 'currency.js'
import { format, endOfMonth } from 'date-fns'

import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Card, { CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';


import Box from '../../components/Box'
import { fetchTransactions } from '../../actions/transactionActions'
import { getTransactionTotals } from '../../utils/index'

class Transactions extends React.Component {
  constructor(props) {
    super(props)
    let today = new Date();
    this.state = {
      startDate: format(today, 'YYYY-MM-DD'),
      endDate: format(endOfMonth(today), 'YYYY-MM-DD')
    }
  }
  handleStartDateChange = (e) => {
    let date = format(e.target.value, 'YYYY-MM-DD')
    this.setState({
      startDate: date,
      endDate: format(endOfMonth(date), 'YYYY-MM-DD')
    }, () => {
      this.handleFetchTransactions()
    })
  }
  handleEndDateChange = (e) => {
    this.setState({
      endDate: format(e.target.value, 'YYYY-MM-DD')
    }, () => {
      this.handleFetchTransactions()
    })
  }
  handleFetchTransactions = () => {
    const startDate = new Date(this.state.startDate)
    const endDate = new Date(this.state.endDate)
    this.props.fetchTransactions({ startDate: startDate.getTime(), endDate: endDate.getTime() })
  }
  componentDidMount() {
    this.handleFetchTransactions()
  }
  navigate = (item) => {
    this.props.history.push(`/transactions/${item.id}`)
  }
  render() {
    const { transaction: { items } } = this.props
    const total = getTransactionTotals(items)
    const mappedOrders = items.map(item => {
      return <TableRow key={item.id} hover style={{ cursor: 'pointer' }} onClick={() => this.navigate(item)}>
        <TableCell style={{ whiteSpace: 'normal' }}>{item.cart.customer.name}</TableCell>
        <TableCell numeric>{format(item.created_at, 'YY-MM-DD h:mm:ss A')}</TableCell>
        <TableCell style={{ width: 170 }}>{item.user.name}</TableCell>
        <TableCell numeric style={{ width: 70 }}>{currency(item.total_amount_due).format()}</TableCell>
      </TableRow>
    })

    return <div>
      <h1>Transactions</h1>
      <Card className="mb">
        <CardContent>

          <form noValidate>
            <TextField
              id="date"
              label="Start Date"
              type="date"
              onChange={this.handleStartDateChange}
              value={this.state.startDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="date"
              label="End Date"
              type="date"
              onChange={this.handleEndDateChange}
              value={this.state.endDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </CardContent>

      </Card>

      <Paper className="mb">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell numeric>Date</TableCell>
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

