import React from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  withRouter
} from "react-router-dom";
import Constants from '../constants';
import { Button, Spin } from "antd";
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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NzFmYTFmNDhkODE0NTgxODlhYTBhMmVkMmU1YWI0ZiIsImlhdCI6MTU5NDk5MTM3NSwiZXhwIjoxOTEwMzUxMzc1fQ.rRcu6pJ_wyy9bfyfvp0gsOOWNdg1iKBCM7uXqjnj4PE'
            })
        })
    }

    componentDidMount = async() => {
        await this.fetchSensorData()
    }

    render = () => {
        return (
            <React.Fragment>
                <h1>Hello from home!</h1>
                <p>Low tarif sensor state: {this.state.lowTarifSensorState?.state ?? <Spin/>}</p>
                <Button onClick={this.fetchSensorData}>Refresh</Button>
            </React.Fragment>
        )
    }
}

export default Home;

// curl -X GET   http://hass:8123/api/states/binary_sensor.nocni_proud_2   -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NzFmYTFmNDhkODE0NTgxODlhYTBhMmVkMmU1YWI0ZiIsImlhdCI6MTU5NDk5MTM3NSwiZXhwIjoxOTEwMzUxMzc1fQ.rRcu6pJ_wyy9bfyfvp0gsOOWNdg1iKBCM7uXqjnj4PE'
