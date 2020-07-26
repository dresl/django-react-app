import React from "react"
import { Button, Spin, Divider } from "antd"
import { fetchJson } from '../utils'
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'

const IconStyles = {
  fontSize: '17px',
  marginLeft: '5px',
}


class Home extends React.Component {

  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      lowTarifSensorState: null
    }
  }

  fetchSensorData = async () => {
    this.setState({
      lowTarifSensorState: null
    })
    if (localStorage.getItem('hass-host')?.slice(0, 4) === 'http') {
      let response = await fetchJson.get(localStorage.getItem('hass-host') + '/api/states/binary_sensor.nocni_proud_2', {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('hass-token') }
      })
      console.log(response)
      if (this._isMounted && response.status === 200) {
        this.setState({
          lowTarifSensorState: response.data
        })
      }
    }
  }

  componentDidMount = async () => {
    this._isMounted = true
    await this.fetchSensorData()
  }

  getOnOffIcon = state => {
    return {
      on: <CheckCircleTwoTone style={IconStyles} twoToneColor="#52c41a" />,
      off: <CloseCircleTwoTone style={IconStyles} twoToneColor="red" />
    }[state] ?? null
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render = () => {
    return (
      <React.Fragment>
        <h2>Django React App</h2>
        <span>Low tarif sensor state: {this.getOnOffIcon(this.state.lowTarifSensorState?.state) ?? <Spin />}</span>
        <Divider style={{ margin: 10 }} />
        <Button onClick={this.fetchSensorData}>Refresh</Button>
      </React.Fragment>
    )
  }
}

export default Home
