import React from "react"
import { withRouter } from "react-router-dom"
import fetchJson from '../../remote'

class ChatDetail extends React.Component {

  _isMounted = false

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
    this._isMounted = true
    this.setState({
      roomId: this.props.match.params.roomId
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    // At this point, we're in the "commit" phase, so it's safe to load the new data.
    if (prevState.roomId !== this.state.roomId) {
      let roomData = await ChatDetail.getRoomData(this.state.roomId)
      if (this._isMounted)
        this.setState(roomData)
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.roomId !== prevState.roomId)
      return { roomId: nextProps.match.params.roomId }
    return null
  }

  componentWillUnmount() {
    this._isMounted = false
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

export default withRouter(ChatDetail)
