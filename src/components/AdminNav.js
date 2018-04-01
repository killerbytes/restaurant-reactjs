import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
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
    const { carts } = this.props.navigation
    const checkout = carts.items.filter(item => {
      return item.is_checkout
    })
    return <Paper className="nav">
      <List component="nav">
        <ListItem button>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button onClick={() => this.handleNavigate('/products')}>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button onClick={() => this.handleNavigate('/categories')}>
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem button onClick={() => this.handleNavigate('/admin/carts')}>
          <ListItemText primary="Open Carts" />
          <ListItemSecondaryAction>
            <IconButton aria-label="Comments">
              {
                !!checkout.length && <Badge badgeContent={checkout.length} color="primary">
                  <span />
                </Badge>
              }
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button onClick={() => this.handleNavigate('/admin/transactions')}>
          <ListItemText primary="Transactions" />
        </ListItem>
      </List>
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

