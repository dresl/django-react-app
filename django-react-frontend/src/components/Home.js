import React from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  withRouter
} from "react-router-dom";
import { Button, Spin, Divider } from "antd";
import fetchJson from '../remote';

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
        this.setState({
            lowTarifSensorState: await fetchJson('/api/states/binary_sensor.nocni_proud_2', 'http://hass:8123', 'GET', {
                'Authorization': 'Bearer ' + localStorage.getItem('hass-token')
            })
        })
    }

    componentDidMount = async() => {
        await this.fetchSensorData()
    }

    render = () => {
        return (
            <React.Fragment>
                <h2>Django React App</h2>
                <span>Low tarif sensor state: {this.state.lowTarifSensorState?.state ?? <Spin/>}</span>
                <Divider style={{margin: 10}}/>
                <Button onClick={this.fetchSensorData}>Refresh</Button>
            </React.Fragment>
        )
    }
}

export default Home;
