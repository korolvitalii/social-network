import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import Preloader from './components/common/Preloader/Preloader';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './pages/Login';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './pages/Profile';
import WithSuspense from './hoc/withSuspense';
import { initializeApp } from './redux/actions/AppActions';
import { AppStateType } from './redux/reducers/rootReducer';
import store from './redux/store';
import Dialogs from './pages/Dialogs';
import { AppWrapper, AppWrapperContent } from './App styled';

const ChatPage = React.lazy(() => import('./pages/Chat'));
const UsersPage = React.lazy(() => import('./pages/Developers'));

const ContainerApp: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const initialized = useSelector((state: AppStateType) => state.app.initialized);

  React.useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  if (!initialized) {
    return <Preloader />;
  }

  const SuspendedProfile = WithSuspense(ProfileContainer);
  const SuspendedChat = WithSuspense(ChatPage);
  const SuspendedUserPage = WithSuspense(UsersPage);
  const SuspendedLoginPage = WithSuspense(Login);
  const SuspendedDialogsPage = WithSuspense(Dialogs);

  return (
    <AppWrapper>
      <HeaderContainer />
      <AppWrapperContent>
        <div className='navWithSitebarContainer'>
          <Navbar />
        </div>
        <Switch>
          <Route path='/' exact render={() => <Redirect to={'/profile'} />}></Route>
          <Route path='/chat' render={() => <SuspendedChat />} />
          <Route path='/profile' render={() => <SuspendedProfile />} />
          <Route path='/developers' render={() => <SuspendedUserPage />} />
          <Route path='/login' render={() => <SuspendedLoginPage />} />
          <Route path='/dialogs' render={() => <SuspendedDialogsPage />} />
        </Switch>
      </AppWrapperContent>
    </AppWrapper>
  );
};

const AppContainerWithRouter = withRouter(ContainerApp);

const App: React.FC = (): React.ReactElement => {
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
