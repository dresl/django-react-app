import React from 'react'
import { Layout, Menu, Row, Col } from 'antd'
import { NavLink } from "react-router-dom"

const { Header, Content, Sider } = Layout

class App extends React.Component {

  loggedInNav = () => {
    return (
      <Menu theme="dark" mode="horizontal" style={{ textAlign: 'right' }}>
          <Menu.Item key='logout' onClick={this.props.handleLogOut}>Logout ({this.props.authData.username})</Menu.Item>
      </Menu>
    )
  }

  loggedOutNav = () => {
    return (
      <Menu theme="dark" mode="horizontal" style={{ textAlign: 'right' }}>
          <Menu.Item key='login'><NavLink exact={true} activeClassName="is-active" to="/auth/login">Login</NavLink></Menu.Item>
          <Menu.Item key='signup'><NavLink activeClassName="is-active" to="/auth/sign-up">Sign up</NavLink></Menu.Item>
      </Menu>
    )
  }

  render = () => {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Row>
            <Col span={12}>
              <Menu theme="dark" mode="horizontal">
                  <Menu.Item key='home'><NavLink exact={true} activeClassName="is-active" to="/">Home</NavLink></Menu.Item>
                  {this.props.authData.loggedIn ? <Menu.Item key='chat'><NavLink activeClassName="is-active" to="/chat">Chat</NavLink></Menu.Item> : <React.Fragment/>}
                  <Menu.Item key='settings'><NavLink activeClassName="is-active" to="/settings">Settings</NavLink></Menu.Item>
              </Menu>
            </Col>
            <Col span={12}>
              {this.props.authData.loggedIn ? this.loggedInNav() : this.loggedOutNav()}
            </Col>
          </Row>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            {this.props.sideMenu}
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            {this.props.breadcrumb}
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {this.props.content}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default App
