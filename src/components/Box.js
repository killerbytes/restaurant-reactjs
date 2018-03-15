import React from 'react'
import Paper from 'material-ui/Paper';

export default class AdminLayout extends React.Component {
  render() {
    return (
      <Paper className="box">
        <span></span>
        <div className="box-content">
          {this.props.children}
        </div>
      </Paper>
    );
  }
}
