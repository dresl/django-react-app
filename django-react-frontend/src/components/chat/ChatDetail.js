import React from "react"
import { withRouter } from "react-router-dom"
import { fetchJson } from '../../utils'
import { Popover, Mentions, Button, Form, Spin, Row, Col, Divider } from 'antd'
import { MessageList, SystemMessage, MessageBox, SpotifyMessage } from 'react-chat-elements'


const { Option } = Mentions


class ChatDetail extends React.Component {

  _isMounted = false
  formRef = React.createRef()
  inputRef = React.createRef()

  constructor(props) {
    super(props)
    this.state = {}
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

  componentDidMount() {
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
      this.formRef.current.resetFields()
      this.inputRef.focus()
      this.setState({
        roomBoxMessages: this.getBoxMessages()
      })
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.roomId !== prevState.roomId)
      return { roomId: nextProps.match.params.roomId }
    return null
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  getBoxMessages = () => {
    return this.state.roomMessages?.map((msg, index) => {
      return <Popover key={index} content={`${msg.user} (${msg.username})`} placement={this.state.currentUser === msg.username ? 'right' : 'left'}>
        <div>
          <MessageBox
            position={this.state.currentUser === msg.username ? 'right' : 'left'}
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
    console.log(e.shiftKey)
    if ((e.which === 13 && !e.shiftKey) || (e.keyCode === 13 && !e.shiftKey)) {
      e.preventDefault()
      this.formRef.current.submit()
    }
  }

  onSubmit = async(data) => {
    console.log(data)
    this.setState({
      roomMessages: [...this.state.roomMessages, {
        username: this.state.currentUser,
        type: 'text',
        text: 'https://open.spotify.com/track/3Z8FwOEN59mRMxDCtb8N0A?si=4K1mkig2TsaFFhBmNEO1lg',
        date: new Date(),
      }]
    })
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
                <Mentions ref={el => (this.inputRef = el)} autoSize onPressEnter={console.log}>
                  {this.state.roomUsers?.map((e, index) =>
                    <Option key={index} value={e.name}>{e.name}</Option>
                  )}
                </Mentions>
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit'>Send</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default withRouter(ChatDetail)
