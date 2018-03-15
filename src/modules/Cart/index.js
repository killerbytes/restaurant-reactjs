import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import NavigationClose from 'material-ui-icons/Close';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import ContentAdd from 'material-ui-icons/Add';
import Paper from 'material-ui/Paper';

import { getTotals } from '../../utils'
import { getCart, getCarts, moveCustomer, checkoutCart } from '../../actions/cartActions'
import { saveTransaction } from '../../actions/transactionActions'
import { fetchMenuIfNeeded } from '../../actions/menuActions'
import { saveOrders } from '../../actions/orderActions'
import { fetchTablesIfNeeded } from '../../actions/tableActions'

import Menu from '../../components/Menu'
import Orders from '../../components/Orders'
import TablePicker from '../../components/TablePicker'


const getInitialState = () => {
  return {
    isOpenMenu: false,
    isOpenTablePicker: false,
    table: {},
    orders: []
  }
}

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = getInitialState()
  }
  componentDidMount() {
    const { match: { params } } = this.props
    this.props.fetchTablesIfNeeded()
    this.props.getCarts()
    this.props.getCart(params.id)
    this.props.fetchMenuIfNeeded()


  }

  checkout = () => {
    const { checkoutCart, getCart, match: { params }, carts: { item } } = this.props
    checkoutCart(item.id).then(res => {
      getCart(params.id)
    })


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
  handleTablePicker = (isOpenTablePicker = false) => {
    this.setState({ isOpenTablePicker })
  }
  handleTableItem = (item) => {
    const { carts, match: { params } } = this.props
    const { name, id } = item
    this.props.moveCustomer({
      id: carts.item.id,
      name: name,
      table_id: id
    }).then(res => {
      this.props.fetchTablesIfNeeded()
      this.props.getCarts()
      this.props.getCart(params.id)
      this.handleTablePicker()

    })
  }

  handleMenu = (isOpenMenu = false) => {
    this.setState({ isOpenMenu })
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
    const { carts: { item } } = this.props
    this.props.saveOrders(orders, item.id)
      .then(res => {
        this.props.getCart(item.id)
        this.setState(getInitialState())
      })
  }

  render() {
    const { carts, menu, tables } = this.props
    const { orders } = this.state
    const item = carts.item
    const total = getTotals(item.orders)
    const mappedOrders = item.orders.map(item => {
      return <TableRow key={item.id}>
        <TableCell style={{ whiteSpace: 'normal' }}>{item.product.name}</TableCell>
        <TableCell style={{ width: 70, textAlign: 'right' }}>{item.quantity}</TableCell>
        <TableCell style={{ width: 70, textAlign: 'right' }}>{parseFloat(item.price).toFixed(2)}</TableCell>
        <TableCell style={{ width: 70, textAlign: 'right' }}>{(item.quantity * item.price).toFixed(2)}</TableCell>
      </TableRow>
    })

    return <div className="container">
      <AppBar>
        <Toolbar>
          <IconButton onClick={() => this.props.history.push('/')}><NavigationClose /></IconButton>
          <Typography onClick={() => this.handleTablePicker(true)} variant="title" style={{ flex: 1 }}>{item && item.customer.name}</Typography>
          <Button variant="raised" color="secondary" disabled={item.is_checkout} onClick={this.checkout}>Checkout</Button>
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
                  <TableCell numeric>Quantity</TableCell>
                  <TableCell numeric>Unit Price</TableCell>
                  <TableCell numeric>Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {mappedOrders}
                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell style={{ textAlign: 'right', fontWeight: 'bold' }}>Total</TableCell>
                  <TableCell style={{ width: 70, textAlign: 'right', fontWeight: 'bold' }}>{total.amount_due.toFixed(2)}</TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </Paper>

          {orders.length
            ?
            <div>
              <Paper className="mb">
                <Toolbar>
                  <Typography variant="subheading">Additional Orders</Typography>
                </Toolbar>
                <Orders
                  onAdd={this.increaseQty}
                  onRemove={this.decreaseQty}
                  items={orders} />
              </Paper>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button color="secondary" variant="raised" onClick={this.handleAdditionalOrders}>Add Order</Button>
              </div>
            </div>
            :
            (null)
          }

          {menu && <Menu
            isOpen={this.state.isOpenMenu}
            onCloseModal={this.handleMenu}
            onClickItem={this.handleMenuItem}
            menu={menu} />}

          <TablePicker
            isOpen={this.state.isOpenTablePicker}
            onCloseModal={this.handleTablePicker}
            onClickItem={this.handleTableItem}
            carts={carts}
            tables={tables} />

          <Button variant="fab" onClick={() => this.handleMenu(true)} style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}>
            <ContentAdd />
          </Button>
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
    saveTransaction,
    saveOrders
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

