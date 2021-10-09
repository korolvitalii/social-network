import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import './App.css';
import Preloader from './components/common/Preloader/Preloader';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import SitebarContainer from './components/Sitebar/SitebarContainer';
import { withSuspense } from './hoc/withSuspense';
import { initializeApp } from './redux/actions/AppActions';
import { AppStateType } from './redux/reducers/rootReducer';
import store from './redux/store';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersPage = React.lazy(() => import('./components/Users/UsersContainer'));

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
  const SuspendedDialogs = withSuspense(DialogsContainer);
  const SuspendedUserPage = withSuspense(UsersPage);
  const SuspendedLoginPage = withSuspense(Login);

  return (
    <div className='app-wrapper'>
      <HeaderContainer />
      <div className='app-wrapper-content'>
        <Navbar />
        <SitebarContainer />
        <Switch>
          <Route path='/' exact render={() => <Redirect to={'/profile'} />}></Route>
          <Route path='/dialogs/' render={() => <SuspendedDialogs />} />
          <Route path='/profile' render={() => <SuspendedProfile />} />
          <Route path='/users' render={() => <SuspendedUserPage />} />
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
