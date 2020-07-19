import React from 'react'
import { Spin, Menu } from 'antd'
import { Link } from "react-router-dom"
import fetchJson from '../../remote'


class ChatList extends React.Component {

  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  // After the component did mount, we set the state each second.
  componentDidMount = () => {
    this._isMounted = true
    this.fetchRooms()
  }

  fetchRooms = async() => {
    let response = await fetchJson('/api/v2/chat-group/', {
      Authorization: `JWT ${localStorage.getItem('token')}`
    })
    if (this._isMounted) {
      this.setState({
        rooms: response,
        loaded: true
      })
    }
  }

  getRoomList = () => {
    console.log(this.state)
    const rooms = this.state.rooms?.map((el, index) =>
      <Menu.Item key={index}><Link to={'/chat/' + el.id}>{el.name}</Link></Menu.Item>
    )

    return (
      <Menu
        mode="inline"
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {rooms}
      </Menu>
    )
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    if (!this.state.loaded)
      return <Spin />
    return (
      <React.Fragment>
        {this.getRoomList()}
      </React.Fragment>
    )
  }
}

export default ChatList
