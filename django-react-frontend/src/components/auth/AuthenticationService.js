import React from 'react'
import { fetchJson, NotificationService } from '../../utils'
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
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token)
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
    NotificationService.openNotification('success', 'You have successfully logged out')
  }

  handleLogin = async(data) => {
    console.log(data)
    let response = await fetchJson('/api/v2/auth/token/', {
      'Content-Type': 'application/json'
    }, 'POST', JSON.stringify(data))
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token)
      if (this._isMounted) {
        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      }
      this.refreshAuthTokenInterval()
      NotificationService.openNotification('success', 'You have successfully logged in')
    } else if (response.status === 400) {
      NotificationService.openNotification('error', 'Your username or password is not correct')
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
      let response = await fetchJson('/api/v2/base/current-user/', {
        Authorization: `JWT ${localStorage.getItem('token')}`
      })
      if (this._isMounted && response.status === 200) {
        if (response) {
          this.setState({
            username: response.data.username
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
