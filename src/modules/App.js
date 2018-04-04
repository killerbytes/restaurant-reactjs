import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { Switch, Route, withRouter } from 'react-router-dom'
import { push } from 'react-router-redux';

import Snackbar from 'material-ui/Snackbar';

import { REDIRECT } from '../constants/actionTypes';
import { resetError } from '../actions/commonActions'

import ScrollToTop from '../components/ScrollTop'
import AdminLayout from '../components/AdminLayout'
import Home from "./Home";
import Cart from "./Cart";
import Kitchen from "./Kitchen";
import AdminCartList from "./admin/Carts";
import AdminCartDetail from "./admin/Carts/Detail";
import AdminTransactions from "./admin/Transactions";
import Sales from "./admin/Transactions/Sales";
import Products from "./Products";
import ProductNew from "./Products/New";
import ProductEdit from './Products/Edit'
import Categories from "./Categories";
import CategoryNew from "./Categories/New";
import CategoryEdit from './Categories/Edit'
import Tables from "./Tables";
import TableNew from "./Tables/New";
import TableEdit from './Tables/Edit'
import Users from "./Users";
import UserNew from "./Users/New";
import UserEdit from './Users/Edit'

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
  constructor(props) {
    super(props)
    this.state = {
      snackbar_dialog: false
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors && nextProps.errors.message) {
      this.handleDialog('snackbar_dialog', true)
    }
    if (nextProps.redirectTo) {
      if (this.props.redirectTo !== nextProps.redirectTo) {

        nextProps.history.push(nextProps.redirectTo)
        this.props.onRedirect();
      }

    }
  }
  handleDialog = (key, open = false) => {
    this.setState({ [key]: open })
  }

  handleOnClose = () => {
    this.props.resetError()
    this.handleDialog('snackbar_dialog')
  }

  render() {
    const { errors } = this.props
    return <ScrollToTop>

      <Switch>

        <Route exact path="/" component={Home} />
        <Route path="/carts/:id" component={Cart} />
        <Route path="/kitchen" component={Kitchen} />
        <Layout layout={AdminLayout} path="/admin/carts/:id" component={AdminCartDetail} />
        <Layout layout={AdminLayout} path="/admin/carts" component={AdminCartList} />
        <Layout layout={AdminLayout} path="/admin/transactions/:id" component={AdminTransactionDetail} />
        <Layout layout={AdminLayout} path="/admin/transactions" component={AdminTransactions} />
        <Layout layout={AdminLayout} path="/admin/sales" component={Sales} />
        <Layout layout={AdminLayout} path="/products/new" component={ProductNew} />
        <Layout layout={AdminLayout} path="/products/:id" component={ProductEdit} />
        <Layout layout={AdminLayout} exact path="/products" component={Products} />
        <Layout layout={AdminLayout} path="/categories/new" component={CategoryNew} />
        <Layout layout={AdminLayout} path="/categories/:id" component={CategoryEdit} />
        <Layout layout={AdminLayout} exact path="/categories" component={Categories} />
        <Layout layout={AdminLayout} path="/tables/new" component={TableNew} />
        <Layout layout={AdminLayout} path="/tables/:id" component={TableEdit} />
        <Layout layout={AdminLayout} exact path="/tables" component={Tables} />
        <Layout layout={AdminLayout} path="/users/new" component={UserNew} />
        <Layout layout={AdminLayout} path="/users/:id" component={UserEdit} />
        <Layout layout={AdminLayout} exact path="/users" component={Users} />

      </Switch>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={this.state.snackbar_dialog}
        onClose={this.handleOnClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{errors && errors.message}</span>}
      />
    </ScrollToTop>

  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    push,
    resetError,
    onRedirect: () =>
      dispatch({ type: REDIRECT })

  }, dispatch)
};

const mapStateToProps = ({ common, errors }) => ({
  errors,
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
