import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { format } from 'date-fns'

import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import ArrowBack from 'material-ui-icons/ArrowBack';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Place from 'material-ui-icons/Place';
import RestaurantMenu from 'material-ui-icons/RestaurantMenu';
import Paper from 'material-ui/Paper';
import CheckIcon from 'material-ui-icons/Check';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import NavigationCheck from 'material-ui-icons/Check';

import { getTotals } from '../../utils'
import { getCart, getCarts, moveCustomer, checkoutCart } from '../../actions/cartActions'
import { createTransaction } from '../../actions/transactionActions'
import { fetchProductsIfNeeded } from '../../actions/productActions'
import { saveOrders, saveOrderStatus } from '../../actions/orderActions'
import { fetchTablesIfNeeded } from '../../actions/tableActions'

import Menu from '../../components/Menu'
import Orders from '../../components/Orders'
import TablePicker from '../../components/TablePicker'
import Box from '../../components/Box'
import Profile from '../../components/Profile'


import { url } from '../../constants/config'
import io from 'socket.io-client'
const socket = io(url.api)


const getInitialState = () => {
  return {
    menu_dialog: false,
    table_dialog: false,
    table_collapsed: false,
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
    this.props.fetchProductsIfNeeded()


  }

  checkout = () => {
    const { match: { params }, checkoutCart, carts: { item } } = this.props
    checkoutCart(item[params.id].id, true)
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
    const { match: { params }, saveOrderStatus } = this.props
    saveOrderStatus(params.id, [item.id], 'complete')
  }

  handleCollapseClick = (e) => {
    this.setState({
      table_collapsed: !this.state.table_collapsed
    })
  }

  render() {
    const { carts, product, tables, match: { params } } = this.props
    const { orders, table_collapsed } = this.state
    const item = carts.item && carts.item[params.id]
    if (!item) return false
    const total = getTotals(item.orders)
    const mappedOrders = item.orders.map(item => {
      const getStatus = () => {
        switch (item.status) {
          case 'ready':
            return <IconButton onClick={() => { this.handleReadyClick(item) }}><CheckIcon className={item.status}></CheckIcon></IconButton>
          case 'complete':
            return <IconButton disabled><CheckIcon color="secondary" className={item.status}></CheckIcon></IconButton>
          default:
            break;
        }

        return null
      }
      return <TableRow key={item.id}>
        <TableCell style={{ whiteSpace: 'normal' }}>{item.product.name}</TableCell>
        {table_collapsed && <TableCell padding="none">{getStatus()}</TableCell>}

        {table_collapsed && <TableCell numeric>{format(item.created_at, 'h:mm:ss A')}</TableCell>}
        {!table_collapsed && <TableCell numeric style={{ width: 70 }}>{item.quantity}</TableCell>}
        {table_collapsed && <TableCell numeric style={{ width: 70 }}>{parseFloat(item.price).toFixed(2)}</TableCell>}
        {!table_collapsed && <TableCell numeric style={{ width: 70 }}>{(item.quantity * item.price).toFixed(2)}</TableCell>}
      </TableRow>
    })

    return <div className="container">
      <AppBar>
        <Toolbar disableGutters={true} className="header-toolbar">
          <IconButton onClick={() => this.props.history.push('/')}><ArrowBack /></IconButton>
          <Typography variant="title">{item && item.customer.name}</Typography>
          <IconButton onClick={() => this.handleDialog('table_dialog', true)}>
            <Place />
          </IconButton>
          <Profile style={{ marginLeft: 'auto' }} />

        </Toolbar>
      </AppBar>
      <div className="main">
        <div>

          <Paper>
            <div style={{ padding: '0 1.5rem', display: 'flex', flexDirection: 'row-reverse' }}>

              <FormGroup row>
                <FormControlLabel
                  style={{ marginRight: 0 }}
                  control={
                    <Checkbox
                      checked={table_collapsed}
                      onChange={this.handleCollapseClick}
                    />
                  }
                  label="Collapse"
                />
              </FormGroup>
            </div>

            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Order</TableCell>
                  {table_collapsed && <TableCell padding="none">Status</TableCell>}
                  {table_collapsed && <TableCell numeric>Time</TableCell>}
                  {!table_collapsed && <TableCell numeric>Quantity</TableCell>}
                  {table_collapsed && <TableCell numeric>Unit Price</TableCell>}
                  {!table_collapsed && <TableCell numeric>Total</TableCell>}
                </TableRow>
              </TableBody>

              <TableBody>
                {mappedOrders}

              </TableBody>
            </Table>
          </Paper>

          <Box style={{ alignItems: 'center' }}>
            Subtotal
            <Typography variant="title" style={{ marginLeft: 'auto', marginRight: '1rem' }}>{total.amount_due.toFixed(2)}</Typography>
            <Button variant="raised" color="primary" disabled={item.is_checkout} onClick={this.checkout} >Checkout</Button>
          </Box>

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
                <Button color="primary" variant="fab" onClick={this.handleAdditionalOrders} style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem' }}>
                  <NavigationCheck />
                </Button>

              </div>
              :
              (null)
          }

          {
            <Menu
              isOpen={this.state.menu_dialog}
              onCloseModal={() => this.handleDialog('menu_dialog')}
              onClickItem={this.handleMenuItem}
              product={product} />
          }

          <TablePicker
            disableActive
            isOpen={this.state.table_dialog}
            onCloseModal={() => this.handleDialog('table_dialog')}
            onClickItem={this.handleTableItem}
            carts={carts}
            tables={tables} />

          <Button variant="fab" disabled={item.is_checkout} onClick={() => this.handleDialog('menu_dialog', true)} style={{ position: 'fixed', bottom: '1.5rem', left: '1.5rem' }}>
            <RestaurantMenu />
          </Button>


          <div style={{ marginTop: '7rem' }}></div>
        </div>
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
    fetchProductsIfNeeded,
    fetchTablesIfNeeded,
    createTransaction,
    saveOrders,
    saveOrderStatus
  }, dispatch)
};

const mapStateToProps = ({ categories, tables, carts, product }) => ({
  categories,
  tables,
  carts,
  product
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

