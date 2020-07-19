import React from 'react'
import fetchJson from '../../remote'
import BaseRouter from '../../router/Router'

var refreshInterval;


class AuthenticationService extends React.Component {

  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      loggedIn: localStorage.getItem('token') ? true : false,
      username: ''
    }
  }

  kickUser = () => {
    if (this._isMounted) {
      this.setState({
        loggedIn: false,
        username: '',
      })
    }
    localStorage.removeItem('token')
    clearInterval(refreshInterval)
  }

  refreshAuthToken = async() => {
    console.log('refreshing token...')
      let response = await fetchJson('/api/v2/auth/token/refresh/', {
        'Content-Type': 'application/json'
      }, 'POST', JSON.stringify({
        'token': localStorage.getItem('token')
      }))
      if (response) {
        localStorage.setItem('token', response.token)
        console.log(response)
      } else {
        this.kickUser()
      }
  }

  refreshAuthTokenInterval = async() => {
    refreshInterval = setInterval(async() => {
      this.refreshAuthToken()
    }, 14*60*1000)
  }

  handleLogout = () => {
    this.kickUser()
  }

  handleLogin = async(e, data) => {
    e.preventDefault()
    console.log(e)
    console.log(data)
    let response = await fetchJson('/api/v2/auth/token/', {
      'Content-Type': 'application/json'
    }, 'POST', JSON.stringify(data))
    if (response) {
      localStorage.setItem('token', response.token)
      if (this._isMounted) {
        this.setState({
          loggedIn: true,
          username: response.user.username
        })
      }
      this.refreshAuthTokenInterval()
    }
  }

  handleSignup = (e, data) => {
    e.preventDefault()
    fetch('http://localhost:8000/core/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token)
        this.setState({
          loggedIn: true,
          username: json.username
        })
      })
  }

  componentDidMount = async () => {
    this._isMounted = true
    if (this.state.loggedIn) {
      console.log('checking...')
      let response
      response = await fetchJson('/api/v2/base/current-user/', {
        Authorization: `JWT ${localStorage.getItem('token')}`
      })
      if (this._isMounted) {
        if (response) {
          this.setState({
            username: response.username
          })
          console.log('proclo')
          this.refreshAuthToken()
          this.refreshAuthTokenInterval()
        } else {
          this.kickUser()
        }
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render = () => {
    return <BaseRouter authData={{
                        loggedIn: this.state.loggedIn, username: this.state.username
                      }} handleLogin={this.handleLogin} handleSignup={this.handleSignup} handleLogOut={this.handleLogout}/>
  }
}

export default AuthenticationService
