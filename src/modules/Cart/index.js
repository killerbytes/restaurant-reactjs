import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { format } from 'date-fns'

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import NavigationClose from 'material-ui-icons/Close';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Place from 'material-ui-icons/Place';
import ContentAdd from 'material-ui-icons/Add';
import Paper from 'material-ui/Paper';
import CheckIcon from 'material-ui-icons/Check';
import CheckCircleIcon from 'material-ui-icons/CheckCircle';

import { getTotals } from '../../utils'
import { getCart, getCarts, moveCustomer, checkoutCart } from '../../actions/cartActions'
import { createTransaction } from '../../actions/transactionActions'
import { fetchMenuIfNeeded } from '../../actions/menuActions'
import { saveOrders, saveOrderStatus } from '../../actions/orderActions'
import { fetchTablesIfNeeded } from '../../actions/tableActions'

import Menu from '../../components/Menu'
import Orders from '../../components/Orders'
import TablePicker from '../../components/TablePicker'
import Box from '../../components/Box'

import { url } from '../../constants/config'
import io from 'socket.io-client'
const socket = io(url.api)


const getInitialState = () => {
  return {
    menu_dialog: false,
    table_dialog: false,
    table: {},
    orders: []
  }
}

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = getInitialState()

    const { match: { params } } = props
    socket.on('server_message', action => {
      switch (action.type) {
        case 'GET_CART':
          props.getCart(params.id)
          break;
        default:
          break;
      }
    })


  }
  componentDidMount() {
    const { match: { params } } = this.props
    this.props.fetchTablesIfNeeded()
    this.props.getCarts()
    this.props.getCart(params.id)
    this.props.fetchMenuIfNeeded()


  }

  checkout = () => {
    const { match: { params }, checkoutCart, carts: { item } } = this.props
    checkoutCart(item[params.id].id)
  }

  increaseQty = (item) => {
    const { orders } = this.state
    item.quantity += 1
    this.setState({
      orders
    })
  }

  decreaseQty = (item) => {
    const { orders } = this.state
    item.quantity -= 1
    if (item.quantity === 0) {
      const removeIndex = orders.map((item) => item.id).indexOf(item.id);
      orders.splice(removeIndex, 1)
    }
    this.setState({
      orders
    })
  }
  handleTableItem = (item) => {
    const { carts, match: { params } } = this.props
    const { name, id } = item
    this.props.moveCustomer({
      id: carts.item[params.id].id,
      name: name,
      table_id: id
    })
    this.handleDialog('table_dialog')
  }

  handleDialog = (key, open = false) => {
    this.setState({ [key]: open })
  }

  handleMenuItem = (item) => {
    const { orders } = this.state
    const { id, name, price } = item
    const exists = orders.find(i => i.product_id === item.id)
    if (exists) {
      exists.quantity += 1
    } else {
      orders.push({
        product_id: id,
        name,
        price,
        quantity: 1
      })
    }
  }

  handleAdditionalOrders = () => {
    const { orders } = this.state
    const { match: { params }, carts: { item } } = this.props
    this.props.saveOrders(orders, item[params.id].id)
    this.setState(getInitialState())
  }

  handleReadyClick = (item) => {
    this.props.saveOrderStatus(item.id, 'complete')
  }

  render() {
    const { carts, menu, tables, match: { params } } = this.props
    const { orders } = this.state
    const item = carts.item && carts.item[params.id]
    if (!item) return false
    const total = getTotals(item.orders)
    const mappedOrders = item.orders.map(item => {
      const getStatus = () => {
        switch (item.status) {
          case 'ready':
            return <IconButton onClick={() => { this.handleReadyClick(item) }}><CheckIcon className={item.status}></CheckIcon></IconButton>
          case 'complete':
            return <IconButton disabled><CheckCircleIcon color="disabled" className={item.status}></CheckCircleIcon></IconButton>
          default:
            break;
        }

        return null
      }
      return <TableRow key={item.id}>
        <TableCell style={{ whiteSpace: 'normal' }}>{item.product.name}</TableCell>
        <TableCell padding="none">{getStatus()}</TableCell>
        <TableCell numeric>{format(item.created_at, 'h:mm:ss A')}</TableCell>
        <TableCell numeric style={{ width: 70 }}>{item.quantity}</TableCell>
        <TableCell numeric style={{ width: 70 }}>{parseFloat(item.price).toFixed(2)}</TableCell>
        <TableCell numeric style={{ width: 70 }}>{(item.quantity * item.price).toFixed(2)}</TableCell>
      </TableRow>
    })

    return <div className="container">
      <AppBar>
        <Toolbar>
          <IconButton onClick={() => this.props.history.push('/')}><NavigationClose /></IconButton>
          <Typography variant="title">{item && item.customer.name}</Typography>
          <IconButton onClick={() => this.handleDialog('table_dialog', true)}>
            <Place />
          </IconButton>
          <Button variant="raised" color="secondary" disabled={item.is_checkout} onClick={this.checkout} style={{ marginLeft: 'auto' }} >Checkout</Button>
        </Toolbar>
      </AppBar>
      <div className="main">
        <section>

          <Paper className="mb">
            <Toolbar>
              <Typography variant="subheading">Orders</Typography>
            </Toolbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order</TableCell>
                  <TableCell padding="none">Status</TableCell>
                  <TableCell numeric>Time</TableCell>
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
          <Box style={{ float: 'right' }}>
            Subtotal
            <Typography variant="title" style={{ marginLeft: '3rem' }}>{total.amount_due.toFixed(2)}</Typography>
          </Box>
          <div style={{ clear: 'both' }}></div>

          {
            orders.length
              ?
              <div>
                <Toolbar>
                  <Typography variant="subheading">Additional Orders</Typography>
                </Toolbar>
                <Orders
                  onAdd={this.increaseQty}
                  onRemove={this.decreaseQty}
                  items={orders} />
                <div style={{ float: 'right' }}>
                  <Button color="secondary" variant="raised" onClick={this.handleAdditionalOrders}>Add Order</Button>
                </div>
              </div>
              :
              (null)
          }

          {
            <Menu
              isOpen={this.state.menu_dialog}
              onCloseModal={() => this.handleDialog('menu_dialog')}
              onClickItem={this.handleMenuItem}
              menu={menu} />
          }

          <TablePicker
            disableActive
            isOpen={this.state.table_dialog}
            onCloseModal={() => this.handleDialog('table_dialog')}
            onClickItem={this.handleTableItem}
            carts={carts}
            tables={tables} />

          <Button variant="fab" disabled={item.is_checkout} onClick={() => this.handleDialog('menu_dialog', true)} style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}>
            <ContentAdd />
          </Button>
          <div style={{ marginTop: '5rem' }}></div>
        </section>
      </div>

    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getCart,
    getCarts,
    moveCustomer,
    checkoutCart,
    fetchMenuIfNeeded,
    fetchTablesIfNeeded,
    createTransaction,
    saveOrders,
    saveOrderStatus
  }, dispatch)
};

const mapStateToProps = ({ categories, tables, carts, menu }) => ({
  categories,
  tables,
  carts,
  menu
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

