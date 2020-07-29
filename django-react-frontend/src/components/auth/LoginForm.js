import React from 'react'
import { Button, Input, Form, Alert } from "antd"
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const formItemRules = [{
  required: true,
  message: 'This field is required'
}]


class LoginForm extends React.Component {

  _isMounted = false
  buttonRef = React.createRef()

  constructor(props) {
    super(props)
    this.state = {
      authOK: true,
      loading: false
    }
  }

  clean = async(data) => {
    this.setState({
      authOK: true,
      loading: true
    })
    const res = await this.props.handleLogin(data)
    console.log(res)
    if (this._isMounted)
      this.setState({
        authOK: res,
        loading: false
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
        <Form className="login-form" method='POST' onFinish={async(data) => await this.clean(data)}>
          <Form.Item name='username' rules={formItemRules}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item name='password' rules={formItemRules}>
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button loading={this.state.loading} type='primary' htmlType='submit'>Login</Button>
          </Form.Item>
          {!this.state.authOK ? this.showAlert() : ''}
        </Form>
      </React.Fragment>
    )
  }
}

export default LoginForm
