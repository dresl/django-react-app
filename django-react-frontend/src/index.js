import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router } from "react-router-dom"
import AuthenticationService from './components/auth/AuthenticationService'
import "weaveworks-ui-components/styles.scss"
import './assets/scss/global.scss'
import { ThemeProvider } from 'styled-components'
import theme from 'weaveworks-ui-components/lib/theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <AuthenticationService/>
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
