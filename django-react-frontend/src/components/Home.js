import React from "react";
import { Button, Spin, Divider } from "antd";
import fetchJson from '../remote';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const IconStyles = {
    fontSize: '17px',
    marginLeft: '5px',
}

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lowTarifSensorState: null
        }
    }

    fetchSensorData = async() => {
        this.setState({
            lowTarifSensorState: null
        })
        if (localStorage.getItem('hass-host')?.slice(0, 4) === 'http') {
            this.setState({
                lowTarifSensorState: await fetchJson('/api/states/binary_sensor.nocni_proud_2', localStorage.getItem('hass-host'), 'GET', {
                    'Authorization': 'Bearer ' + localStorage.getItem('hass-token')
                })
            })
        }
    }

    componentDidMount = async() => {
        await this.fetchSensorData()
    }

    getOnOffIcon = state => {return {
        on: <CheckCircleTwoTone style={IconStyles} twoToneColor="#52c41a"/>,
        off: <CloseCircleTwoTone style={IconStyles} twoToneColor="red"/>
    }[state] ?? null}

    render = () => {
        return (
            <React.Fragment>
                <h2>Django React App</h2>
                <span>Low tarif sensor state: {this.getOnOffIcon(this.state.lowTarifSensorState?.state) ?? <Spin/>}</span>
                <Divider style={{margin: 10}}/>
                <Button onClick={this.fetchSensorData}>Refresh</Button>
            </React.Fragment>
        )
    }
}

export default Home;
