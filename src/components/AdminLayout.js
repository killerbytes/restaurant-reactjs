import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import AdminNav from '../components/AdminNav'
export default class AdminLayout extends React.Component {
  render() {
    return (
      <div className="container">
        <AppBar>
          <Toolbar>
            <Typography variant="title">Admin</Typography>
          </Toolbar>
        </AppBar>

        <div className="main">
          <AdminNav {...this.props} />

          <section>
            {this.props.children}
          </section>
        </div>
      </div>
    );
  }
}
