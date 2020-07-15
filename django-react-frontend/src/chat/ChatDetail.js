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

class ChatDetail extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      roomName: false
    }
  }

  async getMessages(id) {
    await fetch(`${Constants.BACKEND_URL}/api/v2/chat-group/${id}`)
      .then(response => response.json())
      .then(data => this.setState({
        roomName: data.name
      }))
  }

  componentDidMount() {
    console.log(this.props.match.params.roomId)
    this.getMessages(this.props.match.params.roomId)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.getMessages(nextProps.match.params.roomId)
  }

  render() {
    return (
      <React.Fragment>
        <h1>Welcome to '{this.state.roomName}'</h1>
      </React.Fragment>
    )
  }
}

export default withRouter(ChatDetail);
