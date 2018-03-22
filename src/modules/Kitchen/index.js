import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import CheckIcon from 'material-ui-icons/Check';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import ActionHome from 'material-ui-icons/Home';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import CheckCircleIcon from 'material-ui-icons/CheckCircle';

import { getCarts } from "../../actions/cartActions";
import { saveOrderStatus } from "../../actions/orderActions";

import { url } from '../../constants/config'
import io from 'socket.io-client'
const socket = io(url.api)

const getInitialState = () => {
  return {
  }
}
class Kitchen extends React.Component {
  constructor(props) {
    super(props)
    this.state = getInitialState()
    socket.on('server_message', action => {
      switch (action.type) {
        case 'GET_CARTS':
          props.getCarts()
          break;
        default:
          break;
      }
    })

  }
  componentDidMount() {
    this.props.getCarts()
  }

  handleDialog = (key, open = false) => {
    this.setState({ [key]: open })
  }

  handleTableItemClick = (order) => {
    this.props.saveOrderStatus([order.id], 'ready')
  }

  handleClickDone = (cart) => {
    const orders = cart.orders
      .filter(order => order.status === 'pending')
      .map(order => order.id)
    this.props.saveOrderStatus(orders, 'ready')
  }
  render() {
    const { carts } = this.props


    const mappedCarts = carts.items
      .filter(cart => cart.orders.find(order => order.status === 'pending'))
      .map(cart => {

        const mapperOrders = cart.orders.map(order => {
          const getStatus = () => {
            switch (order.status) {
              case 'ready':
                return <IconButton disabled><CheckCircleIcon className={order.status}></CheckCircleIcon></IconButton>
              case 'complete':
                return <IconButton disabled><CheckIcon color="secondary" className={order.status}></CheckIcon></IconButton>
              default:
                return <IconButton onClick={() => { this.handleTableItemClick(order) }}><CheckIcon className={order.status}></CheckIcon></IconButton>
            }
          }

          return <TableRow key={order.id}>
            <TableCell numeric padding="none">
              {order.quantity}
            </TableCell>
            <TableCell style={{ whiteSpace: 'nowrap' }} padding="dense">
              {order.product.name}
            </TableCell>
            <TableCell padding="none">
              {getStatus()}
            </TableCell>
          </TableRow>
        })
        return <div key={cart.id}>
          <Card>
            <CardContent>

              {cart.customer.name}
              <Table>
                <TableBody>

                  {mapperOrders}
                </TableBody>
              </Table>
            </CardContent>
            <Paper>

            </Paper>
            <CardActions>
              <Button color="primary" onClick={() => this.handleClickDone(cart)}>Done</Button>
            </CardActions>
          </Card>
        </div>
      })

    return <div className="container">
      <AppBar>
        <Toolbar>
          <IconButton onClick={() => this.handleDialog('table_dialog', true)} color="inherit" aria-label="Menu">
            <ActionHome />
          </IconButton>
          <Typography variant="title" style={{ flex: 1 }}>
            Kitchen
          </Typography>
          <Button onClick={() => this.handleDialog('menu_dialog', true)}>Menu</Button>
        </Toolbar>
      </AppBar>
      <div className="main bg" style={{ overflow: 'auto' }}>
        {mappedCarts}
      </div>



    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getCarts,
    saveOrderStatus
  }, dispatch)
};

const mapStateToProps = ({ categories, tables, carts, menu }) => ({
  carts
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Kitchen);
