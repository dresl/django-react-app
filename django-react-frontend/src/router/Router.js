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

const AppLazy = lazy(() => import('../App'))

class BaseRouter extends React.Component {
  
  componentDidMount() {
  }

  NoMatchPage = () => <AppLazy content={<h1>404 {window.location.pathname}</h1>}/>

  render = () =>
    (
      <React.Fragment>
        <Suspense fallback={<Spin size='large' className='page-loader'/>}>
          <Switch>
            <Route exact path='/' component={() => <AppLazy sideMenu={<React.Fragment/>} content={<Home/>}/>}/>
            <Route path='/chat' component={() => <AppLazy sideMenu={<ChatList/>} content={<ChatRoomRoutes/>}/>}/>
            <Route path='/settings' component={() => <AppLazy sideMenu={<React.Fragment/>} content={<Settings/>}/>}/>
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
