import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import AuthenticationService from './components/auth/AuthenticationService'
import './assets/scss/global.scss';

window.addEventListener('message', function (evt) {
  if (evt.source !== window || !evt.data) return
  if (evt.data.source === 'react-devtools-detector' && evt.data.reactBuildType === 'development') {
    console.warn("Injecting react prototype!")
    React.Component.prototype.__is_mounted__ = true
    React.Component.prototype.setState = function (partialState, callback) {
      if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null))
        throw Error( "setState(...): takes an object of state variables to update or a function which returns an object of state variables." )
      if (this.__is_mounted__) this.updater.enqueueSetState(this, partialState, callback, 'setState')
    }
    React.Component.prototype.componentWillUnmount = () => this.__is_mounted__ = false
  }
})

ReactDOM.render(
  <Router>
    <AuthenticationService/>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
