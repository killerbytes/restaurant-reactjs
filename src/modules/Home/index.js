import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import NavigationCheck from 'material-ui-icons/Check';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import ActionHome from 'material-ui-icons/Home';

import { fetchCategoriesIfNeeded } from '../../actions/categoryActions'
import { fetchTablesIfNeeded } from '../../actions/tableActions'
import { saveCart, getCarts } from '../../actions/cartActions'
import { fetchProductsIfNeeded } from '../../actions/productActions'

import Menu from '../../components/Menu'
import TablePicker from '../../components/TablePicker'
import Orders from '../../components/Orders'

import { url } from '../../constants/config'
import io from 'socket.io-client'
const socket = io(url.api)

const getInitialState = () => {
  return {
    menu_dialog: false,
    table_dialog: true,
    table: {},
    orders: []
  }
}
class Home extends React.Component {
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
    this.props.fetchCategoriesIfNeeded()
    this.props.fetchTablesIfNeeded()
    this.props.fetchProductsIfNeeded()
    this.props.getCarts()
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


    this.setState({ orders })
  }

  handleTableItem = (item, cart) => {
    const { orders } = this.state
    if (cart) {
      this.props.history.push(`/carts/${cart.id}`)
    }
    else {
      this.setState({
        table: item
      })
      if (!orders.length) {
        this.handleDialog('menu_dialog', true)
      }
      this.handleDialog('table_dialog')
    }
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
    if (item.quantity <= 0) {
      const removeIndex = orders.findIndex(i => i.product_id === item.product_id)
      orders.splice(removeIndex, 1)
    }
    this.setState({
      orders
    })
  }

  submit = () => {
    const { orders, table } = this.state
    if (!table.name) {
      this.handleDialog('table_dialog', true)
      return false
    }
    const cart = {
      name: table.name,
      table_id: table.id,
      orders
    }
    this.props.saveCart(cart)
    this.setState(getInitialState())
  }

  render() {
    const { tables, carts, product } = this.props
    const { table, orders } = this.state
    return <div className="container">
      <AppBar>
        <Toolbar>
          <IconButton onClick={() => this.handleDialog('table_dialog', true)} color="inherit" aria-label="Menu">
            <ActionHome />
          </IconButton>
          <Typography variant="title" style={{ flex: 1 }}>
            {table.name || 'Orders'}
          </Typography>
          <Button onClick={() => this.handleDialog('menu_dialog', true)}>Menu</Button>
        </Toolbar>
      </AppBar>
      <div className="main bg">
        {
          orders.length
            ?
            <section>
              <Orders
                onAdd={this.increaseQty}
                onRemove={this.decreaseQty}
                items={orders} />

              <Button variant="fab" onClick={this.submit} style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}>
                <NavigationCheck />
              </Button>

            </section>
            : null
        }
      </div>

      <TablePicker
        isOpen={this.state.table_dialog}
        onCloseModal={() => this.handleDialog('table_dialog')}
        onClickItem={this.handleTableItem}
        carts={carts}
        tables={tables} />

      <Menu
        isOpen={this.state.menu_dialog}
        onCloseModal={() => this.handleDialog('menu_dialog')}
        onClickItem={this.handleMenuItem}
        product={product} />


    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchCategoriesIfNeeded,
    fetchTablesIfNeeded,
    fetchProductsIfNeeded,
    saveCart,
    getCarts
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
)(Home);
