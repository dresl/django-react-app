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
    const data = {
      token: localStorage.getItem('token')
    }
    try {
      const response = await fetchJson.post('/api/v2/auth/token/refresh/', data)
      localStorage.setItem('token', response.data.token)
      console.log('Token refreshed')
    } catch(err) {
      this.kickUser()
    }
  }

  refreshAuthTokenInterval = async() => {
    refreshInterval = setInterval(async() => {
      this.refreshAuthToken()
    }, 1000)
  }

  handleLogout = () => {
    this.kickUser()
    NotificationService.openNotification('success', 'You have successfully logged out')
  }

  handleLogin = async(_data) => {
    console.log(_data)
    try {
      let response = await fetchJson.post('/api/v2/auth/token/', _data)
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
        fetchJson.defaults.headers.common['Authorization'] = `JWT ${localStorage.getItem('token')}`
        if (this._isMounted) {
          this.setState({
            loggedIn: true,
            username: response.data.user.username
          })
        }
        this.refreshAuthTokenInterval()
        NotificationService.openNotification('success', 'You have successfully logged in')
        return true
      }
    } catch(err) {
      if (err?.response?.status != 400)
        NotificationService.openNotification('error', 'Something went wrong')
      return false
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
      let response = await fetchJson('/api/v2/base/current-user/')
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
