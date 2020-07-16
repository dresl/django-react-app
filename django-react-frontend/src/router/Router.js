import React from "react";
import {
  Switch,
  Route,
  NavLink,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import ChatList from '../chat/ChatList';
import ChatDetail from '../chat/ChatDetail';
import App from '../App';

class BaseRouter extends React.Component {
  
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  NoMatchPage = () => <App content={<h1>404 {window.location.pathname}</h1>}/>

  render = () =>
    (
      <React.Fragment>
        <Switch>
          <Route exact path='/'>
            <App sideMenu={<React.Fragment/>} content={<h1>Hello react app!</h1>}/>
          </Route>
          <Route path='/chat'>
            <App sideMenu={<ChatList/>} content={<ChatRoomRoutes/>}/>
          </Route>
          <Route path='*' component={this.NoMatchPage} />
        </Switch>
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
      <Route path={`${match.path}/:roomId`}>
        <ChatDetail/>
      </Route>
    </Switch>
  )
}

export default BaseRouter;
