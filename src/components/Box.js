import React from 'react'
import Paper from 'material-ui/Paper';

export default class AdminLayout extends React.Component {
  render() {
    return (
      <Paper className="box" {...this.props}>
        <span></span>
        <div className="box-content" {...this.props}>
          {this.props.children}
        </div>
      </Paper>
    );
  }
}
