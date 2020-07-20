import React from 'react'
import { Button, Input, Form } from "antd"

const layout = {
  labelCol: { span: 2 },
  labelAlign: 'left',
  wrapperCol: { span: 8 }
}


class LoginForm extends React.Component {

  clean = data => {
    console.log(data)
    this.props.handleLogin({
      username: data.username,
      password: data.password
    })
  }

  render() {
    return (
      <React.Fragment>
        <h2>Login</h2>
        <Form {...layout} method='POST' onFinish={async(e) => await this.clean(e)}>
          <Form.Item label='Username' name='username' rules={[{required: true}]}>
            <Input/>
          </Form.Item>
          <Form.Item label='Password' name='password' rules={[{required: true}]}>
            <Input type='password'/>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>Login</Button>
          </Form.Item>
        </Form>
      </React.Fragment>
    )
  }
}

export default LoginForm
