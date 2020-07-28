import React from "react"
import { withRouter } from "react-router-dom"
import { fetchJson } from '../../utils'
import { Mentions, Button, Form } from 'antd'
import { MentionsInput, Mention } from 'react-mentions'

const { Option } = Mentions


class ChatDetail extends React.Component {

  _isMounted = false
  formRef = React.createRef()

  constructor(props) {
    super(props)
    this.state = {}
  }

  static async getRoomData(id) {
    const roomData = (await fetchJson.get(`/api/v2/chat-group/${id}`))?.data
    return {
      roomName: roomData.name,
      roomMessages: (await fetchJson.get(`/api/v2/chat-group/${id}/messages`))?.data,
      roomUsers: roomData.users
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
      const roomData = await ChatDetail.getRoomData(this.state.roomId)
      if (this._isMounted) {
        this.setState(roomData)
      }
      this.formRef.current.resetFields()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
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
        <Form ref={this.formRef} method='POST' onFinish={async(data) => await console.log(data)}>
          <Form.Item name='username' rules={[{ required: true, message: 'You have to input message' }]}>
            <Mentions autoSize onPressEnter={console.log}>
            {this.state.roomUsers?.map((e, index) =>
              <Option key={index} value={e.name}>{e.name}</Option>
            )}
            </Mentions>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>Send</Button>
          </Form.Item>
        </Form>
      </React.Fragment>
    )
  }
}

export default withRouter(ChatDetail)
