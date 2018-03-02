import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchCart } from '../../actions/cartActions'
import { saveTransaction } from '../../actions/transactionActions'

import OrderItem from '../../components/OrderItem'

class Cart extends React.Component{
  constructor(props){
    super(props)
    this.totalOrderAmount = 0;
  }
  componentDidMount(){
    const {match: {params}} = this.props
    this.props.fetchCart(params.id)


  }

  checkout=()=>{
    const { carts } = this.props

    let transaction = {
      amount: this.totalOrderAmount,
      discount: 0,
      total_amount: this.totalOrderAmount,
      notes: 'test',
      cart_id: carts.item.id,
      user_id: 2
    }

    this.props.saveTransaction(transaction)
  }

  render(){
    const { carts } = this.props
    let totalOrderAmount = 0
    console.log(carts)
    const mappedOrders = carts.item.orders.map(item=>{
      totalOrderAmount += parseFloat(item.product.price)
      this.totalOrderAmount = totalOrderAmount
      return <OrderItem key={item.id} item={item} />
    })
    return <div>
      Cart
      {mappedOrders}

      <div>
        <strong>Total: {totalOrderAmount}</strong>
      </div> 

      <button onClick={ this.checkout }>Checkout</button>
    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchCart,
    saveTransaction
  }, dispatch)
};

const mapStateToProps = ({categories, tables, carts}) => ({
  categories,
  tables,
  carts
});


export default connect(
  mapStateToProps,  
  mapDispatchToProps
)(Cart);
