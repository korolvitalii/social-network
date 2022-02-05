import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import Preloader from './components/common/Preloader/Preloader';
import Login from './pages/Login';
import SideMenu from './components/SideMenu';
import ProfileContainer from './pages/Profile';
import WithSuspense from './hoc/withSuspense';
import { initializeApp } from './redux/actions/AppActions';
import store from './redux/store';
import Dialogs from './pages/Dialogs';
import { MainContainer, Wrapper } from './styles';
import { selectInit } from './redux/selectors/app-selectors';
import AppBar from './components/AppBar';
import './App.css';

const ChatPage = React.lazy(() => import('./pages/Chat'));
const UsersPage = React.lazy(() => import('./pages/Developers'));

const ContainerApp: React.FC = () => {
  const dispatch = useDispatch();
  const initialized = useSelector(selectInit);

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
    <Wrapper>
      <AppBar />
      <MainContainer>
        <SideMenu />
        <Switch>
          <Route path='/' exact render={() => <Redirect to={'/profile'} />} />
          <Route path='/profile' render={() => <SuspendedProfile />} />
          <Route path='/chat' render={() => <SuspendedChat />} />
          <Route path='/developers' render={() => <SuspendedUserPage />} />
          <Route path='/login' render={() => <SuspendedLoginPage />} />
          <Route path='/dialogs' render={() => <SuspendedDialogsPage />} />
        </Switch>
      </MainContainer>
    </Wrapper>
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
