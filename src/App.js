/* Исходный код компонента
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          My create-react-app
        </p>
      </header>
    </div>
  );
}

export default App;
*/
import './css/main.css';
import './css/react.css';

import React from 'react';
import { connect } from 'react-redux';
//import { CSSTransitionGroup } from 'react-transition-group';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { fetchUserData, fetchUserData2 } from './redux/actions';

// eslint-disable-next-line
import { routes, prefix } from './route/routes';
import AuthenticatedRoute from './route/AuthenticatedRoute2';
import UnauthenticatedRoute from './route/UnauthenticatedRoute';

import Header from './layout/Header';
//import NavigationBar from 'layout/NavigationBar';
//import NavigationBar from 'layout/NavigationBarMenu';
import NavigationBar from './layout/NavigationBarMenu2';
import MainContent from './layout/MainContent';
import TestAPI from './layout/TestAPI';

import LogInPage from './pages/Login';
import ResetPasswordInPage from './pages/ResetPassword';
import WithoutReg from './pages/WithoutReg';
import Reg from './pages/Reg/Form';
import Profile from './pages/Profile';
//
import EmptyComponent from './pages/EmptyComponent';
import LarClientPage from './pages/LarClientPage';
import TreePageC from './pages/TreePageC';
import TreePageM from './pages/TreePageM';
import TreePageCtrl from './pages/TreePageCtrl';
import HookPage from './pages/HookPage';
import HookPageRedux from './pages/HookPageRedux';
import HookPageRedux2 from './pages/HookPageRedux2';
import WebSocketPage from './pages/WebSockerPage';
import rabbitMq from './rabbiitMq';

// eslint-disable-next-line
import { getPublic, getPrivate, getClients, getUsers, getLogout1 } from './api'
import { logout1 } from './redux/actions';


import Echo from "laravel-echo"
import Pusher from "pusher-js"
import {setEvent} from "./redux/actions"



class App extends React.PureComponent {

// eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  render() {
    const auth = !!this.props.user;
    //        const pending = this.state.pending || this.props.pending;
    //        console.log(this.props.pending);
    console.log('App render');
    if(auth)
      rabbitMq(this.props.user);

    return (
      <BrowserRouter>
          <div>

            <Header />
            <NavigationBar />
            <MainContent>
              <div>
              <Route render={({ location }) => {
                //                                      const key = location.pathname.substr(prefix.length).split('/').filter(Boolean).slice(0, 1).join('/');
                const key = location.pathname;
                console.log(location, key);
                return (
                    <Switch key={key} location={location}>
                      <Switch>
                        {/* for unauthorized only  */}
                        <UnauthenticatedRoute exact path={routes.index} component={LogInPage} key='1' auth={auth} fallback={routes.mainContent} />
                        <UnauthenticatedRoute path={routes.auth} component={LogInPage} key='2' auth={auth} fallback={routes.mainContent} />
                        <UnauthenticatedRoute path={routes.restore} component={ResetPasswordInPage} key='3' auth={auth} fallback={routes.mainContent} />
                        <UnauthenticatedRoute path={routes.reg} component={Reg} auth={auth} key='4' fallback={routes.mainContent} />
                        <UnauthenticatedRoute path={routes.unauth} component={WithoutReg} key='5' auth={auth} fallback={routes.mainContent} />

                        <AuthenticatedRoute exact path={routes.me} component={Profile} key='6' auth={auth} fallback={routes.auth} />

                        <Route exact path={routes.index} key='7' component={EmptyComponent} />

                        <Route exact path={routes.mainContent} key='8' component={EmptyComponent} />
                        
                        <AuthenticatedRoute exact path={routes.clients} component={LarClientPage} key='108' auth={auth} fallback={routes.auth} />
{/*}
                        <Route exact path={routes.clients} key='108' component={LarClientPage} />  
 */}                        
                        <Route exact path={routes.treePageCustom} key='101' component={TreePageC} />
                        <Route exact path={routes.treePageMulti} key='102' component={TreePageM} />
                        <Route exact path={routes.treePageCtrl} key='103' component={TreePageCtrl} />
                        <Route exact path={routes.huki} key='104' component={HookPage} />
                        <Route exact path={routes.huki_redux} key='105' component={HookPageRedux} />
                        <Route exact path={routes.huki_redux2} key='106' component={HookPageRedux2} />
                        <Route exact path={routes.websocket} key='107' component={WebSocketPage} />

                        <Route exact path={routes.testAPI} key='10' component={TestAPI} />
                      </Switch>
                    </Switch>
                )
              }} />
              </div>
            </MainContent>
          </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  state => ({
    token: state.token,
    user: state.user,
    pending: state.pending.init !== undefined ? state.pending.init : true,
  }),
  dispatch => ({
    fetchUser: () => dispatch(fetchUserData(true)),
    fetchUser2: () => dispatch(fetchUserData2(true)),
    makeLogout: (token) => dispatch(logout1(token)),
    setEventToStore: (data) => dispatch(setEvent(data)),
  })
)(App);
