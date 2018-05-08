import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import Nav from '../components/Nav'
import Profile from '../components/Profile'

export default class AdminLayout extends React.Component {
  render() {
    return (
      <div className="container">
        <AppBar>
          <Toolbar className="header-toolbar">
            <Typography variant="title" style={{ flex: 1 }}>Admin</Typography>
            <Profile />

          </Toolbar>
        </AppBar>

        <div className="main">
          <Nav {...this.props} />

          <section>
            {this.props.children}
          </section>
        </div>
      </div>
    );
  }
}
