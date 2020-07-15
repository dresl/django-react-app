import React from 'react';
import { Spin, Menu } from 'antd';
import Constants from '../constants';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import ChatDetail from './ChatDetail';


class ChatList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      rooms: []
    }
  }

  // Before the component mounts, we initialise our state
  componentWillMount = () => {
    this.setState({
      loaded: false
    })
  }

  // After the component did mount, we set the state each second.
  componentDidMount = () => {
    this.fetchRooms();
  }

  async fetchRooms() {
    await fetch(`${Constants.BACKEND_URL}/api/v2/chat-group/`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          rooms: data,
          loaded: true
        })
      })
  }

  getRoomList = () => {
    const rooms = []
    this.state.rooms.forEach((el, index) => rooms.push(
      <Menu.Item key={index}><Link to={'/chat/' + el.id}>{el.name}</Link></Menu.Item>
    ))

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

export default ChatList;
