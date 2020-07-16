import React, { useReducer } from 'react';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb } from 'antd';
import ChatList from './chat/ChatList'
import {
  Switch,
  Route,
  NavLink,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Item from 'antd/lib/list/Item';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function App(props) {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key='home'><NavLink exact={true} activeClassName="is-active" to="/">Home</NavLink></Menu.Item>
          <Menu.Item key='chat'><NavLink activeClassName="is-active" to="/chat">Chat</NavLink></Menu.Item>
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
