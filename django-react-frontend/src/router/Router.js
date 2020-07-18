import React, { Suspense, lazy } from 'react'
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom"
import { Spin } from 'antd'
import Home from '../components/Home'
import ChatList from '../components/chat/ChatList'
import ChatDetail from '../components/chat/ChatDetail'
import Settings from '../components/Settings'
import LoginForm from '../components/auth/LoginForm'
import SignupForm from '../components/auth/SignUpForm'

const AppLazy = lazy(() => import('../App'))

class BaseRouter extends React.Component {

  componentDidMount() {
  }

  NoMatchPage = () => <AppLazy content={<h1>404 {window.location.pathname}</h1>}/>

  getRoute = (path, content=<React.Fragment/>, sideMenu=<React.Fragment/>, exact=false) => {
    return <Route exact={exact} path={path} component={
      () => <AppLazy handleLogOut={this.props.handleLogOut} authData={this.props.authData} sideMenu={sideMenu} content={content}/>
    }/>
  }

  render = () =>
    (
      <React.Fragment>
        <Suspense fallback={<Spin size='large' className='page-loader'/>}>
          <Switch>
            {this.getRoute('/', <Home/>, <React.Fragment/>, true)}
            {this.getRoute('/chat', <ChatRoomRoutes/>, <ChatList/>)}
            {this.getRoute('/settings', <Settings/>, <React.Fragment/>)}
            {this.getRoute('/auth/login', <LoginForm handleLogin={this.props.handleLogin}/>, <React.Fragment/>)}
            {this.getRoute('/auth/sign-up', <SignupForm handleSignup={this.props.handleSignup}/>, <React.Fragment/>)}
            <Route path='*' component={this.NoMatchPage} />
          </Switch>
        </Suspense>
      </React.Fragment>
    )
}

function ChatRoomRoutes() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <h2>Select chat room</h2>
      </Route>
      <Route path={`${match.path}/:roomId`} component={ChatDetail}/>
    </Switch>
  )
}

export default BaseRouter
