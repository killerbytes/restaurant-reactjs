import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';

import registerServiceWorker from './registerServiceWorker';
import store from './store'
import './sass/main.css'

import App from "./modules/App";



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
      <CssBaseline />
      <Router>
        <App />

      </Router>
    </MuiThemeProvider>

  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
