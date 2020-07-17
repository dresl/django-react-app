import React, { Suspense, lazy } from 'react';
import {
  Switch,
  Route,
  NavLink,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Home from '../home/Home';
import ChatList from '../chat/ChatList';
import ChatDetail from '../chat/ChatDetail';
import { Spin } from 'antd';

const AppLazy = lazy(() => import('../App'))

class BaseRouter extends React.Component {
  
  constructor(props) {
    super(props)
  }

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
        <h3>Select chat room</h3>
      </Route>
      <Route path={`${match.path}/:roomId`} component={ChatDetail}/>
    </Switch>
  )
}

export default BaseRouter;
