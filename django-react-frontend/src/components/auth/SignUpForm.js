import React from 'react';


class SignupForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState(prevstate => {
      const newState = { ...prevstate }
      newState[name] = value
      return newState
    })
  }

  render() {
    return (
      <form onSubmit={async(e) => await this.props.handleSignup(e, this.state)}>
        <h4>Sign Up</h4>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <input type="submit" />
      </form>
    );
  }
}

export default SignupForm
