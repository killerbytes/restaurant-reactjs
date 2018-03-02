import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import axios from 'axios'


import registerServiceWorker from './registerServiceWorker';
import store from './store'

import Home from "./modules/Home";
import Menu from "./modules/Menu";
import Cart from "./modules/Cart";


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
    return <div>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/menu/:id" component={Menu} />
          <Route path="/carts/:id" component={Cart} />
        </Switch>
      </div>;
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
