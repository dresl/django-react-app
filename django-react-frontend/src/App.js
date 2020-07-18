import React from 'react'
import { Layout, Menu } from 'antd'
import { NavLink } from "react-router-dom"
const { Header, Content, Sider } = Layout

function App(props) {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key='home'><NavLink exact={true} activeClassName="is-active" to="/">Home</NavLink></Menu.Item>
          <Menu.Item key='chat'><NavLink activeClassName="is-active" to="/chat">Chat</NavLink></Menu.Item>
          <Menu.Item key='settings'><NavLink activeClassName="is-active" to="/settings">Settings</NavLink></Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          {props.sideMenu}
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          {props.breadcrumb}
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.content}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App
