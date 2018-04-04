import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom'

import Paper from 'material-ui/Paper';
import { MenuList, MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import Collapse from 'material-ui/transitions/Collapse';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import { getCarts } from '../actions/cartActions'
import io from 'socket.io-client'
import { url } from '../constants/config'
const socket = io(url.api)


class AdminNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
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
  handleDialog = (key, open = false) => {
    console.log()
    this.setState({ [key]: open })
  }
  handleNavigate = (route) => {
    this.props.history.push(route)
  }
  render() {
    const { carts } = this.props.navigation
    const checkout = carts.items.filter(item => {
      return item.is_checkout
    })
    return <Paper className="nav" style={{ minWidth: '200px' }}>
      <List>
        <ListItem button onClick={() => this.handleDialog('open', !this.state.open)}>
          <ListItemText primary="Inbox" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </List>

      <Collapse in={this.state.open} timeout="auto" unmountOnExit>
        <MenuList>

          <MenuItem onClick={() => this.handleNavigate('/users')}><NavLink to="/users" activeClassName="active">Users</NavLink></MenuItem>
          <MenuItem onClick={() => this.handleNavigate('/products')}><NavLink to="/products" activeClassName="active">Products</NavLink></MenuItem>
          <MenuItem onClick={() => this.handleNavigate('/categories')}><NavLink to="/categories" activeClassName="active">Categories</NavLink></MenuItem>
          <MenuItem onClick={() => this.handleNavigate('/tables')}><NavLink to="/tables" activeClassName="active">Tables</NavLink></MenuItem>
        </MenuList>
      </Collapse>

      <MenuList>

        <MenuItem onClick={() => this.handleNavigate('/admin/carts')}>
          <NavLink to="/admin/carts" activeClassName="active">Carts</NavLink>
          <IconButton aria-label="Comments">
            {
              !!checkout.length && <Badge badgeContent={checkout.length} color="primary">
                <span />
              </Badge>
            }
          </IconButton>
        </MenuItem>
        <MenuItem onClick={() => this.handleNavigate('/admin/transactions')}><NavLink to="/admin/transactions" activeClassName="active">Transactions</NavLink></MenuItem>
      </MenuList>
    </Paper>

  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getCarts
  }, dispatch)
};

const mapStateToProps = ({ navigation }) => ({
  navigation
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminNav);

