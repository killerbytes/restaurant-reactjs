import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { Switch, Route } from 'react-router-dom'
import { withRouter } from "react-router-dom";
import { push } from 'react-router-redux';

import { REDIRECT } from '../constants/actionTypes';

import AdminLayout from '../components/AdminLayout'
import Home from "./Home";
import Cart from "./Cart";
import Kitchen from "./Kitchen";
import AdminCartList from "./admin/Carts";
import AdminCartDetail from "./admin/Carts/Detail";
import AdminTransactions from "./admin/Transactions";
import Sales from "./admin/Transactions/Sales";

import AdminTransactionDetail from "./admin/Transactions/Detail";

function Layout({ layout, component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        React.createElement(
          layout,
          props,
          React.createElement(component, props)
        )}
    />
  );
}


class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      if (this.props.redirectTo !== nextProps.redirectTo) {

        nextProps.history.push('/admin/carts')
        this.props.onRedirect();
      }

    }
  }
  render() {
    return <Switch>

      <Route exact path="/" component={Home} />
      <Route path="/carts/:id" component={Cart} />
      <Route path="/kitchen" component={Kitchen} />
      <Layout layout={AdminLayout} path="/admin/carts/:id" component={AdminCartDetail} />
      <Layout layout={AdminLayout} path="/admin/carts" component={AdminCartList} />
      <Layout layout={AdminLayout} path="/admin/transactions/:id" component={AdminTransactionDetail} />
      <Layout layout={AdminLayout} path="/admin/transactions" component={AdminTransactions} />
      <Layout layout={AdminLayout} path="/admin/sales" component={Sales} />

    </Switch>
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    push,
    onRedirect: () =>
      dispatch({ type: REDIRECT })

  }, dispatch)
};

const mapStateToProps = ({ common }) => ({
  redirectTo: common.redirectTo
});


// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App))
