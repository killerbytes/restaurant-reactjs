import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom'

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { MenuList, MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import { getCarts } from '../actions/cartActions'
import io from 'socket.io-client'
import { url } from '../constants/config'
const socket = io(url.api)


class AdminNav extends React.Component {
  constructor(props) {
    super(props)
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
  handleNavigate = (route) => {
    this.props.history.push(route)
  }
  render() {
    const { navigation: { carts }, auth: { me } } = this.props
    const checkout = carts.items.filter(item => {
      return item.is_checkout
    })

    const admin = () => {
      return (me && me.role === 'manager') || (me && me.role === 'admin') ?
        <MenuList>
          <MenuItem onClick={() => this.handleNavigate('/users')}><NavLink to="/users" activeClassName="active">Users</NavLink></MenuItem>
          <MenuItem onClick={() => this.handleNavigate('/products')}><NavLink to="/products" activeClassName="active">Products</NavLink></MenuItem>
          <MenuItem onClick={() => this.handleNavigate('/categories')}><NavLink to="/categories" activeClassName="active">Categories</NavLink></MenuItem>
          <MenuItem onClick={() => this.handleNavigate('/tables')}><NavLink to="/tables" activeClassName="active">Tables</NavLink></MenuItem>
          <Divider />
        </MenuList>
        : null
    }
    return <Paper className="nav" style={{ maxWidth: 200 }}>
      {admin()}

      <MenuList>

        <MenuItem onClick={() => this.handleNavigate('/carts')}>
          <NavLink to="/carts" activeClassName="active">Carts</NavLink>
          <IconButton aria-label="Comments">
            {
              !!checkout.length && <Badge badgeContent={checkout.length} color="primary">
                <span />
              </Badge>
            }
          </IconButton>
        </MenuItem>
        <MenuItem onClick={() => this.handleNavigate('/transactions')}><NavLink to="/transactions" activeClassName="active">Transactions</NavLink></MenuItem>
        <MenuItem onClick={() => this.handleNavigate('/sales')}><NavLink to="/sales" activeClassName="active">Sales</NavLink></MenuItem>
      </MenuList>
    </Paper>

  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getCarts
  }, dispatch)
};

const mapStateToProps = ({ navigation, auth }) => ({
  navigation,
  auth
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminNav);

