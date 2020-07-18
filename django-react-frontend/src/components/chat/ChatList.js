import React from 'react'
import { Spin, Menu } from 'antd'
import { Link } from "react-router-dom"
import fetchJson from '../../remote'


class ChatList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  // After the component did mount, we set the state each second.
  componentDidMount = () => {
    this.fetchRooms();
  }

  fetchRooms = async() => {
    this.setState({
      rooms: await fetchJson('/api/v2/chat-group/'),
      loaded: true
    })
  }

  getRoomList = () => {
    const rooms = this.state.rooms.map((el, index) =>
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
