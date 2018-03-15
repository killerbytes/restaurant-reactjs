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
import Paper from 'material-ui/Paper';

import { fetchCategoriesIfNeeded } from '../../actions/categoryActions'
import { fetchTablesIfNeeded } from '../../actions/tableActions'
import { saveCart, getCarts } from '../../actions/cartActions'
import { fetchMenuIfNeeded } from '../../actions/menuActions'

import Menu from '../../components/Menu'
import TablePicker from '../../components/TablePicker'
import Orders from '../../components/Orders'

const getInitialState = () => {
  return {
    isOpenMenu: false,
    isOpenTablePicker: true,
    table: {},
    orders: []
  }
}
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = getInitialState()
  }
  componentDidMount() {
    this.props.fetchCategoriesIfNeeded()
    this.props.fetchTablesIfNeeded()
    this.props.fetchMenuIfNeeded()
    this.props.getCarts()
  }
  handleTableItem = (item) => {
    this.handleMenu(true)
  }

  handleMenu = (isOpenMenu = false) => {
    this.setState({ isOpenMenu })
  }

  handleTablePicker = (isOpenTablePicker = false) => {
    this.setState({ isOpenTablePicker })
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
        this.handleMenu(true)
      }
      this.handleTablePicker()
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
      this.handleTablePicker(true)
      return false
    }
    const cart = {
      name: table.name,
      table_id: table.id,
      orders
    }
    this.props.saveCart(cart).then(res => {
      this.props.getCarts()
      this.setState(getInitialState())
    })
  }

  render() {
    const { tables, carts, menu } = this.props
    const { table, orders } = this.state
    return <div className="container">
      <AppBar>
        <Toolbar>
          <IconButton onClick={() => this.handleTablePicker(true)} color="inherit" aria-label="Menu">
            <ActionHome />
          </IconButton>
          <Typography variant="title" style={{ flex: 1 }}>
            {table.name || 'Orders'}
          </Typography>
          <Button onClick={() => this.handleMenu(true)}>Menu</Button>
        </Toolbar>
      </AppBar>
      <div className="main bg">
        {
          orders.length
            ?
            <section>
              <Paper>
                <Orders
                  onAdd={this.increaseQty}
                  onRemove={this.decreaseQty}
                  items={orders} />

                <Button variant="fab" onClick={this.submit} style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}>
                  <NavigationCheck />
                </Button>

              </Paper>
            </section>
            : null
        }
      </div>

      <TablePicker
        isOpen={this.state.isOpenTablePicker}
        onCloseModal={this.handleTablePicker}
        onClickItem={this.handleTableItem}
        carts={carts}
        tables={tables} />
      <Menu
        isOpen={this.state.isOpenMenu}
        onCloseModal={this.handleMenu}
        onClickItem={this.handleMenuItem}
        menu={menu} />


    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchCategoriesIfNeeded,
    fetchTablesIfNeeded,
    saveCart,
    getCarts,
    fetchMenuIfNeeded
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
)(Home);
