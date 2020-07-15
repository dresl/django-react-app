import React from 'react';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import ChatList from './chat/ChatList'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function App(props) {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
          <Menu.Item key="chat"><Link to="/chat">Chat</Link></Menu.Item>
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

export default App;
