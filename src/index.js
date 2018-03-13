import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import registerServiceWorker from './registerServiceWorker';
import store from './store'
import './sass/main.css'

import Home from "./modules/Home";
import Cart from "./modules/Cart";
import AdminCartList from "./modules/admin/Carts";
import AdminCartDetail from "./modules/admin/Carts/Detail";
import AdminTransactions from "./modules/admin/Transactions";
import AdminTransactionDetail from "./modules/admin/Transactions/Detail";


// axios.interceptors.response.use(
//   res => {
//     return res;
//   },
//   err => {
//     if(err.request.status === 401){
//       window.location = `/`;
//       sessionStorage.setItem('redirect', window.location.pathname )
//     }    
//   }
// );

class App extends React.Component {
  render() {
    return <MuiThemeProvider>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/carts/:id" component={Cart} />
        <Route path="/admin/transactions/:id" component={AdminTransactionDetail} />
        <Route path="/admin/transactions" component={AdminTransactions} />
        <Route path="/admin/carts/:id" component={AdminCartDetail} />
        <Route path="/admin/carts" component={AdminCartList} />
      </Switch>
    </MuiThemeProvider>;
  }
}


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
