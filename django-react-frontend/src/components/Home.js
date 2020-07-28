import React from "react"
import { Button, Spin, Divider } from "antd"
import { fetchJson } from '../utils'
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import { ResourceDial, GraphEdge, GraphNode, Grid, GridColumn, GridRow, Button as WeaveButton } from 'weaveworks-ui-components'

const IconStyles = {
  fontSize: '17px',
  marginLeft: '5px',
}

var interval


class Home extends React.Component {

  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      lowTarifSensorState: null,
      memoryUsage: null
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

  fetchDummyMemoryInterval = async () => {
    interval = setInterval(async () => {
      await this.fetchDummyMemory()
    }, 5000)
  }

  fetchDummyMemory = async () => {
    try {
      let response = await fetchJson('/api/v2/chat-group/memory/')
      if (response.status === 200) {
        this.setState({
          memoryUsage: response.data['memory-usage']
        })
        console.log(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount = async () => {
    this._isMounted = true
    await this.fetchSensorData()
    await this.fetchDummyMemory()
    await this.fetchDummyMemoryInterval()
  }

  getOnOffIcon = state => {
    return {
      on: <CheckCircleTwoTone style={IconStyles} twoToneColor="#52c41a" />,
      off: <CloseCircleTwoTone style={IconStyles} twoToneColor="red" />
    }[state] ?? null
  }

  componentWillUnmount() {
    this._isMounted = false
    clearInterval(interval)
  }

  render = () => {
    return (
      <React.Fragment>
        <h2>Django React App</h2>
        <span>Low tarif sensor state: {this.getOnOffIcon(this.state.lowTarifSensorState?.state) ?? <Spin />}</span>
        <Divider style={{ margin: 10 }} />
        <Button onClick={this.fetchSensorData}>Refresh</Button>
        <Divider />
        <ResourceDial value={this.state.memoryUsage} label='Memory usage' />
        <Divider />
        <Grid>
          <GridRow>
            <GridColumn span={12}>
              <svg>
                <GraphNode
                  id='gn-1'
                  shape='pentagon'
                  label='Node 1'
                  isAnimated
                  contrastMode={false}
                  x={100}
                  y={80}
                  onMouseEnter={(e, callback) => {
                    console.log(this.props)
                  }}
                />
              </svg>
              <svg>
                <GraphEdge
                  id='ge-1'
                  waypoints={[{ x: 0, y: 80 }, { x: 150, y: 80 }]}
                  withArrow
                  isAnimated
                />
              </svg>
              <svg>
                <GraphNode
                  id='gn-2'
                  shape='circle'
                  label='Node 2'
                  isAnimated
                  contrastMode={false}
                  x={100}
                  y={80}
                />
              </svg>
            </GridColumn>
          </GridRow>
        </Grid>
      </React.Fragment>
    )
  }
}

export default Home
