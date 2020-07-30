import React from "react"
import { withRouter } from "react-router-dom"
import { fetchJson } from '../../utils'
import { Popover, Mentions, Button, Form, Spin, Row, Col, Divider } from 'antd'
import { MessageList, SystemMessage, MessageBox, SpotifyMessage } from 'react-chat-elements'
import Constants from "../../constants"


const { Option } = Mentions


class ChatDetail extends React.Component {

  _isMounted = false
  formRef = React.createRef()
  inputRef = React.createRef()
  timeout = 400

  constructor(props) {
    super(props)
    this.state = {
      chatSocket: null,
      sendLoading: false
    }
  }

  static getRoomData = async(id) => {
    const roomData = (await fetchJson.get(`/api/v2/chat-group/${id}`))?.data
    return {
      roomName: roomData.name,
      roomMessages: (await fetchJson.get(`/api/v2/chat-group/${id}/messages`))?.data,
      roomUsers: roomData.users,
      currentUser: roomData['current-user']
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.roomId !== prevState.roomId)
      return { roomId: nextProps.match.params.roomId }
    return null
  }

  WSConnect = () => {
    let ws = new WebSocket(Constants.WEBSOCKET_URL + `/ws/chat/${this.state.roomId}/`)
    let connectInterval
    // websocket onOpen
    let that = this
    ws.onopen = () => {
      console.log(`connected websocket chat component - ${this.state.roomId}`);
      this.setState({
        chatSocket: ws
      })
      that.timeout = 400
      clearTimeout(connectInterval)
    }
    // websocket onMessage
    ws.onmessage = e => {
      this.WSOnMessage(e)
    }
    // websocket onClose
    ws.onclose = e => {
      // TODO: reconnecting
    }
    // websocket onError
    ws.onerror = err => {
      console.error(
          "Socket encountered error: ",
          err.message,
          "Closing socket"
      )
      ws.close()
    }
  }

  WSCheck = () => {
    const { chatSocket } = this.state
    if (!chatSocket || chatSocket.readyState == WebSocket.CLOSED)
      this.WSConnect()
  }

  WSOnMessage = (e) => {
    const data = JSON.parse(e.data)
    console.log(data)
    this.setState({
      roomMessages: [...this.state.roomMessages, {
        username: data.username,
        user: this.state.currentUser.name,
        type: data.type,
        text: data.text,
        date: data.date,
      }]
    })
    if (this._isMounted) {
      this.setState({
        sendLoading: false
      })
    }
  }

  componentDidMount = () => {
    console.log(this.props)
    this._isMounted = true
    this.setState({
      roomId: this.props.match.params.roomId
    })
    setInterval(() => {
      if (this._isMounted) {
        this.setState({
          roomBoxMessages: this.getBoxMessages()
        })
      }
    }, 1000)
  }

  componentDidUpdate = async(prevProps, prevState) => {
    if (prevState.roomId !== this.state.roomId) {
      if (this.state.chatSocket && this._isMounted) {
        console.log('closing socket')
        this.state.chatSocket.close()
      }
      if (this._isMounted) {
        this.setState({
          roomName: null,
          roomMessages: null,
          roomUsers: null
        })
      }
      const roomData = await ChatDetail.getRoomData(this.state.roomId)
      if (this._isMounted) {
        this.setState(roomData)
      }
      this.WSConnect()
      this.formRef.current.resetFields()
      this.inputRef.focus()
      this.setState({
        roomBoxMessages: this.getBoxMessages()
      })
    }
  }

  componentWillUnmount = () => {
    console.log('closing')
    this.state.chatSocket.close()
    this._isMounted = false
  }

  getBoxMessages = () => {
    return this.state.roomMessages?.map((msg, index) => {
      return <Popover key={index} content={`${msg.user} (${msg.username})`} placement={this.state.currentUser.username === msg.username ? 'right' : 'left'}>
        <div>
          <MessageBox
            position={this.state.currentUser.username === msg.username ? 'right' : 'left'}
            type={msg.type}
            text={msg.text}
            date={new Date(msg.date)}/>
          </div>
        </Popover>
    })
  }

  getChatBody = () => {
    return (
      <React.Fragment>
        <h1>Welcome to "{this.state.roomName}"</h1>
        <MessageList
          className='message-list'
          lockable={true}
          toBottomHeight={'100%'}>
        </MessageList>
          {this.state.roomBoxMessages}
      </React.Fragment>
    )
  }

  onKeyPress = (e) => {
    if ((e.which === 13 && !e.shiftKey) || (e.keyCode === 13 && !e.shiftKey)) {
      e.preventDefault()
      this.formRef.current.submit()
    }
  }

  onSubmit = async(data) => {
    console.log(data)
    if (this._isMounted) {
      this.setState({
        sendLoading: true
      })
    }
    this.state.chatSocket.send(
      JSON.stringify({
        roomId: this.state.roomId,
        username: this.state.currentUser.username,
        type: 'text',
        text: data.text_message,
        date: new Date()
      })
    )
    this.formRef.current.resetFields()
    this.inputRef.focus()
    this.setState({
      roomBoxMessages: this.getBoxMessages()
    })
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col xl={{ span: 14 }} xs={{ span: 24 }}>
            {this.state.roomName && this.state.roomMessages ? this.getChatBody() : <Spin />}
            <Divider />
            <Form ref={this.formRef} method='POST' onFinish={this.onSubmit}>
              <Form.Item name='text_message' rules={[{ required: true, message: 'You have to input message' }]} onKeyPress={this.onKeyPress}>
                <Mentions ref={el => (this.inputRef = el)} autoSize>
                  {this.state.roomUsers?.map((e, index) =>
                    <Option key={index} value={e.name}>{e.name}</Option>
                  )}
                </Mentions>
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit' loading={this.state.sendLoading}>Send</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default withRouter(ChatDetail)
