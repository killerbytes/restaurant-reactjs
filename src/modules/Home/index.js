import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SvgIcon from 'material-ui/SvgIcon';
import ActionHome from 'material-ui/svg-icons/action/home';

import { fetchCategoriesIfNeeded } from '../../actions/categoryActions'
import { fetchTablesIfNeeded } from '../../actions/tableActions'
import { saveCart, fetchCarts } from '../../actions/cartActions'
import {fetchMenuIfNeeded} from '../../actions/menuActions'

import Menu from '../../components/Menu'
import TablePicker from '../../components/TablePicker'
import Orders from '../../components/Orders'

const getInitialState=()=>{
  return {
    isOpenMenu: false,
    isOpenTablePicker: false,
    table: {},
    orders: []  
  }
}
class Home extends React.Component{
  constructor(props){
    super(props)
    console.log('cons')
    this.state = getInitialState()
  }
  componentDidMount(){
    this.props.fetchCategoriesIfNeeded()
    this.props.fetchTablesIfNeeded()
    this.props.fetchMenuIfNeeded()
    this.props.fetchCarts()
  }
  handleTableItem=(item)=>{
    this.handleMenu(true)
  }
  handleMenu=(isOpenMenu=false)=>{
    this.setState({isOpenMenu})
  }

  handleTablePicker=(isOpenTablePicker=false)=>{
    this.setState({isOpenTablePicker})
  }

  handleMenuItem=(item)=>{
    const {orders} = this.state
    const { id, name, price } = item
    const exists = orders.find(i=>i.product_id === item.id)
    if(exists){
      exists.quantity += 1
		}else{
      orders.push({
        product_id: id,
        name,
        price,
        quantity: 1
      })
    }   


    this.setState({orders})
  }

  handleTableItem=(item, cart)=>{
    const {orders} = this.state
    if(cart){
      this.props.history.push(`/carts/${cart.id}`)
    }
    else{
      this.setState({
        table: item
      })
      if(!orders.length){
        this.handleMenu(true)
      }
      this.handleTablePicker()
    }
  }

  increaseQty=(item)=>{
    const {orders} = this.state
    item.quantity += 1
    this.setState({
      orders
    })
  }

  decreaseQty=(item)=>{
    const {orders} = this.state
    item.quantity -= 1
    if(item.quantity === 0){
      const removeIndex = orders.map((item)=> item.id).indexOf(item.id);
      orders.splice(removeIndex, 1)
    }
    this.setState({
      orders
    })
  }

  submit =()=>{
    const {orders, table} = this.state
    if(!table.name){
      this.handleTablePicker(true)
      return false
    }
    const cart = {
      name: table.name,
      table_id: table.id,
      orders
    }
    this.props.saveCart(cart).then(res=>{
      this.props.fetchCarts()
      this.setState(getInitialState())
    })
  }

  render(){
    const {tables, carts, menu} = this.props
    const { table, orders } = this.state
    return <div>
      <AppBar
        title={table.name || 'Orders'}
        iconElementLeft={<IconButton onClick={()=>this.handleTablePicker(true)}><ActionHome/></IconButton>}
        iconElementRight={<FlatButton label="Menu" onClick={()=>this.handleMenu(true)} />}  />
      
      <TablePicker 
        isOpen={this.state.isOpenTablePicker}
        onCloseModal={this.handleTablePicker }
        onClickItem={this.handleTableItem}
        carts={ carts }
        tables={tables} />
      <Menu         
        isOpen={this.state.isOpenMenu }
        onCloseModal={this.handleMenu}
        onClickItem={this.handleMenuItem}
        menu={menu} />

      { 
        orders.length
        ? 
          <div>
            <Orders
              onAdd={this.increaseQty}
              onRemove={this.decreaseQty}
              items={orders}/>

            <FloatingActionButton onClick={this.submit} style={{position: 'fixed', bottom: '2rem', right: '2rem'}}>
              <NavigationCheck />
            </FloatingActionButton>
            
          </div>
        : null
      }
      
      
    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchCategoriesIfNeeded,
    fetchTablesIfNeeded,
    saveCart,
    fetchCarts,
    fetchMenuIfNeeded
  }, dispatch)
};

const mapStateToProps = ({categories, tables, carts, menu}) => ({
  categories,
  tables,
  carts,
  menu
});


export default connect(
  mapStateToProps,  
  mapDispatchToProps
)(Home);
