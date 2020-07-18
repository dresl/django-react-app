import React from 'react'
import fetchJson from '../../remote'
import BaseRouter from '../../router/Router'
import Component from '../../base/Component'

class AuthenticationService extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedIn: localStorage.getItem('token') ? true : false,
      username: ''
    }
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ loggedIn: false, username: '' });
  };

  handleLogin = async(e, data) => {
    e.preventDefault();
    console.log(e)
    console.log(data)
    let response = await fetchJson('/api/v2/auth/', {
      'Content-Type': 'application/json'
    }, 'POST', JSON.stringify(data))
    console.log(response)
    if (response) {
      localStorage.setItem('token', response.token);
      this.setState({
        loggedIn: true,
        username: response.user.username
      })
    }
  }

  handleSignup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/core/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          loggedIn: true,
          username: json.username
        });
      });
  };

  componentWillUnmount() {
    this.setState = (_,__) => console.log
  }

  componentDidMount = async () => {
    if (this.state.loggedIn) {
      console.log('checking...')
      let response
      response = await fetchJson('/api/v2/base/current-user/', {
        Authorization: `JWT ${localStorage.getItem('token')}`
      })
      console.log(response)
      if (response === null) {
        this.setState({
          loggedIn: false,
          username: '',
        })
        localStorage.removeItem('token')
      } else {
        this.setState({
          username: response.username
        })
      }
    }
  }

  render = () => {
    return <BaseRouter authData={{
                        loggedIn: this.state.loggedIn, username: this.state.username
                      }} handleLogin={this.handleLogin} handleSignup={this.handleSignup} handleLogOut={this.handleLogout}/>
  }
}

export default AuthenticationService
