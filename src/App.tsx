import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import './App.css';
import Preloader from './components/common/Preloader/Preloader';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './pages/Login';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './pages/Profile';
import SitebarContainer from './components/Sitebar/SitebarContainer';
import { withSuspense } from './hoc/withSuspense';
import { initializeApp } from './redux/actions/AppActions';
import { AppStateType } from './redux/reducers/rootReducer';
import store from './redux/store';

const ChatPage = React.lazy(() => import('./pages/Chat'));
const UsersPage = React.lazy(() => import('./pages/Developers'));

const ContainerApp: React.FC = (props) => {
  const dispatch = useDispatch();
  const initialized = useSelector((state: AppStateType) => state.app.initialized);

  useEffect(() => {
    dispatch(initializeApp());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!initialized) {
    return <Preloader />;
  }

  const SuspendedProfile = withSuspense(ProfileContainer);
  const SuspendedChat = withSuspense(ChatPage);
  const SuspendedUserPage = withSuspense(UsersPage);
  const SuspendedLoginPage = withSuspense(Login);

  return (
    <div className='app-wrapper'>
      <HeaderContainer />
      <div className='app-wrapper-content'>
        <div className='navWithSitebarContainer'>
          <Navbar />
          <SitebarContainer />
        </div>
        <Switch>
          <Route path='/' exact render={() => <Redirect to={'/profile'} />}></Route>
          <Route path='/chat' render={() => <SuspendedChat />} />
          <Route path='/profile' render={() => <SuspendedProfile />} />
          <Route path='/developers' render={() => <SuspendedUserPage />} />
          <Route path='/login' render={() => <SuspendedLoginPage />} />
        </Switch>
      </div>
    </div>
  );
};

const AppContainerWithRouter = withRouter(ContainerApp);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <AppContainerWithRouter />
        </QueryParamProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
