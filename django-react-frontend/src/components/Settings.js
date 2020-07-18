import React from "react"
import { Button, Divider, Input, Form, Typography } from "antd"

const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 8 }
}

const tailLayout = {
    wrapperCol: { offset: 3, span: 16 },
};

class Settings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hassHost: null,
            hassAccessToken: null
        }
    }

    componentDidMount = () => {
        this.setState({
            hassHost: localStorage.getItem('hass-host'),
            hassAccessToken: localStorage.getItem('hass-token')
        })
    }

    clean = (data) => {
        localStorage.setItem('hass-host', data.hass_host ?? localStorage.getItem('hass-host'))
        localStorage.setItem('hass-token', data.hass_access_token ?? localStorage.getItem('hass-token'))
        this.setState({
            hassHost: data.hass_host ?? localStorage.getItem('hass-host'),
            hassAccessToken: data.hass_access_token ?? localStorage.getItem('hass-token')
        })
    }

    render = () => {
        return (
            <React.Fragment>
                <h2>Settings</h2>
                <Divider/>
                <h3>Home assistant config</h3>
                <Form {...layout} method='POST' onFinish={this.clean}>
                    <Form.Item label='Host' name='hass_host' style={{marginBottom: 0}}>
                        <Input/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        {this.state.hassHost ? <Typography.Text>
                            Current: <Typography.Text style={{fontWeight: 'bold'}}>{this.state.hassHost}</Typography.Text>
                        </Typography.Text> : ''}
                    </Form.Item>
                    <Form.Item label='Access token' name='hass_access_token' style={{marginBottom: 0}}>
                        <Input/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        {this.state.hassAccessToken ? <Typography.Text>Current: {this.state.hassAccessToken.slice(0, 10) + '...'}</Typography.Text> : '' }
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>Save</Button>
                    </Form.Item>
                </Form>
            </React.Fragment>
        )
    }
}

export default Settings
