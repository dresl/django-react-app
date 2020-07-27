import React from 'react'
import { Button, Input, Form, Alert, Row, Col } from "antd"
import { FormInstance } from 'antd/lib/form';
import { fetchJson } from '../../utils';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    lg: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    lg: { span: 8 },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    lg: {
      span: 8,
      offset: 4,
    },
  },
}

const formItemRules = [{
    required: true,
    message: 'This field is required'
  }]


class SignUpForm extends React.Component {

  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      signUpOK: true
    }
  }

  static validateUsername = async (value) => {
    console.log(value)
    let response = await fetchJson.post('/api/v2/users/exists/', {
      username: value
    })
    console.log(response)
    return response.status === 200 ? response.data : { exists: false }
  }

  clean = async (data) => {
    this.setState({
      signUpOK: true
    })
    const res = await this.props.handleSignup(data)
    console.log(res)
    if (this._isMounted)
      this.setState({
        signUpOK: res
      })
  }

  showAlert = () => {
    return <Alert message="Something went wrong" type="error" showIcon />
  }

  componentDidMount = () => {
    this._isMounted = true
  }

  componentWillUnmount = () => {
    this._isMounted = false
  }

  checkPasswords = () => {
    return this.state.password1 === this.state.password2 ? true : false
  }

  render() {
    return (
      <React.Fragment>
        <h2>Sign Up</h2>
        <Form {...formItemLayout} method='POST' onFinish={async (data) => await this.clean(data)}>
          <Form.Item label='Username' name='username'
            rules={[...formItemRules,
            () => ({
              async validator(_, value) {
                if (value) {
                  const { exists } = await SignUpForm.validateUsername(value)
                  if (exists)
                    return Promise.reject('This username is already taken')
                }
                return Promise.resolve()
              }
            })]}>
            <Input autoComplete='off' />
          </Form.Item>
          <Form.Item label='First name' name='first_name' rules={formItemRules}>
            <Input />
          </Form.Item>
          <Form.Item label='Last name' name='last_name' rules={formItemRules}>
            <Input />
          </Form.Item>
          <Form.Item label='Password' name='password' rules={formItemRules} hasFeedback>
            <Input.Password/>
          </Form.Item>
          <Form.Item label='Password confirmation' name='password_confirm'
              dependencies={['password']}
              hasFeedback
              rules={[...formItemRules,
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value)
                      return Promise.resolve()
                    return Promise.reject('Passwords do not match')
                  }
                })]}>
            <Input.Password/>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit'>Sign Up</Button>
          </Form.Item>
          {!this.state.signUpOK ? this.showAlert() : ''}
        </Form>
      </React.Fragment>
    )
  }
}

export default SignUpForm
