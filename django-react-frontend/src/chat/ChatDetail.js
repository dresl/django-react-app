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
import { Button } from "antd";
import fetchJson from '../remote';

class ChatDetail extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {}
  }

  static async getRoomData(id) {
    return {
      roomName: (await fetchJson(`/api/v2/chat-group/${id}`)).name,
      roomMessages: await fetchJson(`/api/v2/chat-group/${id}/messages`)
    }
  }

  componentDidMount() {
    this.setState({
      roomId: this.props.match.params.roomId
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    // At this point, we're in the "commit" phase, so it's safe to load the new data.
    if (prevState.roomId !== this.state.roomId)
      this.setState(await ChatDetail.getRoomData(this.state.roomId))
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.roomId !== prevState.roomId)
      return { roomId: nextProps.match.params.roomId }
    return null
  }

  render() {
    return (
      <React.Fragment>
        <h1>Welcome to '{this.state.roomName}'</h1>
        {this.state.roomMessages?.map((e, index) =>
          <p key={index}>{e.text}</p>
        )}
      </React.Fragment>
    )
  }
}

export default withRouter(ChatDetail);
