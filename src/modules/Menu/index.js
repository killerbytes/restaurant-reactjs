import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shortid from 'shortid'

import { fetchCategoriesIfNeeded } from '../../actions/categoryActions'
import { fetchTablesIfNeeded } from '../../actions/tableActions'
import { fetchMenuIfNeeded } from '../../actions/menuActions'
import { saveCart, fetchCarts } from '../../actions/cartActions'

import MenuItem from '../../components/MenuItem'

import { Link } from "react-router-dom";

class Menu extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      orders: [],
      amount: 0
    }
  }

  componentDidMount(){
    this.props.fetchCategoriesIfNeeded()
    this.props.fetchTablesIfNeeded()
    this.props.fetchMenuIfNeeded()
  }

  menuItemClick = (item) =>{
    const { orders, amount } = this.state
    const { price, id, name } = item
    let total = amount + parseFloat(price)
    orders.push({
      amount: price,
      quantity: 1,
      product_id: id,
      name
    })
    this.setState({
      orders,
      amount: total
    })
  }

  submit =()=>{
    const {orders} = this.state
    const { tables, match: {params} } = this.props

    const table = tables.items.find(item => item.id==params.id)
    const cart = {
      name: table.name,
      table_id: table.id,
      orders
    }
    this.props.saveCart(cart).then(res=>{
      this.props.fetchCarts()
      this.props.history.push('/')
    })
  }

  render(){
    const { orders } = this.state
    const { menu } = this.props
    const mappedOrders = orders.map(item=>{
      return <li key={shortid.generate()}>{item.name}, {item.amount}</li>
    })
    const mappedMenu = menu.items.map(item=> <MenuItem key={item.id} item={item} onClick={this.menuItemClick } />)
    const {amount} = this.state
    return <div>
      <h1>Menu</h1>
      <div>{ mappedMenu }</div>
      <h1>Orders</h1>
      <ul>{ mappedOrders }</ul>
      Total: {amount}
      <button onClick={this.submit}>Submit</button>
    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchCategoriesIfNeeded,
    fetchTablesIfNeeded,
    fetchMenuIfNeeded,
    saveCart,
    fetchCarts
  }, dispatch)
};

const mapStateToProps = ({categories, tables, menu}) => ({
  categories,
  tables,
  menu
});


export default connect(
  mapStateToProps,  
  mapDispatchToProps
)(Menu);
