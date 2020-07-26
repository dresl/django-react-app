import React from 'react'
import { Button, Input, Form, Alert } from "antd"

const layout = {
  labelCol: { span: 2 },
  labelAlign: 'left',
  wrapperCol: { span: 8 }
}


class LoginForm extends React.Component {

  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      authOK: true
    }
  }

  clean = async(data) => {
    this.setState({
      authOK: true
    })
    const res = await this.props.handleLogin({
      username: data.username,
      password: data.password
    })
    console.log(res)
    if (this._isMounted)
      this.setState({
        authOK: res
      })
  }

  showAlert = () => {
    return <Alert message="Your username or password is not correct" type="error" showIcon/>
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    return (
      <React.Fragment>
        <h2>Login</h2>
        <Form {...layout} method='POST' onFinish={async(data) => await this.clean(data)}>
          <Form.Item label='Username' name='username' rules={[{required: true}]}>
            <Input/>
          </Form.Item>
          <Form.Item label='Password' name='password' rules={[{required: true}]}>
            <Input type='password'/>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>Login</Button>
          </Form.Item>
          {!this.state.authOK ? this.showAlert() : ''}
        </Form>
      </React.Fragment>
    )
  }
}

export default LoginForm
