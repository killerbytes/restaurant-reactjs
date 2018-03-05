import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import Subheader from 'material-ui/Subheader';
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { getTotals } from '../../utils'
import { fetchCart, fetchCarts, updateCustomer } from '../../actions/cartActions'
import { saveTransaction } from '../../actions/transactionActions'
import { fetchMenuIfNeeded } from '../../actions/menuActions'
import { saveOrders } from '../../actions/orderActions'
import { fetchTablesIfNeeded } from '../../actions/tableActions'

import Menu from '../../components/Menu'
import Orders from '../../components/Orders'
import TablePicker from '../../components/TablePicker'

const getInitialState=()=>{
  return {
    isOpenMenu: false,
    isOpenTablePicker: false,
    table: {},
    orders: []  
  }
}

class Cart extends React.Component{
  constructor(props){
    super(props)
    this.state = getInitialState()
  }
  componentDidMount(){
    const {match: {params}} = this.props
    this.props.fetchTablesIfNeeded()
    this.props.fetchCarts()
    this.props.fetchCart(params.id)
    this.props.fetchMenuIfNeeded()


  }

  checkout=()=>{
    // const { carts } = this.props

    // let transaction = {
    //   amount: this.totalOrderAmount,
    //   discount: 0,
    //   total_amount: this.totalOrderAmount,
    //   notes: 'test',
    //   cart_id: carts.item.id,
    //   user_id: 2
    // }

    // this.props.saveTransaction(transaction)
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
  handleTablePicker=(isOpenTablePicker=false)=>{
    this.setState({isOpenTablePicker})
  }
  handleTableItem=(item)=>{
    const {carts, match: {params}} = this.props
    const {name, id} = item
    this.props.updateCustomer({
      id: carts.item.id,
      name: name,
      table_id: id
    }).then(res=>{
      this.props.fetchTablesIfNeeded()
      this.props.fetchCarts()
      this.props.fetchCart(params.id)
      this.handleTablePicker()
  
    })
  }

  handleMenu=(isOpenMenu=false)=>{
    this.setState({isOpenMenu})
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
  }

  handleAdditionalOrders=()=>{
    const { orders } = this.state
    const { carts: {item} } = this.props
    this.props.saveOrders(orders, item.id)
      .then(res=>{
        this.props.fetchCart(item.id)
        this.setState(getInitialState())
      })
  }

  render(){
    const { carts, menu, tables } = this.props
    const { orders } = this.state
    const item = carts.item
    const total = getTotals(item.orders)
    const mappedOrders = item.orders.map(item=>{
      return <TableRow key={item.id} displayBorder={false} hoverable={true} selectable={false}> 
        <TableRowColumn style={{whiteSpace: 'normal'}}>{item.product.name}</TableRowColumn>
        <TableRowColumn style={{width: 70, textAlign: 'right'}}>{item.quantity}</TableRowColumn>
        <TableRowColumn style={{width: 70, textAlign: 'right'}}>{parseFloat(item.price).toFixed(2)}</TableRowColumn>
        <TableRowColumn style={{width: 70, textAlign: 'right'}}>{(item.quantity * item.price).toFixed(2)}</TableRowColumn>
      </TableRow>
    })
    
    return <div>
      <AppBar
        title={item && item.customer.name}
        onTitleClick={()=>this.handleTablePicker(true)}
        iconElementLeft={<IconButton onClick={()=> this.props.history.push('/') }><NavigationClose /></IconButton>}
        iconElementRight={<FlatButton label="Add Orders" onClick={()=>this.handleMenu(true)} />}  />
      <Table>
        <TableBody displayRowCheckbox={false}>
          {mappedOrders}
          <TableRow>
            <TableRowColumn />
            <TableRowColumn />
            <TableRowColumn style={{textAlign:'right', fontWeight: 'bold'}}>Total</TableRowColumn>
            <TableRowColumn style={{width: 70, textAlign: 'right', fontWeight: 'bold'}}>{total.amount_due.toFixed(2)}</TableRowColumn>
          </TableRow>
          
        </TableBody>
      </Table>
      
      { orders.length 
        ? 
          <div> 
            <Subheader>Add Orders</Subheader>
            <Orders
              onAdd={this.increaseQty}
              onRemove={this.decreaseQty}
              items={orders}/>
            <RaisedButton label="Order" onClick={this.handleAdditionalOrders}/>
          </div>
        :
          (null)
      }

      {menu && <Menu         
        isOpen={this.state.isOpenMenu }
        onCloseModal={this.handleMenu}
        onClickItem={this.handleMenuItem}
        menu={menu} />}

      <TablePicker 
        isOpen={this.state.isOpenTablePicker}
        onCloseModal={this.handleTablePicker }
        onClickItem={this.handleTableItem}
        carts={ carts }
        tables={tables} />

      <FloatingActionButton onClick={this.checkout} style={{position: 'fixed', bottom: '2rem', right: '2rem'}}>
        <ContentAdd />
      </FloatingActionButton>

    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchCart,
    fetchCarts,
    updateCustomer,
    fetchMenuIfNeeded,
    fetchTablesIfNeeded,
    saveTransaction,
    saveOrders
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
)(Cart);

