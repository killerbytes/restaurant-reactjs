import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import { fetchCategoriesIfNeeded } from '../../actions/categoryActions'
import { fetchTablesIfNeeded } from '../../actions/tableActions'
import { fetchCarts } from '../../actions/cartActions'

import { Link } from "react-router-dom";

class Home extends React.Component{
  componentDidMount(){
    this.props.fetchCategoriesIfNeeded()
    this.props.fetchTablesIfNeeded()
    this.props.fetchCarts()
  }
  render(){
    const {tables, carts} = this.props
    const mappedTables = tables.items.map(item=>{
      const cart = carts.items.find(cart=> cart.table_id == item.id)
      console.log(cart, item.id)
      return <li key={item.id}>
        <Link to={`menu/${item.id}`}>{item.name}</Link> - 
        {  cart && <Link to={`carts/${cart.id}`}>Cart</Link>  }
      </li>
    })
    return <div>
      Home
      <ul>{mappedTables}</ul>
    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchCategoriesIfNeeded,
    fetchTablesIfNeeded,
    fetchCarts
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
)(Home);
