import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom'

import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';

import { fetchProfileIfNeeded, logout } from '../actions/authActions'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: false,
      anchorEl: null,
    }
  }
  componentDidMount() {
    this.props.fetchProfileIfNeeded()
  }
  handleDialog = (key, open = false) => {
    this.setState({ [key]: open })
  }
  handleMenu = (e) => {
    this.setState({
      menu: true,
      anchorEl: e.target
    })
  }
  handleLogoutClick = () => {
    this.props.logout()
  }
  handleNavigate = (route) => {
    this.props.history.push(route)
  }

  render() {
    const { auth } = this.props

    return <div style={this.props.style}>
      {auth.me && auth.me.name}

      <IconButton
        aria-haspopup="true"
        color="inherit"
        onClick={this.handleMenu}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={this.state.anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={this.state.menu}
        onClose={() => this.handleDialog('menu')}
      >
        <MenuItem><NavLink to="/profile" activeClassName="active">Profile</NavLink></MenuItem>
        <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchProfileIfNeeded,
    logout
  }, dispatch)
};

const mapStateToProps = ({ auth }) => ({
  auth
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
