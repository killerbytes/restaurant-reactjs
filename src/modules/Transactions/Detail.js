import React from "react";
import { bindActionCreators } from 'redux'
import { format } from 'date-fns'
import { connect } from "react-redux";
import currency from 'currency.js'

import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';

import Box from '../../components/Box'
import { fetchTransaction } from '../../actions/transactionActions'

class Transactions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      void_collapse: false
    }
  }
  componentDidMount() {
    const { match: { params } } = this.props
    this.props.fetchTransaction(params.id)
  }
  handleVoidCollapse = () => {
    this.setState({ 'void_collapse': !this.state.void_collapse })
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

    const mappedVoid = !!item.cart.void.length && item.cart.void.map(item => {
      return <TableRow key={item.id}>
        <TableCell style={{ whiteSpace: 'normal' }}>{item.product.name}</TableCell>
        <TableCell numeric style={{ width: 70 }}>{item.quantity}</TableCell>
        <TableCell numeric style={{ width: 70 }}>{parseFloat(item.price).toFixed(2)}</TableCell>
        <TableCell numeric style={{ width: 70 }}>{(item.quantity * item.price).toFixed(2)}</TableCell>
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

      {
        mappedVoid && <div>
          <Toolbar>
            <Typography >
              Void
            </Typography>
            <IconButton onClick={() => this.handleVoidCollapse()}>
              {this.state.void_collapse ? <ExpandLess /> : <ExpandMore />}
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

