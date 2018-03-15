import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';


import registerServiceWorker from './registerServiceWorker';
import store from './store'
import './sass/main.css'

import AdminLayout from './components/AdminLayout'
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
  render() {
    return <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/carts/:id" component={Cart} />
      <Layout layout={AdminLayout} path="/admin/carts/:id" component={AdminCartDetail} />
      <Layout layout={AdminLayout} path="/admin/carts" component={AdminCartList} />
      <Layout layout={AdminLayout} path="/admin/transactions/:id" component={AdminTransactionDetail} />
      <Layout layout={AdminLayout} path="/admin/transactions" component={AdminTransactions} />

    </Switch>
  }
}


const theme = createMuiTheme({
  palette: {
    primary: {
      // light: '#f9683a',
      main: '#e65100'
      // dark: '#870000',
      // contrastText: '#FFF'
    },
    secondary: {
      // light: '#ffa040',
      main: '#f57f17',
      // dark: '#c43e00',
      // contrastText: '#FFF',
    },
    // error: will us the default color
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>

      <Router>
        <App />
      </Router>
    </MuiThemeProvider>

  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
