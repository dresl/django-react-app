import React from "react";
import { Button, Spin, Divider, Input, Form, Typography } from "antd";

const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 8 }
}

class Settings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hassAccessToken: null
        }
    }

    componentDidMount = () => {
        this.setState({
            hassAccessToken: localStorage.getItem('hass-token')
        })
    }

    clean = (data) => {
        localStorage.setItem('hass-token', data.access_token)
        this.setState({
            hassAccessToken: data.access_token
        })
    }

    render = () => {
        return (
            <React.Fragment>
                <h2>Settings</h2>
                <Divider/>
                <h3>Home assistant config</h3>
                <Form {...layout} method='POST' onFinish={this.clean}>
                    {this.state.hassAccessToken ? <span>Current: {this.state.hassAccessToken.slice(0, 10) + '...'}</span> : '' }
                    <Form.Item label='Access token' name='access_token' rules={[{ required: true, message: 'Access token is required'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>Save</Button>
                    </Form.Item>
                </Form>
            </React.Fragment>
        )
    }
}

export default Settings;
